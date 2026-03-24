'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Loader2 } from 'lucide-react';
import VenueCard from './VenueCard';
import MobileFilters, { type FilterState } from './MobileFilters';
import { useVenues } from '@/hooks/useVenues';

export default function VenueSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    capacityMin: 0,
    eventTypes: [],
    amenities: [],
    vibeTags: [],
    venueTypes: [],
    sortBy: 'relevance',
  });
  const { venues, loading } = useVenues();

  const filteredVenues = venues
    .filter((venue) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        venue.title.toLowerCase().includes(query) ||
        venue.location.toLowerCase().includes(query) ||
        (venue.area || '').toLowerCase().includes(query) ||
        (venue.city || '').toLowerCase().includes(query);
      const matchesPrice =
        venue.price >= filters.priceRange[0] &&
        venue.price <= filters.priceRange[1];
      const matchesCapacity = venue.capacity >= filters.capacityMin;
      const matchesVibe = filters.vibeTags.length === 0 ||
        filters.vibeTags.some(tag => (venue.vibeTags || []).includes(tag as any));
      const matchesVenueType = filters.venueTypes.length === 0 ||
        filters.venueTypes.some(vt => (venue.venueType || '').toLowerCase().includes(vt.toLowerCase()));

      return matchesSearch && matchesPrice && matchesCapacity && matchesVibe && matchesVenueType;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'response-time': return (a.avgResponseMinutes || 9999) - (b.avgResponseMinutes || 9999);
        default: return 0;
      }
    });

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#A69580]" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-5 bg-transparent border-b border-[#E0D5C5] text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors text-lg font-light"
            placeholder="Search by venue name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <MobileFilters onFilterChange={setFilters} />

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-32">
          <Loader2 className="w-8 h-8 text-[#C4AE8F] animate-spin" />
        </div>
      ) : filteredVenues.length > 0 ? (
        <>
          <p className="text-[13px] text-[#A69580] font-light mb-6">
            {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </>
      ) : (
        <div className="text-center py-32 border-t border-[#E0D5C5]">
          <p className="text-[#8C7B66] text-lg font-light">No venues found matching your criteria.</p>
          <button
            onClick={() => { setSearchQuery(''); setFilters({ priceRange: [0, 1000], capacityMin: 0, eventTypes: [], amenities: [], vibeTags: [], venueTypes: [], sortBy: 'relevance' }); }}
            className="mt-6 text-[13px] text-[#D4654A] hover:text-[#C05A42] transition-colors font-light border-b border-[#D4654A]/30 pb-1"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
