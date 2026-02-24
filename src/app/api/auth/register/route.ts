import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'sky-dev-fallback-secret-change-in-production'
);

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
        }
        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
        if (!supabaseUrl.startsWith('http') || !supabaseAnonKey) {
            return NextResponse.json({ error: 'Auth service not configured yet' }, { status: 503 });
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            auth: { autoRefreshToken: false, persistSession: false },
        });

        // Use signUp (works with anon key, no admin API required)
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });

        if (error) {
            if (error.message.includes('already registered')) {
                return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
            }
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (!data.user) {
            return NextResponse.json({ error: 'Registration failed — check your Supabase confirmation settings' }, { status: 400 });
        }

        // Issue custom JWT
        const jwt = await new SignJWT({ sub: data.user.id, email, name })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        const response = NextResponse.json({
            success: true,
            user: { id: data.user.id, email, name },
            // If Supabase email confirmations are ON, user needs to verify before signing in
            needsConfirmation: !data.session,
        });

        // Only set cookie if session exists (email confirmation disabled in Supabase)
        if (data.session) {
            response.cookies.set('skydev_token', jwt, {
                httpOnly: true, secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax', maxAge: 7 * 24 * 60 * 60, path: '/',
            });
        }

        return response;
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
