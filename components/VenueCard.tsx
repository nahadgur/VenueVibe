'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Star, MapPin, Heart } from 'lucide-react';
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
}

export default function VenueCard({
  id,
  title,
  location,
  price,
  rating = 0,
  reviews = 0,
  capacity,
  imageUrl,
  isSuperhost = false,
}: VenueCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="group relative flex flex-col bg-[#162816] border border-[#2A4A2A] rounded-xl overflow-hidden cursor-pointer hover:border-[#3A5A3A] transition-colors duration-500"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`object-cover transition-transform duration-1000 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#162816] via-transparent to-transparent opacity-60" />

        {/* Badge */}
        {isSuperhost && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#C8A96E]/15 text-[#C8A96E] border border-[#C8A96E]/25 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-[#C8A96E]" />
              Curated
            </span>
          </div>
        )}

        {/* Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1B2E1B]/50 border border-[#2A4A2A] backdrop-blur-sm hover:bg-[#C8A96E]/20 transition-all"
        >
          <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-[#C8A96E] text-[#C8A96E]' : 'text-[#8FA882]'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-display font-normal text-[#E8DFC9] leading-snug mb-1.5 group-hover:text-[#C8A96E] transition-colors duration-300">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 mb-4">
          <MapPin className="w-3 h-3 text-[#5A7A52]" />
          <span className="text-[12px] text-[#5A7A52] font-light">{location}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2A4A2A]">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-[#C8A96E] text-[#C8A96E]" />
            <span className="text-[13px] text-[#E8DFC9] font-light">{rating}</span>
            <span className="text-[11px] text-[#5A7A52]">({reviews})</span>
          </div>
          <div className="text-[#C8A96E] font-display text-lg">
            £{price} <span className="text-[11px] text-[#5A7A52] font-sans font-light">/ hr</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
