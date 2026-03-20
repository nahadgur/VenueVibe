'use client';

import { ShieldCheck, CreditCard, BadgeCheck, Clock, MessageCircle } from 'lucide-react';

interface TrustBadgesProps {
  isVerified?: boolean;
  /** Compact horizontal row or stacked vertical */
  layout?: 'row' | 'stack';
}

export default function TrustBadges({ isVerified = false, layout = 'row' }: TrustBadgesProps) {
  const badges = [
    ...(isVerified
      ? [{ icon: BadgeCheck, label: 'Verified venue', sublabel: 'Personally inspected', accent: true }]
      : []),
    { icon: ShieldCheck, label: 'Secure booking', sublabel: 'SSL encrypted', accent: false },
    { icon: CreditCard, label: 'Safe payments', sublabel: 'Stripe protected', accent: false },
    { icon: Clock, label: 'Free cancellation', sublabel: '48hr policy', accent: false },
    { icon: MessageCircle, label: 'Direct messaging', sublabel: 'Chat with hosts', accent: false },
  ];

  if (layout === 'stack') {
    return (
      <div className="space-y-3">
        {badges.map((badge) => (
          <div key={badge.label} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              badge.accent ? 'bg-[#D4654A]/8 border border-[#D4654A]/15' : 'bg-[#EDE5D8] border border-[#E0D5C5]'
            }`}>
              <badge.icon className={`w-4 h-4 ${badge.accent ? 'text-[#D4654A]' : 'text-[#8C7B66]'}`} />
            </div>
            <div>
              <p className={`text-[13px] font-medium ${badge.accent ? 'text-[#D4654A]' : 'text-[#2C2418]'}`}>{badge.label}</p>
              <p className="text-[11px] text-[#A69580] font-light">{badge.sublabel}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-[12px] font-light ${
            badge.accent
              ? 'bg-[#D4654A]/8 border-[#D4654A]/15 text-[#D4654A]'
              : 'bg-white border-[#E0D5C5] text-[#8C7B66]'
          }`}
        >
          <badge.icon className="w-3.5 h-3.5" />
          {badge.label}
        </div>
      ))}
    </div>
  );
}
