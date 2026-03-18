'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "VenueVibe made finding a space for our product launch incredibly easy. The host was amazing and the space was exactly as pictured.",
    author: "Sarah Jenkins",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    avatar: "https://picsum.photos/seed/sarah/100/100",
  },
  {
    id: 2,
    quote: "I've booked several photo studios through this platform. The quality of venues and the ease of communication is unmatched.",
    author: "David Chen",
    role: "Freelance Photographer",
    company: "Studio DC",
    avatar: "https://picsum.photos/seed/david/100/100",
  },
  {
    id: 3,
    quote: "We hosted our annual company retreat at a stunning mansion we found here. It was a seamless experience from start to finish.",
    author: "Elena Rodriguez",
    role: "HR Manager",
    company: "Global Solutions",
    avatar: "https://picsum.photos/seed/elena/100/100",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-display font-light text-white mb-6 tracking-tighter uppercase">
              Voices of <span className="italic text-white/60">Prestige</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-white/50 text-sm tracking-[0.1em] uppercase max-w-sm leading-relaxed text-right">
              Don&apos;t just take our word for it. Hear from the people who use VenueVibe to bring their visions to life.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-transparent border border-white/10 p-10 relative group hover:bg-white/5 transition-colors duration-500"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-white/10 transition-colors duration-500" />
              
              <div className="flex flex-col h-full">
                <p className="text-white/80 text-lg font-light leading-relaxed mb-12 italic relative z-10">
                  &quot;{testimonial.quote}&quot;
                </p>
                
                <div className="mt-auto flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-light tracking-wide">{testimonial.author}</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.1em]">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
