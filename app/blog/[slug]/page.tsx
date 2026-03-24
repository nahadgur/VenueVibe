import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getBlogPostBySlug, getAllBlogSlugs, getRecentBlogPosts } from '@/lib/blog';
import { getCityBySlug } from '@/lib/locations';

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | VenueVibe Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.imageUrl, width: 1200, height: 630 }],
    },
  };
}

/** Simple markdown-lite renderer for **bold** and [links](url) */
function renderBody(body: string) {
  const paragraphs = body.split('\n\n');
  return paragraphs.map((para, i) => {
    // Split on **bold** and [link](url) patterns
    const parts = para.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    const rendered = parts.map((part, j) => {
      // Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="font-medium text-[#2C2418]">{part.slice(2, -2)}</strong>;
      }
      // Link
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const isInternal = linkMatch[2].startsWith('/');
        if (isInternal) {
          return <Link key={j} href={linkMatch[2]} className="text-[#D4654A] hover:underline">{linkMatch[1]}</Link>;
        }
        return <a key={j} href={linkMatch[2]} className="text-[#D4654A] hover:underline" target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>;
      }
      return part;
    });
    return <p key={i}>{rendered}</p>;
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${slug}` },
  ];

  const relatedPosts = getRecentBlogPosts(4).filter(p => p.slug !== slug).slice(0, 2);
  const relatedCities = post.citySlugs.map(s => getCityBySlug(s)).filter(Boolean).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <article className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Breadcrumbs items={crumbs} />

        {/* Hero image */}
        <div className="relative aspect-[2/1] rounded-xl overflow-hidden border border-[#E0D5C5] mb-10">
          <Image src={post.imageUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" priority quality={85} className="object-cover" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#D4654A]/8 text-[#D4654A] border border-[#D4654A]/15 capitalize">
            {post.category}
          </span>
          <span className="text-[12px] text-[#A69580] font-light flex items-center gap-1">
            <Clock className="w-3 h-3" />{post.readingTime} min read
          </span>
          <span className="text-[12px] text-[#A69580] font-light">
            {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-[16px] text-[#8C7B66] font-light leading-relaxed mb-10">
          {post.description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mb-10 pb-8 border-b border-[#E0D5C5]">
          <div className="w-10 h-10 rounded-full bg-[#EDE5D8] flex items-center justify-center">
            <User className="w-5 h-5 text-[#8C7B66]" />
          </div>
          <div>
            <p className="text-[14px] text-[#2C2418] font-medium">{post.author}</p>
            <p className="text-[12px] text-[#A69580] font-light">VenueVibe</p>
          </div>
        </div>

        {/* Body */}
        <div className="text-[#5C4E3C] text-[15px] sm:text-[16px] font-light leading-[1.85] space-y-6">
          {renderBody(post.body)}
        </div>

        {/* Related cities */}
        {relatedCities.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[#E0D5C5]">
            <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418] mb-4">Browse venues mentioned in this article</h3>
            <div className="flex flex-wrap gap-2">
              {relatedCities.map(city => (
                <Link key={city!.slug} href={`/venues/${city!.slug}`} className="px-4 py-2 rounded-full border border-[#E0D5C5] text-[13px] font-light text-[#8C7B66] hover:border-[#D4654A]/40 hover:text-[#D4654A] transition-all">
                  {city!.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[#E0D5C5]">
            <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418] mb-6">More from the blog</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group bg-white border border-[#E0D5C5] rounded-xl overflow-hidden hover:border-[#C4AE8F] hover:shadow-sm transition-all">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={rp.imageUrl} alt={rp.title} fill sizes="50vw" quality={70} className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <h4 className="text-[14px] font-[Georgia,serif] text-[#2C2418] group-hover:text-[#D4654A] transition-colors leading-snug">{rp.title}</h4>
                    <p className="text-[12px] text-[#A69580] font-light mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{rp.readingTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-[#E0D5C5]">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] text-[#8C7B66] hover:text-[#D4654A] font-light transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />All articles
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
