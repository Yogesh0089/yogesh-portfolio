"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        if (pathname !== '/') {
            router.push(`/#${sectionId}`);
        } else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] glass border-b border-cyber-green/10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 no-underline">
                    <div className="w-8 h-8 flex items-center justify-center border border-cyber-green rounded rotate-45 group hover:bg-cyber-green transition-all duration-300">
                        <span className="text-cyber-green -rotate-45 group-hover:text-black font-bold">Y</span>
                    </div>
                    <span className="font-mono text-lg font-bold tracking-tighter hidden sm:block text-white">
                        YOGESH<span className="text-cyber-green">.LOG</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 font-mono text-[10px] tracking-widest uppercase">
                    <Link href="/about" className="hover:text-cyber-green transition-colors text-white font-mono no-underline">About</Link>
                    <button onClick={() => scrollToSection('projects')} className="hover:text-cyber-green transition-colors cursor-pointer bg-transparent border-none text-white font-mono">Operations</button>
                    <button onClick={() => scrollToSection('lab')} className="hover:text-cyber-green transition-colors cursor-pointer bg-transparent border-none text-white font-mono">Range</button>
                    <button onClick={() => scrollToSection('contact')} className="hover:text-cyber-green transition-colors cursor-pointer bg-transparent border-none text-cyber-cyan font-bold font-mono uppercase tracking-[0.2em]">Connect</button>
                    <Link href="/abort" className="text-red-500 flex items-center space-x-1 hover:text-red-400 group no-underline">
                        <ShieldAlert size={14} className="group-hover:animate-pulse" />
                        <span>Abort</span>
                    </Link>
                    <Link href="/admin" className="px-4 py-1 border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black transition-all no-underline">
                        Admin_Panel
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-cyber-green p-2 bg-transparent border-none">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass border-t border-cyber-green/10">
                    <div className="flex flex-col p-6 space-y-6 font-mono text-sm tracking-widest uppercase items-center">
                        <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-white no-underline font-mono">About</Link>
                        <button onClick={() => scrollToSection('projects')} className="text-white bg-transparent border-none font-mono">Operations</button>
                        <button onClick={() => scrollToSection('lab')} className="text-white bg-transparent border-none font-mono">Range</button>
                        <button onClick={() => scrollToSection('contact')} className="text-cyber-cyan bg-transparent border-none font-mono font-bold">Connect</button>
                        <Link href="/abort" onClick={() => setIsMenuOpen(false)} className="text-red-500 no-underline">Abort_Protocol</Link>
                        <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2 border border-cyber-green text-cyber-green no-underline">
                            Admin_Panel
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
