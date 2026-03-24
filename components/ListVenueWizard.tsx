'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, PoundSterling, Users, MapPin, Loader2, Plus, X } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  AMENITIES, VIBE_TAGS, VENUE_TYPES,
  type PricingModel, type CancellationPolicy, type VibeTag, type Amenity, type VenueTypeSlug,
} from '@/lib/types';
import { EVENT_TYPES } from '@/lib/locations';

const TOTAL_STEPS = 5;

const PRICING_MODELS: { value: PricingModel; label: string }[] = [
  { value: 'hourly', label: 'Per hour' },
  { value: 'half-day', label: 'Half day' },
  { value: 'full-day', label: 'Full day' },
  { value: 'minimum-spend', label: 'Minimum spend' },
  { value: 'per-head', label: 'Per person' },
  { value: 'package', label: 'Package' },
];

const CANCELLATION_OPTIONS: { value: CancellationPolicy; label: string; desc: string }[] = [
  { value: 'flexible', label: 'Flexible', desc: 'Free cancellation up to 48 hours before' },
  { value: 'moderate', label: 'Moderate', desc: 'Free cancellation up to 7 days before' },
  { value: 'strict', label: 'Strict', desc: 'Free cancellation up to 14 days before' },
];

interface FormState {
  title: string;
  location: string;
  area: string;
  city: string;
  description: string;
  venueType: VenueTypeSlug | '';
  indoorOutdoor: 'indoor' | 'outdoor' | 'both';
  capacity: string;
  standingCapacity: string;
  floorAreaSqm: string;
  price: string;
  pricingModel: PricingModel;
  minimumBookingHours: string;
  cancellationPolicy: CancellationPolicy;
  amenities: Amenity[];
  vibeTags: VibeTag[];
  eventTypesSupported: string[];
  imageUrl: string;
  additionalImages: string[];
}

