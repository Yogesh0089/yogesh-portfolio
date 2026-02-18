"use client";

import { motion } from 'framer-motion';
import { Github, ExternalLink, ShieldCheck, Database, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Project {
    id?: number;
    title: string;
    problem: string;
    solution: string;
    stack: string[];
    github: string;
}

const fallbackProjects: Project[] = [
    {
        title: 'Phishing Detection AI',
        problem: 'Increasingly sophisticated phishing emails bypass traditional filters.',
        solution: 'Deep learning model trained on 50k+ samples to detect linguistic patterns of malicious intent.',
        stack: ['Python', 'FastAPI', 'TensorFlow', 'React'],
        github: 'https://github.com/yogesh/phish-detect',
    },
    {
        title: 'Secure API Gateway',
        problem: 'Vulnerable backend endpoints exposed to SQLi and Broken Access Control.',
        solution: 'Custom middleware for RBAC, rate-limiting, and payload sanitization with HSM integration.',
        stack: ['Node.js', 'Express', 'JWT', 'Redis'],
        github: 'https://github.com/yogesh/secure-api',
    },
    {
        title: 'Linux Hardening Script',
        problem: 'Manual server configuration leads to security misconfigurations.',
        solution: 'Automated Bash & Python suite for applying CIS Benchmarks and custom SELinux policies.',
        stack: ['Bash', 'Python', 'SELinux'],
        github: 'https://github.com/yogesh/linux-hardener',
    }
];

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await api.get('/projects');
            if (data && data.length > 0) {
                setProjects(data);
            } else {
                setProjects(fallbackProjects);
            }
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="text-cyber-green animate-spin" size={40} />
                <p className="font-mono text-xs text-cyber-green animate-pulse">DECRYPTING_PROJECT_DATA...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {projects.map((project, index) => (
                <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="glass p-8 rounded-xl border-l-4 border-cyber-green group hover:bg-cyber-green/5 transition-all relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Database size={80} />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                        <div className="space-y-4 flex-1">
                            <div className="flex items-center space-x-2">
                                <ShieldCheck className="text-cyber-green" />
                                <h3 className="text-2xl font-mono font-bold">{project.title}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                <div className="space-y-2">
                                    <span className="text-xs uppercase tracking-widest text-red-500 font-bold">The Problem</span>
                                    <p className="text-sm opacity-80 leading-relaxed">{project.problem}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xs uppercase tracking-widest text-cyber-green font-bold">The Security Solution</span>
                                    <p className="text-sm opacity-80 leading-relaxed">{project.solution}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {(Array.isArray(project.stack) ? project.stack : []).map(tech => (
                                    <span key={tech} className="px-2 py-1 text-[10px] bg-cyber-green/10 text-cyber-green border border-cyber-green/30 rounded font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex md:flex-col gap-4">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:text-cyber-green transition-colors">
                                <Github size={20} />
                            </a>
                            <button className="p-3 glass rounded-full hover:text-cyber-cyan transition-colors">
                                <ExternalLink size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
