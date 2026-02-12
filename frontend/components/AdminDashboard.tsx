"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, MessageSquare, Terminal as TerminalIcon, Users } from 'lucide-react';

export default function AdminDashboard() {
    const [logs, setLogs] = useState<any[]>([]);
    const [stats, setStats] = useState({
        visitors: 1242,
        threats: 84,
        messages: 12,
        ctfCompletions: 45
    });

    // Simulated log data
    const initialLogs = [
        { id: 1, event: 'AUTH_SUCCESS', details: 'Admin login from 192.168.1.1', level: 'INFO', time: '2m ago' },
        { id: 2, event: 'SQLI_ATTEMPT', details: 'Detected on /api/login (sanitized)', level: 'CRITICAL', time: '5m ago' },
        { id: 3, event: 'CTF_SOLVED', details: 'User anonymous solved "JWT Vulnerability"', level: 'WARNING', time: '12m ago' },
        { id: 4, event: 'SIGNAL_RECEIVED', details: 'New contact message from recruiter@tech.com', level: 'INFO', time: '1h ago' },
    ];

    return (
        <div className="min-h-screen bg-cyber-dark text-cyber-green p-8 font-mono">
            <div className="flex justify-between items-center mb-12 border-b border-cyber-green/20 pb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter uppercase">Admin Console <span className="text-cyber-cyan">v4.0</span></h1>
                    <p className="text-[10px] opacity-50 tracking-[0.3em]">SECURE ACCESS AUTHORIZED // OP_YOGESH</p>
                </div>
                <div className="flex space-x-4">
                    <button className="px-4 py-2 glass border border-red-900 text-red-500 hover:bg-red-900/20 text-xs">TERMINATE_SESSION</button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'VISITORS', val: stats.visitors, icon: Users, color: 'text-cyber-cyan' },
                    { label: 'THREAT_ALERTS', val: stats.threats, icon: ShieldAlert, color: 'text-red-500' },
                    { label: 'MESSAGES', val: stats.messages, icon: MessageSquare, color: 'text-blue-400' },
                    { label: 'RANGE_SOLVES', val: stats.ctfCompletions, icon: Activity, color: 'text-cyber-green' },
                ].map((stat) => (
                    <div key={stat.label} className="glass p-6 rounded-lg border border-white/5 space-y-2">
                        <div className="flex justify-between items-center opacity-50">
                            <span className="text-[10px] tracking-widest">{stat.label}</span>
                            <stat.icon size={16} />
                        </div>
                        <div className={`text-3xl font-bold ${stat.color}`}>{stat.val}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Real-time Logs */}
                <div className="lg:col-span-2 glass rounded-xl border border-white/5 flex flex-col h-[500px]">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <h3 className="text-sm font-bold flex items-center space-x-2">
                            <TerminalIcon size={16} />
                            <span>SYSTEM_LIVE_LOGS</span>
                        </h3>
                        <span className="text-[10px] bg-green-900/30 text-cyber-green px-2 py-0.5 rounded animate-pulse text-xs">NODE_ONLINE</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
                        {initialLogs.map(log => (
                            <div key={log.id} className="flex items-start space-x-4 p-2 border-b border-white/5 hover:bg-white/5 transition-colors">
                                <span className="opacity-30 whitespace-nowrap">[{log.time}]</span>
                                <span className={`font-bold w-24 ${log.level === 'CRITICAL' ? 'text-red-500' :
                                        log.level === 'WARNING' ? 'text-yellow-500' : 'text-cyber-cyan'
                                    }`}>{log.event}</span>
                                <span className="opacity-70">{log.details}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Intelligence / Settings */}
                <div className="glass rounded-xl border border-white/5 p-6 space-y-8">
                    <h3 className="text-sm font-bold border-b border-white/10 pb-2 uppercase tracking-widest">Global Overrides</h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs">HACKER_MODE_FORCED</span>
                            <input type="checkbox" className="toggle" />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs">LAB_ACCESS_ACTIVE</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs">AI_ASSISTANT_THROTTLE</span>
                            <input type="checkbox" className="toggle" />
                        </div>
                    </div>

                    <div className="pt-8 space-y-4">
                        <h3 className="text-sm font-bold border-b border-white/10 pb-2 uppercase tracking-widest">Active Alerts</h3>
                        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded text-xs text-red-400">
                            <div className="flex items-center space-x-2 mb-2">
                                <ShieldAlert size={14} />
                                <span className="font-bold">SUSPICIOUS_NODE_DETECTED</span>
                            </div>
                            Multiple failed login attempts from IP 42.12.8.10. Protocol automatic block initiated.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
