import type {Metadata} from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import CookieBanner from '@/components/CookieBanner';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'VenueVibe | Find your perfect space',
  description: 'Thoughtfully curated venues for moments that matter.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased bg-[#F5F0EA] text-[#2C2418]" suppressHydrationWarning>
        <AuthProvider>
          {children}
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  );
}
