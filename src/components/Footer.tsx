import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.logo}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>&lt;</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>Sky-Dev</span>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}> /&gt;</span>
                </div>
                <p className={styles.copy}>
                    © {new Date().getFullYear()} POLAMARASETTI DINESH · Built with Next.js & ❤️
                </p>
                <div className={styles.socials}>
                    <a href="/api/social/github" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="GitHub">
                        <FiGithub size={18} />
                    </a>
                    <a href="/api/social/linkedin" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn">
                        <FiLinkedin size={18} />
                    </a>
                    <a href="/api/social/twitter" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Twitter">
                        <FiTwitter size={18} />
                    </a>
                    <a href="mailto:dineshpolamarasetti0103@gmail.com" className={styles.social} aria-label="Email">
                        <FiMail size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
