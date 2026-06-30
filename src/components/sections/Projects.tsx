'use client';

import { useEffect, useRef } from 'react';
import { FiFolder } from 'react-icons/fi';

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

                <div className="reveal reveal-delay-3" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="glass-card" style={{ 
                        maxWidth: '500px', 
                        width: '100%',
                        padding: '48px 32px', 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <div style={{ 
                            background: 'rgba(255, 255, 255, 0.05)', 
                            borderRadius: '50%', 
                            width: '64px', 
                            height: '64px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            marginBottom: '8px'
                        }}>
                            <FiFolder size={28} color="rgba(255, 255, 255, 0.7)" />
                        </div>
                        <h3 style={{ 
                            fontFamily: 'var(--font-main)', 
                            fontSize: '1.4rem', 
                            fontWeight: 600, 
                            color: '#fff',
                            margin: 0
                        }}>
                            Projects will be uploaded soon
                        </h3>
                        <p style={{ 
                            fontSize: '0.9rem', 
                            color: 'var(--text-secondary)', 
                            lineHeight: 1.6,
                            margin: 0
                        }}>
                            I'm currently polishing some exciting work to showcase here. Please check back later!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

