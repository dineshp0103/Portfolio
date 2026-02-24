'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const goals = [
    'Mastering DSA (LeetCode) to reach Google-level problem-solving',
    'Building production-ready full-stack apps with Java, Spring Boot, React',
    'Learning System Design, clean architecture & scalable patterns',
    'Exploring Machine Learning & AI model development',
    'Deploying projects on AWS / Docker / Kubernetes',
];

export default function About() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.15 }
        );
        const els = ref.current?.querySelectorAll('.reveal');
        els?.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="about" ref={ref}>
            <div className="section">
                <div className={styles.grid}>
                    {/* Image side */}
                    <div className={`${styles.imageWrap} reveal`}>
                        <div className={styles.imageFrame}>
                            <Image
                                src="/images/hero2.jpg"
                                alt="Dinesh about"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                                sizes="(max-width: 768px) 100vw, 440px"
                            />
                            <div className={styles.imageOverlay} />
                        </div>
                        {/* Floating card */}
                        <div className={`${styles.floatCard} glass`}>
                            <span style={{ fontSize: '1.4rem' }}>🎯</span>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Career Goal</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                                    SWE Intern @ Google, 2027
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text side */}
                    <div className={styles.textSide}>
                        <p className={`section-tag reveal`}>// ABOUT ME</p>
                        <h2 className={`section-title reveal reveal-delay-1`}>
                            Who I Am
                        </h2>

                        <p className={`${styles.bio} reveal reveal-delay-2`}>
                            I'm a passionate software developer focused on building{' '}
                            <strong>efficient, reliable, and user-centric applications</strong>. Currently
                            developing expertise in Data Structures &amp; Algorithms, Full-Stack Development, and
                            Cloud Technologies, with a long-term goal of joining top product-based companies like{' '}
                            <strong>Google, Meta, Microsoft, and Amazon</strong>.
                        </p>

                        <p className={`${styles.bio} reveal reveal-delay-2`} style={{ marginTop: 14 }}>
                            I enjoy architecting systems, solving high-impact problems, and exploring how AI can
                            optimize real-world engineering — including my current interest in{' '}
                            <strong>AI-driven structural design for space tech</strong>. 🚀
                        </p>

                        <div className={`${styles.quoteCard} glass reveal reveal-delay-3`}>
                            <span className={styles.quoteIcon}>"</span>
                            <p>
                                A fast learner who enjoys experimenting with new frameworks and turning ideas into
                                real-world projects. I blend creativity with technical problem-solving.
                            </p>
                        </div>

                        <div className={`reveal reveal-delay-4`}>
                            <p className={styles.goalsTitle}>💡 What I'm Working On</p>
                            <ul className={styles.goals}>
                                {goals.map((g) => (
                                    <li key={g} className={styles.goal}>
                                        <span className={styles.goalIcon}>→</span>
                                        {g}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
