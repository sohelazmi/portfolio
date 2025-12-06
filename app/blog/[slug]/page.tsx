export const revalidate = 60;

import { getBlogBySlug, getPublishedBlogs } from '@/lib/salesforce';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h1>404 - Post Not Found</h1>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-400 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <header className="mb-10 border-b border-slate-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.Name}</h1>
          <p className="text-slate-400 text-lg mb-4">{post.Summary__c}</p>
          <time className="text-sm text-slate-500 block">Published: {post.Published_Date__c}</time>
        </header>

        {/* Using dangerouslySetInnerHTML because Salesforce sends HTML Rich Text */}
        <div 
          className="prose prose-invert prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.Content__c }}
        />
      </div>
    </article>
  );
}

// Optional: Static Generation for better performance
export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((blog) => ({
    slug: blog.Slug__c,
  }));
}