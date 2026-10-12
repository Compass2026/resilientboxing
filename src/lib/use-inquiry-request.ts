"use client";
import { useRef } from 'react';

// Keep one ID for an unchanged submission until its receipt is confirmed.
// No contact details or credentials are written to browser storage.
export function useInquiryRequest() {
  const attempt = useRef<{ payload: string; id: string } | null>(null);
  return async (url: string, options: RequestInit) => {
    let payload = String(options.body || '');
    if (options.body instanceof FormData) {
      const entries = await Promise.all([...options.body.entries()].map(async ([key, value]) => [key,
        typeof value === 'string' ? value : Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', await value.arrayBuffer()))).map(v => v.toString(16).padStart(2, '0')).join('')]));
      payload = JSON.stringify(entries);
    }
    payload = url + payload;
    if (!attempt.current || attempt.current.payload !== payload) attempt.current = { payload, id: crypto.randomUUID() };
    const id = attempt.current.id;
    const headers = new Headers(options.headers);
    headers.set('X-Inquiry-ID', id);
    const response = await fetch(url, { ...options, headers });
    if (response.ok && attempt.current?.id === id) attempt.current = null;
    return response;
  };
}
