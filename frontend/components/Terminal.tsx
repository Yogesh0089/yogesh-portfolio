"use client";

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
                response = 'SUBSYSTEM_COMMANDS:\n  - about     : Display identity manifest\n  - skills    : Audit technical capabilities\n  - projects  : List tactical operations\n  - status    : System integrity check\n  - lab       : Request CyberRange clearance\n  - clear     : Flush terminal buffer\n  - exit      : Initiate session abort';
                break;
            case 'about':
                response = 'IDENTITY_MANIFEST:\n  Name: Yogesh Raikwar\n  Role: Lead Backend / Security Architect\n  Focus: Building systems that are "Hard to break, easy to scale".';
                break;
            case 'skills':
                response = 'CAPABILITY_AUDIT:\n  Level 1: Python, FastAPI, Security Automation\n  Level 2: Next.js, React, TypeScript\n  Level 3: Linux Hardening, JWT/OAuth, Pentesting';
                break;
            case 'projects':
                response = 'TACTICAL_OPERATIONS:\n  1. AI_PHISH_DETECTOR [DEPLOYED]\n  2. SECURE_API_GATEWAY [ACTIVE]\n  3. NETWORK_SENTINEL_SCAN [ALPHA]';
                break;
            case 'status':
                response = 'SYSTEM_INTEGRITY:\n  Frontend: STABLE (NexJS + Turbopack)\n  Backend : ONLINE (FastAPI)\n  Firewall: ACTIVE\n  AI_GUILD: STANDBY';
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
