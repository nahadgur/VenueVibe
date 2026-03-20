'use client';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const TESTIMONIALS = [
  { id: 1, quote: "VenueVibe made finding a space for our product launch incredibly easy. The host was amazing and the space was exactly as pictured.", author: "Sarah Jenkins", role: "Marketing Director", company: "TechFlow Inc.", avatar: "https://picsum.photos/seed/sarah/100/100" },
  { id: 2, quote: "I've booked several photo studios through this platform. The quality of venues and the ease of communication is unmatched.", author: "David Chen", role: "Freelance Photographer", company: "Studio DC", avatar: "https://picsum.photos/seed/david/100/100" },
  { id: 3, quote: "We hosted our annual company retreat at a stunning mansion we found here. It was a seamless experience from start to finish.", author: "Elena Rodriguez", role: "HR Manager", company: "Global Solutions", avatar: "https://picsum.photos/seed/elena/100/100" },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#F5F0EA] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E0D5C5] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] tracking-tight">Voices of <span className="italic text-[#8C7B66]">trust</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <p className="text-[#8C7B66] text-[14px] font-light max-w-sm leading-relaxed md:text-right">Don&apos;t just take our word for it. Hear from the people who bring their visions to life with VenueVibe.</p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: index * 0.15 }} className="bg-white border border-[#E0D5C5] rounded-xl p-8 relative group hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-500">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#D4654A]/8 group-hover:text-[#D4654A]/15 transition-colors duration-500" />
              <div className="flex flex-col h-full">
                <p className="text-[#5C4E3C] text-[15px] font-light leading-relaxed mb-10 italic font-[Georgia,serif] relative z-10">&quot;{t.quote}&quot;</p>
                <div className="mt-auto flex items-center gap-4 pt-5 border-t border-[#E0D5C5]">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#E0D5C5]">
                    <Image src={t.avatar} alt={t.author} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-[#2C2418] font-[Georgia,serif] font-normal text-[15px]">{t.author}</h4>
                    <p className="text-[#A69580] text-[12px] font-light">{t.role}, {t.company}</p>
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
