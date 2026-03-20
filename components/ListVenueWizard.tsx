'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, PoundSterling, Users, MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AMENITIES = ['WiFi', 'Projector', 'Sound System', 'Kitchen', 'Parking', 'Wheelchair Accessible', 'Natural Light', 'Air Conditioning', 'Outdoor Area'];

export default function ListVenueWizard() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', location: '', description: '', capacity: '', price: '', imageUrl: '', amenities: [] as string[] });

  const updateForm = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
  const toggleAmenity = (amenity: string) => setFormData(prev => ({ ...prev, amenities: prev.amenities.includes(amenity) ? prev.amenities.filter(a => a !== amenity) : [...prev.amenities, amenity] }));
  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'venues'), { title: formData.title || 'Untitled Venue', location: formData.location || 'Unknown Location', description: `${formData.description}\n\nAmenities: ${formData.amenities.join(', ')}`, price: Number(formData.price) || 0, capacity: Number(formData.capacity) || 1, imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', hostId: user.uid, createdAt: new Date().toISOString() });
      router.push('/venues');
    } catch (error) { console.error('Error creating venue:', error); alert('Failed to create listing. Please try again.'); setIsSubmitting(false); }
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

  return (
    <div className="bg-white border border-[#E0D5C5] rounded-xl p-8 md:p-12 overflow-hidden relative">
      <div className="mb-12">
        <div className="flex justify-between text-[11px] text-[#A69580] mb-5">
          <span className={step >= 1 ? 'text-[#2C2418] transition-colors' : ''}>1. Space details</span>
          <span className={step >= 2 ? 'text-[#2C2418] transition-colors' : ''}>2. Pricing & capacity</span>
          <span className={step >= 3 ? 'text-[#2C2418] transition-colors' : ''}>3. Features & photos</span>
        </div>
        <div className="h-px bg-[#E0D5C5] w-full relative">
          <motion.div className="absolute top-0 left-0 h-full bg-[#D4654A]" initial={{ width: '33%' }} animate={{ width: `${(step / 3) * 100}%` }} transition={{ duration: 0.6, ease: "easeInOut" }} />
        </div>
      </div>

      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-8">Describe your space</h2>
              <div><label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Venue title</label><input type="text" value={formData.title} onChange={e => updateForm('title', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., The Glasshouse Loft" /></div>
              <div><label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3 mt-8">Location</label><div className="relative"><MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" /><input type="text" value={formData.location} onChange={e => updateForm('location', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] pl-8 pr-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., Downtown Manhattan, NY" /></div></div>
              <div><label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3 mt-8">Description</label><textarea value={formData.description} onChange={e => updateForm('description', e.target.value)} rows={4} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg p-4 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors resize-none font-light" placeholder="Describe what makes your space unique..." /></div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-8">Pricing & capacity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div><label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Maximum capacity</label><div className="relative"><Users className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" /><input type="number" value={formData.capacity} onChange={e => updateForm('capacity', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] pl-8 pr-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., 50" /></div></div>
                <div><label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Hourly rate</label><div className="relative"><PoundSterling className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" /><input type="number" value={formData.price} onChange={e => updateForm('price', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] pl-8 pr-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="e.g., 150" /></div></div>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-8">Features & photos</h2>
              <div><label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-4">Select amenities</label>
                <div className="flex flex-wrap gap-3">
                  {AMENITIES.map(amenity => { const isSelected = formData.amenities.includes(amenity); return (
                    <button key={amenity} onClick={() => toggleAmenity(amenity)} className={`px-4 py-2 text-[12px] font-light transition-all flex items-center gap-2 rounded-lg border ${isSelected ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]' : 'bg-transparent text-[#8C7B66] border-[#E0D5C5] hover:border-[#C4AE8F]'}`}>
                      {isSelected && <Check className="w-3 h-3" />}{amenity}
                    </button>); })}
                </div>
              </div>
              <div className="pt-8"><label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Image URL</label><input type="url" value={formData.imageUrl} onChange={e => updateForm('imageUrl', e.target.value)} className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-3 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors font-light" placeholder="https://images.unsplash.com/..." /><p className="text-[11px] text-[#C4AE8F] mt-3 font-light">Provide a direct link to an image (e.g., from Unsplash).</p>
                {formData.imageUrl && (<div className="mt-8 relative aspect-video overflow-hidden border border-[#E0D5C5] rounded-lg">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'; }} /></div>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 pt-8 border-t border-[#E0D5C5] flex items-center justify-between">
        <button onClick={prevStep} disabled={step === 1 || isSubmitting} className={`flex items-center gap-2 px-5 py-3 text-[13px] font-light transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-[#8C7B66] hover:text-[#2C2418]'}`}><ChevronLeft className="w-4 h-4" />Back</button>
        <button onClick={step === 3 ? handleSubmit : nextStep} disabled={isSubmitting} className="flex items-center gap-2 bg-[#2C2418] text-[#F5F0EA] px-7 py-3.5 text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : step === 3 ? 'Submit listing' : <>Next step<ChevronRight className="w-4 h-4" /></>}
        </button>
      </div>
    </div>
  );
}
