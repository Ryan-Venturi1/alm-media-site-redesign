import type { Metadata } from 'next';
import InvestorsPage from '@/components/pages/InvestorsPage';

export const metadata: Metadata = {
  title: 'Investors',
  description: 'A vertically integrated out-of-home network across 12,000 parking locations — static, digital and events on one footprint.',
  alternates: { canonical: '/investors' },
};

export default function Page() {
  return <InvestorsPage />;
}
