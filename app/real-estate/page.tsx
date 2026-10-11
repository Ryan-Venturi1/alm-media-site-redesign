import type { Metadata } from 'next';
import RealEstatePage from '@/components/pages/RealEstatePage';

export const metadata: Metadata = {
  title: 'Real estate & property owners',
  description: 'More revenue from every space: advertising, Digital Dynamic Rate Boards™ and event income for garage and lot owners — we install and sell, you get a percentage of the gross.',
  alternates: { canonical: '/real-estate' },
};

export default function Page() {
  return <RealEstatePage />;
}
