'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Save, ArrowLeft, Loader2, Check, MapPin, Users, PoundSterling, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuard';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';

const AMENITIES = ['WiFi', 'Projector', 'Sound System', 'Kitchen', 'Parking', 'Wheelchair Accessible', 'Natural Light', 'Air Conditioning', 'Outdoor Area'];

function EditContent() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const venueId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    capacity: '',
    price: '',
    imageUrl: '',
    amenities: [] as string[],
  });

  useEffect(() => {
    if (!user || !venueId) return;

    const fetchVenue = async () => {
      try {
        const venueRef = doc(db, 'venues', venueId);
        const venueSnap = await getDoc(venueRef);

        if (!venueSnap.exists()) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const data = venueSnap.data();

        // Check ownership
        if (data.hostId !== user.uid) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }

        // Parse amenities from description
        const amenityMatch = data.description?.match(/Amenities: (.+)/);
        const amenities = amenityMatch ? amenityMatch[1].split(', ').map((a: string) => a.trim()) : [];
        const cleanDescription = data.description?.replace(/\n\nAmenities: .+/, '') || '';

        setFormData({
          title: data.title || '',
          location: data.location || '',
          description: cleanDescription,
          capacity: String(data.capacity || ''),
          price: String(data.price || ''),
          imageUrl: data.imageUrl || '',
          amenities,
        });
      } catch (error) {
        console.error('Error fetching venue:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [user, venueId]);

  const update = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const fullDescription = formData.amenities.length > 0
        ? `${formData.description}\n\nAmenities: ${formData.amenities.join(', ')}`
        : formData.description;

      await updateDoc(doc(db, 'venues', venueId), {
        title: formData.title || 'Untitled Venue',
        location: formData.location || 'Unknown Location',
        description: fullDescription,
        price: Number(formData.price) || 0,
        capacity: Number(formData.capacity) || 1,
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      });

      setSaved(true);
    } catch (error) {
      console.error('Error updating venue:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this listing? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'venues', venueId));
      router.push('/host/manage');
    } catch (error) {
      console.error('Error deleting venue:', error);
      alert('Failed to delete listing.');
    }
  };

  if (loading) {
    return (
      <div className="pt-36 pb-24 flex justify-center">
        <Loader2 className="w-8 h-8 text-[#C4AE8F] animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="pt-36 pb-24 px-4 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-[Georgia,serif] text-[#2C2418] mb-3">Venue not found</h1>
        <p className="text-[#8C7B66] text-[14px] font-light mb-6">This listing may have been deleted.</p>
        <Link href="/host/manage" className="text-[#D4654A] text-[13px] hover:underline">Back to your venues</Link>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="pt-36 pb-24 px-4 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-[Georgia,serif] text-[#2C2418] mb-3">Not authorised</h1>
        <p className="text-[#8C7B66] text-[14px] font-light mb-6">You can only edit venues that you own.</p>
        <Link href="/host/manage" className="text-[#D4654A] text-[13px] hover:underline">Back to your venues</Link>
      </div>
    );
  }

  return (
    <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Link href="/host/manage" className="p-2 rounded-lg border border-[#E0D5C5] text-[#8C7B66] hover:border-[#C4AE8F] hover:text-[#2C2418] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-1">Edit listing</p>
          <h1 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] tracking-tight">{formData.title || 'Untitled Venue'}</h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Venue title</label>
            <input type="text" value={formData.title} onChange={(e) => update('title', e.target.value)} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg px-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors" placeholder="e.g., The Glasshouse Loft" />
          </div>

          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" />
              <input type="text" value={formData.location} onChange={(e) => update('location', e.target.value)} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg pl-10 pr-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors" placeholder="e.g., Shoreditch, London" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => update('description', e.target.value)} rows={5} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg p-4 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors resize-none" placeholder="Describe what makes your space unique..." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Capacity</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" />
                <input type="number" value={formData.capacity} onChange={(e) => update('capacity', e.target.value)} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg pl-10 pr-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors" placeholder="50" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Price per hour (£)</label>
              <div className="relative">
                <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" />
                <input type="number" value={formData.price} onChange={(e) => update('price', e.target.value)} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg pl-10 pr-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors" placeholder="150" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-3">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button key={amenity} onClick={() => toggleAmenity(amenity)} className={`px-4 py-2 text-[12px] font-light transition-all flex items-center gap-2 rounded-lg border ${isSelected ? 'bg-[#2C2418] text-[#F5F0EA] border-[#2C2418]' : 'bg-transparent text-[#8C7B66] border-[#E0D5C5] hover:border-[#C4AE8F]'}`}>
                    {isSelected && <Check className="w-3 h-3" />}{amenity}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Image URL</label>
            <input type="url" value={formData.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg px-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors" placeholder="https://images.unsplash.com/..." />
            {formData.imageUrl && (
              <div className="mt-4 relative aspect-video overflow-hidden border border-[#E0D5C5] rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'; }} />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 pt-8 border-t border-[#E0D5C5] flex items-center justify-between">
          <button onClick={handleDelete} className="flex items-center gap-2 text-[13px] text-red-500 font-light hover:text-red-700 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />Delete listing
          </button>

          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-7 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors disabled:opacity-50">
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <><Check className="w-4 h-4" />Saved</>
            ) : (
              <><Save className="w-4 h-4" />Save changes</>
            )}
          </button>
        </div>
      </div>

      {/* Availability calendar */}
      <div className="mt-8">
        <AvailabilityCalendar venueId={venueId} mode="host" />
      </div>
    </div>
  );
}

export default function EditVenuePage() {
  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <AuthGuard>
        <EditContent />
      </AuthGuard>
      <Footer />
    </main>
  );
}
