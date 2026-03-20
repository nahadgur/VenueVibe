'use client';

import { useAuth } from '@/components/AuthProvider';
import { User, Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C4AE8F] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white border border-[#E0D5C5] rounded-xl p-10 text-center max-w-md w-full">
          <div className="w-14 h-14 rounded-full bg-[#EDE5D8] flex items-center justify-center mx-auto mb-6">
            <User className="w-7 h-7 text-[#8C7B66]" />
          </div>
          <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Sign in to continue</h2>
          <p className="text-[#8C7B66] text-[14px] font-light mb-8">You need to be logged in to access this page.</p>
          <button
            onClick={signInWithGoogle}
            className="w-full py-3.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
