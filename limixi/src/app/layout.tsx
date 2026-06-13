import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './client-layout';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LIMIXI — Premium Luxury Marketplace',
  description: 'Discover the world\'s most exclusive tech and luxury products. LIMIXI curates premium smartphones, watches, audio gear, and accessories from verified sellers.',
  keywords: ['luxury marketplace', 'premium tech', 'LIMIXI', 'smartphones', 'watches', 'headphones'],
  openGraph: {
    title: 'LIMIXI — Premium Luxury Marketplace',
    description: 'The premier destination for premium tech and lifestyle products.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Ambient Glow Background */}
        <div className="ambient-glow-container">
          <div className="glow-orb glow-orb-orange" />
          <div className="glow-orb glow-orb-blue" />
          <div className="glow-orb glow-orb-purple" />
        </div>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
