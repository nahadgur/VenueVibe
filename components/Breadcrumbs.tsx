'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { type BreadcrumbItem } from '@/lib/locations';

interface BreadcrumbsProps { items: BreadcrumbItem[]; }

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.label, item: `https://venuevibe.com${item.href}` })) }) }} />
      <ol className="flex items-center flex-wrap gap-1.5 overflow-x-auto">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5 shrink-0">
              {index > 0 && <ChevronRight className="w-3 h-3 text-[#C4AE8F] shrink-0" />}
              {isLast ? (
                <span className="text-[13px] font-light text-[#2C2418] truncate max-w-[200px] sm:max-w-none">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-[13px] font-light text-[#A69580] hover:text-[#D4654A] transition-colors whitespace-nowrap">{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
