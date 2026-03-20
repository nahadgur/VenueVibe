'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0F2618]/95 backdrop-blur-md border-b border-[#2A4A2A]/60'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full border border-[#C8A96E]/40 flex items-center justify-center group-hover:border-[#C8A96E] transition-colors">
              <span className="text-[#C8A96E] font-display text-lg font-semibold italic">V</span>
            </div>
            <span className="text-[#E8DFC9] font-display font-light text-xl tracking-wide">VenueVibe</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/venues" className="text-[13px] font-light text-[#8FA882] hover:text-[#E8DFC9] transition-colors duration-300">
              Browse Venues
            </Link>
            <Link href="/how-it-works" className="text-[13px] font-light text-[#8FA882] hover:text-[#E8DFC9] transition-colors duration-300">
              How it Works
            </Link>
            <Link href="/list-venue" className="text-[13px] font-light text-[#8FA882] hover:text-[#E8DFC9] transition-colors duration-300">
              List your Venue
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="text-[#5A7A52] hover:text-[#C8A96E] transition-colors">
              <Search className="w-[18px] h-[18px]" />
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full border border-[#2A4A2A]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#2A4A2A] flex items-center justify-center">
                      <User className="w-4 h-4 text-[#8FA882]" />
                    </div>
                  )}
                  <span className="text-[13px] font-light text-[#8FA882] hidden lg:block">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-[#5A7A52] hover:text-[#E8DFC9] transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="px-6 py-2.5 rounded-full border border-[#C8A96E]/40 hover:bg-[#C8A96E] hover:text-[#1B2E1B] text-[#C8A96E] transition-all duration-300 text-[13px] font-light"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#8FA882] hover:text-[#E8DFC9] hover:bg-[#2A4A2A]/30 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0F2618] border-b border-[#2A4A2A]"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link href="/venues" className="block px-3 py-4 text-[14px] font-light text-[#8FA882] hover:text-[#E8DFC9] hover:bg-[#2A4A2A]/20 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              Browse Venues
            </Link>
            <Link href="/how-it-works" className="block px-3 py-4 text-[14px] font-light text-[#8FA882] hover:text-[#E8DFC9] hover:bg-[#2A4A2A]/20 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              How it Works
            </Link>
            <Link href="/list-venue" className="block px-3 py-4 text-[14px] font-light text-[#8FA882] hover:text-[#E8DFC9] hover:bg-[#2A4A2A]/20 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              List your Venue
            </Link>
            <div className="pt-4 mt-2 border-t border-[#2A4A2A] flex flex-col gap-3">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-3 py-2">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        width={40}
                        height={40}
                        className="rounded-full border border-[#2A4A2A]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#2A4A2A] flex items-center justify-center">
                        <User className="w-5 h-5 text-[#8FA882]" />
                      </div>
                    )}
                    <span className="text-[14px] font-light text-[#E8DFC9]">
                      {user.displayName}
                    </span>
                  </div>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#2A4A2A]/30 hover:bg-[#2A4A2A]/50 transition-all text-[14px] font-light text-[#8FA882]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-[#C8A96E]/40 hover:bg-[#C8A96E] hover:text-[#1B2E1B] text-[#C8A96E] transition-all text-[14px] font-light"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
