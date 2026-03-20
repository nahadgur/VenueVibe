'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, MapPin, Heart, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

interface VenueCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating?: number;
  reviews?: number;
  capacity: number;
  imageUrl: string;
  isSuperhost?: boolean;
  priority?: boolean;
}

export default function VenueCard({ id, title, location, price, rating = 0, reviews = 0, capacity, imageUrl, isSuperhost = false, priority = false }: VenueCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link href={`/venue/${id}`}>
      <motion.div className="group relative flex flex-col bg-white border border-[#E0D5C5] rounded-xl overflow-hidden cursor-pointer hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-500" onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl">
          <Image src={imageUrl} alt={`${title} — venue space in ${location}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" priority={priority} loading={priority ? 'eager' : 'lazy'} quality={75} className={`object-cover transition-transform duration-1000 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`} referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          {isSuperhost && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/90 text-[#2C2418] backdrop-blur-sm">
                <BadgeCheck className="w-3 h-3 text-[#D4654A]" />Verified
              </span>
            </div>
          )}
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsLiked(!isLiked); }} className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all">
            <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-[#D4654A] text-[#D4654A]' : 'text-[#8C7B66]'}`} />
          </button>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-[Georgia,serif] font-normal text-[#2C2418] leading-snug mb-1.5 group-hover:text-[#D4654A] transition-colors duration-300">{title}</h3>
          <div className="flex items-center gap-1.5 mb-4">
            <MapPin className="w-3 h-3 text-[#A69580]" />
            <span className="text-[12px] text-[#A69580] font-light">{location}</span>
          </div>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E0D5C5]">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#D4654A] text-[#D4654A]" />
              <span className="text-[13px] text-[#2C2418] font-light">{rating}</span>
              <span className="text-[11px] text-[#A69580]">({reviews})</span>
            </div>
            <div className="text-[#2C2418] font-[Georgia,serif] text-lg">
              £{price} <span className="text-[11px] text-[#A69580] font-sans font-light">/ hr</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
