'use client';

import { motion } from 'motion/react';
import VenueCard from './VenueCard';
import type { Venue } from '@/lib/types';

interface VenueGridProps {
  venues: Venue[];
  priorityCount?: number;
}

export default function VenueGrid({ venues, priorityCount = 3 }: VenueGridProps) {
  if (venues.length === 0) {
    return (
      <div className="text-center py-20 border border-[#E0D5C5] border-dashed rounded-xl">
        <p className="text-[#8C7B66] text-[15px] font-light">No venues found in this area yet.</p>
        <p className="text-[#A69580] text-[13px] font-light mt-2">Check back soon — new spaces are added weekly.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue, index) => (
        <motion.div key={venue.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
          <VenueCard {...venue} priority={index < priorityCount} />
        </motion.div>
      ))}
    </div>
  );
}
