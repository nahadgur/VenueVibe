import { notFound } from 'next/navigation';
import { Star, MapPin, Users, Clock, Wifi, Car, Sun, Wind, ChevronRight, CalendarDays, Ruler, DoorOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaScript from '@/components/SchemaScript';
import ImageGallery from '@/components/ImageGallery';
import TrustBadges from '@/components/TrustBadges';
import InquiryForm from '@/components/InquiryForm';
import MobileCTA from '@/components/MobileCTA';
import Reviews from '@/components/Reviews';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import EventTypeDetails from '@/components/EventTypeDetails';
import { getVenueById, getVenues } from '@/lib/venues-server';
import { generateVenueSchema } from '@/lib/schema';
import { formatPrice, formatResponseTime, CANCELLATION_DESCRIPTIONS, VENUE_TYPES } from '@/lib/types';
import { EVENT_TYPES } from '@/lib/locations';

// ── Static generation for known venues ──
export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((v) => ({ slug: v.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueById(slug);
  if (!venue) return {};

  return {
    title: `${venue.title} — ${venue.location} | VenueVibe`,
    description: venue.description || `Book ${venue.title} in ${venue.location}. Capacity: ${venue.capacity}. From ${formatPrice(venue)}.`,
    alternates: { canonical: `/venue/${slug}` },
    openGraph: {
      title: `${venue.title} | VenueVibe`,
      description: venue.description || `Curated venue space in ${venue.location}`,
      images: [{ url: venue.imageUrl, width: 1200, height: 630 }],
    },
  };
}

// ── Amenity icon mapping ──
const AMENITY_ICONS: Record<string, typeof Wifi> = {
  WiFi: Wifi, Parking: Car, 'Natural Light': Sun, 'Air Conditioning': Wind,
};

export default async function VenueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueById(slug);
  if (!venue) notFound();

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Venues', href: '/venues' },
    { label: venue.title, href: `/venue/${slug}` },
  ];

  const venueSchema = generateVenueSchema(venue);

  // Get amenities — from structured field or parse from description for backwards compat
  const amenities = venue.amenities && venue.amenities.length > 0
    ? venue.amenities
    : (venue.description?.match(/Amenities: (.+)/)?.[1]?.split(', ').map(a => a.trim()) || []);

  const cleanDescription = venue.description?.replace(/\n\nAmenities: .+/, '') || '';

  // Images — use the images array if available
  const images = venue.images && venue.images.length > 0
    ? venue.images
    : [venue.imageUrl, venue.imageUrl.replace('w=800', 'w=801'), venue.imageUrl.replace('w=800', 'w=802')];

  // Venue type display name
  const venueTypeDisplay = venue.venueType
    ? VENUE_TYPES.find(vt => vt.slug === venue.venueType)?.name
    : null;

  // Supported event types display
  const supportedEvents = (venue.eventTypesSupported || [])
    .map(slug => EVENT_TYPES.find(et => et.slug === slug))
    .filter(Boolean);

  const cancellationDesc = venue.cancellationPolicy
    ? CANCELLATION_DESCRIPTIONS[venue.cancellationPolicy]
    : CANCELLATION_DESCRIPTIONS.flexible;

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <SchemaScript data={venueSchema} />
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={crumbs} />

        {/* ── Gallery ── */}
        <div className="mb-10">
          <ImageGallery images={images} alt={venue.title} />
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left: Content ── */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                {(venue.isSuperhost || venue.isVerified) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#D4654A]/8 text-[#D4654A] border border-[#D4654A]/15">
                    <Star className="w-3 h-3 fill-[#D4654A]" />Verified venue
                  </span>
                )}
                {venueTypeDisplay && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-light bg-[#EDE5D8] text-[#8C7B66]">
                    {venueTypeDisplay}
                  </span>
                )}
                {venue.indoorOutdoor && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-light bg-[#EDE5D8] text-[#8C7B66] capitalize">
                    {venue.indoorOutdoor}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">
                {venue.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-[14px] text-[#8C7B66] font-light">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#A69580]" />{venue.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#A69580]" />Up to {venue.capacity} seated
                  {venue.standingCapacity ? ` · ${venue.standingCapacity} standing` : ''}
                </span>
                {venue.rating && venue.rating > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-[#D4654A] text-[#D4654A]" />
                    {venue.rating} ({venue.reviews} reviews)
                  </span>
                )}
              </div>

              {/* Response time + floor area */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-[13px] text-[#A69580] font-light">
                {venue.avgResponseMinutes && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {formatResponseTime(venue.avgResponseMinutes)}
                  </span>
                )}
                {venue.floorAreaSqm && (
                  <span className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5" />{venue.floorAreaSqm} sqm
                  </span>
                )}
              </div>
            </div>

            {/* Vibe tags */}
            {venue.vibeTags && venue.vibeTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {venue.vibeTags.map(tag => (
                  <span key={tag} className="px-3.5 py-1.5 rounded-full text-[12px] font-light bg-[#D4654A]/8 text-[#D4654A] border border-[#D4654A]/15">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Trust badges — horizontal */}
            <div className="mb-10">
              <TrustBadges isVerified={venue.isSuperhost || venue.isVerified} layout="row" />
            </div>

            {/* Description */}
            {cleanDescription && (
              <section className="mb-10">
                <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4">About this space</h2>
                <div className="text-[#5C4E3C] text-[15px] font-light leading-[1.8] space-y-4">
                  {cleanDescription.split('\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((amenity) => {
                    const Icon = AMENITY_ICONS[amenity as string] || Clock;
                    return (
                      <div key={amenity} className="flex items-center gap-3 bg-white border border-[#E0D5C5] rounded-lg px-4 py-3">
                        <Icon className="w-4 h-4 text-[#A69580] shrink-0" />
                        <span className="text-[14px] text-[#5C4E3C] font-light">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Supported event types */}
            {supportedEvents.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4">Suitable for</h2>
                <div className="flex flex-wrap gap-2">
                  {supportedEvents.map((et) => (
                    <span key={et!.slug} className="px-4 py-2 rounded-lg border border-[#E0D5C5] text-[13px] font-light text-[#5C4E3C] bg-white">
                      {et!.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Event-type-specific details */}
            <EventTypeDetails venue={venue} />

            {/* Key details */}
            <section className="mb-10 bg-white border border-[#E0D5C5] rounded-xl p-6">
              <h2 className="text-[16px] font-[Georgia,serif] font-normal text-[#2C2418] mb-4">Key details</h2>
              <div className="grid grid-cols-2 gap-4 text-[14px]">
                <div>
                  <span className="text-[#A69580] font-light block mb-1">Price</span>
                  <span className="text-[#2C2418]">{formatPrice(venue)}</span>
                </div>
                <div>
                  <span className="text-[#A69580] font-light block mb-1">Capacity</span>
                  <span className="text-[#2C2418]">Up to {venue.capacity} seated{venue.standingCapacity ? `, ${venue.standingCapacity} standing` : ''}</span>
                </div>
                <div>
                  <span className="text-[#A69580] font-light block mb-1">Cancellation</span>
                  <span className="text-[#2C2418] capitalize">{venue.cancellationPolicy || 'Flexible'}</span>
                  <span className="block text-[12px] text-[#A69580] font-light mt-0.5">{cancellationDesc}</span>
                </div>
                <div>
                  <span className="text-[#A69580] font-light block mb-1">Response time</span>
                  <span className="text-[#2C2418]">{formatResponseTime(venue.avgResponseMinutes)}</span>
                </div>
                {venue.minimumBookingHours && (
                  <div>
                    <span className="text-[#A69580] font-light block mb-1">Minimum booking</span>
                    <span className="text-[#2C2418]">{venue.minimumBookingHours} hours</span>
                  </div>
                )}
                {venue.floorAreaSqm && (
                  <div>
                    <span className="text-[#A69580] font-light block mb-1">Floor area</span>
                    <span className="text-[#2C2418]">{venue.floorAreaSqm} sqm</span>
                  </div>
                )}
              </div>
            </section>

            {/* Availability calendar */}
            <section className="mb-10">
              <AvailabilityCalendar venueId={venue.id} mode="planner" />
            </section>

            {/* Reviews */}
            <Reviews venueId={venue.id} hostId={venue.hostId} />
          </div>

          {/* ── Right: Sticky Inquiry ── */}
          <div className="lg:col-span-1">
            <div id="inquiry-form" className="lg:sticky lg:top-28 space-y-6">
              <InquiryForm
                venueTitle={venue.title}
                venueId={venue.id}
                pricePerHour={venue.price}
                hostId={venue.hostId}
              />

              {/* Trust stack */}
              <TrustBadges isVerified={venue.isSuperhost || venue.isVerified} layout="stack" />
            </div>
          </div>
        </div>
      </div>
      <MobileCTA price={venue.price} />
      <Footer />
    </main>
  );
}
