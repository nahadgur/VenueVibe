import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaScript from '@/components/SchemaScript';
import VenueGrid from '@/components/VenueGrid';
import { VENUE_TYPES } from '@/lib/types';
import { getHubCities, EVENT_TYPES } from '@/lib/locations';
import { getVenues } from '@/lib/venues-server';
import { generateVenueListSchema } from '@/lib/schema';

export async function generateStaticParams() {
  return VENUE_TYPES.map((vt) => ({ type: vt.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }) {
  const { type: typeSlug } = await params;
  const venueType = VENUE_TYPES.find(vt => vt.slug === typeSlug);
  if (!venueType) return {};

  return {
    title: `${venueType.name} Venues for Hire Across the UK | VenueVibe`,
    description: `Discover curated ${venueType.name.toLowerCase()} venues for hire across the UK. Browse verified spaces with real reviews, transparent pricing, and instant availability.`,
    alternates: { canonical: `/venue-types/${typeSlug}` },
  };
}

export default async function VenueTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type: typeSlug } = await params;
  const venueType = VENUE_TYPES.find(vt => vt.slug === typeSlug);
  if (!venueType) notFound();

  const hubs = getHubCities();
  const venues = await getVenues();
  // Filter by venue type if available
  const filteredVenues = venues.filter(v => v.venueType === typeSlug || !v.venueType);
  const otherTypes = VENUE_TYPES.filter(vt => vt.slug !== typeSlug);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Venue types', href: '/venues' },
    { label: venueType.name, href: `/venue-types/${typeSlug}` },
  ];

  const listSchema = generateVenueListSchema(filteredVenues, `${venueType.name} Venues`, `/venue-types/${typeSlug}`);

  // Generate contextual description based on venue type
  const descriptions: Record<string, string> = {
    'restaurant': 'From Michelin-starred private dining rooms to neighbourhood bistros with function spaces, find restaurants across the UK that elevate any gathering.',
    'bar-pub': 'Discover bars and pubs with private areas, cocktail lounges, and function rooms perfect for celebrations, socials, and corporate drinks.',
    'hotel': 'Hotel ballrooms, meeting suites, and boutique event spaces — venues with built-in accommodation and full-service hospitality.',
    'warehouse': 'Raw, industrial warehouse spaces that serve as blank canvases for creative events, brand activations, and immersive experiences.',
    'loft': 'Light-filled loft spaces with character — exposed brick, timber beams, and open plans ideal for modern events.',
    'studio': 'Professional studios for photography, film, workshops, and creative sessions — equipped with the essentials or stripped back for your setup.',
    'gallery': 'Art galleries and exhibition spaces where white walls and curated aesthetics create the backdrop for launches, previews, and refined gatherings.',
    'garden-outdoor': 'Gardens, terraces, courtyards, and open-air venues that bring nature into your event — from formal gardens to wild meadows.',
    'rooftop': 'Elevated venues with skyline views — rooftop terraces and sky lounges for drinks receptions, dinners, and celebrations with a backdrop.',
    'boat-yacht': 'Charter a boat, yacht, or barge for a floating event — unique water-based venues for parties, corporate entertainment, and private dining.',
    'church-chapel': 'Historic churches, chapels, and sacred spaces — atmospheric venues for ceremonies, concerts, and events with gravitas.',
    'library': 'Libraries and reading rooms that lend intellectual charm to private dinners, launches, and intimate gatherings amongst the shelves.',
    'museum': 'Museum and heritage venues where history and culture provide an extraordinary setting for dinners, receptions, and private tours.',
    'manor-house': 'Country manor houses and stately homes — grand estates with manicured grounds for weddings, retreats, and prestigious events.',
    'barn': 'Converted barns and farmstead venues — rustic charm meets modern amenities for weddings, parties, and countryside gatherings.',
    'marquee-site': 'Licensed marquee sites where you bring the structure and build your event from the ground up — maximum creative freedom.',
    'coworking': 'Modern co-working spaces with meeting rooms, event areas, and presentation facilities for professional gatherings.',
    'screening-room': 'Private screening rooms and cinema spaces for film premieres, presentations, and watch parties.',
    'sports-venue': 'Sports grounds, stadiums, and leisure facilities with hospitality suites and event spaces.',
    'brewery-distillery': 'Breweries and distilleries offering tours, tastings, and private hire — industrial charm with craft character.',
    'vineyard': 'Vineyard estates and winery venues set amongst the vines — elegant settings for weddings, tastings, and celebrations.',
    'townhouse': 'Georgian and Victorian townhouses with multiple floors and rooms — intimate venues with period character.',
    'castle': 'Castle venues and fortified estates — historic grandeur for unforgettable weddings, banquets, and prestigious events.',
    'community-hall': 'Affordable community halls and civic spaces — versatile venues for fairs, classes, meetings, and local events.',
    'theatre': 'Theatres and performance venues with stages, seating, and production facilities for shows, presentations, and immersive events.',
  };

  const description = descriptions[typeSlug] || `Discover curated ${venueType.name.toLowerCase()} venues across the UK. Hand-picked spaces with real reviews and transparent pricing.`;

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <SchemaScript data={listSchema} />
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={crumbs} />

        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Venue type</p>
        <h1 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">
          {venueType.name} <span className="italic text-[#8C7B66]">venues</span>
        </h1>
        <p className="text-[#8C7B66] text-[15px] font-light max-w-2xl mb-16 leading-relaxed">
          {description}
        </p>

        <VenueGrid venues={filteredVenues} priorityCount={3} />

        {/* Browse by city */}
        <section className="mt-24">
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">
            {venueType.name} venues by <span className="italic text-[#8C7B66]">city</span>
          </h2>
          <p className="text-[#8C7B66] text-[14px] font-light mb-8">
            Find {venueType.name.toLowerCase()} venues near you.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {hubs.map((hub) => (
              <Link key={hub.slug} href={`/venues/${hub.slug}`} className="group flex items-center gap-3 bg-white border border-[#E0D5C5] rounded-xl px-5 py-4 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300">
                <MapPin className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 transition-colors" />
                <span className="text-[14px] font-light text-[#8C7B66] group-hover:text-[#2C2418] transition-colors">{hub.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by event type */}
        <section className="mt-20">
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
            Popular events at <span className="italic text-[#8C7B66]">{venueType.name.toLowerCase()} venues</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {EVENT_TYPES.slice(0, 8).map((et) => (
              <Link key={et.slug} href={`/collections/${et.slug}`} className="px-4 py-2 rounded-full border border-[#E0D5C5] text-[13px] font-light text-[#8C7B66] hover:border-[#D4654A]/40 hover:text-[#D4654A] transition-all">
                {et.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Other venue types */}
        <section className="mt-20">
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
            Other <span className="italic text-[#8C7B66]">venue types</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherTypes.slice(0, 12).map((vt) => (
              <Link key={vt.slug} href={`/venue-types/${vt.slug}`} className="group bg-white border border-[#E0D5C5] rounded-xl p-5 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-[Georgia,serif] text-[15px] text-[#2C2418] group-hover:text-[#D4654A] transition-colors">{vt.name}</h3>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 mt-0.5 transition-colors" />
                </div>
                <p className="text-[12px] text-[#A69580] font-light leading-relaxed">Browse {vt.name.toLowerCase()} venues</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
