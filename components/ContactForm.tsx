"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to send");

            setStatus("success");
            setFormData({ name: "", email: "", message: "" }); // Reset form

            // Reset success message after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-12 md:py-24">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-12 max-w-3xl mx-auto relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        {"Let's Connect"}
                    </h2>
                    <p className="text-slate-400 mb-8">
                        Have a project in mind or just want to chat Salesforce?
                        Drop me a message below.
                    </p>

                    {status === "success" ? (
                        <div className="bg-green-900/30 border border-green-800 rounded-xl p-8 text-center animate-fade-in">
                            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Message Sent!
                            </h3>
                            <p className="text-slate-300">
                                {"I've received your inquiry in my Salesforce Org."}
                                {"I'll get back to you soon."}
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <textarea
                                placeholder="How can I help you?"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        message: e.target.value,
                                    })
                                }
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />{" "}
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message{" "}
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            {status === "error" && (
                                <p className="text-red-400 text-sm mt-2">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
