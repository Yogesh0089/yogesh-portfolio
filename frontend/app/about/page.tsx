"use client";

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { 
    Shield, 
    Terminal as TerminalIcon, 
    Cpu, 
    Code, 
    Zap, 
    Search, 
    Layers, 
    Users, 
    Award, 
    Target, 
    Heart,
    ArrowRight,
    Play,
    Download,
    Mail
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-cyber-dark text-white selection:bg-cyber-green selection:text-black font-mono">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-32">
                
                {/* 1. HERO INTRO */}
                <section className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-2 text-cyber-green text-sm"
                    >
                        <TerminalIcon size={16} />
                        <span>$ whoami</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                            I build <span className="text-cyber-green">secure systems</span>,<br />
                            not just applications.
                        </h1>
                        <p className="mt-8 text-xl text-white/60 max-w-3xl font-sans leading-relaxed">
                            Yogesh Raikwar here — a Backend Engineer and Ethical Hacker dedicated to 
                            engineering resilient digital infrastructures. Combining offensive security 
                            prowess with defensive architectural rigor.
                        </p>
                    </motion.div>
                </section>

                {/* 2. WHO I AM */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6 font-sans">
                        <h2 className="text-3xl font-mono font-bold uppercase tracking-widest text-cyber-cyan border-l-4 border-cyber-cyan pl-6">
                            Executive Summary
                        </h2>
                        <div className="space-y-4 text-lg text-white/70 leading-relaxed">
                            <p>
                                Currently pursuing my Computer Science Engineering at LNCT Group of Colleges, 
                                my journey has been defined by a relentless curiosity about how things break—and 
                                the discipline required to fix them.
                            </p>
                            <p>
                                I specialize in building backend ecosystems that are secure by design. My work 
                                involves hands-on cybersecurity research, Python-driven automation, and the 
                                development of hardened APIs that can withstand the scrutiny of modern threat vectors.
                            </p>
                        </div>
                    </div>
                    <div className="glass p-8 rounded-2xl border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Shield size={120} />
                        </div>
                        <h3 className="text-cyber-green font-mono mb-4 text-xs tracking-widest">// CURRENT_FOCUS</h3>
                        <ul className="space-y-4 font-mono text-xs">
                            <li className="flex items-start space-x-3">
                                <span className="text-cyber-green">▶</span>
                                <span>Advanced API Security & JWT Vulnerability Research</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="text-cyber-green">▶</span>
                                <span>AI-Driven Threat Intelligence Automation</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="text-cyber-green">▶</span>
                                <span>Cloud Infrastructure Hardening (AWS)</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 3. SECURITY MINDSET */}
                <section className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-mono font-bold tracking-tighter uppercase">The Tactical Mindset</h2>
                        <div className="h-1 w-24 bg-cyber-green mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Think Like An Attacker",
                                desc: "True defense starts with understanding the exploitation lifecycle. I apply offensive research to build proactive defensive layers.",
                                icon: Target
                            },
                            {
                                title: "Security-First Design",
                                desc: "Security isn't a feature; it's the foundation. Every line of code is evaluated for its impact on the system's attack surface.",
                                icon: Shield
                            },
                            {
                                title: "Human Error Mitigation",
                                desc: "Complexity is the enemy. I use automation to reduce manual configuration risks and ensure consistent security posture.",
                                icon: Cpu
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass p-8 border-white/5 hover:border-cyber-green/30 transition-all group">
                                <item.icon className="text-cyber-green mb-6 group-hover:scale-110 transition-transform" size={40} />
                                <h4 className="text-xl font-mono font-bold mb-4">{item.title}</h4>
                                <p className="text-sm text-white/50 leading-relaxed font-sans">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. TECH STACK (STORY-BASED) */}
                <section className="space-y-16">
                    <h2 className="text-3xl font-mono font-bold text-center">// TECHNICAL_ARSENAL</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            {
                                category: "Backend Engineering",
                                story: "I don't just write code; I architect systems. Using FastAPI and Python, I've developed RESTful APIs optimized for high performance and low latency, ensuring that data integrity is maintained at every node.",
                                icon: Code,
                                tags: ["FastAPI", "Python", "SQLAlchemy", "PostgreSQL"]
                            },
                            {
                                category: "Cybersecurity",
                                story: "My expertise lies in penetration testing and vulnerability assessment. I've spent hundreds of hours in labs analyzing network protocols and auditing authentication flows to identify and patch critical security gaps.",
                                icon: Shield,
                                tags: ["Pentesting", "Metasploit", "Burp Suite", "OWASP"]
                            },
                            {
                                category: "Automation & AI",
                                story: "Efficiency is key. I build custom Python scripts to automate reconnaissance and use applied AI models to predict potential breach patterns, turning data into actionable intelligence.",
                                icon: Zap,
                                tags: ["Python Ops", "Prompt Engineering", "NLP", "Scikit-Learn"]
                            },
                            {
                                category: "Cloud & DevOps",
                                story: "Scalability is nothing without security. I utilize AWS Academy principles to deploy containerized applications that follow the principle of least privilege in cloud environments.",
                                icon: Layers,
                                tags: ["AWS", "Docker", "Linux Admin", "CI/CD"]
                            }
                        ].map((stack, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                                        <stack.icon size={24} />
                                    </div>
                                    <h4 className="text-xl font-mono font-bold">{stack.category}</h4>
                                </div>
                                <p className="text-white/60 font-sans leading-relaxed text-sm">
                                    {stack.story}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {stack.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-cyber-cyan">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. HOW I SOLVE PROBLEMS */}
                <section className="glass p-12 rounded-3xl border-white/5 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-mono font-bold tracking-tighter uppercase whitespace-nowrap">Strategic Execution</h2>
                            <div className="space-y-6">
                                {[
                                    { step: "Problem Identification", desc: "Deep-dive analysis into the operational challenge and its constraints." },
                                    { step: "Threat Modeling", desc: "Analyzing potential attack vectors and security implications before design." },
                                    { step: "Secure Architecture", desc: "Drafting scalable and resilient systems using security-first principles." },
                                    { step: "Tactical Deployment", desc: "Clean, documented, and tested implementation using modern tech stacks." }
                                ].map((step, i) => (
                                    <div key={i} className="flex space-x-4">
                                        <span className="text-cyber-green font-mono font-bold">0{i+1}.</span>
                                        <div>
                                            <h5 className="font-bold uppercase text-[10px] tracking-widest text-cyber-cyan">{step.step}</h5>
                                            <p className="text-xs opacity-50 font-sans mt-1">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-center">
                           <div className="w-64 h-64 border-2 border-cyber-green/20 rounded-full flex items-center justify-center relative animate-spin-slow">
                               <div className="absolute inset-0 border-2 border-t-cyber-green border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
                               <Shield className="text-cyber-green/50 animate-pulse" size={80} />
                           </div>
                        </div>
                    </div>
                </section>

                {/* 6. LEADERSHIP & EXPERIENCE */}
                <section className="space-y-16">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-mono font-bold uppercase tracking-widest text-cyber-cyan">Leadership Ledger</h2>
                        <p className="opacity-40 font-mono text-sm">// MISSION_ROLES</p>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-12 font-sans">
                        {[
                            {
                                role: "Founder & President",
                                org: "LNCT CSE CLUB",
                                desc: "Orchestrated technical workshops and coding competitions for 500+ students. Fostered a community of innovative problem solvers.",
                                icon: Users
                            },
                            {
                                role: "Training & Placement Volunteer",
                                org: "LNCT GROUP",
                                desc: "Coordinating with corporate recruiters and facilitating the carrier bridge for peers, ensuring professional readiness across campus.",
                                icon: Target
                            },
                            {
                                role: "Assistant Contingent Leader",
                                org: "IIT BOMBAY CULTURAL FEST",
                                desc: "Led a cross-disciplinary team of 30+ students during Mood Indigo, managing logistics, communication, and high-pressure situations.",
                                icon: Zap
                            }
                        ].map((exp, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8 items-start p-6 hover:bg-white/5 transition-colors group rounded-xl">
                                <div className="p-4 bg-white/5 text-cyber-green rounded-lg">
                                    <exp.icon size={32} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                        <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                                        <span className="text-[10px] px-2 py-0.5 border border-cyber-green/50 text-cyber-green font-mono uppercase tracking-widest">{exp.org}</span>
                                    </div>
                                    <p className="text-white/60 leading-relaxed text-sm">
                                        {exp.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. CERTIFICATIONS */}
                <section className="space-y-12">
                    <h2 className="text-3xl font-mono font-bold text-center tracking-tighter uppercase italic">Verified Expertise</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            "AWS Academy Cloud Foundations", 
                            "CS50 AI with Python", 
                            "CS50 Cybersecurity", 
                            "Metasploit Mastery", 
                            "Prompt Engineering", 
                            "Blockchain Basics"
                        ].map((cert, i) => (
                            <div key={i} className="glass p-4 text-center border-white/5 flex flex-col items-center justify-center space-y-3 group hover:border-cyber-cyan/30 transition-all">
                                <Award className="text-cyber-cyan/50 group-hover:text-cyber-cyan transition-colors" size={24} />
                                <span className="text-[9px] font-mono uppercase tracking-tighter leading-tight text-white/50 group-hover:text-white">{cert}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 8. CAREER VISION & 9. VALUES */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-24 font-sans">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-mono font-bold flex items-center space-x-2">
                            <Search className="text-cyber-green" size={20} />
                            <span className="uppercase tracking-tighter font-mono">Mission Objective</span>
                        </h2>
                        <p className="text-lg text-white/60 leading-relaxed italic border-l-2 border-cyber-green pl-6 py-2">
                            "I aim to deploy my technical skills in real-world environments where security 
                            integrity and backend logic are critical. My goal is to work with teams 
                            that push the boundaries of what's possible in applied AI and defense-in-depth architecture."
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-mono font-bold flex items-center space-x-2">
                            <Heart className="text-cyber-green" size={20} />
                            <span className="uppercase tracking-tighter font-mono">Core Operating Values</span>
                        </h2>
                        <div className="grid grid-cols-2 gap-6 font-mono text-[10px] tracking-widest uppercase">
                            <div className="space-y-1">
                                <span className="text-cyber-green font-bold">Integrity</span>
                                <p className="opacity-40">Uncompromising standards.</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-cyber-green font-bold">Curiosity</span>
                                <p className="opacity-40">Continuous extraction.</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-cyber-green font-bold">Discipline</span>
                                <p className="opacity-40">Rigorous process.</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-cyber-green font-bold">Growth</span>
                                <p className="opacity-40">Persistent evolution.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 10. CALL TO ACTION */}
                <section className="text-center space-y-12">
                     <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter uppercase">Tactical Connection</h2>
                        <p className="text-white/40 font-mono text-xs tracking-[0.5em] uppercase animate-pulse">Waiting for your command...</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/#projects" className="px-8 py-4 bg-cyber-green text-black font-bold font-mono text-xs flex items-center space-x-2 hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all no-underline">
                            <Layers size={18} />
                            <span>VIEW_PROJECTS</span>
                        </Link>
                        <Link href="/lab" className="px-8 py-4 border border-cyber-cyan text-cyber-cyan font-bold font-mono text-xs flex items-center space-x-2 hover:bg-cyber-cyan/10 transition-all no-underline">
                            <Play size={18} />
                            <span>ENTER_RANGE</span>
                        </Link>
                        <button className="px-8 py-4 border border-white/20 text-white font-bold font-mono text-xs flex items-center space-x-2 hover:bg-white/5 transition-all cursor-pointer">
                            <Download size={18} />
                            <span>RESUME_PDF</span>
                        </button>
                    </div>
                    <div className="pt-12">
                        <Link href="mailto:yogesh@cyber.io" className="text-cyber-green font-mono text-[10px] flex items-center justify-center space-x-2 group no-underline tracking-widest uppercase">
                            <Mail size={14} className="group-hover:translate-x-1 transition-transform" />
                            <span className="group-hover:underline">OPEN_SECURE_CHANNEL: yogesh@cyber.io</span>
                        </Link>
                    </div>
                </section>

                <footer className="text-center opacity-20 font-mono text-[8px] tracking-[1em] uppercase pb-12">
                    Identity Verified // LNCT_S_ID_74229 // System Status: Nominal
                </footer>

            </main>
        </div>
    );
}
