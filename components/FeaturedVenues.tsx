import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, MapPin, Users } from 'lucide-react';
import VenueGrid from './VenueGrid';
import SchemaScript from './SchemaScript';
import { getVenues } from '@/lib/venues-server';
import { generateVenueListSchema } from '@/lib/schema';

export const VENUES = [
  { id: '1', title: 'The Glasshouse Loft', location: 'Downtown Manhattan, NY', price: 250, rating: 4.9, reviews: 128, capacity: 150, imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop', isSuperhost: true },
  { id: '2', title: 'Industrial Warehouse Studio', location: 'Arts District, LA', price: 180, rating: 4.8, reviews: 95, capacity: 300, imageUrl: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?q=80&w=800&auto=format&fit=crop', isSuperhost: false },
  { id: '3', title: 'Rooftop Garden Oasis', location: 'West Loop, Chicago', price: 320, rating: 5.0, reviews: 210, capacity: 80, imageUrl: 'https://images.unsplash.com/photo-1572364769167-198dcb7b520c?q=80&w=800&auto=format&fit=crop', isSuperhost: true },
  { id: '4', title: 'Historic Mansion Parlor', location: 'Beacon Hill, Boston', price: 450, rating: 4.7, reviews: 64, capacity: 50, imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop', isSuperhost: false },
  { id: '5', title: 'Modern Art Gallery', location: 'Wynwood, Miami', price: 200, rating: 4.9, reviews: 156, capacity: 200, imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop', isSuperhost: true },
  { id: '6', title: 'Minimalist Daylight Studio', location: 'Williamsburg, Brooklyn', price: 120, rating: 4.6, reviews: 82, capacity: 30, imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop', isSuperhost: false },
];

export default async function FeaturedVenues() {
  const allVenues = await getVenues();
  const featured = allVenues[0];
  const rest = allVenues.slice(1, 7);
  const listSchema = generateVenueListSchema(allVenues.slice(0, 7), 'Featured Venues', '/');

  return (
    <section className="py-28 bg-[#F5F0EA] relative overflow-hidden">
      <SchemaScript data={listSchema} />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E0D5C5] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Hand-picked</p>
            <h2 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] tracking-tight">
              Curated <span className="italic text-[#8C7B66]">collection</span>
            </h2>
          </div>
          <Link href="/venues" className="group flex items-center gap-3 text-[13px] text-[#8C7B66] hover:text-[#D4654A] transition-colors font-light border-b border-[#E0D5C5] hover:border-[#D4654A] pb-2">
            View all spaces <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {featured && (
          <div className="mb-12 group">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[#E0D5C5] rounded-xl overflow-hidden hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-500 cursor-pointer">
              <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[380px] overflow-hidden">
                <Image src={featured.imageUrl} alt={`${featured.title} — featured venue`} fill sizes="(max-width: 768px) 100vw, 50vw" priority quality={80} className="object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#D4654A]/8 text-[#D4654A] border border-[#D4654A]/15 w-fit mb-6">
                  <Star className="w-3 h-3 fill-[#D4654A]" />Featured space
                </span>
                <h3 className="text-2xl md:text-3xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 leading-tight">{featured.title}</h3>
                <p className="text-[#8C7B66] text-[14px] font-light leading-relaxed mb-6">A stunning space flooded with natural light, perfect for exhibitions, launches, and intimate gatherings.</p>
                <div className="flex gap-6 mb-8">
                  <div className="flex items-center gap-2 text-[13px] text-[#8C7B66]"><Users className="w-4 h-4" />Up to {featured.capacity}</div>
                  <div className="flex items-center gap-2 text-[13px] text-[#8C7B66]"><MapPin className="w-4 h-4" />{featured.location}</div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-[#E0D5C5] gap-4">
                  <span className="font-[Georgia,serif] text-xl sm:text-2xl text-[#2C2418]">£{featured.price} <span className="text-[12px] text-[#A69580] font-sans font-light">/ hr</span></span>
                  <span className="px-5 sm:px-6 py-2.5 rounded-lg bg-[#2C2418] text-[#F5F0EA] text-[12px] sm:text-[13px] font-medium hover:bg-[#3D3226] transition-colors shrink-0">View space</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <VenueGrid venues={rest} priorityCount={3} />
      </div>
    </section>
  );
}
