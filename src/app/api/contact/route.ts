import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields required' }, { status: 400 });
        }

        // ── 1. Save to Supabase ─────────────────────────────────────────────────
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
        let saved = false;

        if (supabaseUrl.startsWith('http') && supabaseKey.length > 10) {
            const supabase = createClient(supabaseUrl, supabaseKey, {
                auth: { autoRefreshToken: false, persistSession: false },
            });
            const { error } = await supabase
                .from('contacts')
                .insert([{ name, email, message }]);
            if (!error) saved = true;
        }

        // ── 2. Send email notification via Resend ───────────────────────────────
        const resendKey = process.env.RESEND_API_KEY ?? '';
        const toEmail = process.env.CONTACT_EMAIL ?? '';
        let emailSent = false;

        if (resendKey && toEmail) {
            const sentAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            const html = `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1a1a1a,#2a2a2a);padding:28px 32px;border-bottom:1px solid #333;">
            <h2 style="margin:0;font-size:1.3rem;">📬 New Portfolio Contact</h2>
            <p style="margin:6px 0 0;color:#aaa;font-size:0.85rem;">Received: ${sentAt} IST</p>
          </div>
          <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#aaa;width:90px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#aaa;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#60a5fa;">${email}</a></td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#1a1a1a;border-radius:8px;border-left:3px solid #444;">
              <p style="margin:0 0 6px;color:#aaa;font-size:0.8rem;">MESSAGE</p>
              <p style="margin:0;line-height:1.6;white-space:pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding:16px 32px;background:#111;border-top:1px solid #222;text-align:center;">
            <p style="margin:0;color:#555;font-size:0.75rem;">Sky-Dev Portfolio · Auto-notification</p>
          </div>
        </div>`;

            const emailRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from: 'Sky-Dev Portfolio <onboarding@resend.dev>',
                    to: [toEmail],
                    subject: `📬 Portfolio Contact from ${name}`,
                    html,
                }),
            });
            if (emailRes.ok) emailSent = true;
        }

        return NextResponse.json({ success: true, saved, emailSent });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
