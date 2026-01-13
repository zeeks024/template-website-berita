"use client";

import { useEffect, useState } from 'react';

type DailyView = {
    date: string;
    views: number;
};

export default function VisitorChart() {
    const [data, setData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/views')
            .then(res => res.json())
            .then((result: DailyView[]) => {
                if (Array.isArray(result)) {
                    setData(result.map(d => d.views));
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const max = Math.max(...data, 1); // Prevent division by zero
    const height = 150;

    const dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    const today = new Date().getDay();
    // Reorder days so chart ends on today
    const orderedDays = [...Array(7)].map((_, i) => dayNames[(today - 6 + i + 7) % 7]);

    return (
        <div style={{ width: '100%', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingTop: '20px' }}>
            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Memuat data...</div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%', gap: '10px' }}>
                    {data.map((val, i) => {
                        const h = (val / max) * height;
                        return (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div
                                    className="chart-bar"
                                    style={{
                                        width: '100%',
                                        height: `${Math.max(h, 4)}px`,
                                        background: 'linear-gradient(to top, var(--accent-blue), var(--accent-green, #22c55e))',
                                        borderRadius: '6px 6px 0 0',
                                        opacity: 0.8,
                                        position: 'relative',
                                        transition: 'height 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute', top: '-25px', width: '100%', textAlign: 'center',
                                        fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)'
                                    }}>
                                        {val}
                                    </div>
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                    {orderedDays[i]}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}
