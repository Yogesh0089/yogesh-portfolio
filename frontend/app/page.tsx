"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import CyberScene from '@/components/CyberScene';
import Terminal from '@/components/Terminal';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import CTFLab from '@/components/CTFLab';
import AISecurityAssistant from '@/components/AISecurityAssistant';
import Link from 'next/link';
import {
    ChevronDown,
    Shield,
    Cpu,
    Activity,
    Terminal as TerminalIcon,
    Play,
    ExternalLink,
    Github,
    Linkedin,
    Mail,
    Zap,
    Lock,
    Eye,
    Globe
} from 'lucide-react';

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-cyber-dark text-white selection:bg-cyber-green selection:text-black font-sans overflow-x-hidden">
            <Navbar />

            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-start lg:justify-center overflow-hidden pt-32 lg:pt-24 border-b border-cyber-green/5">
                <div className="absolute inset-0 z-0">
                    <CyberScene />
                </div>

                {/* Foreground Content */}
                <div className="relative z-10 text-center space-y-8 max-w-5xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyber-green/10 border border-cyber-green/20 rounded-full mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
                            </span>
                            <span className="text-[10px] text-cyber-green font-mono uppercase tracking-[0.3em]">
                                System Status: Operational
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-7xl lg:text-9xl font-mono font-bold tracking-tighter mb-4 glitch-text leading-tight md:leading-none" data-text="Yogesh Raikwar">
                            Yogesh <span className="text-cyber-green">Raikwar</span>
                        </h1>

                        <p className="text-base sm:text-xl md:text-2xl font-mono text-white/60 max-w-2xl mx-auto mb-8 px-4">
                            Ethical Hacker & <span className="text-cyber-cyan border-b border-cyber-cyan/30">Backend Architect</span> specializing in resilient infrastructures.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 text-sm font-mono uppercase tracking-widest opacity-70">
                            <span className="flex items-center space-x-2">
                                <Shield size={16} className="text-cyber-cyan" />
                                <span>Security Analyst</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <Cpu size={16} className="text-cyber-cyan" />
                                <span>Python Ops</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <Activity size={16} className="text-cyber-cyan" />
                                <span>AI Security</span>
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="w-full max-w-3xl mx-auto h-72 mt-8 relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyber-green/20 to-cyber-cyan/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <Terminal />
                    </motion.div>

                    <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
                        <Link href="/lab"
                            style={{ backgroundColor: '#00ff41' }}
                            className="px-10 py-4 text-black font-mono font-bold hover:shadow-[0_0_40px_rgba(0,255,65,0.4)] transition-all flex items-center space-x-3 cursor-pointer no-underline group scale-110"
                        >
                            <Play size={20} className="fill-black group-hover:translate-x-1 transition-transform" />
                            <span>ENTER THE RANGE</span>
                        </Link>
                        <Link href="/about" className="px-10 py-4 border-2 border-white/20 hover:border-cyber-cyan hover:text-cyber-cyan font-mono font-bold transition-all no-underline">
                            EXPLORE_IDENTITY
                        </Link>
                    </div>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 flex flex-col items-center space-y-2 opacity-30"
                >
                    <span className="text-[10px] uppercase tracking-[0.5em] font-mono">Decryption Required</span>
                    <ChevronDown size={24} className="text-cyber-green" />
                </motion.div>
            </section>

            {/* 2. CORE STATS SECTION */}
            <section className="bg-black/50 py-12 border-y border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: "Systems Audited", value: "150+", color: "text-cyber-green" },
                        { label: "CTF Solves", value: "85+", color: "text-cyber-cyan" },
                        { label: "Critical Vulns Found", value: "12", color: "text-red-500" },
                        { label: "Uptime Guaranteed", value: "99.9%", color: "text-white" }
                    ].map((stat, i) => (
                        <div key={stat.label} className="text-center space-y-1">
                            <div className={`text-4xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="text-[10px] uppercase tracking-widest opacity-40">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. ABOUT & SKILLS HYBRID */}
            <section id="about" className="max-w-7xl mx-auto px-4 py-32 space-y-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <div className="space-y-8 sticky top-32">
                        <header className="space-y-4">
                            <h2 className="text-cyber-cyan font-mono text-xs tracking-widest uppercase flex items-center space-x-2">
                                <TerminalIcon size={14} />
                                <span>$ grep -r "mission" identity/</span>
                            </h2>
                            <h3 className="text-5xl md:text-6xl font-mono font-bold tracking-tighter">
                                Defending the <span className="text-cyber-green">unprotected.</span>
                            </h3>
                        </header>
                        <p className="text-xl opacity-60 leading-relaxed font-light font-sans max-w-xl">
                            I am Yogesh Raikwar, a security-obsessed engineer building the next generation of
                            resilient backend architectures. My focus is on the intersection of <span className="text-white border-b border-white/20">AI and Cybersecurity</span>,
                            creating systems that don't just react—they predict.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/about" className="text-cyber-green flex items-center space-x-2 font-mono text-sm group no-underline">
                                <span>READ_FULL_MANIFEST</span>
                                <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Highlight Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            <div className="glass p-6 border-white/5 space-y-3">
                                <Lock size={20} className="text-cyber-green" />
                                <h5 className="font-bold text-sm">Hardening Master</h5>
                                <p className="text-xs opacity-40">Linux kernel security and encrypted storage solutions.</p>
                            </div>
                            <div className="glass p-6 border-white/5 space-y-3">
                                <Eye size={20} className="text-cyber-cyan" />
                                <h5 className="font-bold text-sm">Threat Recon</h5>
                                <p className="text-xs opacity-40">Advanced penetration testing and vulnerability mapping.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="p-1 bg-gradient-to-br from-cyber-green/20 to-cyber-cyan/20 rounded-2xl">
                            <div className="bg-cyber-dark/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5">
                                <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center text-[10px] font-mono opacity-50 uppercase tracking-widest font-mono italic text-white">
                                    <span>Radar_Analysis.sys</span>
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-red-900/50" />
                                        <div className="w-2 h-2 rounded-full bg-cyber-green" />
                                    </div>
                                </div>
                                <Skills />
                            </div>
                        </div>

                        <div className="glass p-8 space-y-4">
                            <h4 className="font-mono text-sm text-cyber-cyan">// COLLABORATION_MODE</h4>
                            <p className="text-sm opacity-50">Currently seeking high-impact opportunities in Cybersecurity Labs or Secure Fintech Startups.</p>
                            <Link href="#contact" className="inline-block px-6 py-2 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono uppercase tracking-widest hover:bg-cyber-cyan/10 transition-all no-underline font-mono">
                                Inquire_Access
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TACTICAL PROJECTS */}
            <section id="projects" className="py-32 bg-black/30 w-full overflow-hidden border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-cyber-green font-mono text-xs tracking-[0.5em] uppercase px-4 inline-block border-l border-r border-cyber-green/30">
                            / SECURE_OPERATIONS
                        </h2>
                        <h3 className="text-4xl md:text-7xl font-mono font-bold tracking-tighter">Tactical Deployment</h3>
                        <p className="max-w-xl mx-auto opacity-50 font-sans px-4">A collection of secure applications and automated security scripts designed for high-stress environments.</p>
                    </div>
                    <Projects />
                    <div className="text-center pt-12">
                        <Link href="https://github.com/yogesh-dev" className="inline-flex items-center space-x-3 text-white/40 hover:text-white transition-colors font-mono text-xs tracking-widest no-underline group">
                            <Github size={20} />
                            <span>VIEW_EXTENDED_REPOSITORY [LINKOUT]</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. INTERACTIVE CTF LAB (PEAK ENGAGEMENT) */}
            <section id="lab" className="max-w-7xl mx-auto px-4 py-32 space-y-20 relative">
                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-cyber-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-cyber-green/10 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="text-center space-y-6 relative z-10">
                    <div className="inline-flex items-center space-x-2 text-cyber-cyan font-mono text-xs uppercase tracking-widest">
                        <Globe size={14} className="animate-spin-slow" />
                        <span>// VIRTUAL_RANGE_ENVIRONMENT</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter px-4">Interactive Challenges</h3>
                    <p className="max-w-3xl mx-auto opacity-60 text-base md:text-lg px-6">
                        Think you have what it takes? Decrypt signals, audit tokens, and solve puzzles to prove your clearance levels.
                    </p>
                </div>

                <div className="relative z-10">
                    <CTFLab />
                </div>

                <div className="text-center py-10">
                    <Link href="/lab" className="text-cyber-green font-mono text-[10px] tracking-[0.5em] uppercase hover:underline no-underline">
                        Launch Full Screen Sector Explorer
                    </Link>
                </div>
            </section>

            {/* 6. CONTACT & FOOTER */}
            <section id="contact" className="relative py-32 bg-gradient-to-b from-transparent to-cyber-green/5">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter uppercase leading-none">
                                Open <br /> <span className="text-cyber-green">Secure Channel</span>
                            </h2>
                            <p className="opacity-50 text-xl font-sans leading-relaxed">
                                I'm always open to discussing new tactical missions, complex systems,
                                and collaborative security operations.
                            </p>
                        </div>

                        <div className="flex flex-col space-y-6">
                            <a href="mailto:yogesh@cyber.io" className="flex items-center space-x-6 group no-underline text-white">
                                <div className="p-4 bg-white/5 border border-white/10 text-cyber-green group-hover:bg-cyber-green group-hover:text-black transition-all">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase tracking-widest opacity-40 font-mono">Priority Mail</span>
                                    <span className="text-xl font-mono">yogesh@cyber.io</span>
                                </div>
                            </a>
                            <a href="#" className="flex items-center space-x-6 group no-underline text-white">
                                <div className="p-4 bg-white/5 border border-white/10 text-cyber-cyan group-hover:bg-cyber-cyan group-hover:text-black transition-all">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase tracking-widest opacity-40 font-mono">Connect Professional</span>
                                    <span className="text-xl font-mono">linkedin.com/in/yogesh</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-12 text-right">
                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-mono italic text-white">Digital Pulse</h4>
                            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyber-green/50 to-cyber-green" />
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                            <div className="space-y-2">
                                <span className="block text-2xl font-bold font-mono text-white">Bhopal, IN</span>
                                <span className="block text-[10px] uppercase opacity-30 font-mono tracking-widest">Operation Base</span>
                            </div>
                            <div className="space-y-2">
                                <span className="block text-2xl font-bold font-mono text-white">GMT+5:30</span>
                                <span className="block text-[10px] uppercase opacity-30 font-mono tracking-widest">Active Timezone</span>
                            </div>
                        </div>

                        <div className="pt-20">
                            <div className="text-[10px] opacity-20 font-mono tracking-[1em] uppercase mb-4 text-white">All Signals Encryption Active</div>
                            <p className="text-[9px] opacity-10 uppercase tracking-widest font-mono text-white">
                                © 2026 Yogesh Raikwar // LNCT GROUP // SYSTEM_SECURE_v4.2.1
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Intelligence Assistant */}
            <AISecurityAssistant />
        </div>
    );
}
