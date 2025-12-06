"use client";

import { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";

export default function VisitorCounter() {
    const [stats, setStats] = useState<{
        totalViews: number;
        uniqueVisitors: number;
    } | null>(null);

    useEffect(() => {
        let ignore = false;
        const logVisit = async () => {
            try {
                const res = await fetch("/api/analytics", { method: "POST" });
                const data = await res.json();
                if (!ignore && data.totalViews) setStats(data);
            } catch (err) {
                console.error(err);
            }
        };
        logVisit();
        return () => {
            ignore = true;
        };
    }, []);

    if (!stats) return null;

    return (
        <div className="flex gap-3 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-slate-500 text-xs bg-slate-900/50 py-1 px-3 rounded-full border border-slate-800">
                <Eye className="w-3 h-3 text-blue-400" />
                <span>{stats.totalViews.toLocaleString()} Views</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs bg-slate-900/50 py-1 px-3 rounded-full border border-slate-800">
                <Users className="w-3 h-3 text-purple-400" />
                <span>{stats.uniqueVisitors.toLocaleString()} Unique</span>
            </div>
        </div>
    );
}
