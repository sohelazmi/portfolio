import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
    title: "Contact Me | Salesforce Developer",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 p-4 md:p-8 font-sans flex flex-col items-center justify-center transition-colors duration-300">
            {/* Header Row */}
            <div className="w-full max-w-3xl mb-8 flex justify-between items-center">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>
                <ThemeToggle />
            </div>

            <div className="w-full max-w-3xl">
                <ContactForm />
            </div>
        </main>
    );
}
