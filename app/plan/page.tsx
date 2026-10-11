import type { Metadata } from 'next';
import PlanPage from '@/components/pages/PlanPage';

export const metadata: Metadata = {
  title: 'Plan a campaign',
  description: 'Pick markets, formats and dates, then send your plan — our team confirms availability and rates and sends a proposal.',
  alternates: { canonical: '/plan' },
};

export default function Page() {
  return <PlanPage />;
}
