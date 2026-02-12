"use client";

import AdminDashboard from '@/components/AdminDashboard';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-cyber-dark pt-16">
            <Navbar />
            <AdminDashboard />
        </div>
    );
}
