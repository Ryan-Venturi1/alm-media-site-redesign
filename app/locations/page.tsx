import type { Metadata } from 'next';
import LocationsPage from '@/components/pages/LocationsPage';

export const metadata: Metadata = {
  title: 'Locations',
  description: '12,000 parking locations across 400+ cities and 11 flagship markets.',
  alternates: { canonical: '/locations' },
};

export default function Page() {
  return <LocationsPage />;
}
