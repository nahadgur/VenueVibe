'use client';

import { Check, X, Wifi, Monitor, Mic, Music, PartyPopper, UtensilsCrossed, Camera, Heart, Users, Clock } from 'lucide-react';
import type { Venue, WeddingInfo, CorporateInfo, DiningInfo, PartyInfo, ProductionInfo } from '@/lib/types';

function BoolBadge({ value, label }: { value: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-light ${value ? 'bg-white text-[#2C2418] border-[#E0D5C5]' : 'bg-transparent text-[#C4AE8F] border-[#E8E2DA] line-through'}`}>
      {value ? <Check className="w-3 h-3 text-[#D4654A]" /> : <X className="w-3 h-3" />}
      {label}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-[#A69580] font-light block mb-0.5 text-[13px]">{label}</span>
      <span className="text-[#2C2418] text-[14px]">{value}</span>
    </div>
  );
}

// ── Wedding Section ──
function WeddingSection({ info }: { info: WeddingInfo }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-[#D4654A]" />Wedding details
      </h2>
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InfoRow label="Ceremony capacity" value={info.ceremonyCapacity} />
          <InfoRow label="Reception capacity" value={info.receptionCapacity} />
          <InfoRow label="Late licence" value={info.lateLicenceHours} />
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <BoolBadge value={info.confettiAllowed} label="Confetti allowed" />
          <BoolBadge value={info.outsideCateringAllowed} label="Outside catering" />
          <BoolBadge value={info.exclusiveUse} label="Exclusive use" />
          <BoolBadge value={info.brideGroomSuite} label="Bridal suite" />
        </div>
      </div>
    </section>
  );
}

// ── Corporate Section ──
function CorporateSection({ info }: { info: CorporateInfo }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 flex items-center gap-2">
        <Monitor className="w-5 h-5 text-[#D4654A]" />Corporate & meeting details
      </h2>
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 space-y-4">
        {info.avEquipment && info.avEquipment.length > 0 && (
          <div>
            <span className="text-[#A69580] font-light block mb-2 text-[13px]">AV equipment</span>
            <div className="flex flex-wrap gap-2">
              {info.avEquipment.map(item => (
                <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0D5C5] text-[12px] font-light text-[#5C4E3C] bg-white">
                  <Check className="w-3 h-3 text-[#D4654A]" />{item}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InfoRow label="WiFi speed" value={info.wifiSpeed} />
          <InfoRow label="Breakout rooms" value={info.breakoutRooms} />
          <InfoRow label="Delegate rate" value={info.delegateRate ? `£${info.delegateRate}/person` : undefined} />
        </div>
        {info.cateringPackages && info.cateringPackages.length > 0 && (
          <div>
            <span className="text-[#A69580] font-light block mb-2 text-[13px]">Catering packages</span>
            <div className="flex flex-wrap gap-2">
              {info.cateringPackages.map(item => (
                <span key={item} className="px-3 py-1.5 rounded-lg border border-[#E0D5C5] text-[12px] font-light text-[#5C4E3C] bg-white">{item}</span>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          <BoolBadge value={info.invoicingAvailable} label="Invoicing available" />
          <BoolBadge value={info.poAccepted} label="PO numbers accepted" />
        </div>
      </div>
    </section>
  );
}

// ── Dining Section ──
function DiningSection({ info }: { info: DiningInfo }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 flex items-center gap-2">
        <UtensilsCrossed className="w-5 h-5 text-[#D4654A]" />Private dining details
      </h2>
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 space-y-4">
        {info.menuStyles && info.menuStyles.length > 0 && (
          <div>
            <span className="text-[#A69580] font-light block mb-2 text-[13px]">Menu styles</span>
            <div className="flex flex-wrap gap-2">
              {info.menuStyles.map(item => (
                <span key={item} className="px-3 py-1.5 rounded-lg border border-[#E0D5C5] text-[12px] font-light text-[#5C4E3C] bg-white">{item}</span>
              ))}
            </div>
          </div>
        )}
        {info.dietaryAccommodation && info.dietaryAccommodation.length > 0 && (
          <div>
            <span className="text-[#A69580] font-light block mb-2 text-[13px]">Dietary accommodation</span>
            <div className="flex flex-wrap gap-2">
              {info.dietaryAccommodation.map(item => (
                <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0D5C5] text-[12px] font-light text-[#5C4E3C] bg-white">
                  <Check className="w-3 h-3 text-green-600" />{item}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Minimum spend" value={info.minimumSpend ? `£${info.minimumSpend}` : undefined} />
          <InfoRow label="Corkage charge" value={info.corkageCharge ? `£${info.corkageCharge}/bottle` : undefined} />
        </div>
      </div>
    </section>
  );
}

// ── Party Section ──
function PartySection({ info }: { info: PartyInfo }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 flex items-center gap-2">
        <PartyPopper className="w-5 h-5 text-[#D4654A]" />Party details
      </h2>
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Noise curfew" value={info.noiseCurfew} />
          <InfoRow label="Age restriction" value={info.ageRestriction} />
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <BoolBadge value={info.djAllowed} label="DJ allowed" />
          <BoolBadge value={info.entertainmentAllowed} label="Live entertainment" />
          <BoolBadge value={info.lateLicence} label="Late licence" />
          <BoolBadge value={info.decorationsAllowed} label="Own decorations" />
        </div>
      </div>
    </section>
  );
}

// ── Production Section ──
function ProductionSection({ info }: { info: ProductionInfo }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5 text-[#D4654A]" />Production details
      </h2>
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Natural light" value={info.naturalLightHours} />
          <InfoRow label="Noise restrictions" value={info.noiseRestrictions} />
          <InfoRow label="Power" value={info.powerOutlets} />
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <BoolBadge value={info.loadingBay} label="Loading bay" />
          <BoolBadge value={info.parkingForVans} label="Van parking" />
          <BoolBadge value={info.blackoutCapable} label="Blackout capable" />
        </div>
      </div>
    </section>
  );
}

// ── Main Export ──

export default function EventTypeDetails({ venue }: { venue: Venue }) {
  const hasAny = venue.weddingInfo || venue.corporateInfo || venue.diningInfo || venue.partyInfo || venue.productionInfo;
  if (!hasAny) return null;

  return (
    <>
      {venue.weddingInfo && <WeddingSection info={venue.weddingInfo} />}
      {venue.corporateInfo && <CorporateSection info={venue.corporateInfo} />}
      {venue.diningInfo && <DiningSection info={venue.diningInfo} />}
      {venue.partyInfo && <PartySection info={venue.partyInfo} />}
      {venue.productionInfo && <ProductionSection info={venue.productionInfo} />}
    </>
  );
}
