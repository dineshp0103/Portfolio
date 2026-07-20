'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';
import styles from './Navbar.module.css';
import { FiHome, FiUser, FiCpu, FiFolder, FiTrendingUp, FiTag, FiMail } from 'react-icons/fi';

const navLinks = [
    { href: '#home', label: 'Home', icon: <FiHome size={20} /> },
    { href: '#about', label: 'About', icon: <FiUser size={20} /> },
    { href: '#skills', label: 'Skills', icon: <FiCpu size={20} /> },
    { href: '#projects', label: 'Projects', icon: <FiFolder size={20} /> },
    { href: '#experience', label: 'Experience', icon: <FiTrendingUp size={20} /> },
    { href: '#pricing', label: 'Pricing', icon: <FiTag size={20} /> },
    { href: '#contact', label: 'Contact', icon: <FiMail size={20} /> },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('home');

    useEffect(() => {
        const handleScroll = () => { setScrolled(window.scrollY > 30); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setActive(href.replace('#', ''));
    };

    return (
        <>
            {/* Top Bar for branding and authentication */}
            <div className={styles.topBar}>
                <Link href="#home" className={styles.logo}>
                    <span className={styles.logoText}>&lt;</span>
                    <span className={styles.logoName}>Sky-Dev</span>
                    <span className={styles.logoText} style={{ color: 'rgba(255,255,255,0.4)' }}> /&gt;</span>
                </Link>
                <div className={styles.topAuth}>
                    <AuthButton />
                </div>
            </div>

            {/* Bottom floating navigation pill */}
            <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.container}>
                    {/* Desktop links */}
                    <ul className={styles.links}>
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className={`${styles.link} ${active === href.replace('#', '') ? styles.linkActive : ''}`}
                                    onClick={() => handleNavClick(href)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile bubble tab bar */}
                    <ul className={styles.mobileTabs}>
                        {navLinks.map(({ href, label, icon }) => {
                            const isActive = active === href.replace('#', '');
                            return (
                                <li key={href}>
                                    <a
                                        href={href}
                                        className={`${styles.mobileTab} ${isActive ? styles.mobileTabActive : ''}`}
                                        onClick={() => handleNavClick(href)}
                                    >
                                        <span className={styles.mobileIcon}>{icon}</span>
                                        {isActive && <span className={styles.mobileLabel}>{label}</span>}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </>
    );
}
