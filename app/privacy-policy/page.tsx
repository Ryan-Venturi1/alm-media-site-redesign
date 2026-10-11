import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { PRIVACY } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How A Lot Media collects, uses, discloses and safeguards information when you visit alotmedia.com.',
  alternates: { canonical: '/privacy-policy' },
};

export default function Page() {
  return <LegalPage kicker="Legal" title="Privacy Policy" sections={PRIVACY} other={{ href: '/terms-conditions', label: 'Terms & Conditions' }} />;
}
