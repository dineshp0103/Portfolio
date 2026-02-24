import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'sky-dev-fallback-secret-change-in-production'
);

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
        if (!supabaseUrl.startsWith('http')) {
            return NextResponse.json({ error: 'Auth service not configured yet' }, { status: 503 });
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error || !data.user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const name = data.user.user_metadata?.name || email.split('@')[0];

        // Issue custom JWT
        const jwt = await new SignJWT({ sub: data.user.id, email, name })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        const response = NextResponse.json({
            success: true,
            user: { id: data.user.id, email, name },
        });
        response.cookies.set('skydev_token', jwt, {
            httpOnly: true, secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', maxAge: 7 * 24 * 60 * 60, path: '/',
        });
        return response;
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
