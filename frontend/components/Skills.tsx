"use client";

import { motion } from 'framer-motion';
import { Shield, Lock, Terminal as TerminalIcon, Globe, Cpu } from 'lucide-react';

const skills = [
    { name: 'Red Teaming', level: 90, icon: Shield },
    { name: 'Backend Security', level: 95, icon: Lock },
    { name: 'API Security', level: 85, icon: TerminalIcon },
    { name: 'Network Hardening', level: 80, icon: Globe },
    { name: 'AI Security', level: 75, icon: Cpu },
];

export default function Skills() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {skills.map((skill, index) => (
                <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-4 rounded-lg flex flex-col space-y-2"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <skill.icon size={18} className="text-cyber-green" />
                            <span className="font-mono text-sm">{skill.name}</span>
                        </div>
                        <span className="text-xs text-cyber-cyan">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-cyber-dark/50 rounded-full overflow-hidden border border-cyber-green/20">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
