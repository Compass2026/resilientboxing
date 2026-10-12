import { acceptInquiry, crmConfig, deliverInquiry, digest, type Inquiry, type Store } from './inquiry-delivery';
import { blobStore } from './inquiry-store';

export const mockDelivery = () => process.env.VERCEL_ENV === 'preview' || (process.env.VERCEL_ENV !== 'production' && process.env.INQUIRY_DELIVERY === 'mock');
export const validSubmissionId = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
export function safePage(value: string | null | undefined): string | null {
  try { const url = new URL(value || ''); return /^https?:$/.test(url.protocol) ? `${url.origin}${url.pathname}`.slice(0, 2000) : null; } catch { return null; }
}
export async function queueInquiry(input: {
  id: string; fingerprintPayload: unknown; email: Inquiry['email']; crmPayload: Inquiry['crmPayload']; emailReadyAt?: number;
}, defer: (work: () => Promise<void>) => void, store: Store = blobStore): Promise<boolean> {
  if (mockDelivery()) return true;
  const crm = crmConfig();
  if (!crm) return false;
  if (crm === 'incomplete' || !process.env.INQUIRY_BLOB_STORE_ID || !process.env.CRON_SECRET || !process.env.RESEND_API_KEY || !input.email.to.length) throw new Error('Inquiry configuration incomplete');
  if (!validSubmissionId(input.id)) throw new Error('Please refresh this page and retry.');
  const limits: Record<string, number> = { name: 200, email: 254, phone: 60, location: 200, service_type: 200, budget: 200, message: 10000, page_url: 2000 };
  for (const [key, max] of Object.entries(limits)) {
    const value = input.crmPayload[key];
    if (value != null && (typeof value !== 'string' || value.length > max)) throw new Error('Please shorten the form fields and retry.');
  }
  if (!input.crmPayload.name || (!input.crmPayload.email && !input.crmPayload.phone)) throw new Error('Contact information required.');
  if (input.crmPayload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.crmPayload.email)) throw new Error('Invalid email.');
  await acceptInquiry(store, {
    version: 1, id: input.id, fingerprint: digest(input.fingerprintPayload), submittedAt: new Date().toISOString(),
    source: crm.source, intakeUrl: crm.url, email: input.email, crmPayload: input.crmPayload, emailReadyAt: input.emailReadyAt,
  });
  try { defer(async () => { try { await deliverInquiry(store, input.id, crm); } catch { console.error('Inquiry delivery deferred', { reference: input.id }); } }); }
  catch { console.error('Inquiry delivery deferred', { reference: input.id }); }
  return true;
}
