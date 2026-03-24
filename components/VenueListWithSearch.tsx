'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import VenueSearch from './VenueSearch';
import VenueGrid from './VenueGrid';
import VenueMap from './VenueMap';
import type { Venue } from '@/lib/types';

function SearchAwareContent({ venues, priorityCount }: { venues: Venue[]; priorityCount: number }) {
  const searchParams = useSearchParams();
  const hasParams = searchParams.get('q') || searchParams.get('event') || searchParams.get('guests');
  const [currentView, setCurrentView] = useState<'map' | 'list'>('list');

  if (hasParams) {
    return <VenueSearch />;
  }

  return (
    <div>
      <VenueMap
        venues={venues}
        showToggle={true}
        defaultView="list"
        height="450px"
        onViewChange={setCurrentView}
      />
      {currentView === 'list' && (
        <VenueGrid venues={venues} priorityCount={priorityCount} />
      )}
    </div>
  );
}

export default function VenueListWithSearch({ venues, priorityCount = 3 }: { venues: Venue[]; priorityCount?: number }) {
  return (
    <Suspense fallback={<VenueGrid venues={venues} priorityCount={priorityCount} />}>
      <SearchAwareContent venues={venues} priorityCount={priorityCount} />
    </Suspense>
  );
}
