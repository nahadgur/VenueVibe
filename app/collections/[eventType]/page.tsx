import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaScript from '@/components/SchemaScript';
import VenueGrid from '@/components/VenueGrid';
import {
  getEventTypeBySlug,
  EVENT_TYPES,
  getHubCities,
} from '@/lib/locations';
import { getVenues } from '@/lib/venues-server';
import { generateVenueListSchema } from '@/lib/schema';

export async function generateStaticParams() {
  return EVENT_TYPES.map((et) => ({ eventType: et.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ eventType: string }> }) {
  const { eventType: etSlug } = await params;
  const eventType = getEventTypeBySlug(etSlug);
  if (!eventType) return {};

  return {
    title: `${eventType.name} Venues Across the UK | VenueVibe`,
    description: `Discover the best ${eventType.name.toLowerCase()} venues across the UK. ${eventType.description}`,
    alternates: { canonical: `/collections/${eventType.slug}` },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ eventType: string }> }) {
  const { eventType: etSlug } = await params;
  const eventType = getEventTypeBySlug(etSlug);
  if (!eventType) notFound();

  const hubs = getHubCities();
  const venues = await getVenues();
  const otherTypes = EVENT_TYPES.filter((et) => et.slug !== etSlug);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/venues' },
    { label: eventType.name, href: `/collections/${eventType.slug}` },
  ];

  const listSchema = generateVenueListSchema(
    venues,
    `${eventType.name} Venues`,
    `/collections/${eventType.slug}`
  );

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <SchemaScript data={listSchema} />
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={crumbs} />

        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Collection</p>
        <h1 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">
          {eventType.name} <span className="italic text-[#8C7B66]">venues</span>
        </h1>
        <p className="text-[#8C7B66] text-[15px] font-light max-w-2xl mb-16 leading-relaxed">
          {eventType.description}
        </p>

        {/* Venue grid */}
        <VenueGrid venues={venues} priorityCount={3} />

        {/* ── Browse by city ── */}
        <section className="mt-24">
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">
            {eventType.name} by <span className="italic text-[#8C7B66]">city</span>
          </h2>
          <p className="text-[#8C7B66] text-[14px] font-light mb-8">
            Find {eventType.name.toLowerCase()} venues in a specific location.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {hubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/venues/${hub.slug}/${etSlug}`}
                className="group flex items-center gap-3 bg-white border border-[#E0D5C5] rounded-xl px-5 py-4 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 transition-colors" />
                <span className="text-[14px] font-light text-[#8C7B66] group-hover:text-[#2C2418] transition-colors">
                  {hub.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Other collections ── */}
        <section className="mt-20">
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
            Other <span className="italic text-[#8C7B66]">collections</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherTypes.map((et) => (
              <Link
                key={et.slug}
                href={`/collections/${et.slug}`}
                className="group bg-white border border-[#E0D5C5] rounded-xl p-5 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-[Georgia,serif] text-[15px] text-[#2C2418] group-hover:text-[#D4654A] transition-colors">{et.name}</h3>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 mt-0.5 transition-colors" />
                </div>
                <p className="text-[12px] text-[#A69580] font-light leading-relaxed line-clamp-2">{et.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
