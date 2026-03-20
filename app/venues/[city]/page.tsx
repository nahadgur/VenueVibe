import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import VenueGrid from '@/components/VenueGrid';
import SchemaScript from '@/components/SchemaScript';
import { getCityBySlug, getParentHub, getAllCitySlugs, EVENT_TYPES, buildBreadcrumbs, type CityHub } from '@/lib/locations';
import { getVenuesByLocation } from '@/lib/venues-server';
import { generateCityHubSchema, generateVenueListSchema } from '@/lib/schema';

export async function generateStaticParams() { return getAllCitySlugs().map((city) => ({ city })); }
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params; const city = getCityBySlug(citySlug); if (!city) return {};
  return { title: `Venues in ${city.name} | VenueVibe`, description: city.description, alternates: { canonical: `/venues/${city.slug}` } };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params; const city = getCityBySlug(citySlug); if (!city) notFound();
  const crumbs = buildBreadcrumbs(citySlug); const parentHub = !city.isHub ? getParentHub(citySlug) : null;
  const venues = await getVenuesByLocation(city.name);
  const schemas = [generateCityHubSchema(city.name, city.slug, city.region, city.description, venues.length), generateVenueListSchema(venues, `Venues in ${city.name}`, `/venues/${city.slug}`, city.slug)];

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <SchemaScript data={schemas} /><Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={crumbs} />
        {parentHub && <Link href={`/venues/${parentHub.slug}`} className="inline-flex items-center gap-2 text-[12px] text-[#D4654A] font-light mb-6 hover:underline"><ArrowRight className="w-3 h-3 rotate-180" />Part of {parentHub.name}</Link>}
        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">{city.region}</p>
        <h1 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">Venues in <span className="italic text-[#8C7B66]">{city.name}</span></h1>
        <p className="text-[#8C7B66] text-[15px] font-light max-w-2xl mb-16 leading-relaxed">{city.description}</p>
        <VenueGrid venues={venues} priorityCount={3} />

        <section className="mt-20 mb-20">
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">Find by <span className="italic text-[#8C7B66]">event type</span></h2>
          <p className="text-[#8C7B66] text-[14px] font-light mb-8">Browse {city.name} venues by what you&apos;re planning.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EVENT_TYPES.map((et) => (
              <Link key={et.slug} href={`/venues/${city.slug}/${et.slug}`} className="group bg-white border border-[#E0D5C5] rounded-xl p-5 hover:border-[#D4654A]/30 hover:shadow-sm transition-all duration-300">
                <div className="flex items-start justify-between mb-3"><h3 className="font-[Georgia,serif] text-[15px] text-[#2C2418] group-hover:text-[#D4654A] transition-colors leading-snug">{et.name}</h3><ArrowUpRight className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 mt-0.5 transition-colors" /></div>
                <p className="text-[12px] text-[#A69580] font-light leading-relaxed line-clamp-2">{et.name} venues in {city.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {city.isHub && (city as CityHub).spokes.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">{city.name} <span className="italic text-[#8C7B66]">neighbourhoods</span></h2>
            <p className="text-[#8C7B66] text-[14px] font-light mb-8">Explore spaces in specific areas of {city.name}.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {(city as CityHub).spokes.map((spoke) => (
                <Link key={spoke.slug} href={`/venues/${spoke.slug}`} className="group flex items-center gap-3 bg-white border border-[#E0D5C5] rounded-xl px-5 py-4 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 transition-colors" />
                  <span className="text-[14px] font-light text-[#8C7B66] group-hover:text-[#2C2418] transition-colors">{spoke.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        {!city.isHub && parentHub && (
          <section className="mb-20">
            <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">More areas in <span className="italic text-[#8C7B66]">{parentHub.name}</span></h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {parentHub.spokes.filter((s) => s.slug !== city.slug).map((spoke) => (
                <Link key={spoke.slug} href={`/venues/${spoke.slug}`} className="group flex items-center gap-3 bg-white border border-[#E0D5C5] rounded-xl px-5 py-4 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 text-[#C4AE8F] group-hover:text-[#D4654A] shrink-0 transition-colors" /><span className="text-[14px] font-light text-[#8C7B66] group-hover:text-[#2C2418] transition-colors">{spoke.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        <section>
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">Other <span className="italic text-[#8C7B66]">cities</span></h2>
          <div className="flex flex-wrap gap-3 mt-6">
            {getAllCitySlugs().filter((s) => { const c = getCityBySlug(s); return c?.isHub && s !== citySlug; }).map((slug) => { const c = getCityBySlug(slug)!; return (
              <Link key={slug} href={`/venues/${slug}`} className="px-4 py-2 rounded-full border border-[#E0D5C5] text-[13px] font-light text-[#8C7B66] hover:border-[#D4654A]/40 hover:text-[#D4654A] transition-all">{c.name}</Link>
            ); })}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
