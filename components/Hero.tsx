'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [guests, setGuests] = useState('');

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 bg-[#1B2E1B]">
      {/* Botanical texture overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C30 5 20 20 30 35 C40 20 30 5 30 5Z' fill='%23E8DFC9' opacity='0.5'/%3E%3Cpath d='M10 30 C10 30 25 25 35 40 C20 40 10 30 10 30Z' fill='%23E8DFC9' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E1B] via-transparent to-[#1B2E1B]" />
        {/* Warm glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A96E]/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6 mb-14"
        >
          {/* Small eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#C8A96E] text-[11px] tracking-[0.3em] uppercase font-medium"
          >
            Curated venues for elevated occasions
          </motion.p>

          <h1 className="text-[11vw] md:text-[7vw] font-display font-light text-[#E8DFC9] leading-[0.9] tracking-tight">
            Spaces that <br />
            <span className="italic text-[#C8A96E]">breathe</span>
          </h1>

          <p className="text-[15px] text-[#8FA882] font-light max-w-md mx-auto leading-relaxed mt-6">
            Where architecture meets nature. Discover venues that transform 
            your events into unforgettable experiences.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="bg-[#162816]/80 p-2 rounded-2xl border border-[#2A4A2A] backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center rounded-xl overflow-hidden">
              
              {/* Location */}
              <div 
                className="w-full md:w-[34%] flex items-center px-5 py-4 border-b md:border-b-0 md:border-r border-[#2A4A2A] hover:bg-[#2A4A2A]/20 transition-colors cursor-text"
                onClick={() => document.getElementById('location-input')?.focus()}
              >
                <div className="ml-2 flex-1 min-w-0">
                  <label className="block text-[10px] font-medium text-[#5A7A52] tracking-[0.1em] mb-1 cursor-text">Location</label>
                  <input
                    id="location-input"
                    type="text"
                    placeholder="City or region"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[#E8DFC9] placeholder-[#5A7A52]/60 text-sm outline-none truncate font-light"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Event Type */}
              <div 
                className="w-full md:w-[36%] flex items-center px-5 py-4 border-b md:border-b-0 md:border-r border-[#2A4A2A] hover:bg-[#2A4A2A]/20 transition-colors cursor-text"
                onClick={() => document.getElementById('event-input')?.focus()}
              >
                <div className="ml-2 flex-1 min-w-0">
                  <label className="block text-[10px] font-medium text-[#5A7A52] tracking-[0.1em] mb-1 cursor-text">Event type</label>
                  <input
                    id="event-input"
                    type="text"
                    placeholder="Wedding, exhibition..."
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[#E8DFC9] placeholder-[#5A7A52]/60 text-sm outline-none truncate font-light"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  />
                </div>
              </div>

              {/* Guests */}
              <div 
                className="w-full md:w-[22%] flex items-center px-5 py-4 hover:bg-[#2A4A2A]/20 transition-colors cursor-text"
                onClick={() => document.getElementById('guests-input')?.focus()}
              >
                <div className="ml-2 flex-1 min-w-0">
                  <label className="block text-[10px] font-medium text-[#5A7A52] tracking-[0.1em] mb-1 cursor-text">Guests</label>
                  <input
                    id="guests-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Count"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[#E8DFC9] placeholder-[#5A7A52]/60 text-sm outline-none truncate font-light"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="w-full md:w-auto p-2 shrink-0">
                <Link href="/venues" className="w-full h-14 md:h-14 md:w-14 flex items-center justify-center gap-2 bg-[#C8A96E] text-[#1B2E1B] rounded-xl hover:bg-[#D4B87A] transition-all">
                  <Search className="w-5 h-5" />
                  <span className="md:hidden text-[12px] font-medium">Search spaces</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trending tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <span className="text-[#5A7A52] text-[11px] tracking-wider py-1.5 font-light">Trending:</span>
          {['Garden', 'Conservatory', 'Terrace', 'Glasshouse'].map((tag) => (
            <button
              key={tag}
              onClick={() => setEventType(tag)}
              className="px-4 py-1.5 rounded-full border border-[#2A4A2A] bg-[#2A4A2A]/20 text-[#8FA882] text-[11px] tracking-wide font-light hover:bg-[#C8A96E] hover:text-[#1B2E1B] hover:border-[#C8A96E] transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
