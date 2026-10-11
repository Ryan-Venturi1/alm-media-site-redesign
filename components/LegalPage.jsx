import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// Renders "[text](url)" links inside a plain string.
function withLinks(text) {
  const parts = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a key={m.index} href={m[2]} style={{ color: '#0B1220', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
        {m[1]}
      </a>,
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function LegalPage({ kicker, title, sections, other }) {
  return (
    <div className="alm-root" style={{ background: '#F5F5F7', color: '#0B1220', fontFamily: "'Montserrat', system-ui, sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      <Nav active="" />
      <section style={{ padding: '104px 28px 56px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, opacity: 0.72 }}>
            <span style={{ width: '7px', height: '7px', background: '#FBAE4F', borderRadius: '50%' }} />
            {kicker}
          </div>
          <h1 style={{ margin: '22px 0 0', fontSize: 'clamp(44px, 6.4vw, 96px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 600 }}>{title}</h1>
        </div>
      </section>
      <section style={{ padding: '0 28px 128px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px 64px', alignItems: 'flex-start' }}>
          <nav className="alm-legal-toc" aria-label="On this page" style={{ flex: '1 1 240px', maxWidth: '320px', borderTop: '3px solid #0B1220', paddingTop: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', color: '#4E586A' }}>ON THIS PAGE</div>
            <ol style={{ margin: '14px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: '10px' }}>
              {sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#s${i + 1}`} style={{ fontSize: '14px', fontWeight: 600, color: '#4E586A', textDecoration: 'none' }}>{s.h}</a>
                </li>
              ))}
            </ol>
            {other ? (
              <a href={other.href} style={{ display: 'inline-block', marginTop: '24px', fontSize: '14px', fontWeight: 600, color: '#8A5300', textDecoration: 'none' }}>
                {other.label} →
              </a>
            ) : null}
          </nav>
          <article style={{ flex: '999 1 560px', minWidth: 0, maxWidth: '820px' }}>
            {sections.map((s, i) => (
              <section key={s.h} id={`s${i + 1}`} style={{ padding: '28px 0 32px', borderTop: '1px solid rgba(11,18,32,0.14)', scrollMarginTop: '24px' }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.15, letterSpacing: '-0.02em', fontWeight: 650 }}>{s.h}</h2>
                {s.blocks.map((b, j) =>
                  b.ul ? (
                    <ul key={j} style={{ margin: '16px 0 0', paddingLeft: '22px', display: 'grid', gap: '10px', fontSize: '16px', lineHeight: 1.65, color: '#3A4456' }}>
                      {b.ul.map((li, k) => <li key={k}>{withLinks(li)}</li>)}
                    </ul>
                  ) : (
                    <p key={j} style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: 1.7, color: '#3A4456' }}>{withLinks(b.p)}</p>
                  ),
                )}
              </section>
            ))}
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
}
