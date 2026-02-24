'use client';

import { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

const timeline = [
    {
        year: '2024',
        title: 'Started CS @ Raghu Engineering College',
        desc: 'Began Bachelor of Engineering in Computer Science at Raghu Engineering College since 2024. Building a strong foundation in C, Java, DSA, and core CS subjects.',
        emoji: '🎓',
        done: true,
    },
    {
        year: '2024-25',
        title: 'AI-Driven Full-Stack Development',
        desc: 'Building AI-driven full-stack websites using Vibe Coding with strong knowledge in debugging and modern web architecture. Mastered Spring Boot, REST APIs, React.js, MySQL, and production deployment.',
        emoji: '💻',
        done: true,
    },
    {
        year: '2025',
        title: 'Cloud & AI Exploration',
        desc: 'Learned Docker, Kubernetes, AWS. Built XPlore (AI Roadmap Generator) with Gemini API. Started ML/AI journey.',
        emoji: '🤖',
        done: true,
    },
    {
        year: '2025-26',
        title: 'Project Vision (Active)',
        desc: 'Working on major AI infrastructure project. Deepening expertise in system design, scalable patterns, and DevOps.',
        emoji: '🔭',
        done: false,
        active: true,
    },
    {
        year: '2027-28',
        title: 'Cracking GATE Exam',
        desc: 'Target: Crack GATE 2027/28 with a top rank. Focused on mastering core CS subjects, aptitude, and problem-solving skills.',
        emoji: '📝',
        done: false,
        goal: true,
    },
    {
        year: '2028-29',
        title: 'Step into Top IITs',
        desc: 'Secure admission to a top IIT for M.Tech / research. Elevate expertise through world-class academics and cutting-edge projects.',
        emoji: '🏛️',
        done: false,
        goal: true,
    },
    {
        year: '2029-30',
        title: 'Placed in Google',
        desc: 'Final career goal: Get placed at Google as a Software Engineer. Combining IIT pedigree with hands-on full-stack & AI engineering experience.',
        emoji: '🎯',
        done: false,
        goal: true,
    },
];

export default function Experience() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="experience" ref={ref} style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.02), transparent)' }}>
            <div className="section">
                <div style={{ textAlign: 'center', marginBottom: 70 }}>
                    <p className="section-tag reveal">// JOURNEY</p>
                    <h2 className="section-title reveal reveal-delay-1">Experience &amp; Goals</h2>
                    <p className="section-subtitle reveal reveal-delay-2" style={{ margin: '0 auto' }}>
                        From first lines of code to GATE → IITs → Google — a roadmap in progress.
                    </p>
                </div>

                <div className={styles.timeline}>
                    {timeline.map((item, i) => (
                        <div
                            key={item.year}
                            className={`${styles.item} reveal`}
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <div className={styles.left}>
                                <span className={styles.year}>{item.year}</span>
                            </div>
                            <div className={styles.connector}>
                                <div className={`${styles.dot} ${item.active ? styles.dotActive : ''} ${item.goal ? styles.dotGoal : ''} ${item.done ? styles.dotDone : ''}`} />
                                {i < timeline.length - 1 && <div className={styles.line} />}
                            </div>
                            <div className={`${styles.card} glass-card`}>
                                <div className={styles.cardTop}>
                                    <span className={styles.emoji}>{item.emoji}</span>
                                    {item.active && <span className="badge badge-green"><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} /> Active</span>}
                                    {item.goal && <span className="badge badge-yellow"><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#facc15', display: 'inline-block' }} /> Goal</span>}
                                    {item.done && <span className="badge">✓ Done</span>}
                                </div>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDesc}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
