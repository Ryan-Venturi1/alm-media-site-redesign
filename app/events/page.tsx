import type { Metadata } from 'next';
import EventsPage from '@/components/pages/EventsPage';

export const metadata: Metadata = {
  title: 'Events & venues',
  description: 'Parking lots and garages for event activation, VIP park & shuttle, bulk parking, sponsorship and game-day takeovers.',
  alternates: { canonical: '/events' },
};

export default function Page() {
  return <EventsPage />;
}
