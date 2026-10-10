import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="alm-root" style={{ background: '#F5F5F7', color: '#0B1220', fontFamily: "'Montserrat', system-ui, sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      <Nav active="" />
      <section style={{ padding: '160px 28px 176px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, opacity: 0.72 }}>
            <span style={{ width: '7px', height: '7px', background: '#FBAE4F', borderRadius: '50%' }} />
            404
          </div>
          <h1 style={{ margin: '22px 0 0', fontSize: 'clamp(48px, 7vw, 112px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 600 }}>
            Wrong level.<br />
            <span style={{ color: '#FBAE4F' }}>Let’s find your spot.</span>
          </h1>
          <div style={{ marginTop: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="alm-btn" href="/" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '56px', padding: '0 26px', borderRadius: '999px', background: '#0B1220', color: '#FFFFFF', fontWeight: 600, fontSize: '15px' }}>
              Back to home
            </Link>
            <Link className="alm-btn" href="/locations" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '56px', padding: '0 26px', borderRadius: '999px', border: '2px solid #0B1220', fontWeight: 600, fontSize: '15px' }}>
              Find a location
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
