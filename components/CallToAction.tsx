'use client';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-28 bg-[#EDE5D8] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} className="bg-white border border-[#E0D5C5] rounded-2xl p-12 md:p-20 relative overflow-hidden">
          <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-6">Join the community</p>
          <h2 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight leading-tight">Elevate your <br className="hidden md:block" /><span className="italic text-[#8C7B66]">experience</span></h2>
          <p className="text-[#8C7B66] text-[15px] font-light max-w-lg mx-auto leading-relaxed mb-10">Join a curated community of hosts and guests creating unforgettable moments in extraordinary spaces.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/venues" className="w-full sm:w-auto px-8 py-3.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors inline-flex items-center justify-center">Discover spaces</Link>
            <Link href="/list-venue" className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-[#5C4E3C] text-[13px] font-light rounded-lg hover:bg-[#EDE5D8] border border-[#C4AE8F] transition-all flex items-center justify-center gap-2 group">
              List your venue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
