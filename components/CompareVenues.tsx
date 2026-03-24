'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, MapPin, Users, Clock, Check, Minus, ArrowRight, Share2, Copy, CheckCheck } from 'lucide-react';
import { useSavedVenues } from '@/components/SavedVenuesProvider';
import { formatPrice, formatResponseTime, CANCELLATION_DESCRIPTIONS } from '@/lib/types';
import type { Venue } from '@/lib/types';

interface CompareVenuesProps {
  venues: Venue[];  // all available venues to look up from
}

export default function CompareVenues({ venues }: CompareVenuesProps) {
  const { savedVenues, createShortlist } = useSavedVenues();
  const [compareVenues, setCompareVenues] = useState<Venue[]>([]);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Get actual venue objects for saved venues
  useEffect(() => {
    const matched = savedVenues
      .map(sv => venues.find(v => v.id === sv.venueId))
      .filter(Boolean) as Venue[];
    setCompareVenues(matched);
  }, [savedVenues, venues]);

  const removeFromCompare = (id: string) => {
    setCompareVenues(prev => prev.filter(v => v.id !== id));
  };

  const handleShare = async () => {
    if (compareVenues.length === 0) return;
    const slug = await createShortlist(
      'Venue comparison',
      compareVenues.map(v => v.id)
    );
    if (slug) {
      const url = `${window.location.origin}/shortlist/${slug}`;
      setShareLink(url);
    }
  };

  const handleCopy = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (compareVenues.length < 2) {
    return (
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-8 text-center">
        <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-2">Compare venues</h3>
        <p className="text-[14px] text-[#8C7B66] font-light mb-4">
          Save at least 2 venues to compare them side by side.
        </p>
        <p className="text-[12px] text-[#A69580] font-light">
          {compareVenues.length} of 2 minimum saved
        </p>
      </div>
    );
  }

  const rows: { label: string; render: (v: Venue) => React.ReactNode }[] = [
    {
      label: 'Price',
      render: (v) => <span className="font-[Georgia,serif] text-[#2C2418]">{formatPrice(v)}</span>,
    },
    {
      label: 'Capacity',
      render: (v) => (
        <span className="text-[#2C2418]">
          {v.capacity} seated
          {v.standingCapacity ? ` · ${v.standingCapacity} standing` : ''}
        </span>
      ),
    },
    {
      label: 'Rating',
      render: (v) => v.rating ? (
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-[#D4654A] text-[#D4654A]" />
          {v.rating} <span className="text-[#A69580]">({v.reviews})</span>
        </span>
      ) : <span className="text-[#C4AE8F]">No reviews</span>,
    },
    {
      label: 'Response time',
      render: (v) => (
        <span className="text-[#5C4E3C]">{formatResponseTime(v.avgResponseMinutes)}</span>
      ),
    },
    {
      label: 'Cancellation',
      render: (v) => (
        <span className="text-[#5C4E3C] capitalize">{v.cancellationPolicy || 'flexible'}</span>
      ),
    },
    {
      label: 'Venue type',
      render: (v) => (
        <span className="text-[#5C4E3C] capitalize">{v.venueType?.replace(/-/g, ' ') || '—'}</span>
      ),
    },
    {
      label: 'Vibe',
      render: (v) => v.vibeTags?.length ? (
        <div className="flex flex-wrap gap-1">
          {v.vibeTags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-[#EDE5D8] text-[#8C7B66]">{tag}</span>
          ))}
        </div>
      ) : <span className="text-[#C4AE8F]">—</span>,
    },
    {
      label: 'Indoor / outdoor',
      render: (v) => (
        <span className="text-[#5C4E3C] capitalize">{v.indoorOutdoor || '—'}</span>
      ),
    },
    {
      label: 'Key amenities',
      render: (v) => v.amenities?.length ? (
        <div className="flex flex-wrap gap-1">
          {v.amenities.slice(0, 4).map(a => (
            <span key={a} className="text-[11px] text-[#8C7B66] flex items-center gap-0.5">
              <Check className="w-3 h-3 text-[#D4654A]" />{a}
            </span>
          ))}
          {v.amenities.length > 4 && (
            <span className="text-[11px] text-[#A69580]">+{v.amenities.length - 4} more</span>
          )}
        </div>
      ) : <Minus className="w-3 h-3 text-[#C4AE8F]" />,
    },
    {
      label: 'Verified',
      render: (v) => v.isVerified
        ? <Check className="w-4 h-4 text-[#D4654A]" />
        : <Minus className="w-3 h-3 text-[#C4AE8F]" />,
    },
  ];

  return (
    <div className="bg-white border border-[#E0D5C5] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#E0D5C5] flex items-center justify-between">
        <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418]">
          Compare ({compareVenues.length})
        </h3>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0D5C5] text-[12px] text-[#5C4E3C] font-light hover:border-[#C4AE8F] transition-colors"
        >
          <Share2 className="w-3 h-3" />Share
        </button>
      </div>

      {/* Share link banner */}
      {shareLink && (
        <div className="px-5 py-3 bg-[#D4654A]/5 border-b border-[#D4654A]/10 flex items-center gap-3">
          <p className="text-[12px] text-[#D4654A] font-light flex-1 truncate">{shareLink}</p>
          <button onClick={handleCopy} className="flex items-center gap-1 px-3 py-1 rounded-md bg-[#D4654A] text-white text-[11px]">
            {copied ? <><CheckCheck className="w-3 h-3" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
          </button>
        </div>
      )}

      {/* Scrollable comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Venue headers */}
          <thead>
            <tr>
              <th className="w-32 p-4" />
              {compareVenues.map(v => (
                <th key={v.id} className="p-4 text-left align-top">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(v.id)}
                      className="absolute -top-1 -right-1 p-1 rounded-full bg-[#EDE5D8] hover:bg-[#E0D5C5] transition-colors"
                    >
                      <X className="w-3 h-3 text-[#8C7B66]" />
                    </button>
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
                      <Image src={v.imageUrl} alt={v.title} fill sizes="200px" className="object-cover" />
                    </div>
                    <Link href={`/venue/${v.id}`} className="text-[14px] font-[Georgia,serif] text-[#2C2418] hover:text-[#D4654A] transition-colors leading-snug block">
                      {v.title}
                    </Link>
                    <p className="flex items-center gap-1 text-[11px] text-[#A69580] font-light mt-1">
                      <MapPin className="w-3 h-3" />{v.location}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Data rows */}
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-[#F8F4EE]' : ''}>
                <td className="px-4 py-3 text-[12px] text-[#A69580] font-light whitespace-nowrap align-top">
                  {row.label}
                </td>
                {compareVenues.map(v => (
                  <td key={v.id} className="px-4 py-3 text-[13px] font-light align-top">
                    {row.render(v)}
                  </td>
                ))}
              </tr>
            ))}

            {/* CTA row */}
            <tr>
              <td className="px-4 py-4" />
              {compareVenues.map(v => (
                <td key={v.id} className="px-4 py-4">
                  <Link
                    href={`/venue/${v.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2C2418] text-[#F5F0EA] text-[12px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
                  >
                    View venue <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
