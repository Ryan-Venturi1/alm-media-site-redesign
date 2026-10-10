import type { Metadata } from 'next';
import InsightsPage from '@/components/pages/InsightsPage';

export const metadata: Metadata = {
  title: 'Insights, FAQ & glossary',
  description: 'News, resources, answers and an out-of-home glossary from A Lot Media.',
  alternates: { canonical: '/insights' },
};

export default function Page() {
  return <InsightsPage />;
}
