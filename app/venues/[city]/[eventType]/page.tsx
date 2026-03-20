import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import VenueGrid from '@/components/VenueGrid';
import SchemaScript from '@/components/SchemaScript';
import { getCityBySlug, getEventTypeBySlug, getParentHub, getAllCityEventCombinations, EVENT_TYPES, buildBreadcrumbs, type CityHub } from '@/lib/locations';
import { getVenuesByLocation } from '@/lib/venues-server';
import { generateVenueListSchema, generateFAQSchema } from '@/lib/schema';

export async function generateStaticParams() { return getAllCityEventCombinations(); }
export async function generateMetadata({ params }: { params: Promise<{ city: string; eventType: string }> }) {
  const { city: citySlug, eventType: etSlug } = await params; const city = getCityBySlug(citySlug); const eventType = getEventTypeBySlug(etSlug); if (!city || !eventType) return {};
  return { title: `${eventType.name} Venues in ${city.name} | VenueVibe`, description: `Discover the best ${eventType.name.toLowerCase()} venues in ${city.name}. ${eventType.description}`, alternates: { canonical: `/venues/${city.slug}/${eventType.slug}` } };
}

export default async function CityEventTypePage({ params }: { params: Promise<{ city: string; eventType: string }> }) {
  const { city: citySlug, eventType: etSlug } = await params; const city = getCityBySlug(citySlug); const eventType = getEventTypeBySlug(etSlug); if (!city || !eventType) notFound();
  const crumbs = buildBreadcrumbs(citySlug, etSlug); const parentHub = !city.isHub ? getParentHub(citySlug) : null;
  const venues = await getVenuesByLocation(city.name); const otherEventTypes = EVENT_TYPES.filter((et) => et.slug !== etSlug);
  const faqs = [
    { question: `What types of ${eventType.name.toLowerCase()} venues are available in ${city.name}?`, answer: `VenueVibe offers a curated selection of ${eventType.name.toLowerCase()} venues in ${city.name}, ranging from intimate spaces to large-scale venues. All venues are hand-picked for quality.` },
    { question: `How much does it cost to hire a ${eventType.name.toLowerCase()} venue in ${city.name}?`, answer: `Prices for ${eventType.name.toLowerCase()} venues in ${city.name} typically range from £100 to £500+ per hour, depending on capacity, location, and amenities.` },
    { question: `Can I visit a ${eventType.name.toLowerCase()} venue before booking?`, answer: `Most hosts on VenueVibe offer site visits before confirming a booking. Simply message the host through the platform to arrange a viewing.` },
  ];
  const schemas = [generateVenueListSchema(venues, `${eventType.name} Venues in ${city.name}`, `/venues/${city.slug}/${eventType.slug}`, city.slug), generateFAQSchema(faqs)];

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <SchemaScript data={schemas} /><Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={crumbs} />
        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">{city.name} · {city.region}</p>
        <h1 className="text-3xl md:text-5xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">{eventType.name} venues in <span className="italic text-[#8C7B66]">{city.name}</span></h1>
        <p className="text-[#8C7B66] text-[15px] font-light max-w-2xl mb-16 leading-relaxed">{eventType.description} Browse our curated selection of {eventType.name.toLowerCase()} spaces in {city.name}.</p>
        <VenueGrid venues={venues} priorityCount={3} />

        {city.isHub && (city as CityHub).spokes.length > 0 && (
          <section className="mt-20 mb-20">
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">{eventType.name} in {city.name} <span className="italic text-[#8C7B66]">neighbourhoods</span></h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
              {(city as CityHub).spokes.map((spoke) => (
                <Link key={spoke.slug} href={`/venues/${spoke.slug}/${etSlug}`} className="group flex items-center gap-3 bg-white border border-[#E0D5C5] rounded-xl px-5 py-4 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 transition-colors" /><span className="text-[13px] font-light text-[#8C7B66] group-hover:text-[#2C2418] transition-colors">{spoke.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        {!city.isHub && parentHub && (
          <section className="mt-20 mb-20">
            <Link href={`/venues/${parentHub.slug}/${etSlug}`} className="inline-flex items-center gap-2 text-[13px] text-[#D4654A] font-light hover:underline"><ArrowRight className="w-3 h-3 rotate-180" />See all {eventType.name.toLowerCase()} venues in {parentHub.name}</Link>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 mt-8 tracking-tight">{eventType.name} in nearby areas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
              {parentHub.spokes.filter((s) => s.slug !== city.slug).map((spoke) => (
                <Link key={spoke.slug} href={`/venues/${spoke.slug}/${etSlug}`} className="group flex items-center gap-3 bg-white border border-[#E0D5C5] rounded-xl px-5 py-4 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 transition-colors" /><span className="text-[13px] font-light text-[#8C7B66] group-hover:text-[#2C2418] transition-colors">{spoke.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-20">
          <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">Other event types in <span className="italic text-[#8C7B66]">{city.name}</span></h2>
          <div className="flex flex-wrap gap-3">
            {otherEventTypes.map((et) => (<Link key={et.slug} href={`/venues/${city.slug}/${et.slug}`} className="px-4 py-2 rounded-full border border-[#E0D5C5] text-[13px] font-light text-[#8C7B66] hover:border-[#D4654A]/40 hover:text-[#D4654A] transition-all">{et.name}</Link>))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-8 tracking-tight">Frequently asked <span className="italic text-[#8C7B66]">questions</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-[#E0D5C5] rounded-xl p-6">
                <h3 className="text-[15px] text-[#2C2418] font-[Georgia,serif] font-normal mb-3">{faq.question}</h3>
                <p className="text-[14px] text-[#8C7B66] font-light leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-8 border-t border-[#E0D5C5]">
          <Link href={`/venues/${city.slug}`} className="inline-flex items-center gap-2 text-[13px] text-[#8C7B66] hover:text-[#D4654A] font-light transition-colors"><ArrowRight className="w-3.5 h-3.5 rotate-180" />All venues in {city.name}</Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
