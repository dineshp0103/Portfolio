'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import AuthButton from './AuthButton';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState('home');

    useEffect(() => {
        const handleScroll = () => { setScrolled(window.scrollY > 30); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        setActive(href.replace('#', ''));
    };

    return (
        <>
            <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.container}>
                    {/* Logo */}
                    <Link href="#home" className={styles.logo}>
                        <span className={styles.logoText}>&lt;</span>
                        <span className={styles.logoName}>Sky-Dev</span>
                        <span className={styles.logoText} style={{ color: 'rgba(255,255,255,0.4)' }}> /&gt;</span>
                    </Link>

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

                    {/* Auth + Hamburger */}
                    <div className={styles.actions}>
                        <AuthButton />
                        <button
                            className={styles.hamburger}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <IoClose size={22} /> : <GiHamburgerMenu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className={styles.mobileMenu}>
                        {navLinks.map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                className={styles.mobileLink}
                                onClick={() => handleNavClick(href)}
                            >
                                {label}
                            </a>
                        ))}
                        <div className={styles.mobileAuth}>
                            <AuthButton />
                        </div>
                    </div>
                )}
            </nav>
            {/* Spacer */}
            <div style={{ height: 72 }} />
        </>
    );
}
