import os

# Deep fix for all frontend src files that might be corrupted with UTF-16/null bytes
frontend_src_fix = {
    'frontend/app/layout.tsx': """import React from 'react';
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
      </head>
      <body className="antialiased selection:bg-cyber-green selection:text-black">
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
        </div>
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
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
import { ChevronDown, Shield, Cpu, Activity, Terminal as TerminalIcon } from 'lucide-react';

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
             <button className="px-8 py-3 bg-cyber-green text-black font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] transition-all flex items-center space-x-2">
                <span>ENTER LAB</span>
             </button>
             <button className="px-8 py-3 border border-cyber-green text-cyber-green font-mono font-bold hover:bg-cyber-green/10 transition-all">
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
              I build robust backends that are resilient against attacks and design systems that use AI to predict and patch vulnerabilities before they are exploited.
            </p>
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
          </div>
          <CTFLab />
        </section>
      </div>

      <AISecurityAssistant />
    </div>
  );
}
""",
    'frontend/app/globals.css': """@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --cyber-green: #00ff41;
  --cyber-cyan: #00f3ff;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.glass {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 65, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

@keyframes glitch-anim {
  0% { clip: rect(31px, 9999px, 94px, 0); }
  100% { clip: rect(2px, 9999px, 34px, 0); }
}
"""
}

for path, content in frontend_src_fix.items():
    # Ensure directories exist
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Sanitized {path}")
