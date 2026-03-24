'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [guests, setGuests] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set('q', location.trim());
    if (eventType.trim()) params.set('event', eventType.trim());
    if (guests.trim()) params.set('guests', guests.trim());
    const qs = params.toString();
    router.push(`/venues${qs ? `?${qs}` : ''}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleTagClick = (tag: string) => {
    setEventType(tag);
    const params = new URLSearchParams();
    if (location.trim()) params.set('q', location.trim());
    params.set('event', tag);
    if (guests.trim()) params.set('guests', guests.trim());
    router.push(`/venues?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[90vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 bg-[#EDE5D8]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDE5D8] via-transparent to-[#EDE5D8]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4654A]/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="max-w-4xl mx-auto space-y-6 mb-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[#D4654A] text-[11px] tracking-[0.3em] uppercase font-medium">
            Thoughtfully curated venues
          </motion.p>
          <h1 className="text-[11vw] md:text-[7vw] font-[Georgia,serif] font-normal text-[#2C2418] leading-[0.9] tracking-tight">
            Find your <br />
            <span className="italic text-[#8C7B66]">perfect space</span>
          </h1>
          <p className="text-[15px] text-[#8C7B66] font-light max-w-md mx-auto leading-relaxed mt-6">
            Thoughtfully curated venues for moments that matter. Discover spaces that transform your events into unforgettable experiences.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className="w-full max-w-4xl mx-auto">
          <div className="bg-white p-2 rounded-2xl border border-[#E0D5C5] shadow-sm">
            <div className="flex flex-col md:flex-row items-center rounded-xl overflow-hidden">
              <div className="w-full md:w-[34%] flex items-center px-5 py-4 border-b md:border-b-0 md:border-r border-[#E0D5C5] hover:bg-[#F8F4EE] transition-colors cursor-text" onClick={() => document.getElementById('location-input')?.focus()}>
                <div className="ml-2 flex-1 min-w-0">
                  <label className="block text-[10px] font-medium text-[#A69580] tracking-[0.1em] mb-1 cursor-text">Location</label>
                  <input id="location-input" type="text" placeholder="City or region" className="w-full bg-transparent border-none p-0 focus:ring-0 text-[#2C2418] placeholder-[#C4AE8F] text-sm outline-none truncate font-light" value={location} onChange={(e) => setLocation(e.target.value)} onKeyDown={handleKeyDown} />
                </div>
              </div>
              <div className="w-full md:w-[36%] flex items-center px-5 py-4 border-b md:border-b-0 md:border-r border-[#E0D5C5] hover:bg-[#F8F4EE] transition-colors cursor-text" onClick={() => document.getElementById('event-input')?.focus()}>
                <div className="ml-2 flex-1 min-w-0">
                  <label className="block text-[10px] font-medium text-[#A69580] tracking-[0.1em] mb-1 cursor-text">Event type</label>
                  <input id="event-input" type="text" placeholder="Wedding, exhibition..." className="w-full bg-transparent border-none p-0 focus:ring-0 text-[#2C2418] placeholder-[#C4AE8F] text-sm outline-none truncate font-light" value={eventType} onChange={(e) => setEventType(e.target.value)} onKeyDown={handleKeyDown} />
                </div>
              </div>
              <div className="w-full md:w-[22%] flex items-center px-5 py-4 hover:bg-[#F8F4EE] transition-colors cursor-text" onClick={() => document.getElementById('guests-input')?.focus()}>
                <div className="ml-2 flex-1 min-w-0">
                  <label className="block text-[10px] font-medium text-[#A69580] tracking-[0.1em] mb-1 cursor-text">Guests</label>
                  <input id="guests-input" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Count" className="w-full bg-transparent border-none p-0 focus:ring-0 text-[#2C2418] placeholder-[#C4AE8F] text-sm outline-none truncate font-light" value={guests} onChange={(e) => setGuests(e.target.value)} onKeyDown={handleKeyDown} />
                </div>
              </div>
              <div className="w-full md:w-auto p-2 shrink-0">
                <button onClick={handleSearch} className="w-full h-12 md:h-14 md:w-14 flex items-center justify-center gap-2 bg-[#2C2418] text-[#F5F0EA] rounded-xl hover:bg-[#3D3226] transition-all active:scale-[0.98]">
                  <Search className="w-5 h-5" />
                  <span className="md:hidden text-[13px] font-medium">Search spaces</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }} className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="text-[#A69580] text-[11px] tracking-wider py-1.5 font-light">Trending:</span>
          {['Garden', 'Studio', 'Terrace', 'Glasshouse'].map((tag) => (
            <button key={tag} onClick={() => handleTagClick(tag)} className="px-4 py-1.5 rounded-full border border-[#E0D5C5] bg-white text-[#8C7B66] text-[11px] tracking-wide font-light hover:bg-[#2C2418] hover:text-[#F5F0EA] hover:border-[#2C2418] transition-all duration-300">
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
