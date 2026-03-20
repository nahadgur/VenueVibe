'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-28 bg-[#1B2E1B] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A96E]/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-[#162816] border border-[#2A4A2A] rounded-2xl p-12 md:p-20 relative overflow-hidden"
        >
          {/* Subtle leaf texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 C40 10 25 30 40 50 C55 30 40 10 40 10Z' fill='%23E8DFC9'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }} />

          <p className="text-[#C8A96E] text-[11px] tracking-[0.25em] uppercase font-medium mb-6">Join the community</p>

          <h2 className="text-4xl md:text-6xl font-display font-light text-[#E8DFC9] mb-6 tracking-tight leading-tight">
            Elevate your <br className="hidden md:block" />
            <span className="italic text-[#C8A96E]">experience</span>
          </h2>

          <p className="text-[#5A7A52] text-[15px] font-light max-w-lg mx-auto leading-relaxed mb-10">
            Join a curated community of hosts and guests creating unforgettable moments in extraordinary spaces.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/venues" className="w-full sm:w-auto px-8 py-3.5 bg-[#C8A96E] text-[#1B2E1B] text-[13px] font-medium rounded-lg hover:bg-[#D4B87A] transition-colors inline-flex items-center justify-center">
              Discover spaces
            </Link>
            <Link href="/list-venue" className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-[#8FA882] text-[13px] font-light rounded-lg hover:bg-[#2A4A2A]/30 border border-[#2A4A2A] hover:border-[#3A5A3A] transition-all flex items-center justify-center gap-2 group">
              List your venue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
