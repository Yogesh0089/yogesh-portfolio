"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Terminal } from 'lucide-react';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString(),
            });

            if (res.ok) {
                // The Cookie is set by the backend with HttpOnly
                router.push('/admin');
            } else {
                setError('ACCESS DENIED: INVALID CREDENTIALS');
            }
        } catch (err) {
            setError('SYSTEM ERROR: UNABLE TO REACH AUTH SERVER');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center font-mono p-4">
            <div className="w-full max-w-md bg-zinc-950 border border-cyber-green/30 p-8 rounded-lg shadow-[0_0_20px_rgba(0,255,65,0.1)] relative overflow-hidden">
                {/* Background Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>

                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-cyber-green/10 rounded-full flex items-center justify-center mb-4 border border-cyber-green/20">
                        <Lock className="text-cyber-green" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-cyber-green uppercase tracking-widest flex items-center gap-2">
                        <Terminal size={20} />
                        Admin_Auth
                    </h1>
                    <p className="text-[10px] text-cyber-green/50 uppercase tracking-[0.3em] mt-2 text-center">
                        SECURE LOGON // AUTHORIZED PERSONNEL ONLY
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-cyber-green/70 uppercase tracking-widest pl-1">Ident_ID</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black border border-cyber-green/30 rounded px-4 py-3 text-cyber-green focus:outline-none focus:border-cyber-green shadow-[inset_0_0_10px_rgba(0,255,65,0.05)]"
                            placeholder="USERNAME"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-cyber-green/70 uppercase tracking-widest pl-1">Cipher_Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-cyber-green/30 rounded px-4 py-3 text-cyber-green focus:outline-none focus:border-cyber-green shadow-[inset_0_0_10px_rgba(0,255,65,0.05)]"
                            placeholder="PASSWORD"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-950/30 border border-red-500/50 p-3 rounded text-red-500 text-[10px] uppercase text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-cyber-green/10 border border-cyber-green text-cyber-green py-3 rounded uppercase font-bold tracking-widest hover:bg-cyber-green hover:text-black transition-all duration-300 disabled:opacity-50"
                    >
                        {isLoading ? 'INITIATING_PROTOCOL...' : 'EXECUTE_LOGIN'}
                    </button>

                    <div className="text-center">
                        <a href="/" className="text-[10px] text-cyber-green/40 hover:text-cyber-green transition-colors uppercase tracking-widest">
                            ← Return to Sector_0
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
