import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaScript from '@/components/SchemaScript';
import FAQAccordion from '@/components/FAQAccordion';
import VenueGrid from '@/components/VenueGrid';
import { getIntentPageBySlug, getAllIntentSlugs, getRelatedIntentPages } from '@/lib/intent-pages';
import { getCityBySlug, getEventTypeBySlug } from '@/lib/locations';
import { getVenuesByLocation } from '@/lib/venues-server';
import { generateFAQSchema, generateVenueListSchema } from '@/lib/schema';

export async function generateStaticParams() {
  return getAllIntentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getIntentPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function IntentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getIntentPageBySlug(slug);
  if (!page) notFound();

  const city = getCityBySlug(page.citySlug);
  const eventType = page.eventTypeSlug ? getEventTypeBySlug(page.eventTypeSlug) : null;
  const venues = city ? await getVenuesByLocation(city.name) : [];
  const related = getRelatedIntentPages(page.relatedSlugs);

  const crumbs = [
    { label: 'Home', href: '/' },
    ...(city ? [{ label: city.name, href: `/venues/${city.slug}` }] : []),
    { label: page.h1, href: `/${slug}` },
  ];

  const schemas = [
    ...(page.faqs.length > 0 ? [generateFAQSchema(page.faqs)] : []),
    ...(venues.length > 0 ? [generateVenueListSchema(venues, page.h1, `/${slug}`, page.citySlug)] : []),
  ];

  const paragraphs = page.body.split('\n\n').filter(Boolean);

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      {schemas.length > 0 && <SchemaScript data={schemas.length === 1 ? schemas[0] : schemas} />}
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Breadcrumbs items={crumbs} />

        {city && (
          <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">{city.name} · {city.region}</p>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight capitalize">
          {page.h1}
        </h1>
        <p className="text-[#8C7B66] text-[15px] font-light max-w-2xl mb-12 leading-relaxed">
          {page.description}
        </p>

        {/* Body content */}
        <section className="mb-16">
          <div className="text-[#5C4E3C] text-[15px] font-light leading-[1.85] space-y-5 max-w-3xl">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Venue results */}
        {venues.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
              Available <span className="italic text-[#8C7B66]">spaces</span>
            </h2>
            <VenueGrid venues={venues} priorityCount={3} />
          </section>
        )}

        {/* CTA to browse more */}
        {city && (
          <section className="mb-16 bg-white border border-[#E0D5C5] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-1">See all venues in {city.name}</h3>
              <p className="text-[13px] text-[#8C7B66] font-light">Browse the full collection with filters, vibe tags, and availability.</p>
            </div>
            <Link
              href={eventType ? `/venues/${city.slug}/${eventType.slug}` : `/venues/${city.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors shrink-0"
            >
              Browse venues <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        )}

        {/* FAQs */}
        {page.faqs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
              Frequently asked <span className="italic text-[#8C7B66]">questions</span>
            </h2>
            <FAQAccordion faqs={page.faqs} />
          </section>
        )}

        {/* Related intent pages */}
        {related.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
              Related <span className="italic text-[#8C7B66]">searches</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/${rp.slug}`} className="group bg-white border border-[#E0D5C5] rounded-xl p-5 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-[Georgia,serif] text-[15px] text-[#2C2418] group-hover:text-[#D4654A] transition-colors capitalize">{rp.h1}</h3>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 mt-0.5 transition-colors" />
                  </div>
                  <p className="text-[12px] text-[#A69580] font-light leading-relaxed line-clamp-2">{rp.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
