import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Yogesh Raikwar | Ethical Hacker & Backend Engineer',
    description: 'Elite Cybersecurity Portfolio & Interactive Cyber Range',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
                <script dangerouslySetInnerHTML={{
                    __html: `
                        // Extension Firewall: Suppress non-app errors (like MetaMask/Chrome extension noise)
                        window.addEventListener('unhandledrejection', (event) => {
                            if (event.reason && (
                                event.reason.message?.includes('MetaMask') || 
                                event.reason.message?.includes('extension') ||
                                event.reason.stack?.includes('chrome-extension')
                            )) {
                                event.stopImmediatePropagation();
                                event.preventDefault();
                            }
                        });
                        window.addEventListener('error', (event) => {
                            if (event.filename?.includes('chrome-extension') || event.message?.includes('MetaMask')) {
                                event.stopImmediatePropagation();
                                event.preventDefault();
                            }
                        }, true);
                    `
                }} />
            </head>
            <body className="antialiased selection:bg-cyber-green selection:text-black min-h-screen relative overflow-x-hidden">
                {/* Elite Cyber Overlays */}
                <div className="fixed inset-0 pointer-events-none z-[9999] opacity-20 cyber-grid"></div>
                <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
                    <div className="scanline"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
                </div>

                <main className="relative z-10">
                    {children}
                </main>
            </body>
        </html>
    );
}
