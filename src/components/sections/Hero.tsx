'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { FiDownload } from 'react-icons/fi';
import styles from './Hero.module.css';

const roles = [
    'Software Developer',
    'Full-Stack Engineer',
    'AI Enthusiast',
    'Problem Solver',
    'Cloud Explorer',
];

const heroImages = [
    'https://obyqrspjrepujwuctezc.supabase.co/storage/v1/object/public/hero-images/hero1.jpg',
    'https://obyqrspjrepujwuctezc.supabase.co/storage/v1/object/public/hero-images/hero2.jpg',
    'https://obyqrspjrepujwuctezc.supabase.co/storage/v1/object/public/hero-images/hero3.jpg',
];
const N = heroImages.length;
const SLIDE_MS = 600;

export default function Hero() {
    const [roleIdx, setRoleIdx] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [typing, setTyping] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // ── Carousel state ──────────────────────────────────────────────────────
    const [curr, setCurr] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [dir, setDir] = useState<'next' | 'prev'>('next');
    const [sliding, setSliding] = useState(false);

    // Refs to avoid stale closures inside intervals / event listeners
    const currRef = useRef(0);
    const slidingRef = useRef(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const navigate = useCallback((newIdx: number, direction: 'next' | 'prev') => {
        if (slidingRef.current || newIdx === currRef.current) return;
        slidingRef.current = true;
        setSliding(true);
        setDir(direction);
        setPrev(currRef.current);
        setCurr(newIdx);
        currRef.current = newIdx;
        setTimeout(() => {
            setPrev(null);
            setSliding(false);
            slidingRef.current = false;
        }, SLIDE_MS);
    }, []);

    const goNext = useCallback(() => navigate((currRef.current + 1) % N, 'next'), [navigate]);
    const goPrev = useCallback(() => navigate((currRef.current - 1 + N) % N, 'prev'), [navigate]);
    const goTo = useCallback((idx: number) => {
        const direction = idx > currRef.current ? 'next' : 'prev';
        navigate(idx, direction);
    }, [navigate]);

    // Reset auto-advance whenever the user interacts
    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(goNext, 4000);
    }, [goNext]);

    // Start auto-advance on mount
    useEffect(() => {
        resetTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [resetTimer]);

    // ← → Arrow key navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') { goNext(); resetTimer(); }
            if (e.key === 'ArrowLeft') { goPrev(); resetTimer(); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [goNext, goPrev, resetTimer]);

    // Per-image CSS class based on sliding state
    const imgClass = (i: number) => {
        if (i === curr && !sliding) return `${styles.heroImg} ${styles.heroImgVisible}`;
        if (i === curr && sliding) return `${styles.heroImg} ${dir === 'next' ? styles.enterFromRight : styles.enterFromLeft}`;
        if (i === prev && sliding) return `${styles.heroImg} ${dir === 'next' ? styles.exitToLeft : styles.exitToRight}`;
        return styles.heroImg; // hidden
    };

    // ── Typewriter ──────────────────────────────────────────────────────────
    useEffect(() => {
        const current = roles[roleIdx];
        if (typing) {
            if (displayed.length < current.length) {
                const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setTyping(false), 1800);
                return () => clearTimeout(t);
            }
        } else {
            if (displayed.length > 0) {
                const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
                return () => clearTimeout(t);
            } else {
                setRoleIdx((i) => (i + 1) % roles.length);
                setTyping(true);
            }
        }
    }, [displayed, typing, roleIdx]);

    // ── Particle background ─────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animId: number;
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);
        const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.4 + 0.1,
            });
        }
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <section id="home" className={styles.hero}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.gradientTop} />
            <div className={styles.gradientBottom} />

            <div className={styles.content}>
                {/* Text column */}
                <div className={styles.textCol}>
                    <div className="badge reveal" style={{ marginBottom: 24 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                        Open to Internships &amp; Opportunities
                    </div>

                    <h1 className={styles.heading}>
                        <span className={styles.greeting}>Hi, I'm</span>
                        <br />
                        <span className={styles.name}>
                            POLAMARASETTI <br />
                            DINESH
                        </span>
                    </h1>

                    <div className={styles.roleRow}>
                        <span className={styles.rolePrefix}>a </span>
                        <span className={styles.roleName}>{displayed}</span>
                        <span className={styles.cursor}>|</span>
                    </div>

                    <p className={styles.tagline}>
                        Passionate about building efficient, scalable systems and exploring how AI transforms
                        real-world engineering — on Earth and beyond.
                    </p>

                    <div className={styles.cta}>
                        <a href="#projects" className="btn-primary">View My Work</a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
                            <FiDownload size={15} /> Resume
                        </a>
                        <a href="#contact" className="btn-glass">Hire Me</a>
                    </div>

                    <div className={styles.stats}>
                        {[
                            { value: '2+', label: 'Projects' },
                            { value: 'LeetCode', label: 'DSA Active' },
                            { value: '2027', label: 'Google Goal' },
                        ].map(({ value, label }) => (
                            <div key={label} className={styles.stat}>
                                <span className={styles.statVal}>{value}</span>
                                <span className={styles.statLabel}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image carousel column */}
                <div className={styles.imageCol}>
                    <div className={styles.imageFrame} tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowRight') { goNext(); resetTimer(); }
                            if (e.key === 'ArrowLeft') { goPrev(); resetTimer(); }
                        }}
                    >
                        {heroImages.map((src, i) => (
                            <Image
                                key={src}
                                src={src}
                                alt={`Dinesh hero ${i + 1}`}
                                fill
                                className={imgClass(i)}
                                priority={i === 0}
                                sizes="(max-width: 768px) 80vw, 420px"
                                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                            />
                        ))}

                        <div className={styles.imageOverlay} />

                        {/* Prev / Next arrow buttons (visible on hover) */}
                        <button
                            className={`${styles.arrowBtn} ${styles.arrowLeft}`}
                            onClick={() => { goPrev(); resetTimer(); }}
                            aria-label="Previous photo"
                        >&#8249;</button>
                        <button
                            className={`${styles.arrowBtn} ${styles.arrowRight}`}
                            onClick={() => { goNext(); resetTimer(); }}
                            aria-label="Next photo"
                        >&#8250;</button>

                        {/* Dot indicators */}
                        <div className={styles.dots}>
                            {heroImages.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${styles.dot} ${i === curr ? styles.dotActive : ''}`}
                                    onClick={() => { goTo(i); resetTimer(); }}
                                    aria-label={`Go to photo ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Floating glass badge */}
                    <div className={`${styles.floatingBadge} glass`}>
                        <span style={{ fontSize: '1.2rem' }}>🚀</span>
                        <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Sky-Dev</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>@Pdinesh0103</div>
                        </div>
                    </div>

                    {/* Keyboard hint */}
                    <div className={styles.keyHint}>
                        <kbd className={styles.kbd}>←</kbd>
                        <span>slide</span>
                        <kbd className={styles.kbd}>→</kbd>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.scrollMouse} />
                <span>Scroll down</span>
            </div>
        </section>
    );
}
