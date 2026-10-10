import type { Metadata } from 'next';
import AdvertisersPage from '@/components/pages/AdvertisersPage';

export const metadata: Metadata = {
  title: 'Advertise',
  description: 'Reach drivers in the minutes they can’t skip — static, digital and event activations across the A Lot Media parking network.',
  alternates: { canonical: '/advertisers' },
};

export default function Page() {
  return <AdvertisersPage />;
}
