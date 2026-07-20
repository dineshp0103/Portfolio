'use client';

import { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

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
                    <h2 className="section-title reveal reveal-delay-1">Projects Portfolio</h2>
                    <p className="section-subtitle reveal reveal-delay-2" style={{ margin: '0 auto' }}>
                        Production-grade applications and AI-driven solutions built with modern technology stacks.
                    </p>
                </div>

                <div className={`${styles.placeholderContainer} reveal reveal-delay-3`}>
                    <div className={`${styles.placeholderCard} glass-card`}>
                        <span className={styles.placeholderEmoji}>🚀</span>
                        <h3 className={styles.placeholderTitle}>Project Showcases Coming Soon</h3>
                        <p className={styles.placeholderDesc}>
                            I am currently restructuring my project portfolio. All production-grade applications, AI integrations, and full-stack solutions will be uploaded by the end of mid 2027.
                        </p>
                        <div className={styles.timelineBadge}>
                            <span className="badge badge-yellow">
                                <span style={{
                                    width: 6, height: 6, borderRadius: '50%',
                                    background: '#facc15', display: 'inline-block',
                                    marginRight: 6
                                }} />
                                Expected upload: Mid 2027
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
