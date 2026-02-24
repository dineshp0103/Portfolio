'use client';

import { useEffect, useRef } from 'react';
import styles from './Skills.module.css';
import {
    SiOpenjdk, SiPython, SiJavascript, SiMysql,
    SiSpring, SiReact, SiHtml5, SiCss3,
    SiMongodb, SiFirebase, SiSupabase,
    SiAmazonwebservices, SiDocker, SiKubernetes, SiCloudflare, SiGithubactions,
    SiGit, SiPostman, SiLinux,
    SiTensorflow, SiPytorch
} from 'react-icons/si';
import { FiDatabase, FiCode, FiCloud, FiCpu, FiLayers, FiTerminal } from 'react-icons/fi';

const skillCategories = [
    {
        icon: <FiCode />,
        category: 'Languages',
        skills: [
            { name: 'Java', icon: <SiOpenjdk /> },
            { name: 'Python', icon: <SiPython /> },
            { name: 'C', icon: <FiTerminal /> },
            { name: 'JavaScript', icon: <SiJavascript /> },
            { name: 'SQL', icon: <FiDatabase /> },
        ],
    },
    {
        icon: <FiLayers />,
        category: 'Web & Frameworks',
        skills: [
            { name: 'Spring Boot', icon: <SiSpring /> },
            { name: 'React.js', icon: <SiReact /> },
            { name: 'HTML5', icon: <SiHtml5 /> },
            { name: 'CSS3', icon: <SiCss3 /> },
            { name: 'REST APIs', icon: <FiCode /> },
        ],
    },
    {
        icon: <FiDatabase />,
        category: 'Database',
        skills: [
            { name: 'MySQL', icon: <SiMysql /> },
            { name: 'MongoDB', icon: <SiMongodb /> },
            { name: 'Supabase', icon: <SiSupabase /> },
            { name: 'Firebase', icon: <SiFirebase /> },
        ],
    },
    {
        icon: <FiCloud />,
        category: 'DevOps & Cloud',
        skills: [
            { name: 'AWS', icon: <SiAmazonwebservices /> },
            { name: 'Docker', icon: <SiDocker /> },
            { name: 'Kubernetes', icon: <SiKubernetes /> },
            { name: 'GitHub Actions', icon: <SiGithubactions /> },
            { name: 'Git', icon: <SiGit /> },
            { name: 'Linux', icon: <SiLinux /> },
            { name: 'Cloudflare ⟶ learning', icon: <SiCloudflare /> },
            { name: 'Postman ⟶ learning', icon: <SiPostman /> },
        ],
    },
    {
        icon: <FiCpu />,
        category: 'CS Fundamentals',
        skills: [
            { name: 'DSA', icon: <FiCode /> },
            { name: 'OOP', icon: <FiCode /> },
            { name: 'OS', icon: <FiCpu /> },
            { name: 'DBMS', icon: <FiDatabase /> },
            { name: 'CN', icon: <FiCloud /> },
            { name: 'System Design', icon: <FiLayers /> },
        ],
    },
    {
        icon: <SiTensorflow />,
        category: 'AI / ML',
        skills: [
            { name: 'Python ML Libs', icon: <SiPython /> },
            { name: 'scikit-learn', icon: <SiPytorch /> },
            { name: 'Model Training', icon: <SiTensorflow /> },
            { name: 'Evaluation', icon: <FiCpu /> },
        ],
    },
];

export default function Skills() {
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
        <section id="skills" ref={ref} style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.02), transparent)' }}>
            <div className="section">
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <p className="section-tag reveal">// TECH STACK</p>
                    <h2 className="section-title reveal reveal-delay-1">Skills &amp; Technologies</h2>
                    <p className="section-subtitle reveal reveal-delay-2" style={{ margin: '0 auto' }}>
                        A curated toolkit spanning languages, frameworks, cloud infra, and AI.
                    </p>
                </div>

                <div className={styles.grid}>
                    {skillCategories.map(({ icon, category, skills }, ci) => (
                        <div key={category} className={`${styles.card} glass-card reveal`} style={{ transitionDelay: `${ci * 0.08}s` }}>
                            <div className={styles.catHeader}>
                                <span className={styles.catIcon}>{icon}</span>
                                <span className={styles.catName}>{category}</span>
                            </div>
                            <div className={styles.pills}>
                                {skills.map(({ name, icon: skillIcon }) => (
                                    <div key={name} className={styles.pill}>
                                        <span className={styles.pillIcon}>{skillIcon}</span>
                                        <span className={styles.pillName}>{name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
