import type { Metadata } from 'next';
import RealEstatePage from '@/components/pages/RealEstatePage';

export const metadata: Metadata = {
  title: 'Real estate & property owners',
  description: 'More revenue from every space: advertising, dynamic pricing and event income for garage and lot owners — we install, we sell, you share.',
  alternates: { canonical: '/real-estate' },
};

export default function Page() {
  return <RealEstatePage />;
}
