import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VenueGrid from '@/components/VenueGrid';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaScript from '@/components/SchemaScript';
import { getHubCities, EVENT_TYPES, buildBreadcrumbs } from '@/lib/locations';
import { getVenues } from '@/lib/venues-server';
import { generateVenueListSchema } from '@/lib/schema';

export const metadata = { title: 'Browse Venues by City | VenueVibe', description: 'Discover curated venue spaces across the UK.' };

export default async function VenuesPage() {
  const hubs = getHubCities();
  const crumbs = buildBreadcrumbs();
  const venues = await getVenues();
  const listSchema = generateVenueListSchema(venues, 'All Venues', '/venues');

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <SchemaScript data={listSchema} />
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={crumbs} />
        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Browse</p>
        <h1 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">Curated <span className="italic text-[#8C7B66]">spaces</span></h1>
        <p className="text-[#8C7B66] text-[15px] font-light max-w-xl mb-14 leading-relaxed">Discover our full collection of unique spaces for your next event.</p>
        <VenueGrid venues={venues} priorityCount={3} />

        <section className="mt-24">
          <h2 className="text-2xl md:text-3xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">Venues by <span className="italic text-[#8C7B66]">city</span></h2>
          <p className="text-[#8C7B66] text-[14px] font-light mb-10 max-w-lg">Explore spaces in the UK&apos;s most popular cities.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hubs.map((hub) => (
              <Link key={hub.slug} href={`/venues/${hub.slug}`} className="group bg-white border border-[#E0D5C5] rounded-xl p-6 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4654A]/8 border border-[#D4654A]/15 flex items-center justify-center"><MapPin className="w-4 h-4 text-[#D4654A]" /></div>
                  <ArrowRight className="w-4 h-4 text-[#C4AE8F] group-hover:text-[#D4654A] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-[Georgia,serif] text-lg text-[#2C2418] mb-1">{hub.name}</h3>
                <p className="text-[12px] text-[#A69580] font-light mb-3">{hub.region}</p>
                <p className="text-[12px] text-[#C4AE8F] font-light">{hub.spokes.length} neighbourhood{hub.spokes.length !== 1 ? 's' : ''}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-2xl md:text-3xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">Venues by <span className="italic text-[#8C7B66]">event type</span></h2>
          <p className="text-[#8C7B66] text-[14px] font-light mb-10 max-w-lg">Not sure where? Start with what you&apos;re planning.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EVENT_TYPES.map((et) => (
              <Link key={et.slug} href={`/venues/london/${et.slug}`} className="group bg-white border border-[#E0D5C5] rounded-xl p-6 hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-300">
                <h3 className="font-[Georgia,serif] text-[16px] text-[#2C2418] mb-2 group-hover:text-[#D4654A] transition-colors">{et.name}</h3>
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
