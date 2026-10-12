import { timingSafeEqual } from "node:crypto";
export function authorized(header: string | null, secret: string | undefined) {
  if (!header || !secret) return false;
  const a = Buffer.from(header), b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && timingSafeEqual(a, b);
}
