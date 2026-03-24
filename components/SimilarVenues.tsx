import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import VenueGrid from './VenueGrid';
import type { Venue } from '@/lib/types';

interface SimilarVenuesProps {
  currentVenue: Venue;
  allVenues: Venue[];
  maxResults?: number;
}

export default function SimilarVenues({ currentVenue, allVenues, maxResults = 3 }: SimilarVenuesProps) {
  // Score each venue by similarity
  const scored = allVenues
    .filter(v => v.id !== currentVenue.id)
    .map(v => {
      let score = 0;

      // Same city = strong signal
      if (v.city && currentVenue.city && v.city.toLowerCase() === currentVenue.city.toLowerCase()) score += 5;

      // Same area = very strong
      if (v.area && currentVenue.area && v.area.toLowerCase() === currentVenue.area.toLowerCase()) score += 8;

      // Location string overlap
      if (v.location.toLowerCase().includes(currentVenue.location.split(',')[0]?.toLowerCase().trim() || '___')) score += 3;

      // Same venue type
      if (v.venueType && currentVenue.venueType && v.venueType === currentVenue.venueType) score += 6;

      // Overlapping vibe tags
      const sharedVibes = (v.vibeTags || []).filter(t => (currentVenue.vibeTags || []).includes(t)).length;
      score += sharedVibes * 2;

      // Overlapping event types
      const sharedEvents = (v.eventTypesSupported || []).filter(e => (currentVenue.eventTypesSupported || []).includes(e)).length;
      score += sharedEvents;

      // Similar capacity (within 50%)
      const capRatio = Math.min(v.capacity, currentVenue.capacity) / Math.max(v.capacity, currentVenue.capacity);
      if (capRatio > 0.5) score += 2;

      // Similar price (within 50%)
      const priceRatio = Math.min(v.price, currentVenue.price) / Math.max(v.price, currentVenue.price);
      if (priceRatio > 0.5) score += 2;

      return { venue: v, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(s => s.venue);

  if (scored.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-[#E0D5C5]">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-3">You might also like</p>
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] tracking-tight">
            Similar <span className="italic text-[#8C7B66]">spaces</span>
          </h2>
        </div>
        <Link href="/venues" className="group flex items-center gap-2 text-[13px] text-[#8C7B66] hover:text-[#D4654A] transition-colors font-light shrink-0">
          Browse all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <VenueGrid venues={scored} priorityCount={0} />
    </section>
  );
}
