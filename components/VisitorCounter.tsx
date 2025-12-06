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
        <div className="flex gap-3 justify-center md:justify-end">
            {/* Metric 1: Total Views */}
            <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border shadow-sm
        bg-slate-100 border-slate-200 text-slate-600 
        dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
            >
                <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{stats.totalViews.toLocaleString()} Views</span>
            </div>

            {/* Metric 2: Unique Visitors */}
            <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border shadow-sm
        bg-slate-100 border-slate-200 text-slate-600 
        dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
            >
                <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{stats.uniqueVisitors.toLocaleString()} Unique</span>
            </div>
        </div>
    );
}