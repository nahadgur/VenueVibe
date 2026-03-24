import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata = {
  title: 'Blog & Guides | VenueVibe',
  description: 'Practical guides, inspiration, and insider tips for finding and booking the perfect venue for your next event.',
};

const CATEGORY_LABELS: Record<string, string> = {
  guides: 'Guide',
  inspiration: 'Inspiration',
  tips: 'Tips',
  industry: 'Industry',
};

export default function BlogPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
  ];

  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Breadcrumbs items={crumbs} />

        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Blog & guides</p>
        <h1 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">
          Venue <span className="italic text-[#8C7B66]">intelligence</span>
        </h1>
        <p className="text-[#8C7B66] text-[15px] font-light max-w-xl mb-16 leading-relaxed">
          Practical guides, curated lists, and insider tips from the VenueVibe team.
        </p>

        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[#E0D5C5] rounded-xl overflow-hidden hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-500">
              <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[320px] overflow-hidden">
                <Image src={featured.imageUrl} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 50vw" priority quality={80} className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#D4654A]/8 text-[#D4654A] border border-[#D4654A]/15 w-fit mb-4">
                  {CATEGORY_LABELS[featured.category] || featured.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 leading-snug group-hover:text-[#D4654A] transition-colors">{featured.title}</h2>
                <p className="text-[14px] text-[#8C7B66] font-light leading-relaxed mb-4 line-clamp-3">{featured.description}</p>
                <div className="flex items-center gap-4 text-[12px] text-[#A69580] font-light">
                  <span>{new Date(featured.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readingTime} min read</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="bg-white border border-[#E0D5C5] rounded-xl overflow-hidden hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-500">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={post.imageUrl} alt={post.title} fill sizes="(max-width: 640px) 100vw, 50vw" quality={75} className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#EDE5D8] text-[#8C7B66]">
                      {CATEGORY_LABELS[post.category] || post.category}
                    </span>
                    <span className="text-[11px] text-[#C4AE8F] font-light flex items-center gap-1">
                      <Clock className="w-3 h-3" />{post.readingTime} min
                    </span>
                  </div>
                  <h3 className="text-[16px] font-[Georgia,serif] font-normal text-[#2C2418] mb-2 leading-snug group-hover:text-[#D4654A] transition-colors">{post.title}</h3>
                  <p className="text-[13px] text-[#8C7B66] font-light leading-relaxed line-clamp-2">{post.description}</p>
                  <p className="text-[12px] text-[#A69580] font-light mt-3">
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
