import { get, put, del, list } from '@vercel/blob';
import type { Store } from './inquiry-delivery';

// Explicit store ID prevents the SDK from selecting another store connected
// to this project (Lucas also has public lighting-preview image storage).
export function inquiryStorageOptions() {
  const storeId = process.env.INQUIRY_BLOB_STORE_ID;
  if (!storeId) throw new Error('Private inquiry store not configured');
  return { storeId, ...(process.env.INQUIRY_BLOB_READ_WRITE_TOKEN ? { token: process.env.INQUIRY_BLOB_READ_WRITE_TOKEN } : {}) };
}

export const blobStore: Store = {
  async read<T>(key: string): Promise<T | null> {
    const result = await get(key, { access: 'private', ...inquiryStorageOptions(), useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200) throw new Error('Outbox read unavailable');
    return await new Response(result.stream).json() as T;
  },
  async create<T>(key: string, value: T): Promise<T> {
    try {
      await put(key, JSON.stringify(value), { access: 'private', ...inquiryStorageOptions(), addRandomSuffix: false, allowOverwrite: false, contentType: 'application/json' });
      return value;
    } catch {
      // Covers both concurrent create and a lost write acknowledgement.
      // Never report persistence unless the exact record can be read back.
      const existing = await blobStore.read<T>(key);
      if (existing !== null) return existing;
      throw new Error('Outbox write unavailable');
    }
  },
  async remove(key) { await del(key, inquiryStorageOptions()); },
  async list(cursor) {
    const result = await list({ ...inquiryStorageOptions(), prefix: 'inquiries/v1/pending/', limit: 20, cursor });
    return { keys: result.blobs.map(blob => blob.pathname), cursor: result.hasMore ? result.cursor : undefined };
  },
};
export async function saveCursor(cursor?: string) {
  await put('inquiries/v1/scan-cursor.json', JSON.stringify({ cursor: cursor || null }), { access: 'private', ...inquiryStorageOptions(), addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' });
}