export default function ListVenueWizard() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    title: '', location: '', area: '', city: '', description: '',
    venueType: '', indoorOutdoor: 'indoor',
    capacity: '', standingCapacity: '', floorAreaSqm: '',
    price: '', pricingModel: 'hourly', minimumBookingHours: '',
    cancellationPolicy: 'flexible',
    amenities: [], vibeTags: [], eventTypesSupported: [],
    imageUrl: '', additionalImages: [],
  });

  const update = (field: keyof FormState, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  const toggleInArray = <T extends string>(field: keyof FormState, item: T) => {
    setFormData(prev => {
      const arr = prev[field] as T[];
      return { ...prev, [field]: arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item] };
    });
  };

  const addImage = () => {
    update('additionalImages', [...formData.additionalImages, '']);
  };

  const updateImage = (index: number, url: string) => {
    const imgs = [...formData.additionalImages];
    imgs[index] = url;
    update('additionalImages', imgs);
  };

  const removeImage = (index: number) => {
    update('additionalImages', formData.additionalImages.filter((_, i) => i !== index));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const allImages = [formData.imageUrl, ...formData.additionalImages].filter(Boolean);
      await addDoc(collection(db, 'venues'), {
        title: formData.title || 'Untitled Venue',
        location: formData.location || 'Unknown Location',
        area: formData.area || '',
        city: formData.city || '',
        description: formData.description,
        venueType: formData.venueType || null,
        indoorOutdoor: formData.indoorOutdoor,
        capacity: Number(formData.capacity) || 1,
        standingCapacity: Number(formData.standingCapacity) || null,
        floorAreaSqm: Number(formData.floorAreaSqm) || null,
        price: Number(formData.price) || 0,
        pricingModel: formData.pricingModel,
        minimumBookingHours: Number(formData.minimumBookingHours) || null,
        cancellationPolicy: formData.cancellationPolicy,
        amenities: formData.amenities,
        vibeTags: formData.vibeTags,
        eventTypesSupported: formData.eventTypesSupported,
        imageUrl: allImages[0] || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
        images: allImages.length > 0 ? allImages : ['https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'],
        hostId: user.uid,
        hostName: user.displayName || '',
        hostEmail: user.email || '',
        isClaimed: true,
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      router.push('/venues');
    } catch (error) {
      console.error('Error creating venue:', error);
      alert('Failed to create listing. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-10 text-center">
        <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4">Sign in to list your space</h2>
        <p className="text-[#8C7B66] mb-8 font-light text-[14px]">You need to be logged in to create a new venue listing.</p>
        <button onClick={signInWithGoogle} className="inline-flex items-center justify-center px-8 py-3.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors">Sign in with Google</button>
      </div>
    );
  }

  const stepLabels = ['Details', 'Type & vibe', 'Pricing', 'Amenities', 'Photos'];

  return (
    <div className="bg-white border border-[#E0D5C5] rounded-xl p-5 sm:p-8 md:p-12 overflow-hidden relative">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between text-[10px] sm:text-[11px] text-[#A69580] mb-4 gap-1">
          {stepLabels.map((label, i) => (
            <span key={label} className={`text-center flex-1 transition-colors ${step >= i + 1 ? 'text-[#2C2418]' : ''}`}>
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="h-px bg-[#E0D5C5] w-full relative">
          <motion.div className="absolute top-0 left-0 h-full bg-[#D4654A]" initial={{ width: '20%' }} animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }} transition={{ duration: 0.6, ease: "easeInOut" }} />
        </div>
      </div>

      <div className="relative min-h-[320px] sm:min-h-[420px]">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Basic details ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6">Describe your space</h2>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Venue name</label>
                <input type="text" value={formData.title} onChange={e => update('title', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., The Glasshouse Loft" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Full address / location</label>
                  <div className="relative">
                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" />
                    <input type="text" value={formData.location} onChange={e => update('location', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] pl-7 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., 42 Commercial St, London E1 6LP" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Neighbourhood / area</label>
                  <input type="text" value={formData.area} onChange={e => update('area', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., Shoreditch" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">City</label>
                <input type="text" value={formData.city} onChange={e => update('city', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., London" />
              </div>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Description</label>
                <textarea value={formData.description} onChange={e => update('description', e.target.value)} rows={4} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg p-4 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors resize-none font-light" placeholder="What makes your space special? Describe the atmosphere, natural light, notable features..." />
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Venue type, vibe, event types ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
              <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6">Type & character</h2>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Venue type</label>
                <div className="flex flex-wrap gap-2">
                  {VENUE_TYPES.map(vt => (
                    <button key={vt.slug} onClick={() => update('venueType', vt.slug)} className={`px-4 py-2 rounded-lg border text-[12px] font-light transition-all ${formData.venueType === vt.slug ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]' : 'bg-transparent text-[#8C7B66] border-[#E0D5C5] hover:border-[#C4AE8F]'}`}>
                      {vt.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Vibe tags <span className="text-[#C4AE8F]">(select up to 4)</span></label>
                <div className="flex flex-wrap gap-2">
                  {VIBE_TAGS.map(tag => {
                    const selected = formData.vibeTags.includes(tag);
                    return (
                      <button key={tag} onClick={() => { if (!selected && formData.vibeTags.length >= 4) return; toggleInArray('vibeTags', tag); }} className={`px-4 py-2 rounded-lg border text-[12px] font-light transition-all ${selected ? 'bg-[#D4654A] text-white border-[#D4654A]' : formData.vibeTags.length >= 4 ? 'bg-transparent text-[#D4CEC4] border-[#E8E2DA] cursor-not-allowed' : 'bg-transparent text-[#8C7B66] border-[#E0D5C5] hover:border-[#C4AE8F]'}`}>
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Indoor / outdoor</label>
                <div className="flex gap-2">
                  {(['indoor', 'outdoor', 'both'] as const).map(opt => (
                    <button key={opt} onClick={() => update('indoorOutdoor', opt)} className={`px-5 py-2.5 rounded-lg border text-[13px] font-light capitalize transition-all ${formData.indoorOutdoor === opt ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]' : 'bg-transparent text-[#8C7B66] border-[#E0D5C5]'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">What events does your space suit?</label>
                <div className="flex flex-wrap gap-2">
                  {EVENT_TYPES.map(et => {
                    const selected = formData.eventTypesSupported.includes(et.slug);
                    return (
                      <button key={et.slug} onClick={() => toggleInArray('eventTypesSupported', et.slug)} className={`px-4 py-2 rounded-lg border text-[12px] font-light transition-all ${selected ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]' : 'bg-transparent text-[#8C7B66] border-[#E0D5C5] hover:border-[#C4AE8F]'}`}>
                        {selected && <Check className="w-3 h-3 inline mr-1" />}{et.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Pricing & capacity ── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6">Pricing & capacity</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Seated capacity</label>
                  <div className="relative">
                    <Users className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" />
                    <input type="number" value={formData.capacity} onChange={e => update('capacity', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] pl-7 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., 80" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Standing capacity <span className="text-[#C4AE8F]">(optional)</span></label>
                  <input type="number" value={formData.standingCapacity} onChange={e => update('standingCapacity', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., 120" />
                </div>
                <div>
                  <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Floor area (sqm) <span className="text-[#C4AE8F]">(optional)</span></label>
                  <input type="number" value={formData.floorAreaSqm} onChange={e => update('floorAreaSqm', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., 200" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Pricing model</label>
                <div className="flex flex-wrap gap-2">
                  {PRICING_MODELS.map(pm => (
                    <button key={pm.value} onClick={() => update('pricingModel', pm.value)} className={`px-4 py-2.5 rounded-lg border text-[13px] font-light transition-all ${formData.pricingModel === pm.value ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]' : 'bg-transparent text-[#8C7B66] border-[#E0D5C5]'}`}>
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">
                    {formData.pricingModel === 'minimum-spend' ? 'Minimum spend (£)' : formData.pricingModel === 'per-head' ? 'Price per person (£)' : `Price ${formData.pricingModel === 'hourly' ? 'per hour' : formData.pricingModel === 'half-day' ? 'per half day' : formData.pricingModel === 'full-day' ? 'per day' : ''} (£)`}
                  </label>
                  <div className="relative">
                    <PoundSterling className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" />
                    <input type="number" value={formData.price} onChange={e => update('price', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] pl-7 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., 150" />
                  </div>
                </div>
                {formData.pricingModel === 'hourly' && (
                  <div>
                    <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Minimum booking (hours) <span className="text-[#C4AE8F]">(optional)</span></label>
                    <input type="number" value={formData.minimumBookingHours} onChange={e => update('minimumBookingHours', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., 2" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Cancellation policy</label>
                <div className="space-y-2">
                  {CANCELLATION_OPTIONS.map(co => (
                    <button key={co.value} onClick={() => update('cancellationPolicy', co.value)} className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg border text-left transition-all ${formData.cancellationPolicy === co.value ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]' : 'bg-transparent text-[#8C7B66] border-[#E0D5C5] hover:border-[#C4AE8F]'}`}>
                      <div>
                        <span className="text-[13px] font-medium block">{co.label}</span>
                        <span className={`text-[11px] font-light ${formData.cancellationPolicy === co.value ? 'text-[#F5F0EA]/70' : 'text-[#A69580]'}`}>{co.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Amenities ── */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6">Amenities & features</h2>
              <p className="text-[14px] text-[#8C7B66] font-light -mt-2 mb-4">Select everything your space offers. More detail helps planners find you.</p>

              <div className="flex flex-wrap gap-2">
                {AMENITIES.map(amenity => {
                  const selected = formData.amenities.includes(amenity);
                  return (
                    <button key={amenity} onClick={() => toggleInArray('amenities', amenity)} className={`px-4 py-2.5 rounded-lg border text-[12px] font-light transition-all flex items-center gap-1.5 ${selected ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]' : 'bg-transparent text-[#8C7B66] border-[#E0D5C5] hover:border-[#C4AE8F]'}`}>
                      {selected && <Check className="w-3 h-3" />}{amenity}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4">
                <p className="text-[12px] text-[#A69580] font-light">{formData.amenities.length} amenities selected</p>
              </div>
            </motion.div>
          )}

          {/* ── Step 5: Photos ── */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6">Photos</h2>
              <p className="text-[14px] text-[#8C7B66] font-light -mt-2 mb-4">Great photos are the #1 driver of bookings. Add your best shots.</p>

              <div>
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Main image URL</label>
                <input type="url" value={formData.imageUrl} onChange={e => update('imageUrl', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="https://images.unsplash.com/..." />
                {formData.imageUrl && (
                  <div className="mt-4 relative aspect-video overflow-hidden border border-[#E0D5C5] rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'; }} />
                  </div>
                )}
              </div>

              <div className="pt-4">
                <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Additional images <span className="text-[#C4AE8F]">(optional)</span></label>
                <div className="space-y-3">
                  {formData.additionalImages.map((url, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="url" value={url} onChange={e => updateImage(i, e.target.value)} className="flex-1 bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg px-4 py-2.5 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light text-[13px]" placeholder="Image URL..." />
                      <button onClick={() => removeImage(i)} className="p-2 rounded-lg text-[#A69580] hover:text-red-500 hover:bg-red-50 transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button onClick={addImage} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-[#E0D5C5] text-[12px] text-[#8C7B66] font-light hover:border-[#C4AE8F] transition-colors">
                    <Plus className="w-3.5 h-3.5" />Add another image
                  </button>
                </div>
                <p className="text-[11px] text-[#C4AE8F] mt-3 font-light">Tip: Use direct image URLs from Unsplash, Imgur, or your own hosting.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-10 pt-8 border-t border-[#E0D5C5] flex items-center justify-between">
        <button onClick={prevStep} disabled={step === 1 || isSubmitting} className={`flex items-center gap-2 px-5 py-3 text-[13px] font-light transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-[#8C7B66] hover:text-[#2C2418]'}`}>
          <ChevronLeft className="w-4 h-4" />Back
        </button>
        <button onClick={step === TOTAL_STEPS ? handleSubmit : nextStep} disabled={isSubmitting} className="flex items-center gap-2 bg-[#2C2418] text-[#F5F0EA] px-7 py-3.5 text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : step === TOTAL_STEPS ? 'Submit listing' : <>Next step<ChevronRight className="w-4 h-4" /></>}
        </button>
      </div>
    </div>
  );
}
