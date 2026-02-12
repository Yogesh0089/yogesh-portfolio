"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Play, AlertTriangle, CheckCircle2, Cpu } from 'lucide-react';
import { api } from '@/lib/api';

const challenges = [
    {
        id: 'web-1',
        title: 'Phishing Analysis',
        difficulty: 'Easy',
        type: 'Web',
        description: 'Inspect a suspicious email header and find the hidden tracking token.',
        hint: 'Look for custom X-Headers representing origin IDs.',
        flag: 'CTF{X_ORIGIN_TRACKER_001}',
    },
    {
        id: 'api-1',
        title: 'JWT Vulnerability',
        difficulty: 'Medium',
        type: 'API',
        description: 'Decode the provided JWT and manipulate the "role" claim to gain admin access.',
        hint: 'Base64 decode is your friend. Check the algorithm (None vulnerability).',
        flag: 'CTF{JWT_ROLE_ESCALATION_PWNED}',
    },
    {
        id: 'linux-1',
        title: 'Permission Exploit',
        difficulty: 'Hard',
        type: 'Linux',
        description: 'A misconfigured SUID binary allows arbitrary file reads. Read /root/flag.txt.',
        hint: 'Search for binaries with the +s bit set.',
        flag: 'CTF{SUID_ROOT_SHELL_MAGIC}',
    }
];

export default function CTFLab() {
    const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const [solved, setSolved] = useState<string[]>([]);
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const challenge = challenges.find(c => c.id === activeChallenge);
        if (challenge && userInput.trim() === challenge.flag) {
            setIsSubmitting(true);

            // Real Backend Logging
            await api.post('/ctf-completions', {
                challenge_id: challenge.id,
                username: "Anonymous_Hacker"
            });

            setSolved(prev => [...prev, challenge.id]);
            setError(false);
            setUserInput('');
            setIsSubmitting(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="glass rounded-2xl p-8 border border-cyber-cyan/30 shadow-[0_0_40px_rgba(0,243,255,0.1)]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-cyber-cyan/10 rounded-lg border border-cyber-cyan/20">
                        <Cpu className="text-cyber-cyan animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-mono font-bold text-cyber-cyan uppercase tracking-tighter">Cyber_Range.v2</h2>
                        <p className="text-[10px] opacity-60 tracking-[0.4em] uppercase">Simulated Signal Extraction Lab</p>
                    </div>
                </div>
                <div className="flex space-x-6 text-[10px] font-mono uppercase tracking-widest">
                    <div className="flex flex-col items-end">
                        <span className="opacity-40">Solves</span>
                        <span className="text-cyber-green text-lg font-bold">{solved.length}/{challenges.length}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {challenges.map((challenge) => (
                    <motion.div
                        key={challenge.id}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveChallenge(challenge.id)}
                        className={`cursor-pointer p-6 rounded-xl border relative overflow-hidden transition-all duration-300 ${activeChallenge === challenge.id
                            ? 'bg-cyber-cyan/10 border-cyber-cyan shadow-[0_0_30px_rgba(0,243,255,0.3)]'
                            : 'glass border-white/5 hover:border-cyber-cyan/40 group'
                            }`}
                    >
                        {solved.includes(challenge.id) && (
                            <div className="absolute top-2 right-2">
                                <CheckCircle2 size={18} className="text-cyber-green drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
                            </div>
                        )}

                        <div className="flex items-center space-x-2 mb-4">
                            {solved.includes(challenge.id) ? <Unlock size={14} className="text-cyber-green" /> : <Lock size={14} className="opacity-20" />}
                            <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border tracking-widest ${challenge.difficulty === 'Easy' ? 'border-green-500/50 text-green-500' :
                                challenge.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-500' :
                                    'border-red-500/50 text-red-500'
                                }`}>
                                {challenge.difficulty}
                            </span>
                        </div>

                        <h4 className="font-mono font-bold text-lg mb-1 group-hover:text-cyber-cyan transition-colors">{challenge.title}</h4>
                        <p className="text-[10px] opacity-40 mb-4 font-mono">{challenge.type} VECTOR</p>

                        <div className="flex justify-between items-center mt-auto">
                            <span className="text-[10px] opacity-20 font-mono italic">UID: {challenge.id}</span>
                            <Play size={16} className={activeChallenge === challenge.id ? 'text-cyber-cyan' : 'opacity-10 group-hover:opacity-40'} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeChallenge && (
                    <motion.div
                        key={activeChallenge}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-12 p-8 border-t border-cyber-cyan/20 overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-mono font-bold flex items-center space-x-3 text-cyber-cyan uppercase tracking-tighter">
                                        <AlertTriangle size={24} />
                                        <span>Mission: Objective_Data</span>
                                    </h3>
                                    <div className="p-6 bg-black/40 border border-white/5 rounded-lg">
                                        <p className="text-sm leading-relaxed opacity-80 font-mono">
                                            {challenges.find(c => c.id === activeChallenge)?.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 bg-cyber-green/5 border border-cyber-green/20 rounded-lg relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyber-green/40"></div>
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-cyber-green">Encrypted Intelligence (Hint)</span>
                                    <p className="text-xs mt-2 opacity-60 font-mono italic">
                                        {challenges.find(c => c.id === activeChallenge)?.hint}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {solved.includes(activeChallenge) ? (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-center space-y-6"
                                        >
                                            <div className="inline-block p-6 rounded-full bg-cyber-green/20 text-cyber-green mb-2 border border-cyber-green/40">
                                                <CheckCircle2 size={64} />
                                            </div>
                                            <div>
                                                <h4 className="text-3xl font-mono font-bold text-cyber-green uppercase tracking-tighter">Breach_Successful</h4>
                                                <p className="text-sm opacity-50 mt-2 font-mono uppercase tracking-widest text-xs">Flag valid // Session Logged</p>
                                            </div>
                                            <button
                                                onClick={() => setActiveChallenge(null)}
                                                className="px-6 py-2 border border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 transition-all text-[10px] uppercase font-bold tracking-widest"
                                            >
                                                Return to Menu
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-4">
                                                <label className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-mono block">Submit Extracted Signal (Flag)</label>
                                                <div className="relative">
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        placeholder="CTF{INTEGRITY_CHECK}"
                                                        value={userInput}
                                                        onChange={(e) => setUserInput(e.target.value)}
                                                        className={`w-full bg-black/40 border-2 font-mono p-5 text-lg outline-none transition-all rounded-lg ${error ? 'border-red-500 text-red-500 animate-shake' : 'border-cyber-cyan/30 focus:border-cyber-cyan shadow-[inset_0_0_15px_rgba(0,243,255,0.05)]'
                                                            }`}
                                                    />
                                                    <div className={`absolute bottom-0 left-0 h-1 bg-cyber-cyan transition-all duration-300 ${isSubmitting ? 'w-full active-scan' : 'w-0'}`}></div>
                                                </div>
                                            </div>
                                            <button
                                                disabled={isSubmitting}
                                                type="submit"
                                                className="w-full py-5 bg-cyber-cyan text-black font-mono font-bold hover:bg-white transition-all shadow-[0_10px_30px_rgba(0,243,255,0.3)] uppercase tracking-widest flex items-center justify-center space-x-3 disabled:opacity-50"
                                            >
                                                {isSubmitting ? (
                                                    <span className="animate-pulse">DECRYPTING...</span>
                                                ) : (
                                                    <>
                                                        <Unlock size={20} />
                                                        <span>INITIALIZE_DECRYPTION</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
