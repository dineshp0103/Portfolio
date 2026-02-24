import { NextRequest, NextResponse } from 'next/server';

// Map of platform keys to their base64-encoded env var names
const PLATFORM_KEYS: Record<string, string> = {
    linkedin: 'SOCIAL_LINKEDIN',
    github: 'SOCIAL_GITHUB',
    gcloud: 'SOCIAL_GCLOUD',
    leetcode: 'SOCIAL_LEETCODE',
    instagram: 'SOCIAL_INSTAGRAM',
    twitter: 'SOCIAL_TWITTER',
};

export async function GET(
    _req: NextRequest,
    { params }: { params: { platform: string } }
) {
    const key = PLATFORM_KEYS[params.platform.toLowerCase()];
    if (!key) {
        return NextResponse.json({ error: 'Unknown platform' }, { status: 404 });
    }

    const encoded = process.env[key];
    if (!encoded) {
        return NextResponse.json({ error: 'Link not configured' }, { status: 503 });
    }

    try {
        const url = Buffer.from(encoded, 'base64').toString('utf-8');
        // Server-side redirect — the actual URL never appears in client HTML
        return NextResponse.redirect(url, { status: 302 });
    } catch {
        return NextResponse.json({ error: 'Invalid link data' }, { status: 500 });
    }
}
