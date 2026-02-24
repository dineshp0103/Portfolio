'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthButton() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!supabase) { setLoading(false); return; }
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleSignIn = async () => {
        if (!supabase) return;
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/` },
        });
    };

    const handleSignOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    };

    // Supabase not configured yet
    if (!supabase) {
        return (
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>
                Auth pending
            </span>
        );
    }

    if (loading) return null;

    if (user) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {user.user_metadata?.avatar_url && (
                    <Image
                        src={user.user_metadata.avatar_url}
                        alt="avatar"
                        width={30}
                        height={30}
                        style={{ borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }}
                    />
                )}
                <button className="btn-glass" onClick={handleSignOut} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                    Sign out
                </button>
            </div>
        );
    }

    return (
        <Link href="/auth" className="btn-glass" id="sign-in-btn" style={{ fontSize: '0.85rem', textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
            Sign In
        </Link>
    );
}
