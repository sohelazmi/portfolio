export const revalidate = 60;

import Link from "next/link";
import { Github, Linkedin, Cloud, Code, Database } from "lucide-react";
import { getPublishedBlogs, getPortfolioUser } from "@/lib/salesforce";

export default async function Home() {
    const [blogs, user] = await Promise.all([
        getPublishedBlogs(),
        getPortfolioUser(),
    ]);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* 1. Main SECTION */}
                <div className="md:col-span-2 md:row-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-blue-500 transition-colors">
                    <div className="relative z-10">
                        {/* Dynamic Profile Header */}
                        <div className="flex items-center gap-4 mb-6">
                            {/* Profile Image from Salesforce */}
                            {user?.FullPhotoUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={`/api/sf-profile-image?url=${encodeURIComponent(user.FullPhotoUrl)}`}
                                    alt={user.Name}
                                    className="w-20 h-20 rounded-full border-4 border-slate-800 shadow-lg object-cover"
                                />
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    {user?.Name || "Developer"}
                                </h1>
                                <p className="text-blue-400 font-medium">
                                    {user?.Title || "Salesforce Developer"}
                                </p>
                            </div>
                        </div>

                        <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-semibold mb-4">
                            Open to Work
                        </div>

                        {/* Dynamic Bio from "About Me" field */}
                        <p className="text-slate-400 text-lg leading-relaxed">
                            {user?.AboutMe ||
                                "I'm a developer passionate about the Salesforce ecosystem. (Update your 'About Me' in Salesforce to see text here!)"}
                        </p>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <Link
                            href="#contact"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-all"
                        >
                            Contact Me
                        </Link>
                        <a
                            href="https://github.com/sohelazmi"
                            target="_blank"
                            className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sohel-azmi"
                            target="_blank"
                            className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* 2. SKILLS (Bento Box) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Code className="w-5 h-5 text-green-400" /> Core Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Apex",
                            "LWC",
                            "JavaScript",
                            "SOQL",
                            "Flow",
                            "Integration",
                            "SOSL",
                            "Experience Cloud",
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 3. CERTIFICATIONS (Bento Box) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                        <Cloud className="w-5 h-5 text-blue-400" /> Certs
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>{" "}
                            Salesforce Platform Administrator
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>{" "}
                            Salesforce Platform Developer
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>{" "}
                            Salesforce Associate
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>{" "}
                            Salesforce AI Associate
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>{" "}
                            OmniStudio Developer (Planned)
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>{" "}
                            Agentforce Specialist (Planned)
                        </li>
                    </ul>
                </div>

                {/* 4. LATEST BLOG POSTS (Dynamic from Salesforce) */}
                <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Database className="w-5 h-5 text-purple-400" />{" "}
                            Recent Thoughts
                        </h3>
                        <span className="text-xs text-slate-500">
                            {" "}
                            sourced from Salesforce
                        </span>
                    </div>

                    <div className="space-y-4">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <Link
                                    key={blog.Id}
                                    href={`/blog/${blog.Slug__c}`}
                                    className="block group"
                                >
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="text-lg font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                                            {blog.Name}
                                        </h4>
                                        <span className="text-xs text-slate-500">
                                            {blog.Published_Date__c}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400 line-clamp-1">
                                        {blog.Summary__c}
                                    </p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-slate-500">
                                No blogs published yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}