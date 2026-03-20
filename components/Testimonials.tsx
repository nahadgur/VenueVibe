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
    <section className="py-28 bg-[#0F2618] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2A4A2A] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#C8A96E] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-6xl font-display font-light text-[#E8DFC9] tracking-tight">
              Voices of <span className="italic text-[#C8A96E]">trust</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#5A7A52] text-[14px] font-light max-w-sm leading-relaxed md:text-right">
              Don&apos;t just take our word for it. Hear from the people who bring their visions to life with VenueVibe.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-[#162816] border border-[#2A4A2A] rounded-xl p-8 relative group hover:border-[#3A5A3A] transition-colors duration-500"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#C8A96E]/8 group-hover:text-[#C8A96E]/15 transition-colors duration-500" />

              <div className="flex flex-col h-full">
                <p className="text-[#A8C49A] text-[15px] font-light leading-relaxed mb-10 italic font-display relative z-10">
                  &quot;{testimonial.quote}&quot;
                </p>

                <div className="mt-auto flex items-center gap-4 pt-5 border-t border-[#2A4A2A]">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#2A4A2A] grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-[#E8DFC9] font-display font-normal text-[15px]">{testimonial.author}</h4>
                    <p className="text-[#5A7A52] text-[12px] font-light">{testimonial.role}, {testimonial.company}</p>
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
