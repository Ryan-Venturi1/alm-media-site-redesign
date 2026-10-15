import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alotmedia.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'A Lot Media — America’s parking media network',
    template: '%s · A Lot Media',
  },
  description:
    'Static media, digital rate boards and event venues across 12,000 parking locations in 400+ cities. Every trip ends here.',
  applicationName: 'A Lot Media',
  openGraph: {
    type: 'website',
    siteName: 'A Lot Media',
    title: 'A Lot Media — Every trip ends here.',
    description: 'America’s parking media network: static, digital and events across 12,000 parking locations.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'A Lot Media — Every trip ends here.' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
};

export const viewport: Viewport = {
  themeColor: '#344567',
  width: 'device-width',
  initialScale: 1,
};

// Turns scroll motion on before first paint so nothing flashes in and out.
// lib/motion.js confirms it after hydration; if scripts never run, the class
// is removed again and every page shows fully static.
const MOTION_BOOT = `(function(){try{var d=document.documentElement;if('IntersectionObserver' in window&&!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){d.classList.add('alm-motion');setTimeout(function(){if(!window.__almMotionReady)d.classList.remove('alm-motion')},4000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
        <link rel="preload" href="/fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
