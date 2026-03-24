'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Search, Menu, X, User, LogOut, ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, signInWithGoogle, logout } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
      // Cmd/Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    router.push(`/venues?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F5F0EA]/95 backdrop-blur-md border-b border-[#E0D5C5]'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#2C2418] font-[Georgia,serif] text-xl tracking-tight">VenueVibe</span>
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              <Link href="/venues" className="text-[13px] font-light text-[#8C7B66] hover:text-[#2C2418] transition-colors duration-300">
                Browse Venues
              </Link>
              <Link href="/how-it-works" className="text-[13px] font-light text-[#8C7B66] hover:text-[#2C2418] transition-colors duration-300">
                How it Works
              </Link>
              <Link href="/list-venue" className="text-[13px] font-light text-[#8C7B66] hover:text-[#2C2418] transition-colors duration-300">
                List your Venue
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-[#A69580] hover:text-[#2C2418] transition-colors p-1 relative group"
                title="Search (Ctrl+K)"
              >
                <Search className="w-[18px] h-[18px]" />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-[#C4AE8F] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Ctrl+K</span>
              </button>

              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt={user.displayName || 'User'} width={32} height={32} className="rounded-full border border-[#E0D5C5]" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#EDE5D8] flex items-center justify-center">
                        <User className="w-4 h-4 text-[#8C7B66]" />
                      </div>
                    )}
                    <span className="text-[13px] font-light text-[#8C7B66] hidden lg:block">{user.displayName?.split(' ')[0]}</span>
                  </Link>
                  <button onClick={logout} className="text-[#A69580] hover:text-[#2C2418] transition-colors" title="Sign Out">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button onClick={signInWithGoogle} className="px-6 py-2.5 rounded-full border border-[#2C2418] hover:bg-[#2C2418] hover:text-[#F5F0EA] text-[#2C2418] transition-all duration-300 text-[13px] font-light">
                  Sign In
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-md text-[#8C7B66] hover:text-[#2C2418] hover:bg-[#EDE5D8] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2.5 rounded-md text-[#8C7B66] hover:text-[#2C2418] hover:bg-[#EDE5D8] focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#F5F0EA] border-b border-[#E0D5C5]">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link href="/venues" className="block px-3 py-4 text-[14px] font-light text-[#8C7B66] hover:text-[#2C2418] hover:bg-[#EDE5D8] rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Browse Venues</Link>
              <Link href="/how-it-works" className="block px-3 py-4 text-[14px] font-light text-[#8C7B66] hover:text-[#2C2418] hover:bg-[#EDE5D8] rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>How it Works</Link>
              <Link href="/list-venue" className="block px-3 py-4 text-[14px] font-light text-[#8C7B66] hover:text-[#2C2418] hover:bg-[#EDE5D8] rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>List your Venue</Link>
              <Link href="/blog" className="block px-3 py-4 text-[14px] font-light text-[#8C7B66] hover:text-[#2C2418] hover:bg-[#EDE5D8] rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              <div className="pt-4 mt-2 border-t border-[#E0D5C5] flex flex-col gap-3">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2">
                      {user.photoURL ? (
                        <Image src={user.photoURL} alt={user.displayName || 'User'} width={40} height={40} className="rounded-full border border-[#E0D5C5]" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#EDE5D8] flex items-center justify-center"><User className="w-5 h-5 text-[#8C7B66]" /></div>
                      )}
                      <span className="text-[14px] font-light text-[#2C2418]">{user.displayName}</span>
                    </Link>
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#EDE5D8] hover:bg-[#E0D5C5] transition-all text-[14px] font-light text-[#8C7B66]">
                      <LogOut className="w-4 h-4" /><span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-[#2C2418] hover:bg-[#2C2418] hover:text-[#F5F0EA] text-[#2C2418] transition-all text-[14px] font-light">
                    <User className="w-4 h-4" /><span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* ── Search Overlay ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 right-0 z-[70] pt-4 sm:pt-20 px-4"
            >
              <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E0D5C5] shadow-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4">
                  <Search className="w-5 h-5 text-[#A69580] shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search venues by name, location, or type..."
                    className="flex-1 bg-transparent border-none text-[#2C2418] placeholder-[#C4AE8F] text-[16px] font-light focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleSearch}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#2C2418] text-[#F5F0EA] text-[12px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors shrink-0"
                    >
                      Search <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 rounded-lg text-[#A69580] hover:text-[#2C2418] hover:bg-[#EDE5D8] transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick links */}
                <div className="px-5 py-3 border-t border-[#E0D5C5] bg-[#F8F4EE]">
                  <p className="text-[10px] text-[#A69580] tracking-[0.1em] mb-2">POPULAR SEARCHES</p>
                  <div className="flex flex-wrap gap-2">
                    {['Wedding venues London', 'Meeting rooms', 'Rooftop', 'Private dining', 'Warehouse', 'Photo studio'].map(term => (
                      <button
                        key={term}
                        onClick={() => {
                          setIsSearchOpen(false);
                          router.push(`/venues?q=${encodeURIComponent(term)}`);
                        }}
                        className="px-3 py-1.5 rounded-full border border-[#E0D5C5] bg-white text-[11px] text-[#8C7B66] font-light hover:border-[#D4654A]/40 hover:text-[#D4654A] transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
