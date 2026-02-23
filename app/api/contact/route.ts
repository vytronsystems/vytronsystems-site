
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Minimal validation (enterprise-safe baseline)
    const name = String(data?.name || '').trim();
    const email = String(data?.email || '').trim();
    const message = String(data?.message || '').trim();

    if (!email || !message) {
      return NextResponse.json({ok: false, error: 'INVALID_PAYLOAD'}, {status: 400});
    }

    // Optional webhook forwarding for production integrations
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({name, email, message, topic: data?.topic || '', company: data?.company || ''})
      });
    }

    return NextResponse.json({ok: true}, {status: 200});
  } catch {
    return NextResponse.json({ok: false, error: 'SERVER_ERROR'}, {status: 500});
  }
}
