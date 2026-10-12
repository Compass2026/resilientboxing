import { authorized } from "@/lib/inquiry-auth";
import { crmConfig, drainInquiries } from "@/lib/inquiry-delivery";
import { blobStore, saveCursor } from "@/lib/inquiry-store";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function GET(request: Request) {
  const reply = (body: object, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  if (!authorized(request.headers.get("authorization"), process.env.CRON_SECRET)) return reply({}, 401);
  if (process.env.VERCEL_ENV === "preview") return reply({}, 503);
  const crm = crmConfig();
  if (!crm || crm === "incomplete") return reply({ error: "CRM configuration required" }, 503);
  try {
    const state = await blobStore.read<{ cursor?: string }>("inquiries/v1/scan-cursor.json");
    const result = await drainInquiries(blobStore, crm, state?.cursor || undefined);
    await saveCursor(result.cursor);
    return reply({ ok: true, ...result }, 200);
  } catch {
    console.error("Inquiry retry unavailable");
    return reply({ error: "Retry temporarily unavailable" }, 503);
  }
}
