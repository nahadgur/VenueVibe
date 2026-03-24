'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Loader2 } from 'lucide-react';
import { db } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// --------------- Types ---------------

type DayStatus = 'available' | 'unavailable' | 'hold';

interface AvailabilityCalendarProps {
  venueId: string;
  /** 'host' = can edit, 'planner' = read-only display */
  mode: 'host' | 'planner';
  onChange?: (availability: Record<string, DayStatus>) => void;
}

// --------------- Helpers ---------------

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  // 0 = Mon in our grid (ISO), JS getDay() returns 0 = Sun
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// --------------- Component ---------------

export default function AvailabilityCalendar({ venueId, mode, onChange }: AvailabilityCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [availability, setAvailability] = useState<Record<string, DayStatus>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load from Firestore
  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db, 'venueAvailability', venueId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setAvailability(snap.data().dates || {});
        }
      } catch (err) {
        console.error('Error loading availability:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [venueId]);

  // Save to Firestore (host mode only)
  const save = useCallback(async (newAvailability: Record<string, DayStatus>) => {
    if (mode !== 'host') return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'venueAvailability', venueId), {
        venueId,
        dates: newAvailability,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      onChange?.(newAvailability);
    } catch (err) {
      console.error('Error saving availability:', err);
    } finally {
      setSaving(false);
    }
  }, [venueId, mode, onChange]);

  const toggleDay = (dateKey: string) => {
    if (mode !== 'host') return;
    const current = availability[dateKey];
    let next: DayStatus;
    if (!current || current === 'available') next = 'unavailable';
    else next = 'available';

    const updated = { ...availability, [dateKey]: next };
    // Remove 'available' entries to keep doc small (available is default)
    if (next === 'available') delete updated[dateKey];
    setAvailability(updated);
    save(updated);
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-5 h-5 text-[#C4AE8F] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E0D5C5] rounded-xl p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418]">
          {mode === 'host' ? 'Manage availability' : 'Availability'}
        </h3>
        {saving && <Loader2 className="w-3.5 h-3.5 text-[#D4654A] animate-spin" />}
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-[#EDE5D8] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-[#8C7B66]" />
        </button>
        <span className="text-[14px] font-medium text-[#2C2418]">
          {MONTH_NAMES[month]} {year}
        </span>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-[#EDE5D8] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-[#8C7B66]" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-[10px] text-[#A69580] font-medium py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {/* Empty cells for days before the 1st */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateKey = formatDateKey(year, month, day);
          const status = availability[dateKey] || 'available';
          const isToday = dateKey === todayKey;
          const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isClickable = mode === 'host' && !isPast;

          return (
            <button
              key={day}
              onClick={() => isClickable && toggleDay(dateKey)}
              disabled={!isClickable}
              className={`aspect-square rounded-lg flex items-center justify-center text-[13px] transition-all relative ${
                isPast
                  ? 'text-[#D4CEC4] cursor-default'
                  : status === 'unavailable'
                    ? 'bg-[#2C2418]/5 text-[#A69580] line-through'
                    : status === 'hold'
                      ? 'bg-[#D4654A]/8 text-[#D4654A]'
                      : 'text-[#2C2418] hover:bg-[#EDE5D8]'
              } ${isToday ? 'font-semibold ring-1 ring-[#D4654A]/30' : 'font-light'} ${
                isClickable ? 'cursor-pointer' : ''
              }`}
            >
              {day}
              {status === 'unavailable' && !isPast && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#A69580]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[#E0D5C5]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-white border border-[#E0D5C5]" />
          <span className="text-[11px] text-[#A69580] font-light">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#2C2418]/8 border border-[#E0D5C5]" />
          <span className="text-[11px] text-[#A69580] font-light">Unavailable</span>
        </div>
      </div>

      {mode === 'host' && (
        <p className="text-[11px] text-[#C4AE8F] font-light mt-3">
          Tap a date to toggle availability. Changes save automatically.
        </p>
      )}
    </div>
  );
}
