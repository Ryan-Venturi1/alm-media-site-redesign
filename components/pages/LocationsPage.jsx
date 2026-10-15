'use client';

// Ported from the design-canvas artboard Network.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

export default class LocationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderVals() {
    var self = this;
    var st = this.state || {};
    var q = st.q || '';
    var filter = st.filter || 'all';
    var B = '';
    var D = ['Rate boards', 'Digital panels'], S = ['Wallscapes', 'Elevator wraps', 'Gate arms', 'Tickets'];
    var mk = function (name, state, status, img, formats, address) {
      var kind = status === 'DIGITAL LIVE' ? 'digital' : (status === 'STATIC' ? 'static' : 'served');
      return { name: name, state: state, status: status, img: B + img, formats: formats, kind: kind, office: !!address, address: address || '',
        chipBg: kind === 'digital' ? '#FBAE4F' : (kind === 'static' ? '#0B1220' : '#E3E5EA'), chipFg: kind === 'static' ? '#FFFFFF' : '#0B1220' };
    };
    var all = [
      mk('New York', 'NEW YORK', 'DIGITAL LIVE', '/media/markets/nyc.webp?v=ceab88a6', D.concat(S), '231 W 29th St'),
      mk('Hartford', 'CONNECTICUT', 'DIGITAL LIVE', '/media/markets/hartford.webp?v=a1857c29', D.concat(S), '1 Financial Plaza'),
      mk('Los Angeles', 'CALIFORNIA', 'STATIC', '/media/markets/la.webp?v=59df333e', S, '1335 Flower St'),
      mk('Chicago', 'ILLINOIS', 'STATIC', '/media/markets/chicago.webp?v=c1fc7d1b', S, '33 W Monroe St'),
      mk('Miami', 'FLORIDA', 'STATIC', '/media/markets/miami.webp?v=599c78ee', S),
      mk('Austin', 'TEXAS', 'STATIC', '/media/markets/austin.webp?v=5e92badf', S),
      mk('Boston', 'MASSACHUSETTS', 'STATIC', '/media/markets/boston.webp?v=e3730036', S),
      mk('Washington', 'DISTRICT OF COLUMBIA', 'ON REQUEST', '/media/markets/dc.webp?v=7b36c5f4', ['Ask our team']),
      mk('Atlanta', 'GEORGIA', 'ON REQUEST', '/media/markets/atlanta.webp?v=466f3c23', ['Ask our team']),
      mk('Nashville', 'TENNESSEE', 'ON REQUEST', '/media/markets/nashville.webp?v=a608fc0a', ['Ask our team']),
      mk('Detroit', 'MICHIGAN', 'ON REQUEST', '/media/markets/detroit.webp?v=24ce01a5', ['Ask our team'])
    ];
    var ql = q.trim().toLowerCase();
    var res = all.filter(function (m) {
      var okF = filter === 'all' || m.kind === filter;
      var okQ = !ql || m.name.toLowerCase().indexOf(ql) >= 0 || m.state.toLowerCase().indexOf(ql) >= 0;
      return okF && okQ;
    });
    var fdefs = [['all', 'ALL'], ['digital', 'DIGITAL LIVE'], ['static', 'STATIC'], ['served', 'ON REQUEST']];
    return {
      q: q,
      setQ: function (e) { self.setState({ q: e.target.value }); },
      resultLabel: ql ? (res.length + ' MATCH' + (res.length === 1 ? '' : 'ES')) : 'BROWSE ALL',
      markets: res,
      empty: res.length === 0,
      filters: fdefs.map(function (f) {
        var on = f[0] === filter;
        return { label: f[1], pressed: on ? 'true' : 'false', bg: on ? '#0B1220' : 'transparent', fg: on ? '#FFFFFF' : '#0B1220', pick: function () { self.setState({ filter: f[0] }); } };
      })
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="network" />
        {/* HERO + MAP */}
        <section className="alm-pt" style={{ padding: "96px 28px 80px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Locations</div>
            <h1 className="alm-rise" style={{ margin: "22px 0 0", maxWidth: "1200px", fontSize: "clamp(44px, 7vw, 112px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600", animationDelay: ".1s" }}>12,000 locations.<br /><span style={{ color: "#FBAE4F" }}>400+ cities. 40 states.</span></h1>
            <div className="alm-rise m-loc-search" role="search" style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "12px", maxWidth: "760px", minHeight: "68px", padding: "8px 8px 8px 24px", boxSizing: "border-box", borderRadius: "999px", background: "#FFFFFF", color: "#0B1220", animationDelay: ".2s" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <label style={{ flex: "1 1 auto", minWidth: "0", display: "flex" }}>
                <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>Search markets</span>
                <input type="text" value={v.q} onInput={v.setQ} onChange={v.setQ} placeholder="Search by city, state or ZIP" style={{ flex: "1 1 auto", minWidth: "0", height: "52px", border: "0", outline: "none", background: "transparent", fontFamily: "'Montserrat', sans-serif", fontSize: "17px", fontWeight: "400", color: "#0B1220" }} name="search_markets" />
              </label>
              <A className="alm-btn" href="#directory" style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 26px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>{v.resultLabel}</A>
            </div>
            <div className="m-loc-mapwrap" style={{ marginTop: "56px" }}>
              <svg className="m-loc-map" viewBox="0 0 1000 620" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Map of A Lot Media markets across the United States">
                <defs>
                  <pattern id="nwDots" width="9" height="9" patternunits="userSpaceOnUse">
                    <circle cx="4.5" cy="4.5" r="1.4" fill="#2B3954" />
                  </pattern>
                  <radialGradient id="nwGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#FBAE4F" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#FBAE4F" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path d="M94 35 L122 30 L519 85 L525 76 L602 104 L676 129 L696 136 L721 201 L714 224 L747 212 L777 200 L775 185 L809 158 L828 136 L881 124 L893 82 L900 64 L922 64 L931 93 L948 109 L925 127 L908 148 L905 171 L922 185 L902 199 L880 210 L867 226 L870 248 L858 269 L851 307 L850 314 L867 348 L850 363 L831 385 L810 404 L784 435 L780 471 L802 512 L819 542 L817 580 L802 582 L786 556 L761 523 L739 488 L708 497 L672 485 L632 492 L633 519 L593 510 L549 507 L527 519 L484 551 L480 590 L447 578 L440 554 L406 503 L370 518 L344 494 L314 451 L282 458 L230 451 L166 413 L125 404 L110 366 L75 344 L64 296 L61 267 L52 223 L60 173 L63 148 L90 84 Z" fill="url(#nwDots)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <circle cx="872" cy="212" r="120" fill="url(#nwGlow)" />
                <g fill="none" stroke="#FBAE4F" strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="3 7" className="alm-dash">
                  <path d="M865 224 Q 500 120 113 366" />
                  <path d="M865 224 Q 740 150 642 234" />
                  <path d="M865 224 Q 790 170 714 216" />
                  <path d="M865 224 Q 680 300 475 495" />
                  <path d="M865 224 Q 900 400 820 567" />
                  <path d="M865 224 Q 790 300 716 406" />
                  <path d="M865 224 Q 760 260 668 358" />
                  <path d="M865 224 Q 860 250 824 274" />
                  <path d="M865 224 Q 900 190 902 178" />
                </g>
                <circle className="alm-ping" cx="865" cy="224" r="7" fill="none" stroke="#FBAE4F" strokeWidth="2" />
                <circle className="alm-ping" cx="880" cy="197" r="7" fill="none" stroke="#FBAE4F" strokeWidth="2" style={{ animationDelay: "1.2s" }} />
                <circle cx="865" cy="224" r="6.5" fill="#FBAE4F" />
                <circle cx="880" cy="197" r="6.5" fill="#FBAE4F" />
                <circle cx="113" cy="366" r="6" fill="#FFFFFF" />
                <circle cx="642" cy="234" r="6" fill="#FFFFFF" />
                <circle cx="820" cy="567" r="6" fill="#FFFFFF" />
                <circle cx="475" cy="495" r="6" fill="#FFFFFF" />
                <circle cx="902" cy="178" r="6" fill="#FFFFFF" />
                <circle cx="716" cy="406" r="5" fill="#0B1220" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="714" cy="216" r="5" fill="#0B1220" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="668" cy="358" r="5" fill="#0B1220" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="824" cy="274" r="5" fill="#0B1220" stroke="#FFFFFF" strokeWidth="2" />
                <rect x="105" y="358" width="16" height="16" fill="none" stroke="#FBAE4F" strokeWidth="1.5" />
                <rect x="634" y="226" width="16" height="16" fill="none" stroke="#FBAE4F" strokeWidth="1.5" />
                <rect x="857" y="216" width="16" height="16" fill="none" stroke="#FBAE4F" strokeWidth="1.5" />
                <rect x="872" y="189" width="16" height="16" fill="none" stroke="#FBAE4F" strokeWidth="1.5" />
                <g fontFamily="Montserrat, sans-serif" fontSize="13" fontWeight="800" fill="#FFFFFF" letterSpacing="0.5">
                  <text x="879" y="243">NEW YORK</text>
                  <text x="892" y="207">HARTFORD</text>
                  <text x="913" y="176">BOSTON</text>
                  <text x="836" y="283">WASHINGTON DC</text>
                  <text x="728" y="414">ATLANTA</text>
                  <text x="832" y="575">MIAMI</text>
                  <text x="656" y="354" textAnchor="end">NASHVILLE</text>
                  <text x="725" y="214">DETROIT</text>
                  <text x="628" y="256" textAnchor="end">CHICAGO</text>
                  <text x="487" y="503">AUSTIN</text>
                  <text x="127" y="384">LOS ANGELES</text>
                </g>
              </svg>
              <div className="m-loc-legend" style={{ marginTop: "12px", display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "13px", fontWeight: "700", color: "#C9D0DB" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FBAE4F" }} />Digital network live</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FFFFFF" }} />Static inventory</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><span style={{ width: "11px", height: "11px", borderRadius: "50%", border: "2px solid #FFFFFF", boxSizing: "border-box" }} />Market served</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><span style={{ width: "11px", height: "11px", border: "1.5px solid #FBAE4F", boxSizing: "border-box" }} />A Lot Media office</span>
              </div>
            </div>
          </div>
        </section>
        {/* DIRECTORY */}
        <section className="alm-pt alm-pb" id="directory" style={{ padding: "112px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Market directory</h2>
              <div className="m-loc-filters" role="group" aria-label="Filter markets" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(v.filters || []).map((fl, flI) => (
                  <Fragment key={flI}>
                    <button type="button" aria-pressed={fl.pressed} onClick={fl.pick} style={{ minHeight: "46px", padding: "0 18px", borderRadius: "999px", border: "2px solid #0B1220", background: fl.bg, color: fl.fg, fontFamily: "'Montserrat', sans-serif", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", cursor: "pointer" }}>{fl.label}</button>
                  </Fragment>
                ))}
              </div>
            </div>
            {v.empty ? (
              <>
                <div className="m-loc-empty" style={{ marginTop: "40px", padding: "48px", borderRadius: "18px", background: "#FFFFFF", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "24px", fontWeight: "650", letterSpacing: "-0.02em" }}>No flagship market matches “{v.q}”.</div>
                    <div style={{ marginTop: "8px", fontSize: "16px", fontWeight: "400", color: "#4E586A" }}>We have locations in 400+ cities — ask us about inventory there.</div>
                  </div>
                  <A className="alm-btn" href="/contact" style={{ display: "inline-flex", alignItems: "center", minHeight: "54px", padding: "0 26px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Ask about a market</A>
                </div>
              </>
            ) : null}
            <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", borderTop: "3px solid #0B1220" }}>
              {(v.markets || []).map((m, mI) => (
                <Fragment key={mI}>
                  <div className="alm-tile alm-in m-loc-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px 32px", padding: "20px 0", borderBottom: "1px solid rgba(11,18,32,0.14)" }}>
                    <div className="m-loc-thumb" style={{ flex: "0 0 180px", height: "110px", borderRadius: "16px", overflow: "hidden", background: "#0B1220" }}>
                      <img src={m.img} alt={`${m.name} skyline`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                    </div>
                    <div className="m-loc-info" style={{ flex: "1 1 220px", minWidth: "0" }}>
                      <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", color: "#4E586A" }}>{m.state}</div>
                      <div style={{ marginTop: "4px", fontSize: "28px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{m.name}</div>
                      {m.office ? (
                        <>
                          <div style={{ marginTop: "8px", fontSize: "13px", fontWeight: "700", color: "#C2630A" }}>A LOT MEDIA OFFICE · {m.address}</div>
                        </>
                      ) : null}
                    </div>
                    <div className="m-loc-fmts" style={{ flex: "1 1 260px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {(m.formats || []).map((fm, fmI) => (
                        <Fragment key={fmI}>
                          <span style={{ padding: "7px 11px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid rgba(11,18,32,0.14)", fontSize: "12px", fontWeight: "700" }}>{fm}</span>
                        </Fragment>
                      ))}
                    </div>
                    <span className="m-loc-status" style={{ flex: "0 0 auto", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", padding: "7px 12px", borderRadius: "999px", background: m.chipBg, color: m.chipFg }}>{m.status}</span>
                    <A className="alm-btn m-loc-plan" href="/plan" style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 18px", borderRadius: "999px", border: "2px solid #0B1220", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em" }}>Plan here →</A>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* VENUES */}
        <section className="alm-pt alm-pb" style={{ padding: "112px 28px", background: "#344567", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "48px 64px", alignItems: "flex-start" }}>
            <h2 className="alm-in" style={{ flex: "1 1 380px", margin: "0", fontSize: "clamp(38px, 5vw, 72px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Where the network lives.</h2>
            <ul className="m-loc-venues" style={{ flex: "2 1 560px", margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", borderTop: "3px solid #FBAE4F" }}>
              <li style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.16)", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Class A offices</li>
              <li style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.16)", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Universities</li>
              <li style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.16)", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Shopping malls</li>
              <li style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.16)", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Movie theaters</li>
              <li style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.16)", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Residential buildings</li>
              <li style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.16)", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Museums</li>
              <li style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.16)", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Restaurants</li>
              <li style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.16)", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Stand-alone lots &amp; garages</li>
            </ul>
          </div>
        </section>
        {/* EXPANSION */}
        <section className="alm-pt alm-pb" style={{ padding: "112px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "32px 64px", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ maxWidth: "760px" }}>
              <h2 className="alm-in" style={{ margin: "0", fontSize: "clamp(34px, 4.4vw, 64px)", lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "600" }}>New markets open every quarter.</h2>
              <p style={{ margin: "20px 0 0", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Need a city that isn’t listed? Tell us where your audience parks and we’ll map the inventory.</p>
            </div>
            <div className="m-loc-ctas" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <A className="alm-btn" href="/contact" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Request a market</A>
              <A className="alm-btn" href="/real-estate" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", border: "2px solid #0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Add your property</A>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
