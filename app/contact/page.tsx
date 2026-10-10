import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to A Lot Media — advertisers, property owners, event organizers and investors.',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return <ContactPage />;
}
