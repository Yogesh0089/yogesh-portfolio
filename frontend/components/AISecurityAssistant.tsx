"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { api } from '@/lib/api';

export default function AISecurityAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "SYSTEM: Neural link established. I am Yogesh's AI Guardian. How can I assist your reconnaissance today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Optional Backend Logging (Silent)
        api.post('/messages', { name: 'AI_CHAT_USER', email: 'ai@interact.local', content: `AI Chat: ${input}` });

        // Simulated AI Intelligent Response
        setTimeout(() => {
            let aiContent = "Analyzing tactical data for your query...";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                aiContent = "Greetings, Operator. I am monitoring all sectors. You are cleared for high-level overview of Yogesh's capabilities.";
            } else if (lowerInput.includes('skill')) {
                aiContent = "Yogesh's skill matrix is dominated by FastAPI (Backend), Python (Automation), and Defensive Cybersecurity. He specializes in building 'Unbreakable' APIs.";
            } else if (lowerInput.includes('contact') || lowerInput.includes('hire') || lowerInput.includes('email')) {
                aiContent = "Direct channel: yogesh@cyber-range.io. You can also deploy a message via the 'Contact' section. He is currently looking for Senior Security Research roles.";
            } else if (lowerInput.includes('ctf') || lowerInput.includes('lab') || lowerInput.includes('challenge')) {
                aiContent = "The CyberRange is a sandbox for offensive testing. Try the 'Phishing Header' challenge first. It requires sharp 1337 analysis skills.";
            } else if (lowerInput.includes('abort')) {
                aiContent = "WARNING: Emergency abort protocol detected. If you wish to terminate the session, use the 'Abort' button in the navigation bar.";
            } else if (lowerInput.includes('who are you')) {
                aiContent = "I am a custom Intelligence Agent built by Yogesh to defend this portfolio and guide high-clearance visitors like yourself.";
            } else {
                aiContent = "Tactical Insight: Yogesh often integrates AI models like me into security workflows to automate threat detection and response.";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-cyber-green text-black flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(0,255,65,0.4)] z-[100] hover:scale-110 transition-all group"
            >
                <Bot size={28} className="group-hover:rotate-12 transition-transform" />
                {!isOpen && (
                    <span className="absolute -top-2 -right-2 bg-cyber-cyan text-[8px] font-bold px-1 rounded animate-pulse text-white">LIVE</span>
                )}
            </motion.div>

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
                                <span className="font-mono font-bold text-xs uppercase tracking-tighter">AI_GUARDIAN_PROXIMA v2.1</span>
                            </div>
                            <X className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setIsOpen(false)} />
                        </div>

                        <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 font-mono text-xs custom-scrollbar bg-black/40">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-xl ${m.role === 'user'
                                        ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan'
                                        : 'bg-cyber-dark/80 border border-cyber-green/30 text-cyber-green'
                                        }`}>
                                        <div className="flex items-center space-x-2 mb-1 opacity-50">
                                            {m.role === 'user' ? <span>USER</span> : <span>AI_AUTH</span>}
                                        </div>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-cyber-dark/80 border border-cyber-green/30 text-cyber-green p-3 rounded-xl flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSend} className="p-4 bg-cyber-dark border-t border-cyber-green/10 flex space-x-2">
                            <input
                                type="text"
                                placeholder="Transmit query..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-cyber-green placeholder:text-cyber-green/30 text-xs font-mono"
                            />
                            <button type="submit" className="p-2 hover:bg-cyber-green/10 rounded-lg transition-colors">
                                <Send size={18} className="text-cyber-green" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
