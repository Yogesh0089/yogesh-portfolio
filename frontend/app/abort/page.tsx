"use client";

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
