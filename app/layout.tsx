import type {Metadata, Viewport} from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { SavedVenuesProvider } from '@/components/SavedVenuesProvider';
import CookieBanner from '@/components/CookieBanner';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#F5F0EA',
};

export const metadata: Metadata = {
  title: 'VenueVibe | Find your perfect space',
  description: 'Thoughtfully curated venues for moments that matter.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased bg-[#F5F0EA] text-[#2C2418]" suppressHydrationWarning>
        <AuthProvider>
          <SavedVenuesProvider>
            {children}
            <CookieBanner />
          </SavedVenuesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
