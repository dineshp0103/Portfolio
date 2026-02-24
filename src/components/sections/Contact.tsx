'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Contact.module.css';
import { FiSend, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiCode, FiCloud } from 'react-icons/fi';

const SOCIALS = [
    { icon: <FiLinkedin size={18} />, label: 'LinkedIn', sub: 'polamarasetti-dinesh', href: '/api/social/linkedin' },
    { icon: <FiGithub size={18} />, label: 'GitHub', sub: 'dineshp0103', href: '/api/social/github' },
    { icon: <FiCloud size={18} />, label: 'Google Skills', sub: 'Cloud Skill Badges', href: '/api/social/gcloud' },
    { icon: <FiCode size={18} />, label: 'LeetCode', sub: 'dyk_dinesh', href: '/api/social/leetcode' },
    { icon: <FiInstagram size={18} />, label: 'Instagram', sub: 'doyouknow.dinesh', href: '/api/social/instagram' },
    { icon: <FiTwitter size={18} />, label: 'X / Twitter', sub: 'idk__dinesh', href: '/api/social/twitter' },
];

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMsg, setStatusMsg] = useState<{ saved: boolean; emailSent: boolean; error?: string } | null>(null);
    const [qr, setQr] = useState<string | null>(null);
    const [qrLoading, setQrLoading] = useState(true);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        fetch('/api/qr')
            .then((r) => r.json())
            .then((data) => { if (data.qr) setQr(data.qr); })
            .catch(() => { })
            .finally(() => setQrLoading(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setStatusMsg(null);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setStatusMsg({ saved: data.saved ?? false, emailSent: data.emailSent ?? false });
                setForm({ name: '', email: '', message: '' });
                // Auto-reset after 8s
                setTimeout(() => setStatus('idle'), 8000);
            } else {
                setStatus('error');
                setStatusMsg({ saved: false, emailSent: false, error: data.error || 'Something went wrong. Please try again.' });
            }
        } catch {
            setStatus('error');
            setStatusMsg({ saved: false, emailSent: false, error: 'Network error. Check your connection and try again.' });
        }
    };

    return (
        <section id="contact" ref={ref}>
            <div className="section">
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <p className="section-tag reveal">// GET IN TOUCH</p>
                    <h2 className="section-title reveal reveal-delay-1">Let's Work Together</h2>
                    <p className="section-subtitle reveal reveal-delay-2" style={{ margin: '0 auto' }}>
                        Whether you have a project in mind, need a freelancer, or just want to connect — I'm a message away.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Contact form */}
                    <div className={`${styles.formCard} glass-card reveal`}>
                        <h3 className={styles.cardTitle}>Send a Message</h3>
                        <form className={styles.form} onSubmit={handleSubmit} id="contact-form">
                            <div className={styles.field}>
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" placeholder="Your full name"
                                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required className={styles.input} />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder="your@email.com"
                                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required className={styles.input} />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows={5} placeholder="Tell me about your project..."
                                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required className={styles.input} />
                            </div>
                            <button type="submit" className="btn-primary"
                                disabled={status === 'loading' || status === 'success'}
                                style={{ width: '100%', justifyContent: 'center', opacity: status === 'success' ? 0.6 : 1 }}
                                id="submit-contact">
                                {status === 'loading' ? (
                                    <><span className={styles.spinner} />Sending…</>
                                ) : status === 'success' ? (
                                    <><span>✓</span> Sent!</>
                                ) : (
                                    <><FiSend size={14} /> Send Message</>
                                )}
                            </button>

                            {/* Status panel */}
                            {status === 'success' && statusMsg && (
                                <div className={styles.statusPanel}>
                                    <div className={styles.statusRow}>
                                        <span className={styles.statusDot} style={{ background: statusMsg.saved ? '#4ade80' : '#f87171' }} />
                                        <span>{statusMsg.saved ? '✓ Message saved to inbox' : '⚠ Message not saved (DB)'}</span>
                                    </div>
                                    <div className={styles.statusRow}>
                                        <span className={styles.statusDot} style={{ background: statusMsg.emailSent ? '#4ade80' : '#facc15' }} />
                                        <span>{statusMsg.emailSent ? '✓ Email notification delivered' : '⚠ Email not sent (check Resend config)'}</span>
                                    </div>
                                </div>
                            )}
                            {status === 'error' && statusMsg && (
                                <div className={styles.statusPanel} style={{ borderColor: 'rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.06)' }}>
                                    <div className={styles.statusRow}>
                                        <span className={styles.statusDot} style={{ background: '#f87171' }} />
                                        <span>{statusMsg.error}</span>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Right column */}
                    <div className={styles.rightCol}>
                        {/* Socials */}
                        <div className={`${styles.socialsCard} glass-card reveal reveal-delay-1`}>
                            <h3 className={styles.cardTitle}>Connect with Me</h3>
                            <div className={styles.socialLinks}>
                                {SOCIALS.map(({ icon, label, href, sub }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    // Opens via /api/social/* server redirect — actual URL stays hidden
                                    >
                                        <span className={styles.socialIcon}>{icon}</span>
                                        <div>
                                            <div className={styles.socialLabel}>{label}</div>
                                            <div className={styles.socialSub}>{sub}</div>
                                        </div>
                                        <span className={styles.socialArrow}>→</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* UPI QR */}
                        <div className={`${styles.qrCard} glass-card reveal reveal-delay-2`}>
                            <h3 className={styles.cardTitle}>Pay via UPI</h3>
                            <p className={styles.qrNote}>Scan to pay for freelance services</p>
                            <div className={styles.qrWrap}>
                                {qrLoading ? (
                                    <div className={styles.qrPlaceholder}>Generating QR...</div>
                                ) : qr ? (
                                    <Image src={qr} alt="UPI QR Code" width={180} height={180} style={{ borderRadius: 12 }} />
                                ) : (
                                    <div className={styles.qrPlaceholder}>QR not configured yet</div>
                                )}
                            </div>
                            <p className={styles.qrSmall}>UPI ID is encrypted and stored securely server-side</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
