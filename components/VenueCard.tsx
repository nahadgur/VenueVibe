'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, MapPin, Heart, BadgeCheck, Clock } from 'lucide-react';
import { useState } from 'react';
import { formatPrice, formatResponseTime } from '@/lib/types';
import type { Venue } from '@/lib/types';

interface VenueCardProps extends Venue {
  priority?: boolean;
  onToggleSave?: (id: string) => void;
  isSavedExternal?: boolean;
}

export default function VenueCard({
  id, title, location, price, pricingModel, rating = 0, reviews = 0,
  capacity, imageUrl, isSuperhost = false, isVerified = false,
  vibeTags = [], avgResponseMinutes, priority = false,
  onToggleSave, isSavedExternal,
}: VenueCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLikedLocal, setIsLikedLocal] = useState(false);

  const isLiked = isSavedExternal !== undefined ? isSavedExternal : isLikedLocal;

  const handleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave(id);
    } else {
      setIsLikedLocal(!isLikedLocal);
    }
  };

  const priceDisplay = formatPrice({ price, pricingModel } as Venue);
  const responseDisplay = avgResponseMinutes ? formatResponseTime(avgResponseMinutes) : null;

  return (
    <Link href={`/venue/${id}`}>
      <motion.div
        className="group relative flex flex-col bg-white border border-[#E0D5C5] rounded-xl overflow-hidden cursor-pointer hover:border-[#C4AE8F] hover:shadow-sm transition-all duration-500"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full overflow-hidden rounded-t-xl">
          <Image
            src={imageUrl}
            alt={`${title} — venue space in ${location}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            quality={75}
            className={`object-cover transition-transform duration-1000 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5">
            {(isSuperhost || isVerified) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/90 text-[#2C2418] backdrop-blur-sm">
                <BadgeCheck className="w-3 h-3 text-[#D4654A]" />Verified
              </span>
            )}
          </div>

          {/* Heart */}
          <button
            onClick={handleHeart}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-[#D4654A] text-[#D4654A]' : 'text-[#8C7B66]'}`} />
          </button>

          {/* Vibe tags — bottom of image */}
          {vibeTags && vibeTags.length > 0 && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex gap-1.5">
              {vibeTags.slice(0, 2).map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/40 text-white backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <h3 className="text-base sm:text-lg font-[Georgia,serif] font-normal text-[#2C2418] leading-snug mb-1.5 group-hover:text-[#D4654A] transition-colors duration-300">
            {title}
          </h3>

          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#A69580]" />
              <span className="text-[12px] text-[#A69580] font-light">{location}</span>
            </span>
            {responseDisplay && (
              <span className="flex items-center gap-1 text-[11px] text-[#C4AE8F] font-light">
                <Clock className="w-3 h-3" />
                {avgResponseMinutes && avgResponseMinutes < 120 ? (
                  <span className="text-green-600">&lt;2hrs</span>
                ) : avgResponseMinutes && avgResponseMinutes < 1440 ? (
                  <span>{Math.round(avgResponseMinutes / 60)}hrs</span>
                ) : null}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#E0D5C5]">
            <div className="flex items-center gap-1.5">
              {rating > 0 ? (
                <>
                  <Star className="w-3.5 h-3.5 fill-[#D4654A] text-[#D4654A]" />
                  <span className="text-[13px] text-[#2C2418] font-light">{rating}</span>
                  <span className="text-[11px] text-[#A69580]">({reviews})</span>
                </>
              ) : (
                <span className="text-[12px] text-[#C4AE8F] font-light">New</span>
              )}
            </div>
            <div className="text-[#2C2418] font-[Georgia,serif] text-base sm:text-lg">
              {priceDisplay}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
