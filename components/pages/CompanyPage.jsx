'use client';

// Ported from the design-canvas artboard Company.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

export default class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderVals() {
    var self = this;
    var st = this.state || {};
    var B = '';
    var gf = st.gf || 'all';
    var all = [
      ['/media/photos/audi-garage-lobby.webp', 'AUDI · DIGITAL PANELS', 'digital', 2, '50% 50%'],
      ['/media/photos/united-digital-panel.webp', 'UNITED · DIGITAL PANEL', 'digital', 1, '30% 50%'],
      ['/media/photos/hartford-healthcare-wallscape.webp', 'HARTFORD HEALTHCARE · WALLSCAPE', 'static', 1, '50% 50%'],
      ['/media/photos/panera-now-open.webp', 'PANERA BREAD · DIGITAL PANEL', 'digital', 1, '60% 50%'],
      ['/media/photos/hartford-healthcare-elevator-wraps.webp', 'HARTFORD HEALTHCARE · ELEVATOR WRAP', 'static', 2, '50% 50%'],
      ['/media/photos/a-beautiful-noise-panel.webp', 'A BEAUTIFUL NOISE · DIGITAL PANEL', 'digital', 1, '50% 40%'],
      ['/media/photos/msk-garage-entrance.webp', 'MSK · GARAGE ENTRANCE', 'digital', 1, '50% 50%'],
      ['/media/photos/getaround-elevator-wrap.webp', 'GETAROUND · ELEVATOR WRAP', 'static', 2, '50% 50%'],
      ['/media/photos/recess-digital-panel.webp', 'RECESS · DIGITAL PANEL', 'digital', 1, '50% 50%'],
      ['/media/photos/compass-wallscape.webp', 'COMPASS · WALLSCAPE', 'static', 1, '50% 50%'],
      ['/media/photos/ddrb-connecticut.webp', 'RATE BOARD · CONNECTICUT', 'digital', 2, '50% 34%'],
      ['/media/photos/panera-garage-lobby.webp', 'PANERA BREAD · GARAGE LOBBY', 'digital', 1, '50% 50%'],
      ['/media/photos/hartford-healthcare-entrance-wallscape.webp', 'HARTFORD HEALTHCARE · ENTRANCE', 'static', 1, '50% 50%'],
      ['/media/photos/blank-street-interactive-panel.webp', 'BLANK STREET · INTERACTIVE', 'digital', 1, '30% 50%'],
      ['/media/photos/audi-commuters.webp', 'AUDI · GARAGE LOBBY', 'digital', 1, '50% 50%'],
      ['/media/photos/hartford-healthcare-banner.webp', 'HARTFORD HEALTHCARE · BANNER', 'static', 1, '50% 50%'],
      ['/media/photos/checkerboard-lobby-panel.webp', 'GARAGE LOBBY · DIGITAL PANEL', 'digital', 1, '50% 50%'],
      ['/media/photos/msk-digital-panel.webp', 'MSK · DIGITAL PANEL', 'digital', 1, '50% 50%'],
      ['/media/photos/a-beautiful-noise-posters.webp', 'A BEAUTIFUL NOISE · STATIC POSTERS', 'static', 1, '50% 50%'],
      ['/media/photos/digital-panel-cashier.webp', 'DIGITAL PANEL · CASHIER', 'digital', 1, '50% 50%'],
      ['/media/photos/love-com-digital-panel.webp', 'LOVE.COM · DIGITAL PANEL', 'digital', 1, '50% 50%'],
      ['/media/photos/hartford-healthcare-display.webp', 'HARTFORD HEALTHCARE · DISPLAY', 'digital', 1, '50% 50%'],
      ['/media/photos/customer-service-panel.webp', 'CUSTOMER SERVICE · DIGITAL PANEL', 'digital', 1, '50% 50%'],
      ['/media/photos/blank-street-engagement.webp', 'BLANK STREET · ENGAGEMENT', 'digital', 1, '50% 50%']
    ];
    var list = all.filter(function (p) { return gf === 'all' || p[2] === gf; });
    var idx = st.lb == null ? -1 : st.lb;
    var cur = idx >= 0 && idx < list.length ? list[idx] : null;
    var fdefs = [['all', 'ALL'], ['digital', 'DIGITAL'], ['static', 'STATIC']];
    var stack = [
      ['01', 'Manufacturing', 'We own the plants that build our screens and rate boards.', '/media/photos/ddrb-connecticut.webp', '50% 34%'],
      ['02', 'Software', 'In-house engineering for content, pricing and reporting.', '/media/photos/blank-street-interactive-panel.webp', '30% 50%'],
      ['03', 'Printing', 'Wallscapes, wraps and tickets printed in-house.', '/media/photos/hartford-healthcare-banner.webp', '50% 50%'],
      ['04', 'Design', 'A creative team that builds for the parking context.', '/media/photos/recess-digital-panel.webp', '70% 50%'],
      ['05', 'Installation', 'Our own crews, installing since 2016.', '/media/photos/hartford-healthcare-entrance-wallscape.webp', '50% 50%'],
      ['06', 'Sales', 'A national sales network that keeps inventory full.', '/media/photos/audi-garage-lobby.webp', '50% 50%']
    ];
    return {
      stack: stack.map(function (s) { return { no: s[0], title: s[1], desc: s[2], img: B + s[3], pos: s[4] }; }),
      gfilters: fdefs.map(function (f) {
        var on = f[0] === gf;
        return { label: f[1], pressed: on ? 'true' : 'false', bg: on ? '#FBAE4F' : 'transparent', fg: on ? '#0B1220' : '#FFFFFF', bd: on ? '#FBAE4F' : 'rgba(255,255,255,0.35)', pick: function () { self.setState({ gf: f[0], lb: -1 }); } };
      }),
      photos: list.map(function (p, i) { return { src: B + p[0], caption: p[1], span: p[3], pos: p[4], open: function () { self.setState({ lb: i }); } }; }),
      lightbox: !!cur,
      lb: cur ? { src: B + cur[0], caption: cur[1] } : { src: '', caption: '' },
      close: function () { self.setState({ lb: -1 }); },
      prev: function () { self.setState({ lb: (idx - 1 + list.length) % list.length }); },
      next: function () { self.setState({ lb: (idx + 1) % list.length }); }
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="company" />
        {/* HERO */}
        <section style={{ padding: "104px 28px 0" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />About A Lot Media</div>
            <h1 className="alm-rise" style={{ margin: "22px 0 0", maxWidth: "1240px", fontSize: "clamp(44px, 7.2vw, 116px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600", animationDelay: ".1s" }}>We build the media <span style={{ color: "#8A5300" }}>where America parks.</span></h1>
            <div className="alm-rise" style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "24px 64px", justifyContent: "space-between", animationDelay: ".2s" }}>
              <p style={{ margin: "0", maxWidth: "620px", fontSize: "19px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Since 2016, A Lot Media has designed, built and installed advertising inside parking lots and garages. Today we operate across 12,000 locations in 400+ cities, with offices in Los Angeles, Chicago and New York.</p>
              <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "48px", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>2016</div>
                  <div style={{ marginTop: "6px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>FOUNDED</div>
                </div>
                <div>
                  <div style={{ fontSize: "48px", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>3</div>
                  <div style={{ marginTop: "6px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>OFFICES</div>
                </div>
                <div>
                  <div style={{ fontSize: "48px", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>6</div>
                  <div style={{ marginTop: "6px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>IN-HOUSE DISCIPLINES</div>
                </div>
              </div>
            </div>
          </div>
          <div className="alm-rise" style={{ maxWidth: "1360px", margin: "64px auto 0", height: "620px", borderRadius: "18px", overflow: "hidden", background: "#0B1220", animationDelay: ".3s" }}>
            <img src="/media/photos/glass-lobby-panel.webp" alt="Glass-walled garage lobby with an A Lot Media digital panel and people walking" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
          </div>
        </section>
        {/* STACK */}
        <section style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>One company.<br />Every layer.</h2>
              <p style={{ margin: "0", maxWidth: "440px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Most networks rent screens and outsource the rest. We own the plants that build ours — and every step after.</p>
            </div>
            <ol style={{ margin: "56px 0 0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {(v.stack || []).map((s, sI) => (
                <Fragment key={sI}>
                  <li className="alm-tile alm-wipe" style={{ position: "relative", height: "360px", borderRadius: "16px", overflow: "hidden", background: "#0B1220", color: "#FFFFFF" }}>
                    <img src={s.img} alt="" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: s.pos, opacity: "0.9" }} loading="lazy" decoding="async" />
                    <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(11,18,32,0.15) 20%, rgba(11,18,32,0.92) 100%)" }} />
                    <div style={{ position: "absolute", left: "20px", right: "20px", bottom: "20px" }}>
                      <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", color: "#FBAE4F" }}>{s.no}</div>
                      <div style={{ marginTop: "8px", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>{s.title}</div>
                      <div style={{ marginTop: "6px", fontSize: "14px", lineHeight: "1.5", fontWeight: "500", color: "#D5DAE3" }}>{s.desc}</div>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ol>
          </div>
        </section>
        {/* GALLERY */}
        <section id="gallery" style={{ padding: "128px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Gallery</div>
                <h2 className="alm-in" style={{ margin: "22px 0 0", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>In the network.</h2>
              </div>
              <div role="group" aria-label="Filter gallery" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(v.gfilters || []).map((g, gI) => (
                  <Fragment key={gI}>
                    <button type="button" aria-pressed={g.pressed} onClick={g.pick} style={{ minHeight: "46px", padding: "0 18px", borderRadius: "999px", border: `2px solid ${g.bd}`, background: g.bg, color: g.fg, fontFamily: "'Montserrat', sans-serif", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", cursor: "pointer" }}>{g.label}</button>
                  </Fragment>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gridAutoRows: "240px", gap: "12px" }}>
              {(v.photos || []).map((p, pI) => (
                <Fragment key={pI}>
                  <button className="alm-tile alm-wipe" type="button" onClick={p.open} aria-label={`Open photo: ${p.caption}`} style={{ position: "relative", padding: "0", border: "0", borderRadius: "16px", overflow: "hidden", background: "#121B2E", cursor: "zoom-in", gridRow: `span ${p.span}` }}>
                    <img src={p.src} alt={p.caption} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos, display: "block" }} loading="lazy" decoding="async" />
                    {' '}
                    <span style={{ position: "absolute", left: "12px", bottom: "12px", padding: "6px 12px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: "600", letterSpacing: "0.06em" }}>{p.caption}</span>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* OFFICES */}
        <section style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <h2 className="alm-in" style={{ margin: "0", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Offices</h2>
            <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
              <div className="alm-tile alm-in" style={{ borderRadius: "16px", overflow: "hidden", background: "#FFFFFF" }}>
                <div style={{ height: "260px", overflow: "hidden" }}>
                  <img src="/media/markets/la.webp" alt="Los Angeles city lights at night" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                </div>
                <div style={{ padding: "28px" }}>
                  <div style={{ fontSize: "28px", fontWeight: "650", letterSpacing: "-0.02em" }}>Los Angeles</div>
                  <div style={{ marginTop: "8px", fontSize: "16px", fontWeight: "400", color: "#4E586A" }}>1335 Flower St<br />Los Angeles, CA 90015</div>
                </div>
              </div>
              <div className="alm-tile alm-in" style={{ borderRadius: "16px", overflow: "hidden", background: "#FFFFFF" }}>
                <div style={{ height: "260px", overflow: "hidden" }}>
                  <img src="/media/markets/chicago.webp" alt="Chicago skyline at night" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                </div>
                <div style={{ padding: "28px" }}>
                  <div style={{ fontSize: "28px", fontWeight: "650", letterSpacing: "-0.02em" }}>Chicago</div>
                  <div style={{ marginTop: "8px", fontSize: "16px", fontWeight: "400", color: "#4E586A" }}>33 W Monroe St<br />Chicago, IL 60603</div>
                </div>
              </div>
              <div className="alm-tile alm-in" style={{ borderRadius: "16px", overflow: "hidden", background: "#FFFFFF" }}>
                <div style={{ height: "260px", overflow: "hidden" }}>
                  <img src="/media/markets/nyc.webp" alt="Empire State Building at night" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                </div>
                <div style={{ padding: "28px" }}>
                  <div style={{ fontSize: "28px", fontWeight: "650", letterSpacing: "-0.02em" }}>New York</div>
                  <div style={{ marginTop: "8px", fontSize: "16px", fontWeight: "400", color: "#4E586A" }}>231 W 29th St<br />New York, NY 10001</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CAREERS */}
        <section style={{ padding: "0 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "56px", borderRadius: "18px", background: "#FBAE4F", display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "clamp(30px, 3.6vw, 52px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>Build the network with us.</div>
              <div style={{ marginTop: "12px", fontSize: "17px", fontWeight: "600" }}>Sales, install, engineering and design roles across our markets. [Open roles]</div>
            </div>
            <A className="alm-btn" href="/contact" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>See careers</A>
          </div>
        </section>
        <Footer />
        {v.lightbox ? (
          <>
            <div className="alm-fade" role="dialog" aria-modal="true" aria-label="Photo viewer" style={{ position: "fixed", inset: "0", zIndex: "50", background: "rgba(7,12,23,0.94)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", boxSizing: "border-box" }}>
              <img src={v.lb?.src} alt={v.lb?.caption} style={{ maxWidth: "100%", maxHeight: "80%", objectFit: "contain", borderRadius: "16px" }} loading="lazy" decoding="async" />
              <div style={{ marginTop: "20px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", justifyContent: "center", color: "#FFFFFF" }}>
                <button type="button" aria-label="Previous photo" onClick={v.prev} style={{ width: "52px", height: "52px", borderRadius: "50%", border: "2px solid #FFFFFF", background: "transparent", color: "#FFFFFF", fontSize: "20px", cursor: "pointer" }}>←</button>
                <div style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "0.08em", minWidth: "220px", textAlign: "center" }}>{v.lb?.caption}</div>
                <button type="button" aria-label="Next photo" onClick={v.next} style={{ width: "52px", height: "52px", borderRadius: "50%", border: "2px solid #FFFFFF", background: "transparent", color: "#FFFFFF", fontSize: "20px", cursor: "pointer" }}>→</button>
                <button type="button" onClick={v.close} style={{ minHeight: "52px", padding: "0 20px", borderRadius: "999px", border: "0", background: "#FBAE4F", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Close</button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
