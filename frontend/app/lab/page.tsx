"use client";

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
