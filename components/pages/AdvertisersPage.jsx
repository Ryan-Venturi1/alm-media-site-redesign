'use client';

// Ported from the design-canvas artboard Advertisers.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

export default class AdvertisersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var self = this;
    this.setState({ t: 0, sel: { 'Profession': true, 'Income': true, 'Class A offices': true } });
    this.timer = setInterval(function () {
      var t = ((self.state && self.state.t) || 0) + 1;
      self.setState({ t: t % 130 });
    }, 100);
  }
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }
  renderVals() {
    var self = this;
    var st = this.state || {};
    var B = '';
    var t = st.t || 0;
    var pct = Math.min(100, (t / 110) * 100);
    var sel = st.sel || { 'Profession': true, 'Income': true, 'Class A offices': true };
    var pts = [
      { left: 3, time: '0:00', label: 'Gate arm' },
      { left: 14, time: '0:20', label: 'Rate board' },
      { left: 25, time: '0:40', label: 'Ticket' },
      { left: 42, time: '2:00', label: 'Wallscape' },
      { left: 60, time: '4:00', label: 'Elevator wrap' },
      { left: 78, time: '6:00', label: 'Digital panel' },
      { left: 97, time: '10:00', label: 'Exit gate' }
    ].map(function (p, i) {
      var hit = pct >= p.left - 1;
      return { left: p.left, top: (3 + i * 94 / 6).toFixed(2), time: p.time, label: p.label, dot: hit ? '#FBAE4F' : '#C9CDD6', labelColor: hit ? '#0B1220' : '#8B95A7', timeColor: hit ? '#8A5300' : '#8B95A7' };
    });
    // phone timeline: rows are evenly spaced, so map progress onto them stop by stop
    var knots = [[0, 0]].concat(pts.map(function (p) { return [p.left, +p.top]; }), [[100, 100]]);
    var vpct = 100;
    for (var k = 1; k < knots.length; k++) {
      if (pct <= knots[k][0]) { var a0 = knots[k - 1], a1 = knots[k]; vpct = a0[1] + (a1[1] - a0[1]) * (pct - a0[0]) / ((a1[0] - a0[0]) || 1); break; }
    }
    var toggle = function (label) {
      return function () {
        var cur = Object.assign({}, (self.state && self.state.sel) || sel);
        cur[label] = !cur[label];
        self.setState({ sel: cur });
      };
    };
    var chip = function (label) {
      var on = !!sel[label];
      return { label: label, toggle: toggle(label), pressed: on ? 'true' : 'false', bg: on ? '#FBAE4F' : 'transparent', fg: on ? '#0B1220' : '#FFFFFF', bd: on ? '#FBAE4F' : 'rgba(255,255,255,0.3)' };
    };
    var aud = ['Profession', 'Income', 'Age', 'Gender', 'Car type', 'Specific companies'];
    var ven = ['Class A offices', 'Universities', 'Shopping malls', 'Movie theaters', 'Residential', 'Museums', 'Restaurants'];
    var a = aud.filter(function (k) { return sel[k]; });
    var v = ven.filter(function (k) { return sel[k]; });
    var summary = (!a.length && !v.length) ? 'Everyone who parks — pick a filter to narrow it down.' :
      ((a.length ? 'Drivers by ' + a.join(', ').toLowerCase() : 'All drivers') + (v.length ? ', parking at ' + v.join(', ').toLowerCase() + '.' : ', across every venue type.'));
    var logoIds = [
      ['Chase', '/media/logos/chase.png?v=36175c78'], ['Clorox', '/media/logos/clorox.png?v=94b22c30'], ['McCormick', '/media/logos/mccormick.png?v=6482d04f'],
      ['Corcoran', '/media/logos/corcoran.png?v=612f3cb7'], ['AriZona', '/media/logos/arizona.png?v=d155c443'], ['Avail', '/media/logos/avail.png?v=0248d690'],
      ['ÖDD', '/media/logos/odd.png?v=da197040'], ['Citibank', '/media/logos/citibank.png?v=4e895247'], ['Anheuser-Busch', '/media/logos/anheuser-busch.png?v=46d09486'], ['Allstate', '/media/logos/allstate.png?v=ddd0329f'],
      ['Panera Bread', '/media/logos/panera.png?v=5633a8b9'], ['eBay', '/media/logos/ebay.png?v=07a76120'], ['Gatorade', '/media/logos/gatorade.png?v=c1888be6'],
      ['General Mills', '/media/logos/general-mills.png?v=20a2b94e'], ['New York Yankees', '/media/logos/yankees.png?v=1860f7ef'], ['Live Nation', '/media/logos/live-nation.png?v=0184e138'],
      ['Optum', '/media/logos/optum.png?v=972ba8e4'], ['Renault', '/media/logos/renault.png?v=e4c6584d'], ['Rimowa', '/media/logos/rimowa.png?v=8a9dad9f'],
      ['The Peninsula Hotels', '/media/logos/peninsula-hotels.png?v=a252e99f'], ['Hartford HealthCare', '/media/logos/hartford-healthcare.png?v=d63767e1'], ['NetApp', '/media/logos/netapp.png?v=5e24d22a'],
      ['Bumble', '/media/logos/bumble.png?v=70070fb5'], ['FILA', '/media/logos/fila.png?v=eaa1cdc1'], ['Lucky Charms', '/media/logos/lucky-charms.png?v=e81a2cd1'],
      ['Getaround', '/media/logos/getaround.png?v=214c8213'], ['Blank Street', '/media/logos/blank-street.png?v=2c18d517'], ['CubeSmart', '/media/logos/cubesmart.png?v=fb3ad9e1'],
      ['IFC Center', '/media/logos/ifc-center.png?v=a68e9a22'], ['Pinehurst', '/media/logos/pinehurst.png?v=149ccd10'], ['VNS Health', '/media/logos/vns-health.png?v=70e65c7c'],
      ['Big Apple Circus', '/media/logos/big-apple-circus.png?v=e0b67887'], ['STP', '/media/logos/stp.png?v=bf97bbb4'], ['Lucas Oil', '/media/logos/lucas-oil.png?v=76cae19d'],
      ['Recess', '/media/logos/recess.png?v=709c3d68'], ['Vertex', '/media/logos/vertex.png?v=6888bc26'], ['Moke', '/media/logos/moke.png?v=f2751c10'],
      ['A Beautiful Noise', '/media/logos/a-beautiful-noise.png?v=4209fb83'], ['Dr. Barbara Sturm', '/media/logos/barbara-sturm.png?v=487b3939'], ['Chubbies', '/media/logos/chubbies.png?v=4823392f'],
      ['GoHealth Urgent Care', '/media/logos/gohealth.png?v=52d395d4'], ['Greg Yüna', '/media/logos/greg-yuna.png?v=36598325'], ['Malibu Mylk', '/media/logos/malibu-mylk.png?v=0d9f734e'],
      ['Marlo Laz', '/media/logos/marlo-laz.png?v=4fb3e784'], ['OANDA', '/media/logos/oanda.png?v=42ca2a90'], ['Planned Parenthood', '/media/logos/planned-parenthood.png?v=41440419'],
      ['PulsePoint', '/media/logos/pulsepoint.png?v=274f1425'], ['Rise Brewing Co.', '/media/logos/rise.png?v=abdc745b'], ['Sophia', '/media/logos/sophia.png?v=63763d12'],
      ['Summers', '/media/logos/summers.png?v=30c80830'], ['Sweet Home Alabama', '/media/logos/sweet-home-alabama.png?v=2681a39d'], ['Temptations', '/media/logos/temptations.png?v=feab304c'],
      ['UC Riverside', '/media/logos/uc-riverside.png?v=89f47f66'], ['Urban Air', '/media/logos/urban-air.png?v=22d2fba9'], ['Wizest', '/media/logos/wizest.png?v=a2db4400']
    ];
    var sol = [
      { no: '01', name: 'Static', chip: 'COAST TO COAST', chipBg: '#E3E5EA', img: '/media/photos/compass-wallscape.webp?v=7a9f7052', pos: '50% 50%', alt: 'Compass real estate wallscape on a garage level', href: '/formats#static', cta: 'Static formats', desc: 'Wallscapes, elevator wraps, gate arms, branded tickets and full garage takeovers — designed, printed and installed for you.', dark: false },
      { no: '02', name: 'Digital', chip: 'LIVE IN NY & CT', chipBg: '#8FDCE8', img: '/media/photos/phone-at-digital-panel.webp?v=f3e056f2', pos: '30% 50%', alt: 'Man using his phone beside a digital panel', href: '/formats#digital', cta: 'Digital formats', desc: 'Rate boards, interactive panels and motion-enabled signage — full-motion video and audio, unlimited creative updates, content that switches by time of day.', dark: false },
      { no: '03', name: 'Events & venues', chip: 'NEXT GROWTH ENGINE', chipBg: '#FBAE4F', dark: true, img: '/media/photos/stock-car-event.webp?v=d303b124', pos: '55% 50%', alt: 'Crowd filming a car at a live automotive event at night (stock photo)', href: '/events', cta: 'Events & venues', desc: 'Pop-ups, product displays and vehicle test drives, VIP park-and-shuttle, and game-day takeovers in the lots where the audience arrives.', dark: false },
      { no: '04', name: 'Market domination', chip: 'GARAGE TAKEOVER', chipBg: '#FBAE4F', img: '/media/photos/msk-garage-entrance.webp?v=a0e27476', pos: '50% 50%', alt: 'Garage entrance with digital panel and branded wayfinding', href: '#targeting', cta: 'Own a market', desc: 'Every surface in a location at once — gate arms, tickets, walls, elevators and screens — placed where your audience parks.', dark: true }
    ];
    return {
      tl: { pct: pct.toFixed(1), vpct: vpct.toFixed(1), points: pts },
      audience: aud.map(chip),
      venues: ven.map(chip),
      summary: summary,
      logos: logoIds.map(function (l) { return { name: l[0], src: B + l[1] }; }),
      solutions: sol.map(function (s) {
        return { no: s.no, name: s.name, chip: s.chip, chipBg: s.chipBg, img: B + s.img, pos: s.pos, alt: s.alt, href: s.href, cta: s.cta, desc: s.desc,
          bg: s.dark ? '#0B1220' : '#FFFFFF', fg: s.dark ? '#FFFFFF' : '#0B1220', mute: s.dark ? '#C9D0DB' : '#4E586A' };
      })
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="advertisers" />
        {/* HERO */}
        <div style={{ background: "#05080F" }}>
          <section className="alm-hero m-adv-hero" data-scrub="exit" style={{ position: "relative", minHeight: "760px", background: "#0B1220", overflow: "hidden", color: "#FFFFFF" }}>
            <img className="alm-ken alm-hero-media m-adv-hero-img" src="/media/photos/panera-now-open.webp?v=2fa97a26" alt="Drivers walking past a Panera Bread ad on an A Lot Media digital panel" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 45%" }} />
            <div className="m-adv-hero-shade" style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(11,18,32,0.9) 0%, rgba(11,18,32,0.55) 50%, rgba(11,18,32,0.1) 100%)" }} />
            <div className="alm-hero-copy m-adv-hero-copy" style={{ position: "relative", maxWidth: "1360px", minHeight: "760px", margin: "0 auto", padding: "0 28px 72px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Advertise with A Lot Media</div>
              <h1 className="alm-rise" style={{ margin: "22px 0 0", maxWidth: "980px", fontSize: "clamp(44px, 6.6vw, 104px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600", animationDelay: ".1s" }}>The captive audience <span style={{ color: "#FBAE4F" }}><span className="m-adv-nw">out-of-home</span> forgot.</span></h1>
              <p className="alm-rise m-adv-hero-p" style={{ margin: "28px 0 0", maxWidth: "600px", fontSize: "19px", lineHeight: "1.55", fontWeight: "400", color: "#E4E8EF", animationDelay: ".2s" }}>Drivers spend up to ten minutes inside our locations — parking, walking, waiting for the elevator. No skip button, no scroll, steps from where they spend.</p>
              <div className="alm-rise m-adv-hero-btns" style={{ marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap", animationDelay: ".3s" }}>
                <A className="alm-btn" href="/plan" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Plan a campaign</A>
                <A className="alm-btn" href="/contact" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", border: "2px solid #FFFFFF", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Talk to sales</A>
              </div>
            </div>
          </section>
        </div>
        {/* DWELL TIMELINE */}
        <section className="alm-pt alm-pb" style={{ padding: "112px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", maxWidth: "820px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>One visit.<br />Seven brand moments.</h2>
              <div className="m-adv-tl-note" style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", letterSpacing: "0.1em", color: "#4E586A" }}>ILLUSTRATIVE JOURNEY · UP TO 10 MIN DWELL</div>
            </div>
            <div className="m-adv-tl-h" style={{ marginTop: "64px", overflowX: "auto" }}>
              <div style={{ position: "relative", height: "150px", minWidth: "900px", margin: "0 56px" }}>
                <div style={{ position: "absolute", left: "0", right: "0", top: "52px", height: "6px", background: "#E3E5EA" }} />
                <div style={{ position: "absolute", left: "0", top: "52px", height: "6px", background: "#FBAE4F", width: `${v.tl?.pct}%`, transition: "width .12s linear" }} />
                <div style={{ position: "absolute", top: "34px", left: `${v.tl?.pct}%`, transform: "translateX(-50%)", transition: "left .12s linear", width: "42px", height: "42px", borderRadius: "50%", background: "#0B1220", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(251,174,79,0.35)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBAE4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 17h14v-5l-2-5H7l-2 5v5Z" />
                    <circle cx="8" cy="17" r="1.5" />
                    <circle cx="16" cy="17" r="1.5" />
                  </svg>
                </div>
                {(v.tl?.points || []).map((pt, ptI) => (
                  <Fragment key={ptI}>
                    <div style={{ position: "absolute", top: "0", left: `${pt.left}%`, transform: "translateX(-50%)", width: "130px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", fontWeight: "600", color: pt.timeColor, transition: "color .3s" }}>{pt.time}</div>
                      <div style={{ marginTop: "22px", width: "18px", height: "18px", borderRadius: "50%", border: `4px solid ${pt.dot}`, background: "#F5F5F7", boxSizing: "border-box", transition: "border-color .3s" }} />
                      <div style={{ marginTop: "28px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.04em", lineHeight: "1.3", textTransform: "uppercase", color: pt.labelColor, transition: "color .3s" }}>{pt.label}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="m-adv-vtl" style={{ display: "none" }}>
              <div style={{ position: "relative", height: "420px" }}>
                <div style={{ position: "absolute", left: "19px", top: "0", bottom: "0", width: "4px", borderRadius: "2px", background: "#E3E5EA" }} />
                <div style={{ position: "absolute", left: "19px", top: "0", width: "4px", borderRadius: "2px", height: `${v.tl?.vpct}%`, background: "#FBAE4F", transition: "height .12s linear" }} />
                {(v.tl?.points || []).map((pt, ptI) => (
                  <Fragment key={ptI}>
                    <div style={{ position: "absolute", left: "0", right: "0", top: `${pt.top}%`, transform: "translateY(-50%)", display: "flex", alignItems: "center" }}>
                      <div style={{ flex: "0 0 42px", display: "flex", justifyContent: "center" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `4px solid ${pt.dot}`, background: "#F5F5F7", boxSizing: "border-box", transition: "border-color .3s" }} />
                      </div>
                      <div style={{ flex: "0 0 64px", marginLeft: "22px", fontFamily: "'Geist Mono', monospace", fontSize: "13px", fontWeight: "600", color: pt.timeColor, transition: "color .3s" }}>{pt.time}</div>
                      <div style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "0.04em", lineHeight: "1.3", textTransform: "uppercase", color: pt.labelColor, transition: "color .3s" }}>{pt.label}</div>
                    </div>
                  </Fragment>
                ))}
                <div aria-hidden="true" style={{ position: "absolute", left: "21px", top: `${v.tl?.vpct}%`, transform: "translate(-50%, -50%)", transition: "top .12s linear", width: "42px", height: "42px", borderRadius: "50%", background: "#0B1220", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(251,174,79,0.35)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBAE4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 17h14v-5l-2-5H7l-2 5v5Z" />
                    <circle cx="8" cy="17" r="1.5" />
                    <circle cx="16" cy="17" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SOLUTIONS */}
        <section className="alm-pb" style={{ padding: "0 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", maxWidth: "820px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Four ways to show up.</h2>
              <A className="alm-link m-adv-tap" href="/formats" style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em" }}>EVERY FORMAT &amp; SPEC <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></A>
            </div>
            <div className="m-adv-mt" style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px" }}>
              {(v.solutions || []).map((s, sI) => (
                <Fragment key={sI}>
                  <A className="alm-tile alm-link alm-in" href={s.href} style={{ display: "flex", flexDirection: "column", background: s.bg, color: s.fg, borderRadius: "16px", overflow: "hidden", fontSize: "15px", letterSpacing: "-0.005em", fontWeight: "600" }}>
                    <div style={{ height: "280px", overflow: "hidden", background: "#0B1220" }}>
                      <img src={s.img} alt={s.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: s.pos, display: "block" }} loading="lazy" decoding="async" />
                    </div>
                    <div style={{ padding: "30px 28px 32px", display: "flex", flexDirection: "column", gap: "14px", flex: "1" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", color: s.mute }}>{s.no}</span>
                        <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", padding: "6px 10px", borderRadius: "999px", background: s.chipBg, color: "#0B1220" }}>{s.chip}</span>
                      </div>
                      <div style={{ fontSize: "30px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{s.name}</div>
                      <div style={{ fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: s.mute }}>{s.desc}</div>
                      <div style={{ marginTop: "auto", paddingTop: "10px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em" }}>{s.cta} <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></div>
                    </div>
                  </A>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* TARGETING */}
        <section className="alm-pt alm-pb" id="targeting" style={{ padding: "128px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Targeting</div>
            <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "980px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Buy the people,<br /><span style={{ color: "#FBAE4F" }}>not the postcode.</span></h2>
            <p style={{ margin: "28px 0 0", maxWidth: "620px", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>Every location is profiled against Geopath, DOT and US Census data, Wi-Fi beacons and on-site counts. Pick what matters and we match the locations.</p>
            <div className="m-adv-mt" style={{ marginTop: "56px", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "stretch" }}>
              <div style={{ flex: "999 1 600px", minWidth: "0", display: "flex", flexDirection: "column", gap: "36px" }}>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>AUDIENCE</div>
                  <div style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {(v.audience || []).map((c, cI) => (
                      <Fragment key={cI}>
                        <button type="button" aria-pressed={c.pressed} onClick={c.toggle} style={{ minHeight: "50px", padding: "0 20px", borderRadius: "999px", border: `2px solid ${c.bd}`, background: c.bg, color: c.fg, fontFamily: "'Montserrat', sans-serif", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "background .2s, border-color .2s" }}>{c.label}</button>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>VENUE TYPE</div>
                  <div style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {(v.venues || []).map((c, cI) => (
                      <Fragment key={cI}>
                        <button type="button" aria-pressed={c.pressed} onClick={c.toggle} style={{ minHeight: "50px", padding: "0 20px", borderRadius: "999px", border: `2px solid ${c.bd}`, background: c.bg, color: c.fg, fontFamily: "'Montserrat', sans-serif", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "background .2s, border-color .2s" }}>{c.label}</button>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className="m-adv-aud" style={{ flex: "1 1 360px", padding: "36px", borderRadius: "18px", background: "#FFFFFF", color: "#0B1220", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>YOUR AUDIENCE</div>
                <div style={{ fontSize: "24px", fontWeight: "600", lineHeight: "1.25", letterSpacing: "-0.01em" }}>{v.summary}</div>
                <div style={{ height: "2px", background: "#0B1220" }} />
                <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>MATCHED AGAINST</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ padding: "8px 12px", borderRadius: "16px", background: "#F0F1F4", fontSize: "13px", fontWeight: "700" }}>Geopath</span>
                  <span style={{ padding: "8px 12px", borderRadius: "16px", background: "#F0F1F4", fontSize: "13px", fontWeight: "700" }}>DOT</span>
                  <span style={{ padding: "8px 12px", borderRadius: "16px", background: "#F0F1F4", fontSize: "13px", fontWeight: "700" }}>US Census</span>
                  <span style={{ padding: "8px 12px", borderRadius: "16px", background: "#F0F1F4", fontSize: "13px", fontWeight: "700" }}>Wi-Fi beacons</span>
                  <span style={{ padding: "8px 12px", borderRadius: "16px", background: "#F0F1F4", fontSize: "13px", fontWeight: "700" }}>On-site data</span>
                </div>
                <A className="alm-btn" href="/plan" style={{ marginTop: "auto", display: "inline-flex", justifyContent: "center", alignItems: "center", minHeight: "56px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Build this plan</A>
              </div>
            </div>
          </div>
        </section>
        {/* WHY PARKING */}
        <section className="alm-pt alm-pb" style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <h2 className="alm-in" style={{ margin: "0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Why parking beats the billboard.</h2>
            <div className="m-adv-why" style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "48px 40px" }}>
              <div style={{ borderTop: "3px solid #0B1220", paddingTop: "28px" }}>
                <div style={{ fontSize: "clamp(64px, 7vw, 104px)", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>10<span style={{ fontSize: "0.4em" }}>MIN</span></div>
                <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>Captive</div>
                <p style={{ margin: "10px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Industry-leading dwell times of up to ten minutes, at walking pace.</p>
              </div>
              <div style={{ borderTop: "3px solid #0B1220", paddingTop: "28px" }}>
                <div style={{ fontSize: "clamp(64px, 7vw, 104px)", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>3M+</div>
                <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>Qualified</div>
                <p style={{ margin: "10px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Cars parked every day at residential buildings, Class A offices, universities, movie theaters, restaurants, museums and shopping malls.</p>
              </div>
              <div style={{ borderTop: "3px solid #0B1220", paddingTop: "28px" }}>
                <div style={{ fontSize: "clamp(64px, 7vw, 104px)", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em", color: "#0B1220" }}>STEPS</div>
                <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>From the point of sale</div>
                <p style={{ margin: "10px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Reached on foot, steps from the store, the venue or the office — when a call to action is easiest to act on.</p>
              </div>
            </div>
          </div>
        </section>
        {/* PROCESS */}
        <section className="alm-pt alm-pb" style={{ padding: "128px 28px", background: "#344567", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />How a campaign runs</div>
            <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Brief to install,<br />handled end to end.</h2>
            <ol className="m-adv-steps" style={{ margin: "64px 0 0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "40px 32px" }}>
              <li style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontSize: "44px", fontWeight: "600", color: "#FBAE4F", lineHeight: "1", letterSpacing: "-0.035em" }}>01</div>
                <div style={{ marginTop: "18px", fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>Brief</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#D5DAE3" }}>Goals, audience, markets and timing.</div>
              </li>
              <li style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontSize: "44px", fontWeight: "600", color: "#FBAE4F", lineHeight: "1", letterSpacing: "-0.035em" }}>02</div>
                <div style={{ marginTop: "18px", fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>Plan</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#D5DAE3" }}>Locations and formats matched to your audience data.</div>
              </li>
              <li style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontSize: "44px", fontWeight: "600", color: "#FBAE4F", lineHeight: "1", letterSpacing: "-0.035em" }}>03</div>
                <div style={{ marginTop: "18px", fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>Create</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#D5DAE3" }}>In-house design and print production.</div>
              </li>
              <li style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontSize: "44px", fontWeight: "600", color: "#FBAE4F", lineHeight: "1", letterSpacing: "-0.035em" }}>04</div>
                <div style={{ marginTop: "18px", fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>Install</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#D5DAE3" }}>Our team installs, on hardware built by our sister companies.</div>
              </li>
              <li style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontSize: "44px", fontWeight: "600", color: "#FBAE4F", lineHeight: "1", letterSpacing: "-0.035em" }}>05</div>
                <div style={{ marginTop: "18px", fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>Report</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#D5DAE3" }}>Proof-of-performance photos from every placement, and creative updates through the flight.</div>
              </li>
            </ol>
          </div>
        </section>
        {/* LOGOS + CASE */}
        <section className="alm-pt alm-pb" style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Trusted by brands<br />that move markets.</h2>
              <p style={{ margin: "0", maxWidth: "420px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>A selection of advertisers who have run on the network — alongside Coca-Cola, Ford, Samsung, Toyota, IKEA, Adidas and more.</p>
            </div>
            <div className="m-adv-logos" style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1px", background: "rgba(11,18,32,0.08)", border: "1px solid rgba(11,18,32,0.08)" }}>
              {(v.logos || []).map((lg, lgI) => (
                <Fragment key={lgI}>
                  <div className="alm-in m-adv-logo" style={{ background: "#F5F5F7", height: "112px", display: "flex", alignItems: "center", justifyContent: "center", padding: "18px", boxSizing: "border-box" }}>
                    <img className="m-adv-logo-img" src={lg.src} alt={lg.name} style={{ maxWidth: "72%", maxHeight: "42px", width: "auto", height: "auto", objectFit: "contain", opacity: "0.82", display: "block" }} loading="lazy" decoding="async" />
                  </div>
                </Fragment>
              ))}
            </div>
            <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <div className="m-adv-case" style={{ flex: "2 1 560px", padding: "44px", borderRadius: "16px", background: "#0B1220", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#FBAE4F" }}>CASE STUDY · CONNECTICUT</div>
                <div style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: "600", lineHeight: "0.98", letterSpacing: "-0.035em" }}>Hartford HealthCare</div>
                <p style={{ margin: "0", maxWidth: "640px", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>Hartford HealthCare signed with A Lot Media in 2019 for 30 garages around Connecticut, to reach CEOs and decision makers — and competitors’ areas — across the state. They loved the campaign and renewed for five more years.</p>
                <div className="m-adv-case-stats" style={{ display: "flex", flexWrap: "wrap", gap: "40px", marginTop: "8px" }}>
                  <div>
                    <div style={{ fontSize: "36px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>30</div>
                    <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "#8B95A7" }}>GARAGES ACROSS CT</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "36px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>+5 yrs</div>
                    <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "#8B95A7" }}>RENEWED</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "36px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>$1.5M+</div>
                    <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "#8B95A7" }}>VALUE FOR PARKING PARTNERS</div>
                  </div>
                </div>
              </div>
              <A className="alm-btn alm-autoh alm-pill-cta m-adv-cta" href="/contact" style={{ flex: "1 1 320px", padding: "44px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px", minHeight: "280px" }}>
                <div className="m-adv-cta-h" style={{ fontSize: "clamp(28px, 2.6vw, 40px)", fontWeight: "600", lineHeight: "0.98", letterSpacing: "-0.035em" }}>Put your brand in front of three million drivers a day.</div>
                <div style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em" }}>Talk to sales →</div>
              </A>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
