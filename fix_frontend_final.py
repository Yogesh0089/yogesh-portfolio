import os

# Clean, Valid, UTF-8 Frontend Components
frontend_fix = {
    'frontend/components/AISecurityAssistant.tsx': """"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Terminal as TerminalIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function AISecurityAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello, Operator. I am your portfolio intelligence assistant. How can I help you navigate Yogesh's expertise?" }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        setTimeout(() => {
            let aiContent = "I am processing your query based on Yogesh's portfolio data...";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('skill')) {
                aiContent = "Yogesh is highly skilled in Backend Security, FastAPI, and AI-driven automation. He focuses on building robust, scalable, and secure systems.";
            } else if (lowerInput.includes('contact') || lowerInput.includes('hire')) {
                aiContent = "You can contact Yogesh via LinkedIn or the email links in the footer. He is currently open for consulting and full-time cybersecurity roles.";
            } else if (lowerInput.includes('ctf') || lowerInput.includes('lab')) {
                aiContent = "The CTF Lab contains simulated security challenges. You can start by analyzing the Phishing email header in the first challenge.";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
        }, 1000);
    };

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-cyber-green text-black flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(0,255,65,0.4)] z-[100] hover:scale-110 transition-all"
            >
                <Bot size={28} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-24 right-8 w-80 md:w-96 glass rounded-2xl overflow-hidden border border-cyber-green/30 z-[100] shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                    >
                        <div className="bg-cyber-green p-4 flex justify-between items-center text-black">
                            <div className="flex items-center space-x-2">
                                <TerminalIcon size={18} />
                                <span className="font-mono font-bold text-xs uppercase tracking-tighter">AI_SEC_ASSISTANT v1.0</span>
                            </div>
                            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
                        </div>

                        <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 font-mono text-xs">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-xl ${m.role === 'user'
                                            ? 'bg-cyber-cyan/20 border border-cyber-cyan/30 text-cyber-cyan'
                                            : 'bg-cyber-dark/80 border border-cyber-green/30 text-cyber-green'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSend} className="p-4 bg-cyber-dark/50 border-t border-cyber-green/10 flex space-x-2">
                            <input
                                type="text"
                                placeholder="Query system..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-cyber-green placeholder:text-cyber-green/30 text-xs"
                            />
                            <button type="submit">
                                <Send size={18} className="text-cyber-green hover:text-cyber-cyan" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
""",
    'frontend/components/Terminal.tsx': """"use client";

import { useEffect, useState, useRef } from 'react';

export default function Terminal({ active = true, onCommand }: { active?: boolean; onCommand?: (cmd: string) => void }) {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>(['SYSTEM: Connection established.', 'SYSTEM: Welcome, Operator. Type "help" for a list of available commands.']);
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
        switch (cmd) {
            case 'help':
                response = 'Available commands: help, about, skills, projects, clear, contact';
                break;
            case 'about':
                response = 'Yogesh Raikwar: Ethical Hacker & Backend Engineer. Passionate about AI-driven security automation and clean, robust backends.';
                break;
            case 'skills':
                response = 'Languages: Python, JavaScript, TypeScript, SQL\\nBackend: FastAPI, Node.js, Express\\nSecurity: Pentesting, JWT, OAuth, Linux Hardening\\nDatabase: PostgreSQL, MongoDB, Redis';
                break;
            case 'projects':
                response = '1. Phishing Detection (AI)\\n2. Secure API Gateway\\n3. Network Scanner Tool\\nType "projects --list" for details.';
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'contact':
                response = 'Transmission channel open. Send details to: yogesh@cyber-range.io';
                break;
            default:
                response = `Command "${cmd}" not found. Type "help" for options.`;
        }
        setHistory(prev => [...prev, response]);
    };

    return (
        <div className="w-full h-full glass p-4 font-mono text-sm text-cyber-green overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-2 border-b border-cyber-green/20 pb-1">
                <span className="text-[10px] opacity-50">STATION_ID: YOGESH_HQ</span>
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-900/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-900/50" />
                    <div className="w-2 h-2 rounded-full bg-green-900/50" />
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 py-2 no-scrollbar">
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap leading-relaxed">
                        {line}
                    </div>
                ))}
            </div>

            <form onSubmit={handleCommand} className="mt-2 flex items-center">
                <span className="mr-2 text-cyber-cyan">$</span>
                <input
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-cyber-cyan caret-cyber-green"
                    spellCheck={false}
                />
            </form>
        </div>
    );
}
""",
    'frontend/app/page.tsx': """"use client";

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import CyberScene from '@/components/CyberScene';
import Terminal from '@/components/Terminal';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import CTFLab from '@/components/CTFLab';
import AISecurityAssistant from '@/components/AISecurityAssistant';
import { ChevronDown, Shield, Cpu, Activity, Terminal as TerminalIcon, Play } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-cyber-dark text-white selection:bg-cyber-green selection:text-black">
            <Navbar />

            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
                <CyberScene />

                <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-cyber-green font-mono text-sm tracking-[0.5em] mb-2 uppercase">
                            // INITIALIZING SECURE PROTOCOL
                        </h2>
                        <h1 className="text-6xl md:text-8xl font-mono font-bold tracking-tighter mb-4">
                            Yogesh <span className="text-cyber-green">Raikwar</span>
                        </h1>
                        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-xl font-mono opacity-80">
                            <span className="flex items-center space-x-1">
                                <Shield size={18} className="text-cyber-cyan" />
                                <span>Ethical Hacker</span>
                            </span>
                            <span className="opacity-20">|</span>
                            <span className="flex items-center space-x-1">
                                <Cpu size={18} className="text-cyber-cyan" />
                                <span>Backend Engineer</span>
                            </span>
                            <span className="opacity-20">|</span>
                            <span className="flex items-center space-x-1">
                                <Activity size={18} className="text-cyber-cyan" />
                                <span>Cybersecurity & AI</span>
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="w-full max-w-2xl mx-auto h-64 mt-12 shadow-[0_0_50px_rgba(0,255,65,0.15)]"
                    >
                        <Terminal />
                    </motion.div>

                    <div className="flex space-x-6 justify-center mt-12">
                        <button className="px-8 py-3 bg-cyber-green text-black font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] transition-all flex items-center space-x-2 cursor-pointer">
                            <Play size={18} />
                            <span>ENTER LAB</span>
                        </button>
                        <button className="px-8 py-3 border border-cyber-green text-cyber-green font-mono font-bold hover:bg-cyber-green/10 transition-all cursor-pointer">
                            DOWNLOAD_RESUME.pdf
                        </button>
                    </div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10"
                >
                    <ChevronDown size={32} className="text-cyber-green opacity-50" />
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-24 space-y-48">
                <section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-cyber-cyan font-mono text-xs tracking-widest uppercase flex items-center space-x-2">
                                <TerminalIcon size={14} />
                                <span>cat about_identity.txt</span>
                            </h2>
                            <h3 className="text-4xl font-mono font-bold">The Defensive Mindset, Offensive Strategy.</h3>
                        </div>
                        <p className="text-lg opacity-70 leading-relaxed font-light">
                            I build robust backends that are resilient against attacks and design systems that use AI to predict and patch vulnerabilities before they are exploited. My journey in cybersecurity is driven by the mission to make the digital landscape safer for everyone.
                        </p>
                        <div className="flex gap-12">
                            <div>
                                <div className="text-4xl font-mono font-bold text-cyber-green">50+</div>
                                <div className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Labs Defeated</div>
                            </div>
                            <div>
                                <div className="text-4xl font-mono font-bold text-cyber-cyan">15+</div>
                                <div className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Systems Built</div>
                            </div>
                        </div>
                    </div>
                    <Skills />
                </section>

                <section id="projects" className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-cyber-green font-mono text-xs tracking-widest uppercase">/ SECURE_OPERATIONS</h2>
                        <h3 className="text-5xl font-mono font-bold">Tactical Projects</h3>
                    </div>
                    <Projects />
                </section>

                <section id="ctf" className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-cyber-cyan font-mono text-xs tracking-widest uppercase">// VIRTUAL_RANGE_ENVIRONMENT</h2>
                        <h3 className="text-5xl font-mono font-bold">Interactive Challenges</h3>
                        <p className="max-w-2xl mx-auto opacity-60">Test your skills in our simulated environments. No actual systems are harmed during these simulations.</p>
                    </div>
                    <CTFLab />
                </section>

                <footer className="pt-24 pb-12 border-t border-cyber-green/10 text-center space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-mono font-bold">Initiate Connection?</h3>
                        <p className="opacity-50 text-sm max-w-lg mx-auto">Available for consulting on backend architecture, security audits, and AI-cyber integration.</p>
                    </div>
                    <div className="flex justify-center flex-wrap gap-8 font-mono text-sm">
                        <a href="#" className="text-cyber-green hover:underline">LINKEDIN // @yogesh-raikwar</a>
                        <a href="#" className="text-cyber-cyan hover:underline">GITHUB // @yogesh-dev</a>
                        <a href="#" className="text-white hover:underline">EMAIL // yogesh@cyber.io</a>
                    </div>
                    <div className="text-[10px] opacity-20 pt-12">
                        © 2026 YOGESH RAIKWAR // SYSTEM_v4.2 // ALL_RIGHTS_RESERVED
                    </div>
                </footer>
            </div>

            <AISecurityAssistant />
        </div>
    );
}
"""
}

for path, content in frontend_fix.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {path}")
