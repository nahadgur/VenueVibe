'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  capacityMin: number;
  eventTypes: string[];
  amenities: string[];
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating';
}

const EVENT_TYPE_OPTIONS = ['Corporate', 'Wedding', 'Photo Shoot', 'Workshop', 'Private Dining', 'Exhibition', 'Conference', 'Party'];
const AMENITY_OPTIONS = ['WiFi', 'Parking', 'Kitchen', 'Natural Light', 'AV Equipment', 'Outdoor Area', 'Wheelchair Access', 'Air Con'];
const SORT_OPTIONS = [
  { value: 'relevance' as const, label: 'Relevance' },
  { value: 'price-low' as const, label: 'Price: low to high' },
  { value: 'price-high' as const, label: 'Price: high to low' },
  { value: 'rating' as const, label: 'Highest rated' },
];

const DEFAULT_FILTERS: FilterState = {
  priceRange: [0, 1000],
  capacityMin: 0,
  eventTypes: [],
  amenities: [],
  sortBy: 'relevance',
};

export default function MobileFilters({ onFilterChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [tempFilters, setTempFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const activeCount = [
    filters.eventTypes.length > 0,
    filters.amenities.length > 0,
    filters.priceRange[1] < 1000,
    filters.capacityMin > 0,
    filters.sortBy !== 'relevance',
  ].filter(Boolean).length;

  const openSheet = () => {
    setTempFilters({ ...filters });
    setIsOpen(true);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    onFilterChange(tempFilters);
    setIsOpen(false);
  };

  const clearAll = () => {
    setTempFilters(DEFAULT_FILTERS);
  };

  const toggleChip = (
    list: string[],
    item: string,
    setter: (val: string[]) => void
  ) => {
    setter(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  return (
    <>
      {/* ── Trigger Bar ── */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 -mx-1 px-1">
        {/* Filter button */}
        <button
          onClick={openSheet}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-[13px] font-light shrink-0 transition-all ${
            activeCount > 0
              ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]'
              : 'bg-white text-[#5C4E3C] border-[#E0D5C5] hover:border-[#C4AE8F]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#D4654A] text-white text-[10px] font-medium flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {/* Sort quick-select */}
        <div className="relative shrink-0">
          <select
            value={filters.sortBy}
            onChange={(e) => {
              const newFilters = { ...filters, sortBy: e.target.value as FilterState['sortBy'] };
              setFilters(newFilters);
              onFilterChange(newFilters);
            }}
            className="appearance-none bg-white border border-[#E0D5C5] rounded-lg pl-3 pr-8 py-2.5 text-[13px] font-light text-[#5C4E3C] focus:outline-none focus:border-[#D4654A] cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A69580] pointer-events-none" />
        </div>

        {/* Quick event type chips */}
        {EVENT_TYPE_OPTIONS.slice(0, 4).map((type) => (
          <button
            key={type}
            onClick={() => {
              const newTypes = filters.eventTypes.includes(type)
                ? filters.eventTypes.filter((t) => t !== type)
                : [...filters.eventTypes, type];
              const newFilters = { ...filters, eventTypes: newTypes };
              setFilters(newFilters);
              onFilterChange(newFilters);
            }}
            className={`px-3.5 py-2.5 rounded-lg border text-[12px] font-light shrink-0 transition-all ${
              filters.eventTypes.includes(type)
                ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]'
                : 'bg-white text-[#8C7B66] border-[#E0D5C5] hover:border-[#C4AE8F]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ── Bottom Sheet (mobile) / Side Panel ── */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-[80]"
            onClick={() => setIsOpen(false)}
          />

          {/* Sheet */}
          <div className="fixed inset-x-0 bottom-0 md:inset-y-0 md:left-auto md:right-0 md:w-[420px] z-[90] bg-[#F5F0EA] rounded-t-2xl md:rounded-none shadow-xl max-h-[85vh] md:max-h-none flex flex-col pb-[env(safe-area-inset-bottom)]">
            {/* Drag handle for mobile */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-10 h-1 rounded-full bg-[#E0D5C5]" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0D5C5] shrink-0">
              <h2 className="text-[16px] font-[Georgia,serif] text-[#2C2418]">Filters</h2>
              <div className="flex items-center gap-3">
                <button onClick={clearAll} className="text-[12px] text-[#D4654A] font-light">Clear all</button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-[#EDE5D8] transition-colors">
                  <X className="w-5 h-5 text-[#8C7B66]" />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {/* Price range */}
              <div>
                <label className="block text-[13px] font-medium text-[#2C2418] mb-3">Price per hour</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] text-[#A69580] mb-1">Min</label>
                    <input
                      type="number"
                      value={tempFilters.priceRange[0]}
                      onChange={(e) => setTempFilters({ ...tempFilters, priceRange: [Number(e.target.value), tempFilters.priceRange[1]] })}
                      className="w-full bg-white border border-[#E0D5C5] rounded-lg px-3 py-2.5 text-[14px] text-[#2C2418] font-light focus:outline-none focus:border-[#D4654A]"
                      placeholder="£0"
                    />
                  </div>
                  <span className="text-[#C4AE8F] mt-5">—</span>
                  <div className="flex-1">
                    <label className="block text-[10px] text-[#A69580] mb-1">Max</label>
                    <input
                      type="number"
                      value={tempFilters.priceRange[1]}
                      onChange={(e) => setTempFilters({ ...tempFilters, priceRange: [tempFilters.priceRange[0], Number(e.target.value)] })}
                      className="w-full bg-white border border-[#E0D5C5] rounded-lg px-3 py-2.5 text-[14px] text-[#2C2418] font-light focus:outline-none focus:border-[#D4654A]"
                      placeholder="£1000"
                    />
                  </div>
                </div>
              </div>

              {/* Min capacity */}
              <div>
                <label className="block text-[13px] font-medium text-[#2C2418] mb-3">Minimum capacity</label>
                <div className="flex gap-2 flex-wrap">
                  {[0, 10, 25, 50, 100, 200].map((cap) => (
                    <button
                      key={cap}
                      onClick={() => setTempFilters({ ...tempFilters, capacityMin: cap })}
                      className={`px-4 py-2.5 rounded-lg border text-[13px] font-light transition-all ${
                        tempFilters.capacityMin === cap
                          ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]'
                          : 'bg-white text-[#8C7B66] border-[#E0D5C5]'
                      }`}
                    >
                      {cap === 0 ? 'Any' : `${cap}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event types */}
              <div>
                <label className="block text-[13px] font-medium text-[#2C2418] mb-3">Event type</label>
                <div className="flex gap-2 flex-wrap">
                  {EVENT_TYPE_OPTIONS.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleChip(tempFilters.eventTypes, type, (val) => setTempFilters({ ...tempFilters, eventTypes: val }))}
                      className={`px-4 py-2.5 rounded-lg border text-[13px] font-light transition-all ${
                        tempFilters.eventTypes.includes(type)
                          ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]'
                          : 'bg-white text-[#8C7B66] border-[#E0D5C5]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-[13px] font-medium text-[#2C2418] mb-3">Amenities</label>
                <div className="flex gap-2 flex-wrap">
                  {AMENITY_OPTIONS.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleChip(tempFilters.amenities, amenity, (val) => setTempFilters({ ...tempFilters, amenities: val }))}
                      className={`px-4 py-2.5 rounded-lg border text-[13px] font-light transition-all ${
                        tempFilters.amenities.includes(amenity)
                          ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]'
                          : 'bg-white text-[#8C7B66] border-[#E0D5C5]'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#E0D5C5] shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
              <button
                onClick={applyFilters}
                className="w-full py-3.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
              >
                Show results
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
