import type { Metadata } from 'next';
import CompanyPage from '@/components/pages/CompanyPage';

export const metadata: Metadata = {
  title: 'Company & gallery',
  description: 'We build the media where America parks — manufacturing, software, printing, design, installation and sales under one roof.',
  alternates: { canonical: '/company' },
};

export default function Page() {
  return <CompanyPage />;
}
