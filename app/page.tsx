import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = {
  description: "America's parking media network: static media, digital rate boards and event venues across 12,000 parking locations in 400+ cities.",
  alternates: { canonical: '/' },
};

export default function Page() {
  return <HomePage />;
}
