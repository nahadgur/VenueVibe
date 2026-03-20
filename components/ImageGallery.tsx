'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
  ];

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % displayImages.length);
  }, [displayImages.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + displayImages.length) % displayImages.length);
  }, [displayImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, next, prev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* ── Grid Layout ── */}
      <div className="rounded-xl overflow-hidden border border-[#E0D5C5]">
        {displayImages.length === 1 ? (
          <div
            className="relative aspect-[16/9] cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={displayImages[0]}
              alt={alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
              quality={80}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <button className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-[#2C2418] text-[12px] font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Expand className="w-3.5 h-3.5" />View photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 grid-rows-2 gap-1.5 aspect-[2/1]">
            {/* Hero image — spans 2 cols, 2 rows */}
            <div
              className="relative col-span-2 row-span-2 cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={displayImages[0]}
                alt={`${alt} — main photo`}
                fill
                sizes="50vw"
                priority
                quality={80}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Side images */}
            {displayImages.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="relative cursor-pointer group"
                onClick={() => openLightbox(i + 1)}
              >
                <Image
                  src={img}
                  alt={`${alt} — photo ${i + 2}`}
                  fill
                  sizes="25vw"
                  quality={75}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {/* "Show all" overlay on last visible image */}
                {i === 3 && displayImages.length > 5 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-[13px] font-medium">+{displayImages.length - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-[13px] font-light z-10">
            {activeIndex + 1} / {displayImages.length}
          </div>

          {/* Prev */}
          {displayImages.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Image */}
          <div className="relative w-full max-w-5xl aspect-[16/10] mx-4">
            <Image
              src={displayImages[activeIndex]}
              alt={`${alt} — photo ${activeIndex + 1}`}
              fill
              sizes="100vw"
              quality={90}
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          {displayImages.length > 1 && (
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Thumbnails */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-xl overflow-x-auto px-4 z-10">
              {displayImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                    i === activeIndex ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="64px" quality={50} className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
