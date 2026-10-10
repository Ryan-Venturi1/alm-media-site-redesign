import type { Metadata } from 'next';
import EventsPage from '@/components/pages/EventsPage';

export const metadata: Metadata = {
  title: 'Events & venues',
  description: 'Rooftops, surface lots and garage levels for brand activations, venue rental and event-day parking + media.',
  alternates: { canonical: '/events' },
};

export default function Page() {
  return <EventsPage />;
}
