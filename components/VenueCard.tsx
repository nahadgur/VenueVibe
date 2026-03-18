'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Star, MapPin, Users, Heart } from 'lucide-react';
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
      className="group relative flex flex-col bg-transparent border-none rounded-none overflow-hidden cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`object-cover transition-transform duration-1000 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          {isSuperhost && (
            <span className="px-4 py-1.5 border border-white/30 bg-black/40 backdrop-blur-md text-white text-[9px] font-semibold uppercase tracking-[0.2em] rounded-full">
              Prestige
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-6 right-6 p-2.5 rounded-full border border-white/30 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-all"
        >
          <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="py-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-display font-light text-white leading-tight group-hover:text-white/70 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0 ml-4">
            <span className="text-white text-sm font-light">{rating}</span>
            <span className="text-white/40 text-[10px] uppercase tracking-widest">({reviews})</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
            {location}
          </div>
          <div className="text-white font-light tracking-wide">
            £{price} <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">/ hr</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
