"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, MessageSquare, Terminal as TerminalIcon, Users, Plus, Trash2, Edit2, Check, X, Layout, Code, User, LogOut } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'about' | 'messages' | 'logs'>('overview');
    const [logs, setLogs] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [skills, setSkills] = useState<any[]>([]);
    const [about, setAbout] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Form states
    const [editingProject, setEditingProject] = useState<any>(null);
    const [newSkill, setNewSkill] = useState({ name: '', category: 'Security', level: 90 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [logsRes, msgRes, projRes, skillRes, aboutRes] = await Promise.all([
                api.get('/admin/logs'),
                api.get('/admin/messages'),
                api.get('/general/projects'),
                api.get('/general/skills'),
                api.get('/general/about')
            ]);
            if (logsRes) setLogs(logsRes);
            if (msgRes) setMessages(msgRes);
            if (projRes) setProjects(projRes);
            if (skillRes) setSkills(skillRes);
            if (aboutRes) setAbout(aboutRes);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAbout = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await api.put('/admin/about', about);
        if (res) alert("About section updated!");
    };

    const handleDeleteProject = async (id: number) => {
        if (!confirm("Confirm termination of project record?")) return;
        await api.delete(`/admin/projects/${id}`);
        setProjects(projects.filter(p => p.id !== id));
    };

    const handleAddProject = async () => {
        const dummyProject = {
            title: "New Operation",
            description: "Detailed mission parameters...",
            tech_stack: "Python, Go, Docker",
            github_url: "https://github.com",
            live_url: "https://demo.com"
        };
        const res = await api.post('/admin/projects', dummyProject);
        if (res) setProjects([...projects, res]);
    };

    const handleDeleteSkill = async (id: number) => {
        await api.delete(`/admin/skills/${id}`);
        setSkills(skills.filter(s => s.id !== id));
    };

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await api.post('/admin/skills', newSkill);
        if (res) {
            setSkills([...skills, res]);
            setNewSkill({ name: '', category: 'Security', level: 90 });
        }
    };

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh] text-cyber-green font-mono">
            <div className="animate-pulse">INITIALIZING_SECURE_ACCESS...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-cyber-dark text-cyber-green p-4 md:p-8 font-mono">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-cyber-green/20 pb-4 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase flex items-center gap-3">
                        <TerminalIcon className="text-cyber-green" />
                        Admin Console <span className="text-cyber-cyan">v4.5</span>
                    </h1>
                    <p className="text-[10px] opacity-50 tracking-[0.3em]">SECURE ACCESS AUTHORIZED // OP_YOGESH</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['overview', 'projects', 'skills', 'about', 'messages', 'logs'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-3 py-1 text-[10px] border transition-all uppercase tracking-widest ${activeTab === tab
                                    ? 'bg-cyber-green text-black border-cyber-green'
                                    : 'border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {[
                                { label: 'OPERATIONS', val: projects.length, icon: Layout, color: 'text-cyber-cyan' },
                                { label: 'THREAT_LOGS', val: logs.length, icon: ShieldAlert, color: 'text-red-500' },
                                { label: 'INTEL_REPORTS', val: messages.length, icon: MessageSquare, color: 'text-blue-400' },
                                { label: 'TECH_STACK', val: skills.length, icon: Code, color: 'text-cyber-green' },
                            ].map((stat) => (
                                <div key={stat.label} className="glass p-4 md:p-6 rounded-lg border border-white/5 space-y-2">
                                    <div className="flex justify-between items-center opacity-50">
                                        <span className="text-[10px] tracking-widest">{stat.label}</span>
                                        <stat.icon size={16} />
                                    </div>
                                    <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.val}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Latest Messages */}
                            <div className="glass rounded-xl border border-white/5 flex flex-col h-[400px]">
                                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                    <h3 className="text-xs font-bold flex items-center space-x-2">
                                        <MessageSquare size={14} />
                                        <span>INCOMING_SIGNALS</span>
                                    </h3>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {messages.slice(0, 5).map(m => (
                                        <div key={m.id} className="p-3 border border-white/5 bg-black/30 rounded text-xs space-y-1">
                                            <div className="flex justify-between text-cyber-cyan font-bold">
                                                <span>{m.name}</span>
                                                <span className="opacity-40">{new Date(m.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="opacity-70 line-clamp-2">{m.content}</p>
                                        </div>
                                    ))}
                                    {messages.length === 0 && <div className="text-[10px] opacity-30 text-center py-10 tracking-[0.5em]">NO_SIGNALS_DETECTED</div>}
                                </div>
                            </div>

                            {/* Recent Logs */}
                            <div className="glass rounded-xl border border-white/5 flex flex-col h-[400px]">
                                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                    <h3 className="text-xs font-bold flex items-center space-x-2">
                                        <Activity size={14} />
                                        <span>SYSTEM_RUNTIME_LOGS</span>
                                    </h3>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-[10px]">
                                    {logs.slice(0, 15).map((log, i) => (
                                        <div key={i} className="flex gap-4 border-b border-white/5 pb-1 opacity-70">
                                            <span className="text-white/30">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                                            <span className={`font-bold ${log.level === 'CRITICAL' ? 'text-red-500' : 'text-cyber-green'}`}>{log.event}</span>
                                            <span className="truncate">{log.details}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'projects' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-sm font-bold tracking-widest uppercase">Project_Deployment_Registry</h2>
                            <button onClick={handleAddProject} className="flex items-center gap-2 px-3 py-1 border border-cyber-cyan text-cyber-cyan text-[10px] hover:bg-cyber-cyan/10">
                                <Plus size={14} /> NEW_DEPLOYMENT
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map(p => (
                                <div key={p.id} className="glass p-4 border border-white/5 rounded relative group">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleDeleteProject(p.id)} className="p-1 text-red-500 hover:bg-red-500/10 rounded"><Trash2 size={14} /></button>
                                    </div>
                                    <h3 className="text-cyber-cyan font-bold text-sm mb-1">{p.title}</h3>
                                    <p className="text-[10px] opacity-60 mb-3 line-clamp-2">{p.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {p.tech_stack.split(',').map((t: string) => (
                                            <span key={t} className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/40">{t.trim()}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'skills' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="mb-8 p-6 glass border border-cyber-green/20 rounded-lg">
                            <h3 className="text-xs font-bold mb-4 uppercase tracking-widest">Inject_New_Skill</h3>
                            <form onSubmit={handleAddSkill} className="flex flex-wrap gap-4 items-end">
                                <div className="space-y-1">
                                    <label className="text-[8px] opacity-50">SKILL_NAME</label>
                                    <input
                                        type="text"
                                        value={newSkill.name}
                                        onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                                        className="bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-cyber-green focus:border-cyber-green outline-none w-48"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[8px] opacity-50">CATEGORY</label>
                                    <select
                                        value={newSkill.category}
                                        onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                                        className="bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-cyber-green focus:border-cyber-green outline-none"
                                    >
                                        <option>Security</option>
                                        <option>Backend</option>
                                        <option>Frontend</option>
                                        <option>Core</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[8px] opacity-50">LEVEL_%</label>
                                    <input
                                        type="number"
                                        value={newSkill.level}
                                        onChange={e => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                                        className="bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-cyber-green focus:border-cyber-green outline-none w-20"
                                        min="1" max="100"
                                    />
                                </div>
                                <button type="submit" className="bg-cyber-green text-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                    INJECT
                                </button>
                            </form>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {skills.map(s => (
                                <div key={s.id} className="p-3 border border-white/5 bg-white/2 flex justify-between items-center group">
                                    <div>
                                        <div className="text-[10px] font-bold">{s.name}</div>
                                        <div className="text-[8px] opacity-40">{s.category} // {s.level}%</div>
                                    </div>
                                    <button onClick={() => handleDeleteSkill(s.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'about' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
                        <form onSubmit={handleSaveAbout} className="glass p-8 border border-white/5 rounded-xl space-y-6">
                            <h2 className="text-sm font-bold tracking-widest uppercase border-b border-white/10 pb-2">Manifesto_Configuration</h2>
                            <div className="space-y-2">
                                <label className="text-[10px] opacity-50 block">INTRO_LINE</label>
                                <input
                                    type="text"
                                    value={about?.intro || ''}
                                    onChange={e => setAbout({ ...about, intro: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded px-4 py-2 text-xs text-cyber-green focus:border-cyber-green outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] opacity-50 block">PROFESSIONAL_ROLE</label>
                                <input
                                    type="text"
                                    value={about?.role || ''}
                                    onChange={e => setAbout({ ...about, role: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded px-4 py-2 text-xs text-cyber-green focus:border-cyber-green outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] opacity-50 block">EXPERIENCE_LOGS</label>
                                <textarea
                                    rows={6}
                                    value={about?.experience || ''}
                                    onChange={e => setAbout({ ...about, experience: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded px-4 py-2 text-xs text-cyber-green focus:border-cyber-green outline-none font-mono"
                                />
                            </div>
                            <button type="submit" className="w-full bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan py-3 rounded uppercase font-bold tracking-widest hover:bg-cyber-cyan hover:text-black transition-all">
                                UPDATE_DATABASE
                            </button>
                        </form>
                    </motion.div>
                )}

                {activeTab === 'messages' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h2 className="text-sm font-bold tracking-widest uppercase mb-6">Intercepted_Transmissions</h2>
                        {messages.map(m => (
                            <div key={m.id} className="glass p-6 border border-white/5 rounded-lg space-y-2">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-cyber-cyan font-bold">{m.name}</span>
                                        <span className="text-[10px] opacity-40">&lt;{m.email}&gt;</span>
                                    </div>
                                    <span className="text-[10px] opacity-40">{new Date(m.created_at).toLocaleString()}</span>
                                </div>
                                <p className="text-xs opacity-80 leading-relaxed whitespace-pre-wrap">{m.content}</p>
                            </div>
                        ))}
                        {messages.length === 0 && <div className="text-center py-20 opacity-30 tracking-[0.5em]">NO_SIGNALS_RECORDED</div>}
                    </motion.div>
                )}

                {activeTab === 'logs' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl border border-white/5 flex flex-col h-[70vh]">
                        <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                            <h3 className="text-xs font-bold">SYSTEM_MASTER_LOGS</h3>
                            <button onClick={fetchData} className="text-[10px] text-cyber-cyan hover:underline">REFRESH_SYNC</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-[10px]">
                            {logs.map((log, i) => (
                                <div key={i} className="flex gap-4 border-b border-white/5 pb-2 hover:bg-white/5 transition-colors p-1">
                                    <span className="text-white/30 whitespace-nowrap">{new Date(log.timestamp).toISOString()}</span>
                                    <span className="text-cyber-cyan w-12">{log.level}</span>
                                    <span className={`font-bold w-32 ${log.level === 'CRITICAL' ? 'text-red-500' : 'text-cyber-green'}`}>{log.event}</span>
                                    <span className="opacity-80">{log.details}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
