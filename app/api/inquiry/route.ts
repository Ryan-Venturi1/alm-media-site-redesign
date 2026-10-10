import { NextResponse } from 'next/server';

// Receives every form on the site (contact, plan, events, property, investor,
// newsletter). Delivery is configured with environment variables — see README.
//   INQUIRY_WEBHOOK_URL   POST the inquiry as JSON (Slack, Zapier, Make, a CRM…)
//   RESEND_API_KEY        + INQUIRY_EMAIL_TO (comma-separated) to email it
//   INQUIRY_EMAIL_FROM    optional sender, e.g. "A Lot Media <web@alotmedia.com>"
// With neither set, inquiries are written to the server log.

export const runtime = 'nodejs';

const KINDS = new Set(['contact', 'plan', 'events', 'property', 'investor', 'newsletter']);
const LABELS: Record<string, string> = {
  contact: 'Contact form',
  plan: 'Campaign plan',
  events: 'Event inquiry',
  property: 'Property assessment',
  investor: 'Investor access request',
  newsletter: 'Newsletter sign-up',
};

type Payload = {
  kind?: string;
  page?: string;
  fields?: Record<string, unknown>;
  context?: Record<string, unknown>;
};

function clean(obj: Record<string, unknown> | undefined, limit: number) {
  const out: Record<string, string> = {};
  if (!obj || typeof obj !== 'object') return out;
  for (const [k, v] of Object.entries(obj).slice(0, limit)) {
    const key = String(k).slice(0, 60);
    const val = Array.isArray(v) ? v.join(', ') : typeof v === 'object' ? JSON.stringify(v) : String(v);
    out[key] = val.slice(0, 4000);
  }
  return out;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    const raw = await req.text();
    if (raw.length > 50_000) return NextResponse.json({ ok: false, error: 'too large' }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
  }

  const kind = KINDS.has(String(body.kind)) ? String(body.kind) : 'contact';
  const fields = clean(body.fields, 40);
  const context = clean(body.context, 40);
  const page = String(body.page || '').slice(0, 200);
  const replyTo = Object.entries(fields).find(([k, v]) => /mail/i.test(k) && /@/.test(v))?.[1];

  const lines = [
    `${LABELS[kind]} — alotmedia.com${page}`,
    '',
    ...Object.entries(fields).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`),
  ];
  if (Object.keys(context).length) {
    lines.push('', 'Selections:', ...Object.entries(context).map(([k, v]) => `  ${k}: ${v}`));
  }
  const text = lines.join('\n');
  const record = { kind, page, fields, context, receivedAt: new Date().toISOString() };

  const jobs: Promise<unknown>[] = [];
  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (webhook) {
    jobs.push(
      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, ...record }),
      }),
    );
  }
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_EMAIL_TO;
  if (resendKey && to) {
    jobs.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.INQUIRY_EMAIL_FROM || 'A Lot Media website <onboarding@resend.dev>',
          to: to.split(',').map((s) => s.trim()).filter(Boolean),
          subject: `${LABELS[kind]}${fields.company ? ` — ${fields.company}` : ''}`,
          text,
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
      }),
    );
  }

  if (!jobs.length) {
    console.log('[inquiry]', JSON.stringify(record));
    return NextResponse.json({ ok: true, delivered: false });
  }
  const results = await Promise.allSettled(jobs);
  const failed = results.filter((r) => r.status === 'rejected' || (r.status === 'fulfilled' && !(r.value as Response).ok));
  if (failed.length) console.error('[inquiry] delivery failed', failed.length, JSON.stringify(record));
  return NextResponse.json({ ok: failed.length < jobs.length, delivered: failed.length < jobs.length });
}
