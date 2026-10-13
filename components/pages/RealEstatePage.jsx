'use client';

// Ported from the design-canvas artboard PropertyOwners.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import { playWhenVisible } from '@/lib/video';
import { sendInquiry } from '@/lib/inquiry';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import LiveBoard from '@/components/LiveBoard';
import Nav from '@/components/Nav';

export default class RealEstatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderVals() {
    var self = this;
    var st = this.state || {};
    var base = st.base || 24;
    var occ = st.occ == null ? 70 : st.occ;
    var ev = !!st.ev;
    var o = occ / 100;
    var m = o < 0.5 ? 0.85 : (o < 0.8 ? 1 : 1 + (o - 0.8) * 1.5);
    if (ev) m *= 1.4;
    var rate = Math.round(base * m);
    var diff = rate - base;
    var openIdx = st.faq == null ? 0 : st.faq;
    var faqs = [
      ['How do I get paid?', 'You receive a check in the mail for a percentage of the gross advertising revenue generated at your location. Revenue is shared quarterly, based on your revenue-split agreement.'],
      ['What does it cost me?', 'We install our equipment and sell the advertising — there’s no risk to you. Prefer to own the hardware? Rate boards and Device Hub software are also available to purchase; ask us for pricing.'],
      ['Who controls the parking rates?', 'You do. Set rules by time, occupancy and events, and change rates across locations from your phone.'],
      ['Will it work with my existing equipment?', 'Yes. The Digital Dynamic Rate Board™ integrates with LAZ and Flash parking rate portals, so rates update automatically — and Flash integration adds a live space count. Non-integrated image-based and web-based versions are available too.'],
      ['What about programmatic ads?', 'Opting in to our advertising program opens your screen space to our internal sales team and to programmatic exchanges. Every campaign is approved by A Lot Media first: nothing illicit, such as tobacco, alcohol, cannabis or adult entertainment.'],
      ['Can my property host events?', 'Often, yes. Lots, garages and rooftops can host brand activations, VIP parking and shuttles, and game-day takeovers. You approve every date, and we handle the booking and operations.'],
      ['What kinds of properties qualify?', 'Garages and lots of all kinds — serving residential buildings, Class A offices, universities, movie theaters, restaurants, museums and shopping malls, plus stand-alone lots.']
    ];
    var Y = '✓', N = '—';
    if (!this._vidRef) {
      this._vidRef = playWhenVisible;
    }
    return {
      vidRef: this._vidRef,
      sim: {
        base: base, occ: occ, rate: rate, eventOn: ev ? 'true' : 'false',
        trackBg: ev ? '#FBAE4F' : '#C9CDD6', knob: ev ? 25 : 3,
        delta: diff === 0 ? 'Same' : (diff > 0 ? '+$' + diff : '−$' + Math.abs(diff)),
        deltaColor: diff > 0 ? '#1F8A4C' : (diff < 0 ? '#B54708' : '#4E586A'),
        setBase: function (e) { self.setState({ base: parseInt(e.target.value, 10) }); },
        setOcc: function (e) { self.setState({ occ: parseInt(e.target.value, 10) }); },
        toggleEvent: function () { self.setState({ ev: !ev }); }
      },
      duties: [
        { label: 'Authorize advertising at the location', you: Y, alm: N },
        { label: 'Supply the rate boards (with our sister companies)', you: N, alm: Y },
        { label: 'Install equipment', you: N, alm: Y },
        { label: 'Software & content management', you: N, alm: Y },
        { label: 'Find advertisers & sell campaigns', you: N, alm: Y },
        { label: 'Design & print creative', you: N, alm: Y },
        { label: 'Book & run events on your property', you: N, alm: Y },
        { label: 'Approve event dates', you: Y, alm: N },
        { label: 'Set your parking rates', you: Y, alm: N },
        { label: 'Receive revenue share', you: Y, alm: N }
      ],
      faqs: faqs.map(function (f, i) {
        var open = i === openIdx;
        return { q: f[0], a: f[1], open: open, expanded: open ? 'true' : 'false', sign: open ? '−' : '+', toggle: function () { self.setState({ faq: open ? -1 : i }); } };
      }),
      configs: [
        { no: '1', name: 'DDRB', chip: 'INTEGRATED', desc: 'Integrated with LAZ and Flash parking rate portals. Rates update automatically.' },
        { no: '2', name: 'DDRB + messaging', chip: 'INTEGRATED', desc: 'Integrated rates that update automatically, plus an area for advertising and messaging.', dark: true },
        { no: '3', name: 'Image based', chip: 'STAND-ALONE', desc: 'A static 1080×1920 image. Information changes when a new image is published through our CMS.' },
        { no: '4', name: 'Web based', chip: 'STAND-ALONE', desc: 'Information comes from a locked-down webpage, so any change shows as soon as it is published.' }
      ].map(function (c) { return { no: c.no, name: c.name, chip: c.chip, desc: c.desc, bg: c.dark ? '#0B1220' : '#FFFFFF', fg: c.dark ? '#FFFFFF' : '#0B1220', mute: c.dark ? '#C9D0DB' : '#4E586A', chipBg: c.chip === 'INTEGRATED' ? '#8FDCE8' : '#E3E5EA' }; }),
      hardware: [
        { name: 'Flash topper', screen: '16″', env: 'Semi-outdoor' },
        { name: 'Kiosk', screen: '32″', env: 'Semi- or full outdoor' },
        { name: 'A-frame', screen: '43″', env: 'Semi- or full outdoor · battery option' },
        { name: 'Kiosk', screen: '55″', env: 'Semi- or full outdoor' },
        { name: 'Wall mount', screen: '43″ · 55″', env: 'Semi-outdoor (55″ also full outdoor)' },
        { name: 'Wall mount', screen: '65″', env: 'Full outdoor' },
        { name: 'LED panels', screen: '2.6 or 2.9 mm pitch', env: 'Outdoor · surface or ceiling mount' }
      ],
      tiers: [
        { name: 'Basic', note: '1 login · support within 2 business days' },
        { name: 'Standard', note: '2 logins · asset setup at launch' },
        { name: 'Pro', note: '4 logins · network monitoring · quarterly assets' },
        { name: 'Enterprise', note: '5+ logins · ongoing asset services' }
      ],
      features: ['Full-motion video & audio', 'JPEG · PDF · MP4', 'Unlimited creative updates', 'Custom slot length', 'Space count with Flash', 'Custom vinyl wrap'].map(function (t) { return { t: t }; }),
      field: [
        { kicker: 'TIME-TRIGGER CONTENT', name: 'Denison Parking', where: 'Hamilton Garage',
          desc: 'The board changes on a schedule: from 7AM to 5PM it shows employee-only parking, and from 5PM to 7AM it switches to public parking.' },
        { kicker: '55″ SEMI-OUTDOOR WAYFINDER', name: 'Bethlehem Parking Authority', where: 'Polk St Garage · Bethlehem, PA',
          desc: 'A touch-screen wayfinder with 50 local points of interest. Parkers tap to explore and scan a QR code to open directions in Google Maps; the top third of the screen runs messaging and ads.' },
        { kicker: '55″ SEMI-OUTDOOR HELP HUB', name: 'Avail', where: 'Ride-share program help desk',
          desc: 'A fully interactive digital help desk with step-by-step instructions, FAQs, QR codes and video explanations, finished in a custom vinyl wrap.' },
        { kicker: 'ADVERTISING · 30 GARAGES', name: 'Hartford HealthCare', where: 'Garages across Connecticut · since 2019',
          desc: 'Hartford HealthCare signed in 2019 to advertise across 30 Connecticut garages and has renewed for five more years.', stat: '$1.5M+', statLbl: 'VALUE CREATED FOR OUR PARKING PARTNERS', hi: true }
      ].map(function (f) { return { kicker: f.kicker, name: f.name, where: f.where, desc: f.desc, stat: f.stat || '', statLbl: f.statLbl || '',
        bg: f.hi ? '#FBAE4F' : 'rgba(255,255,255,0.06)', fg: f.hi ? '#0B1220' : '#FFFFFF', mute: f.hi ? '#3A2A10' : '#C9D0DB', accent: f.hi ? '#0B1220' : '#FBAE4F', line: f.hi ? 'rgba(11,18,32,0.2)' : 'rgba(255,255,255,0.14)' }; }),
      sent: !!st.sent,
      notSent: !st.sent,
      submit: function (e) { if (e && e.preventDefault) e.preventDefault(); sendInquiry(e, 'property', null); self.setState({ sent: true }); }
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="owners" />
        {/* HERO */}
        <div style={{ background: "#05080F" }}>
          <section className="alm-hero" data-scrub="exit" style={{ position: "relative", minHeight: "800px", background: "#0B1220", color: "#FFFFFF", overflow: "hidden" }}>
            <video className="alm-hero-media" ref={v.vidRef} src="/media/video/garage-level.mp4?v=a3bbeb94" poster="/media/video/garage-level-poster.webp?v=6ffae7a4" autoPlay muted loop playsInline preload="auto" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 50%" }} />
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(11,18,32,0.92) 0%, rgba(11,18,32,0.7) 45%, rgba(11,18,32,0.2) 100%)" }} />
            <div className="alm-hero-copy" style={{ position: "relative", maxWidth: "1360px", minHeight: "800px", margin: "0 auto", padding: "0 28px 72px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", fontWeight: "800", letterSpacing: "0.18em" }}><span style={{ width: "10px", height: "10px", background: "#FBAE4F" }} />FOR GARAGE &amp; LOT OWNERS</div>
              <h1 className="alm-rise" style={{ margin: "22px 0 0", maxWidth: "1000px", fontSize: "clamp(48px, 7.6vw, 120px)", lineHeight: "0.88", letterSpacing: "-0.02em", fontWeight: "900", textTransform: "uppercase", animationDelay: ".1s" }}>More revenue from <span style={{ color: "#FBAE4F" }}>every space.</span></h1>
              <p className="alm-rise" style={{ margin: "28px 0 0", maxWidth: "600px", fontSize: "19px", lineHeight: "1.55", fontWeight: "500", color: "#E4E8EF", animationDelay: ".2s" }}>Join a network of 12,000 locations. We install our equipment, sell the advertising, book your space for events and send you a share of the gross — at no risk to you.</p>
              <div className="alm-rise" style={{ marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap", animationDelay: ".3s" }}>
                <A className="alm-btn" href="#assess" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 28px", borderRadius: "8px", background: "#FBAE4F", color: "#0B1220", fontWeight: "800", fontSize: "14px", letterSpacing: "0.08em" }}>GET YOUR PROPERTY ASSESSED</A>
                <A className="alm-btn" href="#ddrb" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 28px", borderRadius: "8px", border: "2px solid #FFFFFF", color: "#FFFFFF", fontWeight: "800", fontSize: "14px", letterSpacing: "0.08em" }}>SEE THE RATE BOARD</A>
              </div>
              <div className="alm-rise" style={{ marginTop: "56px", display: "flex", flexWrap: "wrap", gap: "32px 56px", animationDelay: ".4s" }}>
                <div>
                  <div style={{ fontSize: "44px", fontWeight: "900", lineHeight: "1" }}>12,000</div>
                  <div style={{ marginTop: "6px", fontSize: "12px", fontWeight: "800", letterSpacing: "0.14em", color: "#C9D0DB" }}>LOCATIONS IN THE NETWORK</div>
                </div>
                <div>
                  <div style={{ fontSize: "44px", fontWeight: "900", lineHeight: "1" }}>NO RISK</div>
                  <div style={{ marginTop: "6px", fontSize: "12px", fontWeight: "800", letterSpacing: "0.14em", color: "#C9D0DB" }}>WE INSTALL &amp; WE SELL</div>
                </div>
                <div>
                  <div style={{ fontSize: "44px", fontWeight: "900", lineHeight: "1" }}>3</div>
                  <div style={{ marginTop: "6px", fontSize: "12px", fontWeight: "800", letterSpacing: "0.14em", color: "#C9D0DB" }}>NEW REVENUE STREAMS</div>
                </div>
              </div>
              <div style={{ position: "absolute", right: "28px", bottom: "24px", fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)" }}>STOCK FOOTAGE · ILLUSTRATIVE</div>
            </div>
          </section>
        </div>
        {/* HOW IT WORKS */}
        <section style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>You authorize.<br />We do the rest.</h2>
              <p style={{ margin: "0", maxWidth: "420px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>One agreement turns unused walls, gates and entrances into a revenue line — without adding work for your team.</p>
            </div>
            <ol style={{ margin: "64px 0 0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "48px 32px" }}>
              <li style={{ borderTop: "3px solid #0B1220", paddingTop: "24px" }}>
                <div style={{ fontSize: "64px", fontWeight: "600", lineHeight: "1", color: "#FBAE4F", letterSpacing: "-0.035em" }}>01</div>
                <div style={{ marginTop: "20px", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Authorize</div>
                <p style={{ margin: "10px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Give us the right to sell advertising at your location and install our equipment.</p>
              </li>
              <li style={{ borderTop: "3px solid #0B1220", paddingTop: "24px" }}>
                <div style={{ fontSize: "64px", fontWeight: "600", lineHeight: "1", color: "#FBAE4F", letterSpacing: "-0.035em" }}>02</div>
                <div style={{ marginTop: "20px", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>We install</div>
                <p style={{ margin: "10px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>High-bright, weatherproof rate boards that integrate with your current equipment vendor — including LAZ and Flash.</p>
              </li>
              <li style={{ borderTop: "3px solid #0B1220", paddingTop: "24px" }}>
                <div style={{ fontSize: "64px", fontWeight: "600", lineHeight: "1", color: "#FBAE4F", letterSpacing: "-0.035em" }}>03</div>
                <div style={{ marginTop: "20px", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>We sell</div>
                <p style={{ margin: "10px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Our in-house ad sales team finds the advertisers. Open slots can also be offered on programmatic exchanges.</p>
              </li>
              <li style={{ borderTop: "3px solid #0B1220", paddingTop: "24px" }}>
                <div style={{ fontSize: "64px", fontWeight: "600", lineHeight: "1", color: "#FBAE4F", letterSpacing: "-0.035em" }}>04</div>
                <div style={{ marginTop: "20px", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>You get paid</div>
                <p style={{ margin: "10px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>A check in the mail for a percentage of the gross advertising revenue, shared quarterly.</p>
              </li>
            </ol>
          </div>
        </section>
        {/* DDRB + SIMULATOR */}
        <section id="ddrb" style={{ padding: "128px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Digital Dynamic Rate Board™</div>
            <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "1000px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Price every space <span style={{ color: "#FBAE4F" }}>like it’s worth.</span></h2>
            <div style={{ marginTop: "56px", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "stretch" }}>
              <div style={{ flex: "1 1 480px", minWidth: "0" }}>
                <div style={{ borderRadius: "18px", overflow: "hidden" }}>
                  <LiveBoard />
                </div>
              </div>
              <div style={{ flex: "1 1 460px", display: "flex", flexDirection: "column", gap: "28px" }}>
                <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>Our proprietary system raises rates when demand is high and can lower them when it’s quiet — by time, occupancy, special events and more. Change rates across every location from your phone.</p>
                <div style={{ padding: "32px", borderRadius: "18px", background: "#FFFFFF", color: "#0B1220" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em" }}>TRY IT · PRICING SIMULATOR</div>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: "#4E586A" }}>ILLUSTRATIVE</div>
                  </div>
                  <label htmlFor="alm-base" style={{ marginTop: "24px", display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>YOUR BASE DAILY RATE <span style={{ fontSize: "16px", letterSpacing: "0" }}>${v.sim?.base}</span></label>
                  {' '}
                  <input id="alm-base" type="range" min="10" max="60" step="1" value={v.sim?.base} onInput={v.sim?.setBase} onChange={v.sim?.setBase} style={{ width: "100%", marginTop: "10px" }} />
                  {' '}
                  <label htmlFor="alm-occ" style={{ marginTop: "18px", display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>OCCUPANCY <span style={{ fontSize: "16px", letterSpacing: "0" }}>{v.sim?.occ}%</span></label>
                  {' '}
                  <input id="alm-occ" type="range" min="10" max="100" step="5" value={v.sim?.occ} onInput={v.sim?.setOcc} onChange={v.sim?.setOcc} style={{ width: "100%", marginTop: "10px" }} />
                  {' '}
                  <button type="button" role="switch" aria-checked={v.sim?.eventOn} onClick={v.sim?.toggleEvent} style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "12px", padding: "0", border: "0", background: "transparent", fontFamily: "'Montserrat', sans-serif", fontSize: "14px", fontWeight: "600", color: "#0B1220", cursor: "pointer" }}><span style={{ width: "52px", height: "30px", borderRadius: "999px", background: v.sim?.trackBg, position: "relative", transition: "background .25s" }}><span style={{ position: "absolute", top: "3px", left: `${v.sim?.knob}px`, width: "24px", height: "24px", borderRadius: "50%", background: "#FFFFFF", boxShadow: "0 2px 6px rgba(0,0,0,0.25)", transition: "left .25s" }} /></span> Event nearby tonight</button>
                  <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "2px solid #0B1220", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>BOARD SHOWS</div>
                      <div style={{ fontSize: "56px", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>${v.sim?.rate}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>VS. STATIC SIGN</div>
                      <div style={{ fontSize: "24px", fontWeight: "650", color: v.sim?.deltaColor, letterSpacing: "-0.02em" }}>{v.sim?.delta}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "14px", fontSize: "12px", lineHeight: "1.5", fontWeight: "500", color: "#4E586A" }}>Sample demand curve for illustration only. You set the pricing rules for your property.</div>
                </div>
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px 24px", fontSize: "15px", fontWeight: "700" }}>
                  <li style={{ display: "flex", gap: "10px", alignItems: "center" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Weatherproof</li>
                  <li style={{ display: "flex", gap: "10px", alignItems: "center" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Fits existing equipment</li>
                  <li style={{ display: "flex", gap: "10px", alignItems: "center" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Fully customizable</li>
                  <li style={{ display: "flex", gap: "10px", alignItems: "center" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Wayfinder &amp; directory</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* DDRB LINEUP */}
        <section id="lineup" style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />The rate board family</div>
                <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Four configurations.<br />One for every garage.</h2>
              </div>
              <p style={{ margin: "0", maxWidth: "440px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Integrated with LAZ and Flash parking rate portals, or running on its own. Every board can be customized — background, top bar, garage name, font color and a custom vinyl wrap.</p>
            </div>
            <div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              {(v.configs || []).map((c, cI) => (
                <Fragment key={cI}>
                  <div className="alm-in" style={{ padding: "32px 28px", borderRadius: "16px", background: c.bg, color: c.fg, display: "flex", flexDirection: "column", gap: "14px", minHeight: "280px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", color: c.mute }}>OPTION {c.no}</span>
                      <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", padding: "6px 10px", borderRadius: "999px", background: c.chipBg, color: "#0B1220" }}>{c.chip}</span>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{c.name}</div>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: c.mute }}>{c.desc}</p>
                  </div>
                </Fragment>
              ))}
            </div>
            <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", flex: "1 1 300px", height: "560px", position: "relative", overflow: "hidden", borderRadius: "16px", background: "#0B1220" }}>
                <img src="/media/photos/ddrb-rate-board.webp?v=088e4141" alt="A Lot Media Digital Dynamic Rate Board showing LAZ parking rates at a Connecticut garage" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 35%", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "16px", bottom: "16px", padding: "8px 14px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em" }}>DDRB + MESSAGING · CONNECTICUT</figcaption>
              </figure>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", flex: "2 1 600px", height: "560px", position: "relative", overflow: "hidden", borderRadius: "16px", background: "#0B1220" }}>
                <img src="/media/photos/mt-bank-ddrb.webp?v=9afe12a0" alt={"Digital Dynamic Rate Board with live rates and an M&T Bank ad beside a garage entry gate"} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 50%", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "16px", bottom: "16px", padding: "8px 14px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em" }}>LIVE RATES ABOVE · M&amp;T BANK AD BELOW</figcaption>
              </figure>
            </div>
            <div style={{ marginTop: "72px", display: "flex", flexWrap: "wrap", gap: "48px 64px", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 520px", minWidth: "0" }}>
                <h3 className="alm-in" style={{ margin: "0", fontSize: "clamp(28px, 3vw, 44px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>The hardware lineup.</h3>
                <p style={{ margin: "16px 0 0", maxWidth: "560px", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Semi-outdoor units for covered areas; full-outdoor units for uncovered surface lots, built to take up to two hours of peak direct sun and extreme weather.</p>
                <div style={{ marginTop: "28px", overflowX: "auto" }}>
                  <table style={{ width: "100%", minWidth: "480px", borderCollapse: "collapse", fontSize: "15px" }}>
                    <thead>
                      <tr style={{ textAlign: "left", borderBottom: "3px solid #0B1220" }}>
                        <th scope="col" style={{ padding: "14px 12px 14px 0", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>UNIT</th>
                        <th scope="col" style={{ padding: "14px 12px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>SCREEN</th>
                        <th scope="col" style={{ padding: "14px 12px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>ENVIRONMENT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(v.hardware || []).map((h, hI) => (
                        <Fragment key={hI}>
                          <tr style={{ borderBottom: "1px solid rgba(11,18,32,0.12)" }}>
                            <th scope="row" style={{ padding: "16px 12px 16px 0", textAlign: "left", fontWeight: "700" }}>{h.name}</th>
                            <td style={{ padding: "16px 12px", fontWeight: "600" }}>{h.screen}</td>
                            <td style={{ padding: "16px 12px", fontWeight: "500", color: "#4E586A" }}>{h.env}</td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="alm-in" style={{ flex: "1 1 380px", minWidth: "0", padding: "36px", borderRadius: "18px", background: "#0B1220", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8FDCE8" }}>SOFTWARE</div>
                <div style={{ fontSize: "clamp(28px, 2.6vw, 40px)", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>Device Hub</div>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>Our content and device management system. Every plan includes software updates, remote management and multi-factor security. Higher tiers add active network monitoring, asset creation and faster support.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }}>
                  {(v.tiers || []).map((t, tI) => (
                    <Fragment key={tI}>
                      <div style={{ padding: "14px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div style={{ fontSize: "16px", fontWeight: "700" }}>{t.name}</div>
                        <div style={{ marginTop: "4px", fontSize: "13px", lineHeight: "1.45", color: "#A3ACBC" }}>{t.note}</div>
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {(v.features || []).map((f, fI) => (
                    <Fragment key={fI}>
                      <span style={{ padding: "7px 12px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.24)", fontSize: "12px", fontWeight: "700" }}>{f.t}</span>
                    </Fragment>
                  ))}
                </div>
                <A className="alm-btn" href="#assess" style={{ marginTop: "6px", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 24px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px" }}>Ask about pricing</A>
              </div>
            </div>
          </div>
        </section>
        {/* IN THE FIELD */}
        <section id="field" style={{ padding: "128px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />In the field</div>
            <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "980px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Owners and operators<br /><span style={{ color: "#FBAE4F" }}>already on board.</span></h2>
            <div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {(v.field || []).map((f, fI) => (
                <Fragment key={fI}>
                  <article className="alm-in" style={{ padding: "32px 28px", borderRadius: "16px", background: f.bg, color: f.fg, display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", color: f.accent }}>{f.kicker}</div>
                    <div style={{ fontSize: "26px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{f.name}</div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: f.mute }}>{f.where}</div>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: f.mute }}>{f.desc}</p>
                    {f.stat ? (
                      <>
                        <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: `1px solid ${f.line}` }}>
                          <div style={{ fontSize: "36px", fontWeight: "650", letterSpacing: "-0.02em", color: f.accent }}>{f.stat}</div>
                          <div style={{ marginTop: "4px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", color: f.mute }}>{f.statLbl}</div>
                        </div>
                      </>
                    ) : null}
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* THREE STREAMS */}
        <section id="streams" style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <h2 className="alm-in" style={{ margin: "0", maxWidth: "1000px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Three new revenue streams from the same space.</h2>
            <div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
              <div className="alm-tile alm-in" style={{ borderRadius: "16px", overflow: "hidden", background: "#FFFFFF" }}>
                <div style={{ height: "320px", overflow: "hidden" }}>
                  <img src="/media/photos/ddrb-connecticut.webp?v=088e4141" alt="A Lot Media Digital Dynamic Rate Board installed in Connecticut" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 34%", display: "block" }} loading="lazy" decoding="async" />
                </div>
                <div style={{ padding: "36px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8A5300" }}>STREAM 01</div>
                  <div style={{ marginTop: "12px", fontSize: "30px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>More from every customer</div>
                  <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Demand-based pricing captures what each space is worth at that moment — busy weekdays, game nights, holiday weekends.</p>
                </div>
              </div>
              <div className="alm-tile alm-in" style={{ borderRadius: "16px", overflow: "hidden", background: "#FFFFFF" }}>
                <div style={{ height: "320px", overflow: "hidden" }}>
                  <img src="/media/photos/hartford-healthcare-entrance-wallscape.webp?v=04dc2f7b" alt="Hartford HealthCare wallscape above a garage entrance" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                </div>
                <div style={{ padding: "36px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8A5300" }}>STREAM 02</div>
                  <div style={{ marginTop: "12px", fontSize: "30px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>A new advertising line</div>
                  <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Screens, walls, gate arms and elevators sold to national and local brands — you receive a percentage of the gross.</p>
                </div>
              </div>
              <div className="alm-tile alm-in" style={{ position: "relative", borderRadius: "16px", overflow: "hidden", background: "#0B1220", color: "#FFFFFF", boxShadow: "inset 0 0 0 3px #FBAE4F" }}>
                <div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
                  <img src="/media/photos/stock-car-event.webp?v=d303b124" alt="Crowd filming a car at a live automotive event at night (stock photo)" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% 50%", display: "block" }} loading="lazy" decoding="async" />
                  <span style={{ position: "absolute", top: "14px", left: "14px", padding: "6px 11px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em" }}>NEW</span>
                  <span style={{ position: "absolute", right: "12px", bottom: "12px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)" }}>STOCK PHOTO</span>
                </div>
                <div style={{ padding: "36px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#FBAE4F" }}>STREAM 03</div>
                  <div style={{ marginTop: "12px", fontSize: "30px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Your space as a venue</div>
                  <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>Lots, garages and quiet levels booked for brand activations, VIP parking and shuttles, and game-day takeovers — off-peak space turned into event revenue. <A href="/events" style={{ color: "#FBAE4F", fontWeight: "600" }}>How events work →</A></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* PROPERTY TYPES */}
        <section style={{ padding: "0 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", maxWidth: "900px", fontSize: "clamp(32px, 4vw, 56px)", lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "600" }}>Built for every kind of property.</h2>
            </div>
            <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              <div className="alm-tile alm-in" style={{ position: "relative", height: "300px", borderRadius: "16px", overflow: "hidden", background: "#0B1220", color: "#FFFFFF" }}>
                <img src="/media/photos/checkerboard-lobby-panel.webp?v=18fa5976" alt="Garage lobby with checkerboard floor and a digital panel" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" decoding="async" />
                <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(11,18,32,0) 40%, rgba(11,18,32,0.88) 100%)" }} />
                <div style={{ position: "absolute", left: "22px", bottom: "20px", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Class A offices</div>
              </div>
              <div className="alm-tile alm-in" style={{ position: "relative", height: "300px", borderRadius: "16px", overflow: "hidden", background: "#0B1220", color: "#FFFFFF" }}>
                <img src="/media/photos/glass-lobby-panel.webp?v=6d8d0735" alt="Glass-walled garage lobby with a digital panel" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" decoding="async" />
                <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(11,18,32,0) 40%, rgba(11,18,32,0.88) 100%)" }} />
                <div style={{ position: "absolute", left: "22px", bottom: "20px", fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Residential buildings</div>
              </div>
              <div style={{ height: "300px", borderRadius: "16px", background: "#344567", color: "#FFFFFF", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FBAE4F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" />
                </svg>
                <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Shopping malls</div>
              </div>
              <div style={{ height: "300px", borderRadius: "16px", background: "#0B1220", color: "#FFFFFF", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FBAE4F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V5H3v4Z" />
                  <path d="M14 5v12" />
                </svg>
                <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Theaters, museums &amp; restaurants</div>
              </div>
              <div style={{ height: "300px", borderRadius: "16px", background: "#0B1220", color: "#FFFFFF", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FBAE4F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9l10-5 10 5-10 5L2 9Z" />
                  <path d="M6 11v5c3 2 9 2 12 0v-5" />
                </svg>
                <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Universities</div>
              </div>
              <div style={{ height: "300px", borderRadius: "16px", background: "#FBAE4F", color: "#0B1220", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M7 15V9h4a2 2 0 0 1 0 4H7" />
                </svg>
                <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>Stand-alone lots &amp; garages</div>
              </div>
            </div>
          </div>
        </section>
        {/* RESPONSIBILITIES */}
        <section style={{ padding: "128px 28px", background: "#344567", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <h2 className="alm-in" style={{ margin: "0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Who does what.</h2>
            <div style={{ marginTop: "56px", overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "720px", borderCollapse: "collapse", fontSize: "16px" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "3px solid #FBAE4F" }}>
                    <th scope="col" style={{ padding: "16px 12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em" }}>RESPONSIBILITY</th>
                    <th scope="col" style={{ padding: "16px 12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em" }}>YOU</th>
                    <th scope="col" style={{ padding: "16px 12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#FBAE4F" }}>A LOT MEDIA</th>
                  </tr>
                </thead>
                <tbody>
                  {(v.duties || []).map((d, dI) => (
                    <Fragment key={dI}>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.16)" }}>
                        <th scope="row" style={{ padding: "18px 12px", textAlign: "left", fontWeight: "700" }}>{d.label}</th>
                        <td style={{ padding: "18px 12px", fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>{d.you}</td>
                        <td style={{ padding: "18px 12px", fontSize: "20px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>{d.alm}</td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "48px 64px" }}>
            <h2 className="alm-in" style={{ flex: "1 1 360px", margin: "0", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Owner questions.</h2>
            <div style={{ flex: "2 1 560px", borderTop: "3px solid #0B1220" }}>
              {(v.faqs || []).map((q, qI) => (
                <Fragment key={qI}>
                  <div style={{ borderBottom: "1px solid rgba(11,18,32,0.14)" }}>
                    <button type="button" aria-expanded={q.expanded} onClick={q.toggle} style={{ width: "100%", minHeight: "76px", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", border: "0", background: "transparent", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontSize: "19px", fontWeight: "600", textAlign: "left", cursor: "pointer" }}>
                      <span>{q.q}</span>
                      <span style={{ flex: "0 0 auto", width: "36px", height: "36px", borderRadius: "50%", border: "2px solid #0B1220", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>{q.sign}</span>
                    </button>
                    {q.open ? (
                      <>
                        <p style={{ margin: "0", padding: "0 60px 24px 0", fontSize: "16px", lineHeight: "1.65", fontWeight: "400", color: "#4E586A" }}>{q.a}</p>
                      </>
                    ) : null}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* ASSESSMENT */}
        <section id="assess" style={{ padding: "128px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "64px" }}>
            <div style={{ flex: "1 1 380px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Free assessment</div>
              <h2 className="alm-in" style={{ margin: "22px 0 0", fontSize: "clamp(38px, 5vw, 72px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>What could your property earn?</h2>
              <p style={{ margin: "24px 0 0", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>Tell us about the location. We’ll come back with the placements it supports and what it could add to your bottom line.</p>
            </div>
            <div style={{ flex: "999 1 560px", minWidth: "0", padding: "40px", borderRadius: "18px", background: "#FFFFFF", color: "#0B1220" }}>
              {v.sent ? (
                <>
                  <div style={{ minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#FBAE4F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: "650", letterSpacing: "-0.02em" }}>Thanks — we’re on it.</div>
                    <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Our real estate team will review the location and follow up.</p>
                  </div>
                </>
              ) : null}
              {v.notSent ? (
                <>
                  <form onSubmit={v.submit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "18px 20px" }}>
                    <label style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Property address<input className="alm-input" type="text" placeholder="Street, city, state" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="property_address" /></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Property type<select className="alm-input" style={{ minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="property_type"><option>Parking garage</option><option>Surface lot</option><option>Office building garage</option><option>Mall or retail</option><option>Hotel</option><option>Arena or venue</option><option>Residential</option><option>University</option></select></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Number of spaces<input className="alm-input" type="number" min="0" placeholder="e.g. 450" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="number_of_spaces" /></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Your name<input className="alm-input" type="text" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="your_name" /></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Email<input className="alm-input" type="email" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="email" /></label>
                    <button type="submit" className="alm-btn" style={{ gridColumn: "1 / -1", minHeight: "58px", borderRadius: "999px", border: "0", background: "#FBAE4F", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Request my assessment</button>
                  </form>
                </>
              ) : null}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
