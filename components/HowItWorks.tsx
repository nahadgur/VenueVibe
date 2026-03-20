'use client';

import { motion } from 'motion/react';
import { Search, CalendarCheck, Sparkles } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Discover',
    description: 'Browse thousands of unique spaces. Filter by location, price, amenities, and more to find the perfect match.',
  },
  {
    icon: CalendarCheck,
    number: '02',
    title: 'Book',
    description: 'Connect with hosts directly, confirm availability, and book securely online in just a few clicks.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Experience',
    description: 'Show up and enjoy your event. Our hosts are dedicated to making sure your experience is flawless.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 bg-[#1B2E1B] relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2A4A2A] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-[#C8A96E] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Simple process</p>
          <h2 className="text-4xl md:text-6xl font-display font-light text-[#E8DFC9] tracking-tight mb-6">
            How it <span className="italic text-[#C8A96E]">works</span>
          </h2>
          <p className="text-[#5A7A52] text-[15px] font-light leading-relaxed max-w-lg mx-auto">
            From discovery to the day of your event, finding the perfect space has never been easier.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-[#2A4A2A] via-[#C8A96E]/20 to-[#2A4A2A] z-0" />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#162816] border border-[#2A4A2A] mb-8 flex items-center justify-center group-hover:border-[#C8A96E]/40 group-hover:bg-[#C8A96E]/5 transition-all duration-500">
                <step.icon className="w-7 h-7 text-[#C8A96E]/70 group-hover:text-[#C8A96E] transition-colors duration-500" strokeWidth={1.5} />
              </div>

              <span className="text-[#C8A96E]/30 font-display text-sm mb-3">{step.number}</span>
              <h3 className="text-xl font-display font-normal text-[#E8DFC9] mb-3">{step.title}</h3>
              <p className="text-[#5A7A52] font-light leading-relaxed max-w-xs text-[14px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
