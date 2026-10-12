import { createHash } from 'node:crypto';

export type Crm = { url: string; source: string; token: string };
export type Inquiry = {
  version: 1; id: string; fingerprint: string; submittedAt: string;
  source: string; intakeUrl: string;
  email: { from: string; to: string[]; reply_to?: string; subject: string; text: string; html: string };
  emailReadyAt?: number;
  crmPayload: Record<string, string | null>;
};
export type Store = {
  read<T>(key: string): Promise<T | null>;
  create<T>(key: string, value: T): Promise<T>;
  remove(key: string): Promise<void>;
  list(cursor?: string): Promise<{ keys: string[]; cursor?: string }>;
};
type Receipt = { fingerprint: string; emailId?: string; completedAt?: string };
export const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const prefix = 'inquiries/v1/';
export const pendingKey = (id: string) => `${prefix}pending/${id}.json`;
const receiptKey = (id: string, kind: string) => `${prefix}${kind}/${id}.json`;
// Leave a full hour before Resend's 24-hour idempotency window expires.
export const SAFE_EMAIL_RETRY_MS = 23 * 60 * 60 * 1000;

export function crmConfig(): Crm | 'incomplete' | null {
  if (process.env.CRM_INTAKE_ENABLED !== 'true') return null;
  const url = process.env.CRM_INTAKE_URL, source = process.env.CRM_INTAKE_SOURCE, token = process.env.CRM_INTAKE_TOKEN;
  if (!url || !source || !token || !/^https:\/\//.test(url)) return 'incomplete';
  return { url, source, token };
}
export class SubmissionConflict extends Error {}

export async function acceptInquiry(store: Store, inquiry: Inquiry): Promise<void> {
  const completed = await store.read<Receipt>(receiptKey(inquiry.id, 'completed'));
  if (completed) {
    if (completed.fingerprint !== inquiry.fingerprint) throw new SubmissionConflict();
    return;
  }
  // Create-only writes freeze recipient, payload and original submission time.
  // A concurrent request receives the existing record, never overwrites it.
  const existing = await store.create(pendingKey(inquiry.id), inquiry);
  if (existing.fingerprint !== inquiry.fingerprint) throw new SubmissionConflict();
}

export async function deliverInquiry(store: Store, id: string, crm: Crm, now = Date.now()): Promise<'complete' | 'pending' | 'attention'> {
  const key = pendingKey(id);
  if (await store.read<Receipt>(receiptKey(id, 'completed'))) {
    await store.remove(key);
    await store.remove(`${prefix}delivery/${id}.json`);
    await store.remove(`${prefix}enriched/${id}.json`);
    return 'complete';
  }
  const inquiry = await store.read<Inquiry>(key);
  if (!inquiry) return 'complete';
  // Never replay old pending work into a newly configured client's source.
  if (inquiry.source !== crm.source || inquiry.intakeUrl !== crm.url) {
    console.error('Inquiry delivery needs attention', { reference: id, reason: 'destination_changed' });
    return 'attention';
  }
  const enrichment = inquiry.emailReadyAt ? await store.read<{ email: Inquiry['email'] }>(`${prefix}enriched/${id}.json`) : null;
  if (inquiry.emailReadyAt && !enrichment && now < inquiry.emailReadyAt) return 'pending';
  // Freeze the final provider payload before its first attempt, including a fallback
  // when rendering never finishes. A late render cannot change the idempotency key.
  const delivery = await store.create(`${prefix}delivery/${id}.json`, { email: enrichment?.email || inquiry.email });
  let email = await store.read<Receipt>(receiptKey(id, 'emailed'));
  let attention = false;
  if (!email) {
    const attempt = await store.create(receiptKey(id, 'email-attempt'), { firstAttemptAt: now });
    if (now - attempt.firstAttemptAt >= SAFE_EMAIL_RETRY_MS) {
      // The provider may have accepted a request whose response was lost.
      // Keep the inquiry, but never risk a duplicate after its key expires.
      attention = true;
    } else if (process.env.RESEND_API_KEY) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `compass-inquiry-${digest({ id, email: delivery.email })}` },
          body: JSON.stringify(delivery.email),
          signal: AbortSignal.timeout(8000),
        });
        const result = await response.json().catch(() => ({}));
        if (response.ok && typeof result.id === 'string' && result.id) {
          email = await store.create(receiptKey(id, 'emailed'), { fingerprint: inquiry.fingerprint, emailId: result.id });
        } else console.error('Inquiry email pending', { reference: id, status: response.status });
      } catch { console.error('Inquiry email pending', { reference: id }); }
    }
  }
  let saved = false;
  try {
    const response = await fetch(crm.url, {
      method: 'POST', headers: { Authorization: `Bearer ${crm.token}`, 'X-Compass-Source': crm.source, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...inquiry.crmPayload, submission_id: id, submitted_at: inquiry.submittedAt, email_status: email ? 'accepted' : 'not_reported', email_provider_id: email?.emailId || null }),
      signal: AbortSignal.timeout(7000),
    });
    const result = await response.json().catch(() => ({}));
    saved = response.ok && result.ok === true;
    if (!saved) console.error('Inquiry CRM pending', { reference: id, status: response.status });
  } catch { console.error('Inquiry CRM pending', { reference: id }); }
  if (saved && email) {
    // Write a permanent non-PII tombstone before deleting the private payload.
    // A process crash or repeated browser request cannot start delivery again.
    await store.create(receiptKey(id, 'completed'), { fingerprint: inquiry.fingerprint, completedAt: new Date(now).toISOString() });
    await store.remove(key);
    await store.remove(`${prefix}delivery/${id}.json`);
    await store.remove(`${prefix}enriched/${id}.json`);
    return 'complete';
  }
  if (attention || now - Date.parse(inquiry.submittedAt) > 15 * 60 * 1000) {
    console.error('Inquiry delivery needs attention', { reference: id, reason: attention ? 'email_confirmation_required' : 'delivery_delayed' });
    return 'attention';
  }
  return 'pending';
}

// Bounded batches with a durable cursor prevent a bad destination or a large
// backlog from starving newer records. Failed records are retained indefinitely.
export async function drainInquiries(store: Store, crm: Crm, cursor?: string) {
  const page = await store.list(cursor);
  const counts = { complete: 0, pending: 0, attention: 0 };
  for (let start = 0; start < page.keys.length; start += 5) {
    await Promise.all(page.keys.slice(start, start + 5).map(async key => {
      const id = key.slice(key.lastIndexOf('/') + 1, -5);
      try { counts[await deliverInquiry(store, id, crm)]++; }
      catch { counts.pending++; console.error('Inquiry retry deferred', { reference: id }); }
    }));
  }
  return { ...counts, cursor: page.cursor };
}
