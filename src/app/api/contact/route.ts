import { Resend } from "resend";

const TO = ["thomas@compassmarketing.ai", "resilientboxing@gmail.com"];
const FROM = "Resilient Boxing <forms@send.compassmarketing.ai>";

/** Mirrors the labels shown in the contact form's program dropdown. */
const PROGRAM_NAMES: Record<string, string> = {
  elevate: "Elevate 60 (Foundation & Fire)",
  form: "Form & Foundation (Technique)",
  faithoverfear: "Faith Over Fear (Gloves & Scripture)",
  fightcamp: "Fight Camp (Advanced)",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 16px;font:600 12px/1.4 monospace;text-transform:uppercase;letter-spacing:.08em;color:#8a7440;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:10px 16px;font:400 14px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#1a1a1a;">${value}</td>
  </tr>`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const field = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");
  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const program = field("program");
  const message = field("message");
  const website = field("website"); // honeypot

  // Bots that fill every input land here. Report success so they move on.
  if (website) {
    return Response.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!phone) errors.phone = "Phone number is required.";
  if (!message) errors.message = "Message is required.";
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, error: "Validation failed.", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; contact form cannot send.");
    return Response.json(
      { ok: false, error: "The contact form is not available right now. Please call (314) 315-5046." },
      { status: 500 }
    );
  }

  const programLabel = PROGRAM_NAMES[program] || program || "—";
  const html = `<div style="max-width:560px;margin:0 auto;padding:24px;background:#ffffff;">
    <h2 style="font:700 18px/1.3 -apple-system,Segoe UI,Roboto,sans-serif;color:#1a1a1a;margin:0 0 4px;">New contact form lead</h2>
    <p style="font:400 13px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#777;margin:0 0 20px;">Submitted on resilientboxing.vercel.app</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px;">
      ${row("Name", esc(name))}
      ${row("Email", `<a href="mailto:${esc(email)}" style="color:#8a7440;">${esc(email)}</a>`)}
      ${row("Phone", `<a href="tel:${esc(phone)}" style="color:#8a7440;">${esc(phone)}</a>`)}
      ${row("Program", esc(programLabel))}
      ${row("Message", esc(message).replace(/\n/g, "<br />"))}
    </table>
    <p style="font:400 12px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#999;margin:20px 0 0;">Reply to this email to answer ${esc(name)} directly.</p>
  </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New contact form lead: ${name}`,
      html,
    });
    if (error) {
      console.error("Resend send failed:", error);
      return Response.json(
        { ok: false, error: "We couldn't send your message. Please try again or call (314) 315-5046." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Resend threw:", err);
    return Response.json(
      { ok: false, error: "We couldn't send your message. Please try again or call (314) 315-5046." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
