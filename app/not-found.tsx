'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
        <p className="text-[120px] md:text-[180px] font-[Georgia,serif] font-normal text-[#E0D5C5] leading-none select-none mb-2">
          404
        </p>

        <h1 className="text-2xl md:text-3xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">
          This space doesn&apos;t <span className="italic text-[#8C7B66]">exist</span>
        </h1>
        <p className="text-[#8C7B66] text-[15px] font-light leading-relaxed mb-8 max-w-md mx-auto">
          The page you&apos;re looking for may have been moved or removed. Redirecting you home in {countdown}...
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
        >
          Go home now
        </Link>
      </div>
    </main>
  );
}
