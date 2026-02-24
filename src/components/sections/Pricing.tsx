'use client';

import { useEffect, useRef } from 'react';
import styles from './Pricing.module.css';
import { FiCheck } from 'react-icons/fi';

const plans = [
    {
        name: 'Starter',
        price: '₹2,999',
        tagline: 'Perfect for landing pages',
        badge: null,
        features: [
            'Responsive landing page',
            'Up to 3 sections',
            'Contact form',
            'Basic SEO setup',
            'Mobile-first design',
            '1 revision round',
        ],
        cta: 'Get Started',
        highlighted: false,
    },
    {
        name: 'Pro',
        price: '₹7,999',
        tagline: 'Full-stack web application',
        badge: 'Most Popular',
        features: [
            'Full-stack web app (5 pages)',
            'Authentication (Google/Email)',
            'Database integration',
            'REST API backend',
            'Admin dashboard',
            'Deployment on cloud',
            '3 revision rounds',
            '30-day support',
        ],
        cta: 'Hire Me',
        highlighted: true,
    },
    {
        name: 'Enterprise',
        price: '₹14,999',
        tagline: 'Production-grade systems',
        badge: null,
        features: [
            'Full production application',
            'CI/CD pipeline setup',
            'Cloud deployment (AWS/GCP)',
            'AI/ML feature integration',
            'Docker & Kubernetes',
            'Performance optimization',
            'Unlimited revisions',
            '60-day support',
        ],
        cta: 'Contact Me',
        highlighted: false,
    },
];

export default function Pricing() {
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
        <section id="pricing" ref={ref} style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.02), transparent)' }}>
            <div className="section">
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <p className="section-tag reveal">// FREELANCE</p>
                    <h2 className="section-title reveal reveal-delay-1">Pricing Plans</h2>
                    <p className="section-subtitle reveal reveal-delay-2" style={{ margin: '0 auto' }}>
                        Transparent, flexible pricing for web development and engineering services.
                    </p>
                </div>

                <div className={styles.grid}>
                    {plans.map((plan, i) => (
                        <div
                            key={plan.name}
                            className={`${styles.card} ${plan.highlighted ? styles.highlighted : 'glass-card'} reveal`}
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            {plan.badge && <div className={styles.badge}>{plan.badge}</div>}

                            <div className={styles.header}>
                                <span className={styles.planName}>{plan.name}</span>
                                <span className={styles.tagline}>{plan.tagline}</span>
                                <div className={styles.price}>
                                    <span className={styles.priceVal}>{plan.price}</span>
                                    <span className={styles.priceSub}>/ project</span>
                                </div>
                            </div>

                            <ul className={styles.features}>
                                {plan.features.map((f) => (
                                    <li key={f} className={styles.feature}>
                                        <FiCheck className={styles.check} />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#contact"
                                className={plan.highlighted ? 'btn-primary' : 'btn-outline'}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                {plan.cta}
                            </a>
                        </div>
                    ))}
                </div>

                <p className={styles.note}>
                    💡 Prices are negotiable based on project complexity. All plans include clean code, documentation, and deployment assistance.
                </p>
            </div>
        </section>
    );
}
