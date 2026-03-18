'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-white/5 to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="bg-transparent border border-white/10 p-12 md:p-24 relative"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm -z-10" />
          <h2 className="text-5xl md:text-7xl font-display font-light text-white mb-8 tracking-tighter uppercase leading-tight">
            Elevate your <br className="hidden md:block" />
            <span className="italic text-white/60">Experience</span>
          </h2>
          <p className="text-white/50 text-sm tracking-[0.1em] uppercase max-w-xl mx-auto leading-relaxed mb-12">
            Join a curated community of hosts and guests creating unforgettable moments in extraordinary spaces.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/venues" className="w-full sm:w-auto px-10 py-4 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center">
              Discover Spaces
            </Link>
            <Link href="/list-venue" className="w-full sm:w-auto px-10 py-4 bg-transparent text-white text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-white/10 border border-white/20 transition-colors flex items-center justify-center gap-3 group">
              List Your Venue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
