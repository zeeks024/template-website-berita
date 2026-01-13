"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@serayu.com' && password === 'admin') {
            localStorage.setItem('serayu_admin_token', 'true');
            // Force reload to trigger Layout check or redirect
            window.location.href = '/admin';
        } else {
            alert('Email atau Password salah! (Hint: admin@serayu.com / admin)');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
            <form onSubmit={handleLogin} className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Login Redaksi</h1>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input-field"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="input-field"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                    />
                </div>

                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>Masuk Dashboard</button>
            </form>
        </div>
    );
}
