'use client';

import { useState, useEffect, useRef } from 'react';
import { Map as MapIcon, List, Loader2, MapPin, Star, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/types';
import type { Venue } from '@/lib/types';

// ── Leaflet CDN loader ──

let leafletLoaded = false;
let L: any = null;

function loadLeaflet(): Promise<any> {
  if (leafletLoaded && L) return Promise.resolve(L);

  return new Promise((resolve, reject) => {
    // CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);
    }

    // JS
    if ((window as any).L) {
      L = (window as any).L;
      leafletLoaded = true;
      resolve(L);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      L = (window as any).L;
      leafletLoaded = true;
      resolve(L);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// ── Default coordinates for UK cities ──

const CITY_COORDS: Record<string, [number, number]> = {
  london: [51.5074, -0.1278],
  birmingham: [52.4862, -1.8904],
  manchester: [53.4808, -2.2426],
  leeds: [53.8008, -1.5491],
  bristol: [51.4545, -2.5879],
  edinburgh: [55.9533, -3.1883],
  glasgow: [55.8642, -4.2518],
  liverpool: [53.4084, -2.9916],
};

// ── Popup card ──

function VenuePopup({ venue, onClose }: { venue: Venue; onClose: () => void }) {
  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-8 sm:w-80 z-[40] bg-white border border-[#E0D5C5] rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-bottom-4">
      <button onClick={onClose} className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#8C7B66] z-10">
        <X className="w-3.5 h-3.5" />
      </button>
      <Link href={`/venue/${venue.id}`} className="block">
        <div className="relative h-36 overflow-hidden">
          <Image src={venue.imageUrl} alt={venue.title} fill sizes="320px" className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418] mb-1 leading-snug">{venue.title}</h3>
          <p className="text-[12px] text-[#A69580] font-light flex items-center gap-1 mb-2">
            <MapPin className="w-3 h-3" />{venue.location}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {venue.rating && venue.rating > 0 ? (
                <>
                  <Star className="w-3 h-3 fill-[#D4654A] text-[#D4654A]" />
                  <span className="text-[12px] text-[#2C2418]">{venue.rating}</span>
                  <span className="text-[11px] text-[#A69580]">({venue.reviews})</span>
                </>
              ) : (
                <span className="text-[11px] text-[#C4AE8F]">New</span>
              )}
            </div>
            <span className="text-[14px] font-[Georgia,serif] text-[#2C2418]">{formatPrice(venue)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ── Main component ──

interface VenueMapProps {
  venues: Venue[];
  /** If true, show a toggle to switch between map and list view */
  showToggle?: boolean;
  /** Default view */
  defaultView?: 'map' | 'list';
  /** Height of the map container */
  height?: string;
  /** Called when view changes */
  onViewChange?: (view: 'map' | 'list') => void;
}

export default function VenueMap({ venues, showToggle = true, defaultView = 'list', height = '500px', onViewChange }: VenueMapProps) {
  const [view, setView] = useState<'map' | 'list'>(defaultView);
  const [loading, setLoading] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Determine center from venues
  const getCenter = (): [number, number] => {
    const venuesWithCoords = venues.filter(v => v.lat && v.lng);
    if (venuesWithCoords.length > 0) {
      const avgLat = venuesWithCoords.reduce((s, v) => s + (v.lat || 0), 0) / venuesWithCoords.length;
      const avgLng = venuesWithCoords.reduce((s, v) => s + (v.lng || 0), 0) / venuesWithCoords.length;
      return [avgLat, avgLng];
    }
    // Try matching city names
    for (const v of venues) {
      const cityKey = (v.city || v.location.split(',').pop()?.trim() || '').toLowerCase();
      if (CITY_COORDS[cityKey]) return CITY_COORDS[cityKey];
    }
    return CITY_COORDS.london; // Default
  };

  // Init/update map
  useEffect(() => {
    if (view !== 'map') return;

    let cancelled = false;

    const initMap = async () => {
      setLoading(true);
      try {
        const leaflet = await loadLeaflet();
        if (cancelled || !mapContainerRef.current) return;

        // Destroy existing map
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }

        const center = getCenter();
        const map = leaflet.map(mapContainerRef.current, {
          center,
          zoom: 12,
          zoomControl: true,
          scrollWheelZoom: true,
        });

        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        // Custom marker icon
        const icon = leaflet.divIcon({
          className: 'vv-marker',
          html: `<div style="width:32px;height:32px;background:#2C2418;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"><svg style="transform:rotate(45deg)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        const activeIcon = leaflet.divIcon({
          className: 'vv-marker-active',
          html: `<div style="width:36px;height:36px;background:#D4654A;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 8px rgba(212,101,74,0.4)"><svg style="transform:rotate(45deg)" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        });

        // Clear old markers
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        // Add markers for venues with coordinates
        const venuesWithCoords = venues.filter(v => v.lat && v.lng);

        // If no venues have coords, place them roughly around the center with small offsets for demo
        const markerVenues = venuesWithCoords.length > 0
          ? venuesWithCoords
          : venues.map((v, i) => ({
              ...v,
              lat: center[0] + (Math.random() - 0.5) * 0.05,
              lng: center[1] + (Math.random() - 0.5) * 0.08,
            }));

        const bounds: [number, number][] = [];

        markerVenues.forEach(v => {
          if (!v.lat || !v.lng) return;
          const marker = leaflet.marker([v.lat, v.lng], { icon })
            .addTo(map)
            .on('click', () => {
              setSelectedVenue(v);
              // Reset all icons, highlight this one
              markersRef.current.forEach(m => m.setIcon(icon));
              marker.setIcon(activeIcon);
            });

          // Tooltip with venue name
          marker.bindTooltip(v.title, {
            direction: 'top',
            offset: [0, -34],
            className: 'vv-tooltip',
          });

          markersRef.current.push(marker);
          bounds.push([v.lat, v.lng]);
        });

        // Fit bounds if multiple markers
        if (bounds.length > 1) {
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
        }

        mapRef.current = map;

        // Fix map render on tab switch
        setTimeout(() => map.invalidateSize(), 100);
      } catch (err) {
        console.error('Error loading map:', err);
      } finally {
        setLoading(false);
      }
    };

    initMap();

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, venues]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      {/* View toggle */}
      {showToggle && (
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => { setView('list'); onViewChange?.('list'); }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-light transition-all ${view === 'list' ? 'bg-[#2C2418] text-[#F5F0EA]' : 'bg-white text-[#8C7B66] border border-[#E0D5C5] hover:border-[#C4AE8F]'}`}
          >
            <List className="w-3.5 h-3.5" />List
          </button>
          <button
            onClick={() => { setView('map'); onViewChange?.('map'); }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-light transition-all ${view === 'map' ? 'bg-[#2C2418] text-[#F5F0EA]' : 'bg-white text-[#8C7B66] border border-[#E0D5C5] hover:border-[#C4AE8F]'}`}
          >
            <MapIcon className="w-3.5 h-3.5" />Map
          </button>
          <span className="text-[12px] text-[#A69580] font-light ml-2">{venues.length} venue{venues.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Map view */}
      {view === 'map' && (
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 z-20 bg-[#F5F0EA]/80 flex items-center justify-center rounded-xl">
              <Loader2 className="w-6 h-6 text-[#C4AE8F] animate-spin" />
            </div>
          )}
          <div
            ref={mapContainerRef}
            className="w-full rounded-xl border border-[#E0D5C5] overflow-hidden"
            style={{ height }}
          />
          {/* Tooltip styling */}
          <style jsx global>{`
            .vv-tooltip {
              background: #2C2418 !important;
              color: #F5F0EA !important;
              border: none !important;
              border-radius: 8px !important;
              padding: 6px 12px !important;
              font-size: 12px !important;
              font-weight: 300 !important;
              font-family: var(--font-sans), sans-serif !important;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
            }
            .vv-tooltip::before {
              border-top-color: #2C2418 !important;
            }
            .leaflet-control-zoom a {
              background: #F5F0EA !important;
              color: #2C2418 !important;
              border-color: #E0D5C5 !important;
            }
            .leaflet-control-zoom a:hover {
              background: #EDE5D8 !important;
            }
          `}</style>
          {/* Selected venue popup */}
          {selectedVenue && (
            <VenuePopup venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
          )}
        </div>
      )}

      {/* List view — render nothing, let parent handle it */}
      {view === 'list' && null}
    </div>
  );
}
