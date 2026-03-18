'use client';

import { motion } from 'motion/react';
import { Search, CalendarCheck, Sparkles } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Browse thousands of unique spaces. Filter by location, price, amenities, and more to find the perfect match.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: CalendarCheck,
    title: 'Book',
    description: 'Connect with hosts directly, confirm availability, and book securely online in just a few clicks.',
    color: 'from-violet-500 to-fuchsia-400',
  },
  {
    icon: Sparkles,
    title: 'Experience',
    description: 'Show up and enjoy your event. Our hosts are dedicated to making sure your experience is flawless.',
    color: 'from-amber-500 to-orange-400',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-display font-light text-white mb-6 tracking-tighter uppercase">
            The <span className="italic text-white/60">Process</span>
          </h2>
          <p className="text-white/50 text-sm tracking-[0.1em] uppercase max-w-xl mx-auto leading-relaxed">
            Booking a space has never been easier. From discovery to the day of your event, we&apos;ve got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 rounded-full bg-transparent border border-white/20 mb-10 transform group-hover:-translate-y-2 transition-transform duration-500 flex items-center justify-center`}>
                <step.icon className={`w-8 h-8 text-white/60 group-hover:text-white transition-colors duration-500`} strokeWidth={1} />
              </div>
              
              <h3 className="text-2xl font-display font-light text-white mb-4 tracking-wide">{step.title}</h3>
              <p className="text-white/50 font-light leading-relaxed max-w-sm text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
