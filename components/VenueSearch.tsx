'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Loader2 } from 'lucide-react';
import VenueCard from './VenueCard';
import { useVenues } from '@/hooks/useVenues';

export default function VenueSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { venues, loading } = useVenues();

  const filteredVenues = venues.filter((venue) => {
    const query = searchQuery.toLowerCase();
    return (
      venue.title.toLowerCase().includes(query) ||
      venue.location.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-12">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/40" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-5 bg-transparent border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors text-lg font-light tracking-wide"
            placeholder="Search by venue name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="flex justify-center py-32">
          <Loader2 className="w-8 h-8 text-white/40 animate-spin" />
        </div>
      ) : filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <VenueCard {...venue} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 border-t border-white/10">
          <p className="text-white/50 text-lg font-light tracking-wide">No venues found matching &quot;{searchQuery}&quot;.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-6 text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
