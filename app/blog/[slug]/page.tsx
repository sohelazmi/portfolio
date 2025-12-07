import { getBlogBySlug, getPublishedBlogs } from "@/lib/salesforce";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-900 dark:text-white">
                <h1>404 - Post Not Found</h1>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 py-12 px-4 transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                    <ThemeToggle />
                </div>

                <header className="mb-10 border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                        {post.Name}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mb-4">
                        {post.Summary__c}
                    </p>
                    <time className="text-sm text-slate-500 block">
                        Published: {post.Published_Date__c}
                    </time>
                </header>

                <div
                    className="prose prose-slate dark:prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.Content__c }}
                />
            </div>
        </article>
    );
}

export async function generateStaticParams() {
    const blogs = await getPublishedBlogs();
    return blogs.map((blog) => ({
        slug: blog.Slug__c,
    }));
}
