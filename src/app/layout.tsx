import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'POLAMARASETTI DINESH | Sky-Dev — Software Developer Portfolio',
    description:
        'Full-Stack Developer & AI Enthusiast. Building scalable web apps, exploring cloud tech, and targeting Google SWE Internship 2027.',
    keywords: [
        'POLAMARASETTI DINESH', 'Sky-Dev', 'Software Developer', 'Full Stack', 'React', 'Java', 'Spring Boot', 'AI', 'Portfolio', 'Freelancer'
    ],
    authors: [{ name: 'POLAMARASETTI DINESH' }],
    openGraph: {
        title: 'POLAMARASETTI DINESH | Sky-Dev',
        description: 'Full-Stack Developer & AI Enthusiast Portfolio',
        type: 'website',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
