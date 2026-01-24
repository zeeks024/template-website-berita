"use client";

import { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';

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

    const max = Math.max(...data, 1);
    const height = 150;

    const dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    const today = new Date().getDay();
    const orderedDays = [...Array(7)].map((_, i) => dayNames[(today - 6 + i + 7) % 7]);

    const totalViews = data.reduce((sum, val) => sum + val, 0);

    if (loading) {
        return (
            <div className="w-full h-[200px] flex items-center justify-center">
                <div className="text-white/40 text-sm animate-pulse">Memuat data...</div>
            </div>
        );
    }

    if (totalViews === 0) {
        return (
            <div className="w-full h-[200px] flex flex-col items-center justify-center text-white/30">
                <BarChart3 size={40} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">Belum ada data pengunjung</p>
                <p className="text-xs mt-1">Data akan muncul setelah ada kunjungan</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[200px] flex flex-col justify-end pt-5">
            <div className="flex justify-between items-end h-full gap-2.5">
                {data.map((val, i) => {
                    const h = (val / max) * height;
                    const isToday = i === 6;
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className="relative w-full group">
                                <div
                                    className={`w-full rounded-t-md transition-all duration-300 ${
                                        isToday 
                                            ? 'bg-gradient-to-t from-cyan-600 to-cyan-400' 
                                            : 'bg-gradient-to-t from-cyan-900 to-cyan-700 opacity-60 group-hover:opacity-100'
                                    }`}
                                    style={{ height: `${Math.max(h, 4)}px` }}
                                />
                                <div className="absolute -top-6 w-full text-center text-xs font-bold text-white">
                                    {val}
                                </div>
                            </div>
                            <div className={`text-[11px] font-medium ${isToday ? 'text-cyan-400' : 'text-white/40'}`}>
                                {orderedDays[i]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
