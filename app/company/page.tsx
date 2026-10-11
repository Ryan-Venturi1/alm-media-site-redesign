import type { Metadata } from 'next';
import CompanyPage from '@/components/pages/CompanyPage';

export const metadata: Metadata = {
  title: 'Company & gallery',
  description: 'Designing and installing parking media since 2016 — with sister companies MetroClick and faytech, offices in Hartford, Los Angeles, Chicago and New York.',
  alternates: { canonical: '/company' },
};

export default function Page() {
  return <CompanyPage />;
}
