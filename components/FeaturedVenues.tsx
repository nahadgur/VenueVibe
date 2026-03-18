'use client';

import { motion } from 'motion/react';
import VenueCard from './VenueCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useVenues } from '@/hooks/useVenues';

export const VENUES = [
  {
    id: '1',
    title: 'The Glasshouse Loft',
    location: 'Downtown Manhattan, NY',
    price: 250,
    rating: 4.9,
    reviews: 128,
    capacity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
    isSuperhost: true,
  },
  {
    id: '2',
    title: 'Industrial Warehouse Studio',
    location: 'Arts District, LA',
    price: 180,
    rating: 4.8,
    reviews: 95,
    capacity: 300,
    imageUrl: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?q=80&w=800&auto=format&fit=crop',
    isSuperhost: false,
  },
  {
    id: '3',
    title: 'Rooftop Garden Oasis',
    location: 'West Loop, Chicago',
    price: 320,
    rating: 5.0,
    reviews: 210,
    capacity: 80,
    imageUrl: 'https://images.unsplash.com/photo-1572364769167-198dcb7b520c?q=80&w=800&auto=format&fit=crop',
    isSuperhost: true,
  },
  {
    id: '4',
    title: 'Historic Mansion Parlor',
    location: 'Beacon Hill, Boston',
    price: 450,
    rating: 4.7,
    reviews: 64,
    capacity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    isSuperhost: false,
  },
  {
    id: '5',
    title: 'Modern Art Gallery',
    location: 'Wynwood, Miami',
    price: 200,
    rating: 4.9,
    reviews: 156,
    capacity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop',
    isSuperhost: true,
  },
  {
    id: '6',
    title: 'Minimalist Daylight Studio',
    location: 'Williamsburg, Brooklyn',
    price: 120,
    rating: 4.6,
    reviews: 82,
    capacity: 30,
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
    isSuperhost: false,
  },
];

export default function FeaturedVenues() {
  const { venues } = useVenues();
  const featuredVenues = venues.slice(0, 6);

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -left-64 top-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-64 bottom-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-display font-light text-white mb-6 tracking-tighter uppercase">
              Curated <span className="italic text-white/60">Collection</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/venues" className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors border-b border-white/20 pb-2">
              View Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VenueCard {...venue} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
