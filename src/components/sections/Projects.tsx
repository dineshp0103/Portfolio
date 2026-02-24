'use client';

import { useEffect, useRef } from 'react';
import styles from './Projects.module.css';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const projects = [
    {
        id: 'vision',
        name: 'Vision',
        codename: 'Project Vision',
        description:
            'A major AI infrastructure project focused on intelligent automation and real-world AI integration. Currently in active development — stay tuned for the reveal.',
        stack: ['Python', 'AI/ML', 'Cloud', 'System Design'],
        status: 'In Progress',
        statusType: 'yellow',
        github: null,
        live: null,
        emoji: '🔭',
    },
    {
        id: 'xplore',
        name: 'XPlore',
        codename: 'AI Roadmap Generator',
        description:
            'An intelligent roadmap generator that creates personalized learning paths using Google Gemini AI. Features full-stack architecture with auth, real-time progress tracking, and per-node quizzes.',
        stack: ['Next.js', 'TypeScript', 'Python', 'Supabase', 'Gemini AI', 'React Flow'],
        status: 'Live',
        statusType: 'green',
        github: 'https://github.com/Pdinesh0103/Xplore',
        live: 'https://Pdinesh0103.github.io/Xplore',
        emoji: '🗺️',
    },
];

export default function Projects() {
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
        <section id="projects" ref={ref}>
            <div className="section">
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <p className="section-tag reveal">// MY WORK</p>
                    <h2 className="section-title reveal reveal-delay-1">Featured Projects</h2>
                    <p className="section-subtitle reveal reveal-delay-2" style={{ margin: '0 auto' }}>
                        Production-grade applications built with modern stacks, real users, and scalability in mind.
                    </p>
                </div>

                <div className={styles.grid}>
                    {projects.map((p, i) => (
                        <div
                            key={p.id}
                            className={`${styles.card} glass-card reveal`}
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <div className={styles.cardTop}>
                                <span className={styles.emoji}>{p.emoji}</span>
                                <span className={`badge badge-${p.statusType}`}>
                                    <span style={{
                                        width: 6, height: 6, borderRadius: '50%',
                                        background: p.statusType === 'green' ? '#4ade80' : '#facc15',
                                        display: 'inline-block'
                                    }} />
                                    {p.status}
                                </span>
                            </div>

                            <div className={styles.cardBody}>
                                <div className={styles.meta}>
                                    <span className={styles.codename}>{p.codename}</span>
                                </div>
                                <h3 className={styles.name}>{p.name}</h3>
                                <p className={styles.desc}>{p.description}</p>
                            </div>

                            <div className={styles.stack}>
                                {p.stack.map((t) => (
                                    <span key={t} className="badge">{t}</span>
                                ))}
                            </div>

                            <div className={styles.actions}>
                                {p.github && (
                                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-glass">
                                        <FiGithub size={14} /> GitHub
                                    </a>
                                )}
                                {p.live && (
                                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                        <FiExternalLink size={14} /> Live Demo
                                    </a>
                                )}
                                {!p.live && !p.github && (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                        🔒 Coming Soon
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
