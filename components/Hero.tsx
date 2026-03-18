'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [guests, setGuests] = useState('');

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-[#050505]">
      {/* Abstract Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6 mb-12"
        >
          <h1 className="text-[12vw] md:text-[8vw] font-display font-light tracking-tighter text-white leading-[0.85] uppercase">
            Prestige <br />
            <span className="italic text-white/70">Spaces</span>
          </h1>
          <p className="text-sm md:text-base text-white/50 font-light max-w-xl mx-auto leading-relaxed tracking-wide uppercase mt-8">
            Discover exclusive venues for extraordinary events.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="bg-transparent p-2 rounded-full shadow-2xl border border-white/20 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center rounded-full overflow-hidden">
              
              {/* Location */}
              <div className="w-full md:w-[32%] flex items-center px-5 py-4 border-b md:border-b-0 md:border-r border-white/10 group text-left hover:bg-white/5 transition-colors cursor-text" onClick={() => document.getElementById('location-input')?.focus()}>
                <div className="ml-4 flex-1 min-w-0">
                  <label className="block text-[9px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-1 cursor-text">Location</label>
                  <input
                    id="location-input"
                    type="text"
                    placeholder="City or region"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-white placeholder-white/20 text-sm md:text-base outline-none truncate font-light tracking-wide"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="w-full md:w-[35%] flex items-center px-5 py-4 border-b md:border-b-0 md:border-r border-white/10 group text-left hover:bg-white/5 transition-colors cursor-text" onClick={() => document.getElementById('event-input')?.focus()}>
                <div className="ml-4 flex-1 min-w-0">
                  <label className="block text-[9px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-1 cursor-text">Event Type</label>
                  <input
                    id="event-input"
                    type="text"
                    placeholder="Gala, Exhibition..."
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-white placeholder-white/20 text-sm md:text-base outline-none truncate font-light tracking-wide"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="w-full md:w-[25%] flex items-center px-5 py-4 group text-left hover:bg-white/5 transition-colors cursor-text" onClick={() => document.getElementById('guests-input')?.focus()}>
                <div className="ml-4 flex-1 min-w-0">
                  <label className="block text-[9px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-1 cursor-text">Guests</label>
                  <input
                    id="guests-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Count"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-white placeholder-white/20 text-sm md:text-base outline-none truncate font-light tracking-wide"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="w-full md:w-auto p-2 shrink-0 bg-transparent">
                <Link href="/venues" className="w-full h-14 md:h-14 md:w-14 flex items-center justify-center gap-2 bg-white text-black rounded-full hover:bg-white/80 transition-all">
                  <Search className="w-5 h-5" />
                  <span className="md:hidden text-[11px] uppercase tracking-widest font-semibold">Search</span>
                </Link>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Popular searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-widest py-1.5">Trending:</span>
          {['Photo Studio', 'Mansion', 'Warehouse', 'Rooftop'].map((tag) => (
            <button key={tag} onClick={() => setEventType(tag)} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors shadow-sm">
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
