import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { TERMS } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Terms & conditions',
  description: 'The rules and regulations for using the A Lot Media website.',
  alternates: { canonical: '/terms-conditions' },
};

export default function Page() {
  return <LegalPage kicker="Legal" title="Terms & Conditions" sections={TERMS} other={{ href: '/privacy-policy', label: 'Privacy Policy' }} />;
}
