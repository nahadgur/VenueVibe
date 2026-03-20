import Link from 'next/link';
import { ArrowRight, ShieldCheck, Star, MapPin, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { type BreadcrumbItem } from '@/lib/locations';

export const metadata = {
  title: 'About VenueVibe | Our Story',
  description: 'VenueVibe is a UK venue marketplace connecting event planners with curated spaces. Learn about our mission, team, and what makes us different.',
};

export default function AboutPage() {
  const crumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];

  const stats = [
    { value: '500+', label: 'Curated venues', icon: MapPin },
    { value: '8', label: 'UK cities', icon: MapPin },
    { value: '4.8', label: 'Average rating', icon: Star },
    { value: '10,000+', label: 'Events hosted', icon: Users },
  ];

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Breadcrumbs items={crumbs} />

        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Our story</p>
        <h1 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
          Spaces that bring <span className="italic text-[#8C7B66]">people together</span>
        </h1>
        <p className="text-[#8C7B66] text-[16px] font-light max-w-2xl mb-16 leading-relaxed">
          VenueVibe started with a simple frustration: why is it so hard to find and book a great venue? We set out to build the platform we wished existed.
        </p>

        {/* ── Story ── */}
        <section className="mb-20">
          <div className="space-y-6 text-[#5C4E3C] text-[15px] font-light leading-[1.85]">
            <p>
              Every great event starts with a space. A converted warehouse that makes a product launch feel electric. A walled garden that turns a wedding into something from a film. A rooftop terrace that gives a team offsite the perspective it needs.
            </p>
            <p>
              But finding these spaces has always been harder than it should be. Venue directories are cluttered, outdated, and designed for the venue owner, not the event planner. We built VenueVibe to fix that — a curated marketplace where every listed space is hand-picked, personally verified, and reviewed by real people.
            </p>
            <p>
              We believe the best venues are run by passionate hosts, not faceless corporations. That&apos;s why VenueVibe connects you directly with the people behind the spaces. No middlemen, no hidden fees, no surprises on the day.
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white border border-[#E0D5C5] rounded-xl p-6 text-center">
                <stat.icon className="w-5 h-5 text-[#D4654A] mx-auto mb-3" />
                <p className="text-2xl font-[Georgia,serif] text-[#2C2418] mb-1">{stat.value}</p>
                <p className="text-[12px] text-[#A69580] font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What makes us different ── */}
        <section className="mb-20">
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-8 tracking-tight">
            What makes us <span className="italic text-[#8C7B66]">different</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Every venue verified',
                body: 'Our team personally visits and photographs every space before it goes live. No stock photos, no misleading descriptions.',
                icon: ShieldCheck,
              },
              {
                title: 'Real reviews only',
                body: 'Reviews come from people who actually hosted events at the venue. We verify bookings before publishing reviews.',
                icon: Star,
              },
              {
                title: 'Direct to hosts',
                body: 'Message venue owners directly. No call centres, no automated responses. Real people who know their space.',
                icon: Users,
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-[#E0D5C5] rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#D4654A]/8 border border-[#D4654A]/15 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#D4654A]" />
                </div>
                <h3 className="text-[15px] font-medium text-[#2C2418] mb-2">{item.title}</h3>
                <p className="text-[14px] text-[#8C7B66] font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-white border border-[#E0D5C5] rounded-xl p-10 text-center">
          <h2 className="text-xl font-[Georgia,serif] text-[#2C2418] mb-3">Ready to find your space?</h2>
          <p className="text-[14px] text-[#8C7B66] font-light mb-6 max-w-md mx-auto">Browse curated venues across the UK or list your own space and start hosting.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/venues" className="px-6 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors inline-flex items-center gap-2">
              Browse venues <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/list-venue" className="px-6 py-3 border border-[#E0D5C5] text-[#5C4E3C] text-[13px] font-light rounded-lg hover:border-[#C4AE8F] transition-colors">
              List your venue
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
