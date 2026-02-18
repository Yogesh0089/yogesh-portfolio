"use client";

import { motion } from 'framer-motion';
import { Shield, Lock, Terminal as TerminalIcon, Globe, Cpu, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Skill {
    id?: number;
    name: string;
    level: number;
    category?: string;
}

const fallbackSkills: Skill[] = [
    { name: 'Red Teaming', level: 90 },
    { name: 'Backend Security', level: 95 },
    { name: 'API Security', level: 85 },
    { name: 'Network Hardening', level: 80 },
    { name: 'AI Security', level: 75 },
];

const iconMap: Record<string, any> = {
    'Red Teaming': Shield,
    'Backend Security': Lock,
    'API Security': TerminalIcon,
    'Network Hardening': Globe,
    'AI Security': Cpu,
    'default': Shield
};

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            const data = await api.get('/skills');
            if (data && data.length > 0) {
                setSkills(data);
            } else {
                setSkills(fallbackSkills);
            }
            setIsLoading(false);
        };
        fetchSkills();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12">
                <Loader2 className="text-cyber-cyan animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {skills.map((skill, index) => {
                const Icon = iconMap[skill.name] || iconMap['default'];
                return (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass p-4 rounded-lg flex flex-col space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Icon size={18} className="text-cyber-green" />
                                <span className="font-mono text-sm">{skill.name}</span>
                            </div>
                            <span className="text-xs text-cyber-cyan font-mono">{skill.level}%</span>
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
                );
            })}
        </div>
    );
}
