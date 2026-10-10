import type { Metadata } from 'next';
import FormatsPage from '@/components/pages/FormatsPage';

export const metadata: Metadata = {
  title: 'Formats & specs',
  description: 'Every A Lot Media format — wallscapes, elevator wraps, gate arms, tickets, Digital Dynamic Rate Boards™, interactive panels and events.',
  alternates: { canonical: '/formats' },
};

export default function Page() {
  return <FormatsPage />;
}
