import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Contact Me | Salesforce Developer",
    description: "Get in touch for Salesforce projects and opportunities.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>
            </div>

            <div className="w-full max-w-3xl">
                {/* We reuse the component we built earlier */}
                <ContactForm />
            </div>
        </main>
    );
}