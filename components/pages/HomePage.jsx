'use client';

// Ported from the design-canvas artboard Main.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import { playWhenVisible } from '@/lib/video';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import LiveBoard from '@/components/LiveBoard';
import LogoMarquee from '@/components/LogoMarquee';
import Nav from '@/components/Nav';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var self = this;
    this.setState({ p: 0, filter: 'all' });
    var t0 = Date.now();
    var tick = function () {
      var k = Math.min(1, (Date.now() - t0) / 2200);
      self.setState({ p: k });
      if (k < 1) self.raf = requestAnimationFrame(tick);
    };
    var start = function () {
      if (self.counted) return;
      self.counted = true;
      t0 = Date.now();
      self.raf = requestAnimationFrame(tick);
    };
    // In the scrolling page the numbers count up when they come into view.
    this.countT = setTimeout(function () {
      var motion = document.documentElement.classList.contains('alm-motion');
      if (!motion || !self.statsEl || !('IntersectionObserver' in window)) { start(); return; }
      self.statsIO = new IntersectionObserver(function (es) {
        if (es.some(function (e) { return e.isIntersecting; })) { start(); self.statsIO.disconnect(); }
      }, { threshold: 0.35 });
      self.statsIO.observe(self.statsEl);
    }, 450);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      this.evTimer = setInterval(function () {
        var cur = self.state || {};
        if (cur.evLock) return;
        self.setState({ ev: ((cur.ev || 0) + 1) % 3 });
      }, 6500);
    }
  }
  componentWillUnmount() {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.evTimer) clearInterval(this.evTimer);
    if (this.countT) clearTimeout(this.countT);
    if (this.statsIO) this.statsIO.disconnect();
  }
  renderVals() {
    var self = this;
    var st = this.state || {};
    var p = st.p == null ? 1 : st.p;
    var e = 1 - Math.pow(1 - p, 3);
    var filter = st.filter || 'all';
    var B = '';
    var mk = function (name, state, status, img) {
      var live = status === 'DIGITAL LIVE', stat = status === 'STATIC';
      return { name: name, state: state, status: status, img: B + img, kind: live ? 'digital' : (stat ? 'static' : 'served'),
        chipBg: live ? '#FBAE4F' : (stat ? '#FFFFFF' : 'rgba(255,255,255,0.18)'),
        chipFg: live || stat ? '#0B1220' : '#FFFFFF' };
    };
    var all = [
      mk('New York', 'NY', 'DIGITAL LIVE', '/media/markets/nyc.webp'),
      mk('Hartford', 'CT', 'DIGITAL LIVE', '/media/markets/hartford.webp'),
      mk('Los Angeles', 'CA', 'STATIC', '/media/markets/la.webp'),
      mk('Chicago', 'IL', 'STATIC', '/media/markets/chicago.webp'),
      mk('Miami', 'FL', 'STATIC', '/media/markets/miami.webp'),
      mk('Austin', 'TX', 'STATIC', '/media/markets/austin.webp'),
      mk('Boston', 'MA', 'STATIC', '/media/markets/boston.webp'),
      mk('Washington', 'DC', 'SERVED', '/media/markets/dc.webp'),
      mk('Atlanta', 'GA', 'SERVED', '/media/markets/atlanta.webp'),
      mk('Nashville', 'TN', 'SERVED', '/media/markets/nashville.webp'),
      mk('Detroit', 'MI', 'SERVED', '/media/markets/detroit.webp')
    ];
    var fdefs = [['all', 'ALL MARKETS'], ['digital', 'DIGITAL LIVE'], ['static', 'STATIC'], ['served', 'SERVED']];
    var fmts = [
      { name: 'Gate arms & entry', biz: 'STATIC', stage: '01 · ARRIVE', img: '/media/renders/gate-arm-wrap.webp', pos: '50% 50%', href: '/formats#gatearm', desc: 'The first thing every driver sees, twice a visit.', alt: 'Concept render of an orange and navy branded gate arm wrap', render: true },
      { name: 'Branded tickets', biz: 'STATIC', stage: '01 · ARRIVE', img: '/media/renders/branded-ticket.webp', pos: '45% 50%', href: '/formats#ticket', desc: 'A message in every driver’s hand until they leave.', alt: 'Concept render of a driver taking a branded parking ticket', render: true },
      { name: 'Rate boards', biz: 'DIGITAL', stage: '02 · PARK', img: '/media/photos/ddrb-connecticut.webp', pos: '50% 35%', href: '/formats#ddrb', desc: 'Live pricing up top, full-motion advertising below.', alt: 'A Lot Media digital rate board' },
      { name: 'Wallscapes', biz: 'STATIC', stage: '02 · PARK', img: '/media/photos/hartford-healthcare-wallscape.webp', pos: '50% 50%', href: '/formats#wallscape', desc: 'Large-format walls drivers face as they park.', alt: 'Hartford HealthCare wallscape' },
      { name: 'Digital panels', biz: 'DIGITAL', stage: '03 · WALK', img: '/media/photos/blank-street-interactive-panel.webp', pos: '35% 50%', href: '/formats#panel', desc: 'Interactive screens — tap, scan and redeem.', alt: 'Man tapping his phone on an interactive digital panel' },
      { name: 'Elevator wraps', biz: 'STATIC', stage: '03 · WALK', img: '/media/photos/hartford-healthcare-elevator-wraps.webp', pos: '50% 50%', href: '/formats#elevator', desc: 'Branded doors at the pause before the destination.', alt: 'Elevator door wraps' },
      { name: 'Events & venues', biz: 'EVENTS', stage: '04 · ACTIVATE', img: '/media/renders/event-popup-launch.webp', pos: '55% 50%', href: '/events', desc: 'Activations, VIP park & shuttle and game-day packages.', alt: 'Concept render of a car launch pop-up inside a parking garage', render: true }
    ];
    var pillars = [
      { no: '01', name: 'STATIC MEDIA', label: 'Static media', dot: '#FFFFFF', img: '/media/photos/hartford-healthcare-wallscape.webp', pos: '50% 50%', href: '/formats#static',
        alt: 'Hartford HealthCare wallscape inside a parking garage', head: 'Walls that own the garage.',
        desc: 'Large-format print drivers face every time they park — designed, printed and installed for you, with branded tickets and full garage takeovers.',
        items: ['Wallscapes', 'Elevator wraps', 'Gate arms', 'Tickets', 'Takeovers'], cta: 'Explore static', note: 'REAL INSTALL' },
      { no: '02', name: 'DIGITAL', label: 'Digital', dot: '#8FDCE8', img: '/media/photos/ddrb-connecticut.webp', pos: '50% 30%', href: '/formats#digital',
        alt: 'A Lot Media Digital Dynamic Rate Board installed in Connecticut', head: 'Screens that sell in real time.',
        desc: 'Digital Dynamic Rate Boards™ and interactive panels — live pricing up top, full-motion video and audio below, updated from a phone.',
        items: ['Rate boards', 'Interactive panels', 'Wayfinders'], cta: 'Explore digital', note: 'REAL INSTALL · CT' },
      { no: '03', name: 'EVENTS & VENUES', label: 'Events & venues', dot: '#FBAE4F', img: '/media/renders/event-night-market.webp', pos: '50% 50%', href: '/events', tag: 'NEXT GROWTH ENGINE',
        alt: 'Concept render of a festival on a parking garage rooftop', head: 'The lot is the venue.',
        desc: 'Brand activations, VIP park-and-shuttle, bulk parking and game-day takeovers — staged in the lots and garages where the audience already arrives.',
        items: ['Activations', 'VIP park & shuttle', 'Game day'], cta: 'Explore events', note: 'CONCEPT RENDER' }
    ];
    var evData = [
      { title: 'Brand activations', img: '/media/renders/event-popup-launch.webp', pos: '55% 50%', alt: 'Concept render of a car launch pop-up inside a parking garage',
        desc: 'Pop-ups, brand activations, product displays and vehicle test drives — staged where the audience already arrives by car.',
        who: 'Brands, agencies and experiential producers', give: 'The space, tents, power, vehicles and on-site signage',
        ex: ['Pop-ups', 'Product displays', 'Test drives', 'Music festivals'] },
      { title: 'VIP parking & shuttle', img: '/media/renders/rooftop-event.webp', pos: '50% 50%', alt: 'Concept render of a branded rooftop parking event with a hospitality tent',
        desc: 'Reserved VIP parking, shuttles, tents, generators and signage for headline events — and bulk parking when the crowd is bigger than the venue.',
        who: 'Event producers, agencies, venues and sponsors', give: 'Reserved spaces, shuttles, tents, generators, signage',
        ex: ['VIP parking', 'Shuttles', 'Bulk parking', 'Sponsorships'] },
      { title: 'Game day & tailgates', img: '/media/renders/event-game-day.webp', pos: '50% 50%', alt: 'Concept render of fans walking from a parking garage to a stadium at sunset',
        desc: 'On game day the lot becomes the venue: a full location takeover with activation, sponsorship and multiple media around the crowd — plus event pricing on the rate boards.',
        who: 'Teams, venues, sponsors and promoters', give: 'Location takeover, activation, event pricing on rate boards, branded media',
        ex: ['Game days', 'Tailgates', 'Sponsor takeovers', 'Event pricing'] }
    ];
    var ev = st.ev || 0;
    var evLock = !!st.evLock;
    if (!this._vidRef) {
      this._vidRef = playWhenVisible;
    }
    return {
      stats: {
        locations: Math.round(12000 * e).toLocaleString('en-US'),
        cities: Math.round(400 * e),
        cars: Math.round(3 * e)
      },
      markets: all.filter(function (m) { return filter === 'all' || m.kind === filter; }),
      filters: fdefs.map(function (f) {
        var on = f[0] === filter;
        return { label: f[1], bg: on ? '#FBAE4F' : 'transparent', fg: on ? '#0B1220' : '#FFFFFF', bd: on ? '#FBAE4F' : 'rgba(255,255,255,0.35)', pick: function () { self.setState({ filter: f[0] }); } };
      }),
      formats: fmts.map(function (f) { return { biz: f.biz, bizDot: f.biz === 'DIGITAL' ? '#3FB6C8' : (f.biz === 'EVENTS' ? '#FBAE4F' : '#0B1220'), name: f.name, stage: f.stage, img: B + f.img, pos: f.pos, href: f.href, desc: f.desc, alt: f.alt, render: !!f.render }; }),
      pillars: pillars.map(function (p) {
        return { no: p.no, name: p.name, label: p.label, dot: p.dot, img: B + p.img, pos: p.pos, href: p.href, alt: p.alt, head: p.head, desc: p.desc,
          items: p.items.map(function (t) { return { t: t }; }), cta: p.cta, note: p.note, tag: p.tag || '',
          ring: p.tag ? 'inset 0 0 0 3px #FBAE4F' : 'none' };
      }),
      evTabs: evData.map(function (d, i) {
        var on = i === ev;
        return { no: '0' + (i + 1), title: d.title, sel: on ? 'true' : 'false',
          fg: on ? '#FFFFFF' : '#7D8799', noColor: on ? '#FBAE4F' : '#7D8799', arrow: on ? 1 : 0,
          barCls: on && !evLock ? 'alm-evbar' : '', barW: on && evLock ? '100%' : '0%',
          pick: function () { self.setState({ ev: i, evLock: true }); } };
      }),
      evImgs: evData.map(function (d, i) {
        var on = i === ev;
        return { src: B + d.img, alt: d.alt, pos: d.pos, op: on ? 1 : 0, sc: on ? 1.06 : 1, hidden: on ? 'false' : 'true' };
      }),
      evCur: { title: evData[ev].title.toUpperCase(), desc: evData[ev].desc, who: evData[ev].who, give: evData[ev].give,
        ex: evData[ev].ex.map(function (t) { return { t: t }; }) },
      vidRef: this._vidRef,
      setRow: function (el) { self.row = el; },
      statsRef: this._statsRef || (this._statsRef = function (el) { self.statsEl = el; }),
      scrollLeft: function () { if (self.row) self.row.scrollBy({ left: -360, behavior: 'smooth' }); },
      scrollRight: function () { if (self.row) self.row.scrollBy({ left: 360, behavior: 'smooth' }); }
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="home" />
        {/* HERO */}
        <div style={{ background: "#05080F" }}>
          <section className="alm-hero" data-scrub="exit" style={{ position: "relative", minHeight: "820px", background: "#0B1220", overflow: "hidden", color: "#FFFFFF" }}>
            <video className="alm-hero-media" ref={v.vidRef} src="/media/video/nyc-bridge.mp4" poster="/media/video/nyc-bridge-poster.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%" }} />
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(11,18,32,0.55) 0%, rgba(11,18,32,0.10) 38%, rgba(11,18,32,0.88) 100%)" }} />
            <div className="alm-hero-copy" style={{ position: "relative", maxWidth: "1360px", minHeight: "820px", margin: "0 auto", padding: "0 28px 56px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "17px", fontWeight: "600", letterSpacing: "-0.01em", color: "#FBAE4F" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />America’s parking media network</div>
              <h1 className="alm-rise" style={{ margin: "22px 0 0", maxWidth: "1240px", fontSize: "clamp(56px, 9.4vw, 152px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600", animationDelay: ".1s" }}>Every trip<br /><span style={{ color: "#FBAE4F" }}>ends here.</span></h1>
              <div className="alm-rise" style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "flex-end", justifyContent: "space-between", animationDelay: ".2s" }}>
                <p style={{ margin: "0", maxWidth: "540px", fontSize: "20px", lineHeight: "1.5", fontWeight: "400", color: "#E4E8EF" }}>In a parking space — the one place every driver stops. We turn 12,000 of them into one national media network.</p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <A className="alm-btn" href="/plan" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Advertise with us</A>
                  <A className="alm-btn" href="/real-estate" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", border: "2px solid #FFFFFF", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Monetize your location</A>
                </div>
              </div>
              <div className="alm-rise" role="search" style={{ marginTop: "44px", display: "flex", alignItems: "center", gap: "12px", maxWidth: "760px", minHeight: "68px", padding: "8px 8px 8px 24px", boxSizing: "border-box", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 30px 80px rgba(0,0,0,0.35)", animationDelay: ".3s" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <label style={{ flex: "1 1 auto", minWidth: "0", display: "flex" }}>
                  <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>Search your market</span>
                  <input type="text" name="q" placeholder="Search your market by city or ZIP" style={{ flex: "1 1 auto", minWidth: "0", height: "52px", border: "0", outline: "none", background: "transparent", fontFamily: "'Montserrat', sans-serif", fontSize: "17px", fontWeight: "400", color: "#0B1220" }} />
                </label>
                <A className="alm-btn" href="/locations" style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 26px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Find inventory</A>
              </div>
              <div style={{ position: "absolute", right: "28px", bottom: "24px", fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)" }}>DIGITAL LIVE IN NEW YORK &amp; CONNECTICUT</div>
            </div>
          </section>
        </div>
        {/* BRAND MARQUEE */}
        <LogoMarquee tone="dark" rows="2" />
        {/* STATS */}
        <section ref={v.statsRef} style={{ padding: "104px 28px 40px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "baseline", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />The network, by the numbers</div>
              <A className="alm-link" href="/locations" style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em" }}>Explore all locations <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></A>
            </div>
            <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px 40px" }}>
              <div className="alm-in" style={{ borderTop: "3px solid #0B1220", paddingTop: "28px" }}>
                <div style={{ fontSize: "clamp(64px, 7.2vw, 108px)", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>{v.stats?.locations}</div>
                <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Parking locations</div>
                <div style={{ marginTop: "8px", fontSize: "16px", lineHeight: "1.55", fontWeight: "400", color: "#4E586A" }}>Garages, lots and rooftops sold as one network.</div>
              </div>
              <div className="alm-in" style={{ borderTop: "3px solid #0B1220", paddingTop: "28px" }}>
                <div style={{ fontSize: "clamp(64px, 7.2vw, 108px)", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>{v.stats?.cities}<span style={{ color: "#FBAE4F" }}>+</span></div>
                <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Cities</div>
                <div style={{ marginTop: "8px", fontSize: "16px", lineHeight: "1.55", fontWeight: "400", color: "#4E586A" }}>Coast to coast, across 40 states.</div>
              </div>
              <div className="alm-in" style={{ borderTop: "3px solid #0B1220", paddingTop: "28px" }}>
                <div style={{ fontSize: "clamp(64px, 7.2vw, 108px)", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>{v.stats?.cars}M<span style={{ color: "#FBAE4F" }}>+</span></div>
                <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Cars parked daily</div>
                <div style={{ marginTop: "8px", fontSize: "16px", lineHeight: "1.55", fontWeight: "400", color: "#4E586A" }}>An audience that arrives every day, on schedule.</div>
              </div>
            </div>
          </div>
        </section>
        {/* STATEMENT (fills as you read) */}
        <section style={{ padding: "112px 28px 96px" }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <p style={{ margin: "0", fontSize: "clamp(34px, 4.8vw, 72px)", lineHeight: "1.1", letterSpacing: "-0.035em", fontWeight: "600", color: "#0B1220" }}>
              <span className="alm-fill" data-scrub="text">Every trip ends in a parking space. Three million times a day, in more than 400 cities, we turn that moment into media, revenue and live experiences.</span>
            </p>
          </div>
        </section>
        {/* THREE BUSINESSES */}
        <section style={{ padding: "72px 28px 0" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />One footprint · three businesses</div>
                <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>One footprint.<br />Three ways to earn.</h2>
              </div>
              <p style={{ margin: "0", maxWidth: "440px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Printed media on the walls, digital screens at the gate, and the space itself — booked for launches, festivals and game days.</p>
            </div>
            <div className="alm-static-only" style={{ marginTop: "56px", paddingBottom: "128px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "16px" }}>
              {(v.pillars || []).map((pl, plI) => (
                <Fragment key={plI}>
                  <A className="alm-tile alm-link alm-in" href={pl.href} style={{ position: "relative", display: "block", height: "660px", borderRadius: "18px", overflow: "hidden", background: "#0B1220", color: "#FFFFFF", boxShadow: pl.ring, fontSize: "15px", letterSpacing: "-0.005em", fontWeight: "600" }}>
                    <img src={pl.img} alt={pl.alt} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: pl.pos, display: "block" }} loading="lazy" decoding="async" />
                    <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(11,18,32,0.55) 0%, rgba(11,18,32,0.05) 30%, rgba(11,18,32,0.2) 50%, rgba(11,18,32,0.94) 100%)" }} />
                    <div style={{ position: "absolute", left: "24px", right: "24px", top: "22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em" }}><span style={{ width: "7px", height: "7px", background: pl.dot, borderRadius: "50%" }} />{pl.no} · {pl.name}</span>
                      {pl.tag ? (
                        <>
                          <span style={{ padding: "7px 12px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em" }}>{pl.tag}</span>
                        </>
                      ) : null}
                    </div>
                    <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "26px" }}>
                      <div style={{ fontSize: "clamp(30px, 2.6vw, 40px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>{pl.head}</div>
                      <p style={{ margin: "14px 0 0", fontSize: "15px", lineHeight: "1.55", fontWeight: "400", color: "#D5DAE3" }}>{pl.desc}</p>
                      <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {(pl.items || []).map((it, itI) => (
                          <Fragment key={itI}>
                            <span style={{ padding: "6px 10px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.32)", fontSize: "12px", fontWeight: "700" }}>{it.t}</span>
                          </Fragment>
                        ))}
                      </div>
                      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em", color: pl.dot }}>{pl.cta} <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></span>
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)" }}>{pl.note}</span>
                      </div>
                    </div>
                  </A>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* THREE BUSINESSES · PINNED STORY (scrolling page view) */}
        <div className="alm-motion-only" style={{ height: "72px" }} />
        <section className="alm-story alm-motion-only" data-scrub="pin" data-steps="3" data-step="0" aria-label="Our three businesses">
          <div className="alm-story-stick">
            {(v.pillars || []).map((pl, plI) => (
              <Fragment key={plI}>
                <img className="alm-story-img" src={pl.img} alt={pl.alt} style={{ objectPosition: pl.pos }} loading="lazy" decoding="async" />
              </Fragment>
            ))}
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(5,8,15,0.84) 0%, rgba(5,8,15,0.42) 52%, rgba(5,8,15,0.08) 100%), linear-gradient(180deg, rgba(5,8,15,0.6) 0%, rgba(5,8,15,0) 28%, rgba(5,8,15,0) 52%, rgba(5,8,15,0.92) 100%)" }} />
            <div style={{ position: "absolute", inset: "0", maxWidth: "1360px", margin: "0 auto", padding: "104px 28px 56px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 48px", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", color: "rgba(255,255,255,0.78)" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />One footprint · three businesses</div>
                <div style={{ flex: "0 1 480px", minWidth: "260px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span className="alm-story-seg" style={{ flex: "1", height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
                      <i />
                    </span>
                    <span className="alm-story-seg" style={{ flex: "1", height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
                      <i />
                    </span>
                    <span className="alm-story-seg" style={{ flex: "1", height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
                      <i />
                    </span>
                  </div>
                  <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", gap: "8px", fontSize: "13px", fontWeight: "600" }}>
                    <span className="alm-story-lbl">Static media</span>
                    <span className="alm-story-lbl">Digital</span>
                    <span className="alm-story-lbl">Events &amp; venues</span>
                  </div>
                </div>
              </div>
              <div style={{ position: "relative", height: "min(480px, 62vh)", maxWidth: "900px" }}>
                {(v.pillars || []).map((pl, plI) => (
                  <Fragment key={plI}>
                    <div className="alm-story-text">
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 14px", fontSize: "15px", fontWeight: "600", color: pl.dot }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}><span style={{ width: "7px", height: "7px", background: pl.dot, borderRadius: "50%" }} />{pl.no} · {pl.label}</span>
                        {pl.tag ? (
                          <>
                            <span style={{ padding: "6px 12px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontSize: "12px", fontWeight: "600" }}>Next growth engine</span>
                          </>
                        ) : null}
                      </div>
                      <div style={{ marginTop: "18px", fontSize: "clamp(46px, 7vw, 112px)", lineHeight: "0.98", letterSpacing: "-0.045em", fontWeight: "600" }}>{pl.head}</div>
                      <p className="alm-story-desc" style={{ margin: "22px 0 0", maxWidth: "580px", fontSize: "19px", lineHeight: "1.55", fontWeight: "400", color: "#D5DAE3" }}>{pl.desc}</p>
                      <div style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                        <A className="alm-btn" href={pl.href} style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 26px", borderRadius: "999px", background: "#FFFFFF", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>{pl.cta}</A>
                        {(pl.items || []).map((it, itI) => (
                          <Fragment key={itI}>
                            <span className="alm-story-chip" style={{ padding: "8px 12px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.3)", fontSize: "13px", fontWeight: "600", color: "#E4E8EF" }}>{it.t}</span>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* EVENTS & VENUES SHOWCASE */}
        <section id="events" style={{ padding: "128px 28px", background: "#05080F", color: "#FFFFFF", overflow: "hidden" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", color: "#FBAE4F" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Events &amp; venues · our next growth engine</div>
                <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "980px", fontSize: "clamp(40px, 6vw, 96px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Turn parking into<br /><span style={{ color: "#FBAE4F" }}>a destination.</span></h2>
              </div>
              <p style={{ margin: "0", maxWidth: "440px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>The third business puts the real estate itself to work. Brands launch here, organizers book it, and on game day the whole garage becomes media.</p>
            </div>
            <div style={{ marginTop: "64px", display: "flex", flexWrap: "wrap", gap: "32px 48px", alignItems: "stretch" }}>
              <div style={{ flex: "1 1 400px", minWidth: "0", display: "flex", flexDirection: "column" }}>
                <div role="tablist" aria-label="Ways to use our venues" style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                  {(v.evTabs || []).map((t, tI) => (
                    <Fragment key={tI}>
                      <button type="button" role="tab" aria-selected={t.sel} onClick={t.pick} style={{ position: "relative", display: "flex", alignItems: "center", gap: "18px", width: "100%", minHeight: "84px", padding: "18px 4px", border: "0", borderBottom: "1px solid rgba(255,255,255,0.16)", background: "transparent", color: t.fg, fontFamily: "'Montserrat', sans-serif", textAlign: "left", cursor: "pointer", transition: "color .3s ease" }}>
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", color: t.noColor }}>{t.no}</span>
                        <span style={{ flex: "1", fontSize: "clamp(22px, 2.2vw, 30px)", fontWeight: "600", letterSpacing: "-0.035em" }}>{t.title}</span>
                        <span aria-hidden="true" style={{ fontSize: "20px", opacity: t.arrow }}>→</span>
                        <span aria-hidden="true" className={t.barCls} style={{ position: "absolute", left: "0", bottom: "-1px", height: "2px", width: t.barW, background: "#FBAE4F" }} />
                      </button>
                    </Fragment>
                  ))}
                </div>
                <div style={{ marginTop: "28px" }}>
                  <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#E4E8EF" }}>{v.evCur?.desc}</p>
                  <dl style={{ margin: "24px 0 0", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.6fr)", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                    <dt style={{ padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.12)", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#A3ACBC" }}>WHO BOOKS</dt>
                    <dd style={{ margin: "0", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.12)", fontSize: "15px", fontWeight: "700" }}>{v.evCur?.who}</dd>
                    <dt style={{ padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.12)", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#A3ACBC" }}>WE PROVIDE</dt>
                    <dd style={{ margin: "0", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.12)", fontSize: "15px", fontWeight: "700" }}>{v.evCur?.give}</dd>
                  </dl>
                  <div style={{ marginTop: "18px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {(v.evCur?.ex || []).map((x, xI) => (
                      <Fragment key={xI}>
                        <span style={{ padding: "7px 12px", borderRadius: "999px", background: "rgba(251,174,79,0.14)", color: "#FBAE4F", fontSize: "12px", fontWeight: "700" }}>{x.t}</span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ flex: "1.6 1 560px", minWidth: "0" }}>
                <div className="alm-wipe" style={{ position: "relative", height: "100%", minHeight: "560px", borderRadius: "18px", overflow: "hidden", background: "#0B1220" }}>
                  {(v.evImgs || []).map((im, imI) => (
                    <Fragment key={imI}>
                      <img src={im.src} alt={im.alt} aria-hidden={im.hidden} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: im.pos, display: "block", opacity: im.op, transform: `scale(${im.sc})`, transition: "opacity .9s ease, transform 7s linear" }} loading="lazy" decoding="async" />
                    </Fragment>
                  ))}
                  <div style={{ position: "absolute", inset: "auto 0 0 0", height: "40%", background: "linear-gradient(180deg, rgba(5,8,15,0) 0%, rgba(5,8,15,0.7) 100%)" }} />
                  <div style={{ position: "absolute", left: "22px", bottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ padding: "7px 12px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em" }}>{v.evCur?.title}</span>
                  </div>
                  <div style={{ position: "absolute", right: "20px", bottom: "22px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)" }}>CONCEPT RENDER</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px", borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: "36px" }}>
              <div>
                <div style={{ fontSize: "clamp(44px, 4.4vw, 64px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>&lt;20</div>
                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#A3ACBC" }}>SPACES · SMALL EVENTS</div>
              </div>
              <div>
                <div style={{ fontSize: "clamp(44px, 4.4vw, 64px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>~30</div>
                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#A3ACBC" }}>SPACES · FULL ACTIVATION</div>
              </div>
              <div>
                <div style={{ fontSize: "clamp(44px, 4.4vw, 64px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>100%</div>
                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#A3ACBC" }}>OF THE LOT · GAME-DAY TAKEOVER</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center" }}>
                <A className="alm-btn" href="/events#book" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", minHeight: "54px", padding: "0 26px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Plan an event</A>
                <A className="alm-btn" href="/real-estate#streams" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", minHeight: "54px", padding: "0 26px", borderRadius: "999px", border: "2px solid rgba(255,255,255,0.6)", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Host events on your property</A>
              </div>
            </div>
          </div>
        </section>
        {/* INVESTOR CASE (bento) */}
        <section style={{ padding: "140px 28px 128px", background: "#F5F5F7" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "17px", fontWeight: "600", letterSpacing: "-0.01em", color: "#A85C00" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />For investors</div>
              <h2 className="alm-in" style={{ margin: "16px auto 0", maxWidth: "980px", fontSize: "clamp(40px, 6vw, 88px)", lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "600" }}>A proven network.<br />An overlooked venue.</h2>
              <p className="alm-in" style={{ margin: "24px auto 0", maxWidth: "660px", fontSize: "21px", lineHeight: "1.5", fontWeight: "400", color: "#5B6474" }}>Parking is where every trip ends — and where drivers spend up to ten minutes. The footprint, the hardware and the brands are already in place.</p>
            </div>
            <div style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "16px" }}>
              <div className="alm-in alm-span2" style={{ minHeight: "340px", padding: "40px", borderRadius: "28px", background: "#0B1220", color: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                <div aria-hidden="true" style={{ position: "absolute", right: "-120px", top: "-120px", width: "420px", height: "420px", background: "radial-gradient(closest-side, rgba(251,174,79,0.35), rgba(251,174,79,0))", pointerEvents: "none" }} />
                <div style={{ position: "relative", fontSize: "15px", fontWeight: "600", color: "#A3ACBC" }}>Digital units installed in New York and Connecticut</div>
                <div style={{ position: "relative" }}>
                  <div style={{ fontSize: "clamp(72px, 9vw, 132px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.05em", background: "linear-gradient(90deg, #FBAE4F, #FFE1B8)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>110+</div>
                  <div style={{ marginTop: "14px", fontSize: "18px", lineHeight: "1.5", color: "#C9D0DB" }}>With another 1,000 planned for the top 35 media markets in the US.</div>
                </div>
              </div>
              <div className="alm-in" style={{ minHeight: "340px", padding: "36px", borderRadius: "28px", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#5B6474" }}>Dwell time</div>
                <div>
                  <div style={{ fontSize: "clamp(64px, 6.4vw, 96px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.05em", color: "#1D7F92" }}>10<span style={{ fontSize: "0.4em", letterSpacing: "0" }}>MIN</span></div>
                  <div style={{ marginTop: "12px", fontSize: "17px", lineHeight: "1.5", color: "#5B6474" }}>Industry-leading dwell times of up to ten minutes with the ads we place.</div>
                </div>
              </div>
              <div className="alm-in" style={{ minHeight: "300px", padding: "36px", borderRadius: "28px", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#5B6474" }}>Our footprint</div>
                <div>
                  <div style={{ fontSize: "clamp(56px, 5.6vw, 84px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.05em" }}>12,000</div>
                  <div style={{ marginTop: "12px", fontSize: "17px", lineHeight: "1.5", color: "#5B6474" }}>parking locations in the network, across 400+ cities.</div>
                </div>
              </div>
              <div className="alm-in alm-span2" style={{ minHeight: "300px", padding: "36px", borderRadius: "28px", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#5B6474" }}>Revenue engines</div>
                <div>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "18px" }}>
                    <span style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#0B1220" }} />
                    <span style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#8FDCE8" }} />
                    <span style={{ flex: "1.3", height: "8px", borderRadius: "4px", background: "#FBAE4F" }} />
                  </div>
                  <div style={{ fontSize: "26px", fontWeight: "600", lineHeight: "1.1", letterSpacing: "-0.02em" }}>Static, digital and events.</div>
                  <div style={{ marginTop: "10px", fontSize: "17px", lineHeight: "1.5", color: "#5B6474" }}>Three ways to earn from the same footprint.</div>
                </div>
              </div>
              <div className="alm-in alm-span2" style={{ minHeight: "300px", padding: "36px", borderRadius: "28px", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#5B6474" }}>Vertically integrated</div>
                <div>
                  <div style={{ fontSize: "26px", fontWeight: "600", lineHeight: "1.1", letterSpacing: "-0.02em" }}>From the screen to the sale.</div>
                  <div style={{ marginTop: "10px", fontSize: "17px", lineHeight: "1.5", color: "#5B6474" }}>Signage manufacturing, large-format printing and our CMS through sister companies MetroClick and faytech; software, ad sales and installs in-house.</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "16px 24px", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <A className="alm-btn" href="/investors" style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 26px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontWeight: "600", fontSize: "15px" }}>Investor overview</A>
                <A className="alm-btn" href="/investors#access" style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 26px", borderRadius: "999px", border: "1.5px solid #0B1220", color: "#0B1220", fontWeight: "600", fontSize: "15px" }}>Request the data room</A>
              </div>
            </div>
          </div>
        </section>
        {/* FROM ABOVE (DRONE) */}
        <section style={{ position: "relative", minHeight: "780px", overflow: "hidden", background: "#05080F", color: "#FFFFFF" }}>
          <div className="alm-expand" data-scrub="enter" style={{ position: "absolute", inset: "0", overflow: "hidden" }}>
            <video className="alm-par" data-scrub="cover" ref={v.vidRef} src="/media/video/lot-topdown.mp4" poster="/media/video/lot-topdown-poster.webp" muted loop playsInline preload="none" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(11,18,32,0.72) 0%, rgba(11,18,32,0.35) 45%, rgba(11,18,32,0.82) 100%)" }} />
          </div>
          <div className="alm-in" style={{ position: "relative", maxWidth: "1360px", minHeight: "780px", margin: "0 auto", padding: "96px 28px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />From above</div>
            <div style={{ marginTop: "24px", fontSize: "clamp(40px, 6.4vw, 104px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Parked.<br /><span style={{ color: "#FBAE4F" }}>Paying attention.</span></div>
            <p style={{ margin: "32px 0 0", maxWidth: "640px", fontSize: "19px", lineHeight: "1.55", fontWeight: "400", color: "#E4E8EF" }}>Three million cars stop inside the A Lot Media network every day — minutes before their drivers walk into the office, the store or the game.</p>
            <A className="alm-btn" href="/locations" style={{ marginTop: "36px", display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", background: "#FFFFFF", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>See where they park</A>
          </div>
          <div style={{ position: "absolute", right: "28px", bottom: "22px", fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)" }}>STOCK DRONE FOOTAGE</div>
        </section>
        {/* IN THE NETWORK */}
        <section style={{ padding: "96px 28px 120px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Static + digital · in the field</div>
                <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Real placements.<br />Real brands.</h2>
              </div>
              <p style={{ margin: "0", maxWidth: "420px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Live A Lot Media installations across our static and digital networks — the moment between parking the car and getting where you’re going.<br /><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#8A93A3" }}>REAL INSTALLATIONS · PHOTOS RETOUCHED</span></p>
            </div>
            <div style={{ marginTop: "56px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", flex: "2 1 640px", height: "560px", position: "relative", overflow: "hidden", borderRadius: "16px", background: "#0B1220" }}>
                <img src="/media/photos/lucid-digital-panel.webp" alt="Travelers with luggage walking past a Lucid ad on an A Lot Media digital panel in a parking garage" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 50%", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "80px 28px 24px", background: "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.82) 100%)", color: "#FFFFFF" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#8FDCE8", borderRadius: "50%" }} />Digital</div>
                  <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Lucid</div>
                  <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: "600", color: "#D5DAE3" }}>Digital panel · garage lobby</div>
                </figcaption>
              </figure>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", flex: "1 1 320px", height: "560px", position: "relative", overflow: "hidden", borderRadius: "16px", background: "#0B1220" }}>
                <img src="/media/photos/united-digital-panel.webp" alt="United for Business ad on an A Lot Media digital panel beside a white sports car" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 50%", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "80px 28px 24px", background: "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.82) 100%)", color: "#FFFFFF" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#8FDCE8", borderRadius: "50%" }} />Digital</div>
                  <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>United</div>
                  <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: "600", color: "#D5DAE3" }}>Digital panel</div>
                </figcaption>
              </figure>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", flex: "1 1 320px", height: "420px", position: "relative", overflow: "hidden", borderRadius: "16px", background: "#0B1220" }}>
                <img src="/media/photos/panera-now-open.webp" alt="Panera Bread now-open ad on an A Lot Media digital panel with drivers nearby" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 50%", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "80px 28px 24px", background: "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.82) 100%)", color: "#FFFFFF" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#8FDCE8", borderRadius: "50%" }} />Digital</div>
                  <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Panera Bread</div>
                  <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: "600", color: "#D5DAE3" }}>Digital panel · new store launch</div>
                </figcaption>
              </figure>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", flex: "1 1 320px", height: "420px", position: "relative", overflow: "hidden", borderRadius: "16px", background: "#0B1220" }}>
                <img src="/media/photos/a-beautiful-noise-panel.webp" alt="A Beautiful Noise Broadway musical ad on a digital panel next to the garage cashier" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "80px 28px 24px", background: "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.82) 100%)", color: "#FFFFFF" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#8FDCE8", borderRadius: "50%" }} />Digital</div>
                  <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>A Beautiful Noise</div>
                  <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: "600", color: "#D5DAE3" }}>Digital panel · Broadway</div>
                </figcaption>
              </figure>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", flex: "1 1 320px", height: "420px", position: "relative", overflow: "hidden", borderRadius: "16px", background: "#0B1220" }}>
                <img src="/media/photos/hartford-healthcare-wallscape.webp" alt="Hartford HealthCare wallscape inside a parking garage" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "80px 28px 24px", background: "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.82) 100%)", color: "#FFFFFF" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FFFFFF", borderRadius: "50%" }} />Static</div>
                  <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Hartford HealthCare</div>
                  <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: "600", color: "#D5DAE3" }}>Wallscape</div>
                </figcaption>
              </figure>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", flex: "1 1 320px", height: "560px", position: "relative", overflow: "hidden", borderRadius: "16px", background: "#0B1220" }}>
                <img src="/media/photos/hartford-healthcare-elevator-wraps.webp" alt="Hartford HealthCare LifeStar helicopter elevator door wraps" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "80px 28px 24px", background: "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.82) 100%)", color: "#FFFFFF" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FFFFFF", borderRadius: "50%" }} />Static</div>
                  <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Hartford HealthCare</div>
                  <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: "600", color: "#D5DAE3" }}>Elevator wraps</div>
                </figcaption>
              </figure>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", flex: "2 1 640px", height: "560px", position: "relative", overflow: "hidden", borderRadius: "16px", background: "#0B1220" }}>
                <img src="/media/photos/msk-garage-entrance.webp" alt="Car pulling into a garage past an A Lot Media digital panel and branded wayfinding" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "80px 28px 24px", background: "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.82) 100%)", color: "#FFFFFF" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#8FDCE8", borderRadius: "50%" }} />Digital</div>
                  <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Memorial Sloan Kettering</div>
                  <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: "600", color: "#D5DAE3" }}>Digital panel · garage entrance</div>
                </figcaption>
              </figure>
            </div>
            <div style={{ marginTop: "32px" }}>
              <A className="alm-link" href="/company" style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em" }}>See the full gallery <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></A>
            </div>
          </div>
        </section>
        {/* DDRB PRODUCT (Apple-style) */}
        <section style={{ position: "relative", background: "#000000", color: "#FFFFFF", overflow: "hidden", padding: "140px 28px 128px" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "46%", width: "1100px", height: "900px", transform: "translate(-50%, -50%)", background: "radial-gradient(closest-side, rgba(63,120,255,0.16), rgba(0,0,0,0) 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "980px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "17px", fontWeight: "600", letterSpacing: "-0.01em", color: "#8FDCE8" }}><span style={{ width: "7px", height: "7px", background: "#8FDCE8", borderRadius: "50%" }} />Digital Dynamic Rate Board™</div>
            <h2 className="alm-in" style={{ margin: "18px 0 0", fontSize: "clamp(44px, 7vw, 104px)", lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "600" }}>The rate board,<br /><span style={{ background: "linear-gradient(90deg, #FBAE4F, #FFD9A3)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>reinvented.</span></h2>
            <p className="alm-in" style={{ margin: "26px auto 0", maxWidth: "640px", fontSize: "21px", lineHeight: "1.5", fontWeight: "400", color: "#A1A1A6" }}>It prices parking in real time and sells full-motion advertising underneath — one screen, two revenue lines. Watch it work.</p>
            <div className="alm-in" style={{ marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              <A className="alm-btn" href="/real-estate#ddrb" style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 26px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px" }}>For property owners</A>
              <A className="alm-btn" href="/formats#digital" style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 26px", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.45)", color: "#FFFFFF", fontWeight: "600", fontSize: "15px" }}>For advertisers</A>
            </div>
          </div>
          <div className="alm-lift" data-scrub="enter" style={{ position: "relative", maxWidth: "600px", margin: "40px auto 0", WebkitMaskImage: "radial-gradient(ellipse 72% 76% at 50% 46%, #000 62%, transparent 100%)", maskImage: "radial-gradient(ellipse 72% 76% at 50% 46%, #000 62%, transparent 100%)" }}>
            <LiveBoard variant="product" showCaption={false} />
          </div>
          <div style={{ position: "relative", maxWidth: "1120px", margin: "8px auto 0" }}>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "40px 32px", textAlign: "left" }}>
              <li className="alm-in" style={{ paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                <div style={{ fontSize: "21px", fontWeight: "600", letterSpacing: "-0.01em" }}>Live pricing</div>
                <div style={{ marginTop: "8px", fontSize: "16px", lineHeight: "1.5", color: "#A1A1A6" }}>Rates that move with time, occupancy and events.</div>
              </li>
              <li className="alm-in" style={{ paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                <div style={{ fontSize: "21px", fontWeight: "600", letterSpacing: "-0.01em" }}>Full-motion ads</div>
                <div style={{ marginTop: "8px", fontSize: "16px", lineHeight: "1.5", color: "#A1A1A6" }}>Brand creative below the rates, sold network-wide.</div>
              </li>
              <li className="alm-in" style={{ paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                <div style={{ fontSize: "21px", fontWeight: "600", letterSpacing: "-0.01em" }}>Run from a phone</div>
                <div style={{ marginTop: "8px", fontSize: "16px", lineHeight: "1.5", color: "#A1A1A6" }}>Update rates and content across every location.</div>
              </li>
              <li className="alm-in" style={{ paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                <div style={{ fontSize: "21px", fontWeight: "600", letterSpacing: "-0.01em" }}>Built for the garage</div>
                <div style={{ marginTop: "8px", fontSize: "16px", lineHeight: "1.5", color: "#A1A1A6" }}>High-bright, weatherproof, and integrates with existing parking equipment.</div>
              </li>
            </ul>
            <div style={{ marginTop: "48px", display: "flex", flexWrap: "wrap", gap: "16px 32px", alignItems: "center", justifyContent: "space-between" }}>
              <A className="alm-link" href="/real-estate#ddrb" style={{ display: "inline-flex", alignItems: "center", gap: "14px", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}><span style={{ width: "56px", height: "72px", borderRadius: "12px", overflow: "hidden", background: "#0B1220", flex: "0 0 auto" }}><img src="/media/photos/ddrb-connecticut.webp" alt="Real A Lot Media rate board installed in Connecticut" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", display: "block" }} loading="lazy" decoding="async" /></span> See one installed in Connecticut <span className="alm-arrow" style={{ display: "inline-block", color: "#FBAE4F" }}>→</span></A>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.45)" }}>PRODUCT RENDER · LIVE SCREEN DEMO</span>
            </div>
          </div>
        </section>
        {/* FORMATS ROW (holds and scrolls sideways in page view) */}
        <section className="alm-hs" data-scrub="pin" style={{ padding: "128px 0 120px" }}>
          <div className="alm-hs-stick">
            <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 28px", width: "100%", boxSizing: "border-box" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Market domination</div>
                  <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Own every step of the parking journey.</h2>
                </div>
                <div className="alm-hs-btns" style={{ display: "flex", gap: "8px" }}>
                  <button type="button" aria-label="Scroll formats left" onClick={v.scrollLeft} style={{ width: "52px", height: "52px", borderRadius: "50%", border: "2px solid #0B1220", background: "transparent", color: "#0B1220", fontSize: "20px", cursor: "pointer" }}>←</button>
                  <button type="button" aria-label="Scroll formats right" onClick={v.scrollRight} style={{ width: "52px", height: "52px", borderRadius: "50%", border: "2px solid #0B1220", background: "#0B1220", color: "#FFFFFF", fontSize: "20px", cursor: "pointer" }}>→</button>
                </div>
              </div>
            </div>
            <div className="alm-row" data-track="1" ref={v.setRow} style={{ marginTop: "48px", display: "flex", gap: "16px", overflowX: "auto", scrollSnapType: "x mandatory", scrollPaddingLeft: "28px", padding: "0 28px 8px", scrollbarWidth: "none" }}>
              {(v.formats || []).map((f, fI) => (
                <Fragment key={fI}>
                  <A className="alm-tile alm-in" href={f.href} style={{ flex: "0 0 340px", scrollSnapAlign: "start", display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: "16px", overflow: "hidden" }}>
                    <div style={{ position: "relative", height: "380px", overflow: "hidden", background: "#0B1220" }}>
                      <img src={f.img} alt={f.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos, display: "block" }} loading="lazy" decoding="async" />
                      {f.render ? (
                        <>
                          <span style={{ position: "absolute", top: "14px", left: "14px", padding: "5px 10px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "10px", fontWeight: "600", letterSpacing: "0.1em" }}>RENDER</span>
                        </>
                      ) : null}
                    </div>
                    <div style={{ padding: "22px 24px 26px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", alignItems: "center" }}>
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", color: "#8A5300" }}>{f.stage}</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "10px", fontWeight: "600", letterSpacing: "0.12em", color: "#4E586A" }}><span style={{ width: "7px", height: "7px", background: f.bizDot, borderRadius: "50%" }} />{f.biz}</span>
                      </div>
                      <div style={{ marginTop: "8px", fontSize: "21px", fontWeight: "650", letterSpacing: "-0.02em" }}>{f.name}</div>
                      <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.5", fontWeight: "400", color: "#4E586A" }}>{f.desc}</div>
                    </div>
                  </A>
                </Fragment>
              ))}
              <div style={{ flex: "0 0 12px" }} />
            </div>
            <div className="alm-hs-bar" aria-hidden="true" style={{ maxWidth: "1360px", width: "100%", margin: "36px auto 0", padding: "0 28px", boxSizing: "border-box" }}>
              <div style={{ height: "2px", borderRadius: "2px", background: "rgba(11,18,32,0.12)", overflow: "hidden" }}>
                <i />
              </div>
            </div>
          </div>
        </section>
        {/* MARKETS */}
        <section style={{ padding: "128px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />The power to move</div>
                <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>11 flagship markets.<br /><span style={{ color: "#FBAE4F" }}>400+ cities.</span></h2>
              </div>
              <div role="group" aria-label="Filter markets" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(v.filters || []).map((fl, flI) => (
                  <Fragment key={flI}>
                    <button className="alm-chip" type="button" onClick={fl.pick} style={{ minHeight: "44px", padding: "0 18px", borderRadius: "999px", border: `2px solid ${fl.bd}`, background: fl.bg, color: fl.fg, fontFamily: "'Montserrat', sans-serif", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", cursor: "pointer" }}>{fl.label}</button>
                  </Fragment>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "12px" }}>
              {(v.markets || []).map((m, mI) => (
                <Fragment key={mI}>
                  <A className="alm-tile alm-in" href="/locations" style={{ position: "relative", height: "340px", borderRadius: "16px", overflow: "hidden", background: "#121B2E", display: "block" }}>
                    <img src={m.img} alt={`${m.name} skyline`} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                    <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(11,18,32,0.05) 30%, rgba(11,18,32,0.88) 100%)" }} />
                    <div style={{ position: "absolute", left: "20px", right: "20px", top: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.8)" }}>{m.state}</span>
                      <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", padding: "6px 10px", borderRadius: "999px", background: m.chipBg, color: m.chipFg }}>{m.status}</span>
                    </div>
                    <div style={{ position: "absolute", left: "20px", right: "20px", bottom: "20px", fontSize: "26px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{m.name}</div>
                  </A>
                </Fragment>
              ))}
            </div>
            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "16px 40px", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "15px", fontWeight: "400", color: "#A3ACBC" }}>Offices in Hartford, Los Angeles, Chicago and New York. New markets open every quarter.</div>
              <A className="alm-link" href="/locations" style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", color: "#FBAE4F" }}>Search all 12,000 locations <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></A>
            </div>
          </div>
        </section>
        {/* AUDIENCES */}
        <section style={{ padding: "0 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            <A className="alm-tile alm-link alm-in" href="/advertisers" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", fontSize: "15px", letterSpacing: "-0.005em", fontWeight: "600" }}>
              <div style={{ height: "300px", overflow: "hidden" }}>
                <img src="/media/photos/ibm-digital-panel.webp" alt="Commuters passing an IBM ad on an A Lot Media digital panel in a parking garage" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 50%", display: "block" }} loading="lazy" decoding="async" />
              </div>
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "14px", flex: "1" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8A5300" }}>FOR ADVERTISERS</div>
                <div style={{ fontSize: "28px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Reach drivers in the minutes they can’t skip.</div>
                <div style={{ fontSize: "16px", lineHeight: "1.55", fontWeight: "400", color: "#4E586A" }}>Static, digital and event activations, targeted by profession, income and car type.</div>
                <div style={{ marginTop: "auto", paddingTop: "12px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em" }}>ADVERTISE WITH US <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></div>
              </div>
            </A>
            <A className="alm-tile alm-link alm-in" href="/real-estate" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", fontSize: "15px", letterSpacing: "-0.005em", fontWeight: "600" }}>
              <div style={{ height: "300px", overflow: "hidden" }}>
                <img src="/media/photos/stock-garage.webp" alt="Empty concrete parking garage level lit by overhead lights" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
              </div>
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "14px", flex: "1" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8A5300" }}>FOR PROPERTY OWNERS</div>
                <div style={{ fontSize: "28px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>More revenue from every space.</div>
                <div style={{ fontSize: "16px", lineHeight: "1.55", fontWeight: "400", color: "#4E586A" }}>Advertising, dynamic pricing and event revenue — we install and sell, you get a percentage of the gross.</div>
                <div style={{ marginTop: "auto", paddingTop: "12px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em" }}>MONETIZE YOUR LOCATION <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></div>
              </div>
            </A>
            <A className="alm-tile alm-link alm-in" href="/events#book" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", fontSize: "15px", letterSpacing: "-0.005em", fontWeight: "600" }}>
              <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
                <img src="/media/renders/rooftop-event.webp" alt="Concept render of a branded rooftop parking event at dusk" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                <span style={{ position: "absolute", top: "14px", left: "14px", padding: "5px 10px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "10px", fontWeight: "600", letterSpacing: "0.1em" }}>RENDER</span>
              </div>
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "14px", flex: "1" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8A5300" }}>FOR EVENT ORGANIZERS</div>
                <div style={{ fontSize: "28px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Book a rooftop, a lot or a level.</div>
                <div style={{ fontSize: "16px", lineHeight: "1.55", fontWeight: "400", color: "#4E586A" }}>Lots and garages for activations, VIP parking and game days — with media built in.</div>
                <div style={{ marginTop: "auto", paddingTop: "12px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em" }}>FIND A VENUE <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></div>
              </div>
            </A>
            <A className="alm-tile alm-link alm-in" href="/investors" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", fontSize: "15px", letterSpacing: "-0.005em", fontWeight: "600" }}>
              <div style={{ height: "300px", overflow: "hidden" }}>
                <img src="/media/photos/stock-aerial.webp" alt="Aerial view of a large parking lot filled with cars" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
              </div>
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "14px", flex: "1" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8A5300" }}>FOR INVESTORS</div>
                <div style={{ fontSize: "28px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Vertically integrated, screen to sale.</div>
                <div style={{ fontSize: "16px", lineHeight: "1.55", fontWeight: "400", color: "#4E586A" }}>110+ digital units live in NY and CT, with 1,000 more planned across 35 markets.</div>
                <div style={{ marginTop: "auto", paddingTop: "12px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em" }}>INVESTOR OVERVIEW <span className="alm-arrow" style={{ display: "inline-block" }}>→</span></div>
              </div>
            </A>
          </div>
        </section>
        {/* SELF SERVE */}
        <section style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "64px", alignItems: "center" }}>
            <div style={{ flex: "1 1 420px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Plan a campaign</div>
              <h2 className="alm-in" style={{ margin: "22px 0 0", fontSize: "clamp(38px, 5vw, 76px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Tell us where. We’ll make it happen.</h2>
              <p style={{ margin: "28px 0 0", maxWidth: "520px", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Pick markets, formats and dates in one place. Our team comes back with availability, rates and a proposal — then handles print, install and reporting.</p>
              <A className="alm-btn" href="/plan" style={{ marginTop: "32px", display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Start a plan</A>
            </div>
            <div style={{ flex: "1 1 560px", minWidth: "0" }}>
              <div className="alm-in" style={{ borderRadius: "20px", background: "#FFFFFF", padding: "28px", boxShadow: "0 40px 100px rgba(11,18,32,0.14)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <div style={{ fontSize: "15px", fontWeight: "700", letterSpacing: "0.04em" }}>NEW CAMPAIGN</div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <span style={{ width: "32px", height: "4px", background: "#FBAE4F" }} />
                    <span style={{ width: "32px", height: "4px", background: "#FBAE4F" }} />
                    <span style={{ width: "32px", height: "4px", background: "#E3E5EA" }} />
                    <span style={{ width: "32px", height: "4px", background: "#E3E5EA" }} />
                  </div>
                </div>
                <div style={{ marginTop: "24px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>MARKETS</div>
                <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ padding: "9px 14px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontSize: "13px", fontWeight: "700" }}>New York</span>
                  <span style={{ padding: "9px 14px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontSize: "13px", fontWeight: "700" }}>Hartford</span>
                  <span style={{ padding: "9px 14px", borderRadius: "999px", border: "1.5px solid #D5DAE3", fontSize: "13px", fontWeight: "600" }}>Boston</span>
                  <span style={{ padding: "9px 14px", borderRadius: "999px", border: "1.5px solid #D5DAE3", fontSize: "13px", fontWeight: "600" }}>Chicago</span>
                  <span style={{ padding: "9px 14px", borderRadius: "999px", border: "1.5px solid #D5DAE3", fontSize: "13px", fontWeight: "600" }}>+7</span>
                </div>
                <div style={{ marginTop: "24px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>FORMATS</div>
                <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "8px" }}>
                  <div style={{ borderRadius: "18px", overflow: "hidden", border: "2px solid #FBAE4F" }}>
                    <img src="/media/photos/ddrb-connecticut.webp" alt="" style={{ width: "100%", height: "90px", objectFit: "cover", objectPosition: "50% 35%", display: "block" }} loading="lazy" decoding="async" />
                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>Rate boards</div>
                      <div style={{ fontSize: "12px", color: "#4E586A" }}>Digital</div>
                    </div>
                  </div>
                  <div style={{ borderRadius: "18px", overflow: "hidden", border: "1.5px solid #E3E5EA" }}>
                    <img src="/media/photos/hartford-healthcare-elevator-wraps.webp" alt="" style={{ width: "100%", height: "90px", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>Elevator wraps</div>
                      <div style={{ fontSize: "12px", color: "#4E586A" }}>Static</div>
                    </div>
                  </div>
                  <div style={{ borderRadius: "18px", overflow: "hidden", border: "1.5px solid #E3E5EA" }}>
                    <img src="/media/photos/hartford-healthcare-wallscape.webp" alt="" style={{ width: "100%", height: "90px", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>Wallscapes</div>
                      <div style={{ fontSize: "12px", color: "#4E586A" }}>Static</div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #E3E5EA", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>FLIGHT</div>
                    <div style={{ marginTop: "4px", fontSize: "16px", fontWeight: "600" }}>Nov 3 – Nov 30</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>PROPOSAL</div>
                    <div style={{ marginTop: "4px", fontSize: "16px", fontWeight: "600" }}>From our team</div>
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center", minHeight: "46px", padding: "0 20px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em" }}>Send request</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
