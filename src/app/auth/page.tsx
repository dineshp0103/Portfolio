'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './auth.module.css';

type Tab = 'signin' | 'signup';

export default function AuthPage() {
    const [tab, setTab] = useState<Tab>('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const resetForm = () => { setName(''); setEmail(''); setPassword(''); setConfirm(''); setMessage(''); setStatus('idle'); };

    const handleGoogleSignIn = async () => {
        if (!supabase) { setMessage('Auth service not configured yet. Please add Supabase keys to .env.local'); setStatus('error'); return; }
        await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/` } });
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading'); setMessage('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success'); setMessage('Signed in! Redirecting...');
                setTimeout(() => router.push('/'), 1000);
            } else {
                setStatus('error'); setMessage(data.error || 'Sign in failed');
            }
        } catch { setStatus('error'); setMessage('Connection error. Try again.'); }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) { setStatus('error'); setMessage('Passwords do not match'); return; }
        if (password.length < 8) { setStatus('error'); setMessage('Password must be at least 8 characters'); return; }
        setStatus('loading'); setMessage('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success'); setMessage('Account created! Please sign in.');
                setTimeout(() => { setTab('signin'); resetForm(); }, 1500);
            } else {
                setStatus('error'); setMessage(data.error || 'Registration failed');
            }
        } catch { setStatus('error'); setMessage('Connection error. Try again.'); }
    };

    return (
        <div className={styles.page}>
            {/* Background glow */}
            <div className={styles.glow} />

            <div className={styles.card}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>&lt;</span>
                    Sky-Dev
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}> /&gt;</span>
                </Link>

                <h1 className={styles.heading}>
                    {tab === 'signin' ? 'Welcome back' : 'Create account'}
                </h1>
                <p className={styles.sub}>
                    {tab === 'signin' ? 'Sign in to access your portfolio dashboard' : 'Join Sky-Dev — connect with me as a client or collaborator'}
                </p>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${tab === 'signin' ? styles.tabActive : ''}`} onClick={() => { setTab('signin'); resetForm(); }}>
                        Sign In
                    </button>
                    <button className={`${styles.tab} ${tab === 'signup' ? styles.tabActive : ''}`} onClick={() => { setTab('signup'); resetForm(); }}>
                        Sign Up
                    </button>
                </div>

                {/* Google Sign In */}
                <button className={styles.googleBtn} onClick={handleGoogleSignIn} id="google-auth-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <div className={styles.divider}><span>or continue manually</span></div>

                {/* Sign In form */}
                {tab === 'signin' && (
                    <form onSubmit={handleSignIn} className={styles.form} id="signin-form">
                        <div className={styles.field}>
                            <label htmlFor="email-in">Email</label>
                            <input id="email-in" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="pass-in">Password</label>
                            <input id="pass-in" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
                        </div>
                        {message && <p className={status === 'success' ? styles.success : styles.error}>{message}</p>}
                        <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }} id="submit-signin">
                            {status === 'loading' ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                )}

                {/* Sign Up form */}
                {tab === 'signup' && (
                    <form onSubmit={handleSignUp} className={styles.form} id="signup-form">
                        <div className={styles.field}>
                            <label htmlFor="name-up">Full Name</label>
                            <input id="name-up" type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="email-up">Email</label>
                            <input id="email-up" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="pass-up">Password</label>
                            <input id="pass-up" type="password" placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="confirm-up">Confirm Password</label>
                            <input id="confirm-up" type="password" placeholder="Repeat password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className={styles.input} />
                        </div>
                        {message && <p className={status === 'success' ? styles.success : styles.error}>{message}</p>}
                        <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }} id="submit-signup">
                            {status === 'loading' ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                )}

                <p className={styles.backLink}>
                    <Link href="/">← Back to portfolio</Link>
                </p>
            </div>
        </div>
    );
}
