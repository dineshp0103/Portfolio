import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(req: NextRequest) {
    try {
        const encoded = process.env.UPI_ID_ENCODED;
        if (!encoded) {
            return NextResponse.json({ error: 'UPI not configured' }, { status: 500 });
        }

        // Decode the base64-stored UPI ID — only happens server-side
        const upiId = Buffer.from(encoded, 'base64').toString('utf-8');

        // Build UPI deep link
        const upiLink = `upi://pay?pa=${upiId}&pn=POLAMARASETTI+DINESH&cu=INR`;

        // Generate QR as base64 data URL
        const qrDataUrl = await QRCode.toDataURL(upiLink, {
            width: 300,
            margin: 2,
            color: {
                dark: '#ffffff',
                light: '#00000000',
            },
        });

        return NextResponse.json({ qr: qrDataUrl });
    } catch (error) {
        return NextResponse.json({ error: 'QR generation failed' }, { status: 500 });
    }
}
