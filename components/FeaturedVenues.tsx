'use client';

import { motion } from 'motion/react';
import VenueCard from './VenueCard';
import { ArrowRight, Star, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
  const featured = venues[0];
  const rest = venues.slice(1, 7);

  return (
    <section className="py-28 bg-[#0F2618] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2A4A2A] to-transparent" />
      <div className="absolute -left-48 top-1/4 w-[400px] h-[400px] bg-[#C8A96E]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#C8A96E] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Hand-picked</p>
            <h2 className="text-4xl md:text-6xl font-display font-light text-[#E8DFC9] tracking-tight">
              Curated <span className="italic text-[#C8A96E]">collection</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/venues" className="group flex items-center gap-3 text-[13px] text-[#8FA882] hover:text-[#C8A96E] transition-colors font-light border-b border-[#2A4A2A] hover:border-[#C8A96E] pb-2">
              View all spaces
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Featured Venue Card */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 group"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 bg-[#162816] border border-[#2A4A2A] rounded-xl overflow-hidden hover:border-[#C8A96E]/40 transition-colors duration-500 cursor-pointer">
              <div className="relative min-h-[280px] md:min-h-[380px] overflow-hidden">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#C8A96E]/12 text-[#C8A96E] border border-[#C8A96E]/20 w-fit mb-6">
                  <Star className="w-3 h-3 fill-[#C8A96E]" />
                  Featured space
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-light text-[#E8DFC9] mb-3 leading-tight">
                  {featured.title}
                </h3>
                <p className="text-[#5A7A52] text-[14px] font-light leading-relaxed mb-6">
                  A stunning space flooded with natural light, perfect for exhibitions, launches, and intimate gatherings.
                </p>
                <div className="flex gap-6 mb-8">
                  <div className="flex items-center gap-2 text-[13px] text-[#8FA882]">
                    <Users className="w-4 h-4" />
                    Up to {featured.capacity}
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#8FA882]">
                    <MapPin className="w-4 h-4" />
                    {featured.location}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-[#2A4A2A]">
                  <span className="font-display text-2xl text-[#C8A96E]">
                    £{featured.price} <span className="text-[12px] text-[#5A7A52] font-sans font-light">/ hr</span>
                  </span>
                  <span className="px-6 py-2.5 rounded-lg bg-[#C8A96E] text-[#1B2E1B] text-[13px] font-medium hover:bg-[#D4B87A] transition-colors">
                    View space
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <VenueCard {...venue} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
