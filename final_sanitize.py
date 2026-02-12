import os

# Comprehensive sanitation of all recently created frontend files to remove null bytes/UTF-16 residues
files_to_sanitize = {
    'frontend/app/admin/page.tsx': """"use client";

import AdminDashboard from '@/components/AdminDashboard';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-cyber-dark pt-16">
            <Navbar />
            <AdminDashboard />
        </div>
    );
}
""",
    'frontend/app/abort/page.tsx': """"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AlertCircle, Terminal, Home } from 'lucide-react';

export default function AbortPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-red-600 font-mono flex flex-col items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full border-2 border-red-900 bg-red-950/10 p-8 space-y-8 shadow-[0_0_50px_rgba(153,27,27,0.4)]"
            >
                <div className="flex items-center space-x-4 border-b border-red-900 pb-4">
                    <AlertCircle size={48} className="animate-pulse" />
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter uppercase whitespace-nowrap">Emergency_Abort.sh</h1>
                        <p className="text-xs opacity-50 tracking-widest">CRITICAL SYSTEM OVERRIDE INITIATED</p>
                    </div>
                </div>

                <div className="space-y-4 text-sm leading-relaxed text-red-800">
                    <div className="flex space-x-2">
                        <span className="opacity-40">[0.000000]</span>
                        <span>Shutting down Cyber Intelligence Engine...</span>
                    </div>
                    <div className="flex space-x-2">
                        <span className="opacity-40">[0.041285]</span>
                        <span>Flushing encrypted cache: [SUCCESS]</span>
                    </div>
                    <div className="flex space-x-2">
                        <span className="opacity-40">[0.129994]</span>
                        <span>Severing neural links to external nodes...</span>
                    </div>
                    <div className="flex space-x-2 text-white">
                        <span className="opacity-40">[1.542210]</span>
                        <span>WARNING: Operation cannot be fully undone.</span>
                    </div>
                    <div className="flex space-x-2">
                        <span className="opacity-40">[2.100452]</span>
                        <span>All tactical operations status: ABORTED</span>
                    </div>
                </div>

                <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                        onClick={() => router.push('/')}
                        className="flex items-center justify-center space-x-2 px-6 py-4 border border-red-900 bg-red-900/20 hover:bg-red-900/40 transition-all uppercase font-bold text-red-500"
                    >
                        <Home size={18} />
                        <span>Reboot to Home</span>
                    </button>
                    <button 
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center space-x-2 px-6 py-4 border border-white text-white hover:bg-white/10 transition-all uppercase font-bold"
                    >
                        <Terminal size={18} />
                        <span>Manual Override</span>
                    </button>
                </div>
            </motion.div>
            
            <div className="mt-8 text-[10px] opacity-20 uppercase tracking-[0.5em] text-red-900">
                Secure_Shutdown_Protocol_v9.0.4
            </div>
        </div>
    );
}
""",
    'frontend/app/lab/page.tsx': """"use client";

import Navbar from '@/components/Navbar';
import CTFLab from '@/components/CTFLab';
import { ShieldCheck, Lock } from 'lucide-react';

export default function LabPage() {
    return (
        <div className="min-h-screen bg-cyber-dark text-white pt-24 pb-12 overflow-x-hidden">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 space-y-12">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyber-green/20 pb-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-cyber-green font-mono text-xs tracking-widest uppercase">
                            <Lock size={14} />
                            <span>Authorized Access Only</span>
                        </div>
                        <h1 className="text-5xl font-mono font-bold tracking-tighter">Tactical <span className="text-cyber-green">Range</span></h1>
                        <p className="opacity-50 font-mono text-sm max-w-xl">Welcome to the interactive training environment. Solve the challenges to prove your clearance levels and improve your tactical standing.</p>
                    </div>
                    
                    <div className="flex space-x-4">
                        <div className="glass p-4 rounded-xl border border-white/5 flex flex-col items-center min-w-[120px]">
                            <span className="text-[10px] opacity-50 uppercase tracking-widest mb-1">Current XP</span>
                            <span className="text-2xl font-bold font-mono text-cyber-cyan">0000</span>
                        </div>
                        <div className="glass p-4 rounded-xl border border-white/5 flex flex-col items-center min-w-[120px]">
                            <span className="text-[10px] opacity-50 uppercase tracking-widest mb-1">Rank</span>
                            <span className="text-2xl font-bold font-mono text-cyber-green">T-I</span>
                        </div>
                    </div>
                </header>

                <main className="relative z-10">
                    <CTFLab />
                </main>
                
                <footer className="text-center pt-12">
                     <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest text-cyber-green/40 font-mono">
                        <ShieldCheck size={12} />
                        <span>All actions are performed in a sandboxed mock environment for educational purposes.</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
""",
    'frontend/components/Navbar.tsx': """"use client";

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
                    <button onClick={() => scrollToSection('about')} className="hover:text-cyber-green transition-colors cursor-pointer bg-transparent border-none text-white font-mono">About</button>
                    <button onClick={() => scrollToSection('projects')} className="hover:text-cyber-green transition-colors cursor-pointer bg-transparent border-none text-white font-mono">Operations</button>
                    <Link href="/lab" className="hover:text-cyber-green transition-colors text-cyber-cyan font-bold no-underline">CyberRange</Link>
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
                        <button onClick={() => scrollToSection('about')} className="text-white bg-transparent border-none font-mono">About</button>
                        <button onClick={() => scrollToSection('projects')} className="text-white bg-transparent border-none font-mono">Operations</button>
                        <Link href="/lab" onClick={() => setIsMenuOpen(false)} className="text-cyber-cyan no-underline">CyberRange</Link>
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
""",
    'frontend/components/Terminal.tsx': """"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Terminal({ active = true, onCommand }: { active?: boolean; onCommand?: (cmd: string) => void }) {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([
        'LOG: SYSTEM_BOOT_CORE_v4.2.1 [SUCCESS]',
        'LOG: NEURAL_LINK_ESTABLISHED [STABLE]',
        'LOG: Welcome, Authorized Operator.',
        'LOG: Type "help" to list available subsystem commands.'
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newHistory = [...history, `> ${input}`];
        setHistory(newHistory);

        if (onCommand) {
            onCommand(input.toLowerCase());
        } else {
            processCommand(input.toLowerCase());
        }

        setInput('');
    };

    const processCommand = (cmd: string) => {
        let response = '';
        const command = cmd.trim().toLowerCase();

        switch (command) {
            case 'help':
                response = 'SUBSYSTEM_COMMANDS:\\n  - about     : Display identity manifest\\n  - skills    : Audit technical capabilities\\n  - projects  : List tactical operations\\n  - status    : System integrity check\\n  - lab       : Request CyberRange clearance\\n  - clear     : Flush terminal buffer\\n  - exit      : Initiate session abort';
                break;
            case 'about':
                response = 'IDENTITY_MANIFEST:\\n  Name: Yogesh Raikwar\\n  Role: Lead Backend / Security Architect\\n  Focus: Building systems that are "Hard to break, easy to scale".';
                break;
            case 'skills':
                response = 'CAPABILITY_AUDIT:\\n  Level 1: Python, FastAPI, Security Automation\\n  Level 2: Next.js, React, TypeScript\\n  Level 3: Linux Hardening, JWT/OAuth, Pentesting';
                break;
            case 'projects':
                response = 'TACTICAL_OPERATIONS:\\n  1. AI_PHISH_DETECTOR [DEPLOYED]\\n  2. SECURE_API_GATEWAY [ACTIVE]\\n  3. NETWORK_SENTINEL_SCAN [ALPHA]';
                break;
            case 'status':
                response = 'SYSTEM_INTEGRITY:\\n  Frontend: STABLE (NexJS + Turbopack)\\n  Backend : ONLINE (FastAPI)\\n  Firewall: ACTIVE\\n  AI_GUILD: STANDBY';
                break;
            case 'lab':
                response = 'CLEARANCE_REQUIRED: Navigate to /lab sector or use "ENTER LAB" terminal on central UI.';
                break;
            case 'exit':
                response = 'INITIATING_ABORT: Redirecting to fallback sector...';
                if (typeof window !== "undefined") window.location.href = '/abort';
                break;
            case 'clear':
                setHistory(['LOG: Buffer flushed. Ready for next command.']);
                return;
            default:
                response = `ERROR: Command "${command}" not recognized by kernel. Use "help" for options.`;
        }
        
        setTimeout(() => {
            setHistory(prev => [...prev, response]);
        }, 300);
    };

    return (
        <div className="w-full h-full glass p-4 font-mono text-xs text-cyber-green overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-2 border-b border-cyber-green/20 pb-1">
                <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
                    <span className="text-[10px] opacity-50 uppercase font-mono">Session: TCP_SECURE_NODE_99</span>
                </div>
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-900/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-900/50" />
                    <div className="w-2 h-2 rounded-full bg-green-900/50" />
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 py-2 no-scrollbar scroll-smooth">
                {history.map((line, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className="whitespace-pre-wrap leading-relaxed border-l border-transparent hover:border-cyber-green/20 pl-2 transition-all font-mono"
                    >
                        {line}
                    </motion.div>
                ))}
            </div>

            <form onSubmit={handleCommand} className="mt-2 flex items-center bg-black/20 p-2 rounded">
                <span className="mr-2 text-cyber-cyan font-bold">$</span>
                <input
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-cyber-cyan caret-cyber-green placeholder:opacity-20 font-mono text-xs"
                    placeholder="Input command..."
                    spellCheck={false}
                />
            </form>
        </div>
    );
}
"""
}

for path, content in files_to_sanitize.items():
    directory = os.path.dirname(path)
    if not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Sanitized: {path}")
