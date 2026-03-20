import type {Metadata} from 'next';
import { Work_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'VenueVibe | Spaces that breathe',
  description: 'Curated venues for elevated occasions.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${workSans.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-[#0F2618] text-[#E8DFC9]" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
