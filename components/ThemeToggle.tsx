"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    // 1. Get 'resolvedTheme' from the hook
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-32 h-8" />;
    }
    
    const isDark = resolvedTheme === "dark";

    return (
        <div className="flex items-center gap-3">
            {/* Light Label */}
            <button
                onClick={() => setTheme("light")}
                className={`text-sm font-bold transition-colors duration-300 ${
                    !isDark
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-400"
                }`}
            >
                Light
            </button>

            {/* The Toggle Switch */}
            <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                    isDark ? "bg-slate-700" : "bg-blue-500"
                }`}
                aria-label="Toggle Theme"
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`pointer-events-none flex items-center justify-center h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                        isDark ? "translate-x-5" : "translate-x-0"
                    }`}
                >
                    {isDark ? (
                        <Moon
                            className="w-3.5 h-3.5 text-blue-600"
                            fill="currentColor"
                        />
                    ) : (
                        <Sun
                            className="w-4 h-4 text-amber-500"
                            fill="currentColor"
                        />
                    )}
                </span>
            </button>

            {/* Dark Label */}
            <button
                onClick={() => setTheme("dark")}
                className={`text-sm font-bold transition-colors duration-300 ${
                    isDark ? "text-slate-900 dark:text-white" : "text-slate-400"
                }`}
            >
                Dark
            </button>
        </div>
    );
}