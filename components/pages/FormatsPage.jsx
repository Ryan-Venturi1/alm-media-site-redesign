'use client';

// Ported from the design-canvas artboard Formats.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import { playWhenVisible } from '@/lib/video';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import LiveBoard from '@/components/LiveBoard';
import Nav from '@/components/Nav';

export default class FormatsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderVals() {
    var B = '';
    var data = [
      { kind: 'wallscape', short: 'WALLSCAPES', name: 'Wallscapes', type: 'STATIC', stage: '02 · PARK', stageName: 'Park', best: 'Launches, brand statements, scale',
        img: '/media/photos/hartford-healthcare-entrance-wallscape.webp?v=04dc2f7b', pos: '50% 40%', alt: 'Hartford HealthCare wallscape above a garage entrance', caption: 'HARTFORD HEALTHCARE · WALLSCAPE',
        desc: 'Large-format creative on the walls drivers face while they find a space. Designed, printed and installed for you — from a single wall to every level.',
        specs: [['MARKETS', 'CT · LA · Chicago · Miami · Austin · Boston'], ['SIZE', 'Custom to each wall'], ['SCALE', 'One wall to every level'], ['PRODUCTION', 'Design, print & install']],
        cta: 'Add to plan', ctaHref: '/plan', ss: 'REQUEST ONLINE' },
      { kind: 'elevator', short: 'ELEVATOR WRAPS', name: 'Elevator wraps', type: 'STATIC', stage: '03 · WALK', stageName: 'Walk', best: 'Health, finance, local offers',
        img: '/media/photos/hartford-healthcare-elevator-wraps.webp?v=20725f9d', pos: '50% 50%', alt: 'Hartford HealthCare LifeStar elevator door wraps', caption: 'HARTFORD HEALTHCARE · ELEVATOR WRAPS',
        desc: 'Branded elevator doors at the pause between the car and the destination. A captive moment, every single ride.',
        specs: [['MARKETS', 'CT · LA · Chicago · Miami · Austin · Boston'], ['SIZE', 'Custom to each elevator bank'], ['ON THE NETWORK', 'Hartford HealthCare · Getaround'], ['PRODUCTION', 'Design, print & install']],
        cta: 'Add to plan', ctaHref: '/plan', ss: 'REQUEST ONLINE' },
      { kind: 'gatearm', short: 'GATE ARMS', name: 'Gate arm wraps', type: 'STATIC', stage: '01 · ARRIVE', stageName: 'Arrive', best: 'Frequency, directional calls to action',
        img: '/media/renders/gate-arm-wrap.webp?v=1dedea94', pos: '50% 50%', alt: 'Concept render of a branded orange and navy gate arm at a garage entry lane at night', caption: 'GATE ARM WRAP · CONCEPT RENDER',
        desc: 'The first thing every driver sees on the way in and the last on the way out. Gate arms rise for every car — eye level, twice per visit.',
        specs: [['MARKETS', 'CT · LA · Chicago · Miami · Austin · Boston'], ['PLACEMENT', 'Entry & exit lanes'], ['PAIRS WITH', 'Branded tickets'], ['PRODUCTION', 'Design, print & install']],
        cta: 'Add to plan', ctaHref: '/plan', ss: 'REQUEST ONLINE' },
      { kind: 'ticket', short: 'TICKETS', name: 'Branded parking tickets', type: 'STATIC', stage: '01 · ARRIVE', stageName: 'Arrive', best: 'Coupons, nearby retail, QSR',
        img: '/media/renders/branded-ticket.webp?v=6c7f672f', pos: '62% 50%', alt: 'Concept render of a driver taking a branded parking ticket from an entry machine', caption: 'BRANDED TICKET · CONCEPT RENDER',
        desc: 'A brand message in every driver’s hand, kept in the car until they leave. Ideal for a redeemable offer at a store steps away.',
        specs: [['MARKETS', 'Network-wide'], ['PLACEMENT', 'Entry ticket machines'], ['BEST WITH', 'An offer at a store steps away'], ['PAIRS WITH', 'Gate arms & garage takeovers']],
        cta: 'Add to plan', ctaHref: '/plan', ss: 'REQUEST ONLINE' },
      { kind: 'ddrb', short: 'RATE BOARDS', name: 'Digital Dynamic Rate Board™', type: 'DIGITAL', stage: '02 · PARK', stageName: 'Park', best: 'Daypart & event messaging, always-on brand', live: true,
        desc: 'Our flagship. Real-time parking rates up top and full-motion video and audio below, in a high-bright, weatherproof unit that integrates with existing parking equipment. Rates and creative update across locations from a phone.',
        specs: [['MARKETS', 'New York · Connecticut'], ['SLOT LENGTH', 'Custom · unlimited creative updates'], ['CREATIVE', 'JPEG · PDF · MP4'], ['ALSO WORKS AS', 'Wayfinder · directory · photobooth']],
        cta: 'Add to plan', ctaHref: '/plan', ss: 'REQUEST ONLINE' },
      { kind: 'panel', short: 'DIGITAL PANELS', name: 'Interactive digital panels', type: 'DIGITAL', stage: '03 · WALK', stageName: 'Walk', best: 'Offers, launches, wayfinding',
        img: '/media/photos/blank-street-interactive-panel.webp?v=6f1265ae', pos: '30% 50%', alt: 'Man tapping his phone on a Blank Street interactive digital panel', caption: 'BLANK STREET · INTERACTIVE PANEL',
        desc: 'Touch screens on the walk from the car — tap for an offer, scan a QR code, or find the way to the store. We were the first company to bring interactive touch screen technology to parking facilities.',
        specs: [['MARKETS', 'New York · Connecticut'], ['INTERACTION', 'Touch · QR'], ['CREATIVE', 'JPEG · PDF · MP4'], ['ALSO WORKS AS', 'Wayfinder · help desk']],
        cta: 'Add to plan', ctaHref: '/plan', ss: 'REQUEST ONLINE' },
      { kind: 'event', short: 'EVENTS & VENUES', name: 'Events & venues', type: 'EVENTS', stage: '04 · ACTIVATE', stageName: 'Activate', best: 'Launches, VIP parking, game days',
        img: '/media/photos/stock-rooftop-tent.webp?v=b0f4fddd', pos: '50% 50%', alt: 'Guests under a lit canopy at an evening rooftop event (stock photo)', caption: 'ROOFTOP EVENT · STOCK PHOTO',
        desc: 'Our real estate, put to work: brand activations and pop-ups, VIP park-and-shuttle and bulk parking for big events, and game-day takeovers around the crowd.',
        specs: [['MODELS', 'Activations · VIP park & shuttle · game day'], ['VENUES', 'Lots · garages · rooftops'], ['PACKAGES', 'Small · full activation · takeover'], ['PAIRS WITH', 'Rate boards & wallscapes on site']],
        cta: 'Explore events & venues', ctaHref: '/events', ss: 'WITH OUR TEAM' }
    ];
    if (!this._vidRef) {
      this._vidRef = playWhenVisible;
    }
    return {
      vidRef: this._vidRef,
      formats: data.map(function (f, i) {
        var dark = i % 2 === 0;
        var digital = f.type === 'DIGITAL', live = f.type === 'EVENTS';
        var groups = { wallscape: ['static', '01', 'STATIC MEDIA', 'Designed, printed and installed for you — walls, doors, gates and tickets along the whole parking journey.', '#FFFFFF', '#0B1220'], ddrb: ['digital', '02', 'DIGITAL', 'Screens built with our sister companies MetroClick and faytech and run on our own CMS — live pricing, full-motion video and audio, updated from a phone.', '#8FDCE8', '#3FB6C8'], event: ['events', '03', 'EVENTS & VENUES', 'Our next growth engine: the real estate itself, booked for brand activations, VIP parking, festivals and game days.', '#FBAE4F', '#FBAE4F'] };
        var g = groups[f.kind];
        return {
          kind: f.kind, short: f.short, name: f.name, type: f.type, stage: f.stage, stageName: f.stageName, best: f.best, desc: f.desc,
          live: !!f.live, still: !f.live,
          groupStart: !!g, gid: g ? g[0] : '', gno: g ? g[1] : '', gName: g ? g[2] : '', gDesc: g ? g[3] : '', gDot: g ? g[4] : '', gNumColor: g ? g[5] : '', gTag: g ? 'BUSINESS ' + g[1] : '',
          img: f.img ? B + f.img : '', pos: f.pos || '50% 50%', alt: f.alt || '', caption: f.caption || '',
          specs: f.specs.map(function (s) { return { k: s[0], v: s[1].replace(/ · /g, '\u00A0· ') }; }),
          cta: f.cta, ctaHref: f.ctaHref,
          bg: dark ? '#0B1220' : '#F5F5F7',
          fg: dark ? '#FFFFFF' : '#0B1220',
          mute: dark ? '#A3ACBC' : '#4E586A',
          line: dark ? 'rgba(255,255,255,0.14)' : 'rgba(11,18,32,0.12)',
          dir: i % 2 === 0 ? 'row' : 'row-reverse',
          typeBg: digital ? '#8FDCE8' : (live ? '#FBAE4F' : (dark ? '#FFFFFF' : '#0B1220')),
          typeFg: digital || live ? '#0B1220' : (dark ? '#0B1220' : '#FFFFFF'),
          ss: f.ss,
          ssBg: f.ss === 'REQUEST ONLINE' ? '#FBAE4F' : '#E3E5EA',
          ssFg: '#0B1220'
        };
      })
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="formats" />
        {/* HERO */}
        <section className="alm-pt" style={{ padding: "104px 28px 72px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Formats &amp; specs · three businesses</div>
            <h1 className="alm-rise" style={{ margin: "22px 0 0", maxWidth: "1200px", fontSize: "clamp(44px, 7vw, 112px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600", animationDelay: ".1s" }}>Static. Digital.<br /><span style={{ color: "#8A5300" }}>Events.</span></h1>
            <div className="alm-rise" style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between", animationDelay: ".2s" }}>
              <p style={{ margin: "0", maxWidth: "600px", fontSize: "19px", lineHeight: "1.55", fontWeight: "400", color: "#4E586A" }}>Three businesses on one footprint: printed media on the walls, digital screens at the gate, and the space itself for events. Every placement is designed, installed and sold by us — buy one, or own the whole journey.</p>
              <nav className="m-fmt-chips" aria-label="Jump to a format" style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "640px" }}>
                {(v.formats || []).map((f, fI) => (
                  <Fragment key={fI}>
                    <A className="alm-chip m-fmt-chip" href={`#${f.kind}`} style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: "2px solid #0B1220", fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em" }}>{f.short}</A>
                  </Fragment>
                ))}
              </nav>
            </div>
          </div>
        </section>
        {/* CINEMATIC BAND */}
        <section className="alm-band" aria-label="Inside a parking structure" style={{ position: "relative", height: "560px", overflow: "hidden", background: "#05080F", color: "#FFFFFF" }}>
          <div className="alm-expand" data-scrub="enter" style={{ position: "absolute", inset: "0", overflow: "hidden" }}>
            <video className="alm-par" data-scrub="cover" ref={v.vidRef} src="/media/video/parking-deck.mp4?v=6e52b41f" poster="/media/video/parking-deck-poster.webp?v=3d37a326" muted loop playsInline preload="none" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
            <div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(5,8,15,0.88) 0%, rgba(5,8,15,0.55) 45%, rgba(5,8,15,0.15) 100%)" }} />
          </div>
          <div style={{ position: "relative", height: "100%", maxWidth: "1360px", margin: "0 auto", padding: "0 28px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", color: "#FBAE4F" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />The parking journey</div>
            <h2 className="alm-in" style={{ margin: "0", maxWidth: "900px", fontSize: "clamp(36px, 5.4vw, 84px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Every level<br />is inventory.</h2>
            <div className="m-fmt-journey" style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px", fontFamily: "'Geist Mono', monospace", fontSize: "13px", letterSpacing: "0.12em", color: "#C9D0DB" }}>
              <span>01 ARRIVE</span>
              <span className="m-fmt-arr" style={{ color: "#FBAE4F" }}>→</span>
              <span>02 PARK</span>
              <span className="m-fmt-arr" style={{ color: "#FBAE4F" }}>→</span>
              <span>03 WALK</span>
              <span className="m-fmt-arr" style={{ color: "#FBAE4F" }}>→</span>
              <span>04 ACTIVATE</span>
            </div>
          </div>
          <div style={{ position: "absolute", right: "20px", bottom: "18px", fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)" }}>STOCK FOOTAGE · ILLUSTRATIVE</div>
        </section>
        {/* FORMAT SECTIONS */}
        {(v.formats || []).map((f, fI) => (
          <Fragment key={fI}>
            {f.groupStart ? (
              <>
                <div className="m-fmt-gwrap" id={f.gid} style={{ padding: "88px 28px 56px", background: "#FFFFFF", borderTop: "1px solid rgba(11,18,32,0.08)" }}>
                  <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "20px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div className="m-fmt-ghead" style={{ display: "flex", alignItems: "baseline", gap: "22px" }}>
                      <span style={{ fontSize: "clamp(64px, 8vw, 128px)", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em", color: f.gNumColor }}>{f.gno}</span>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}><span style={{ width: "7px", height: "7px", background: f.gDot, outline: "1px solid rgba(11,18,32,0.25)", borderRadius: "50%" }} />{f.gTag}</div>
                        <div className="m-fmt-gname" style={{ marginTop: "10px", fontSize: "clamp(34px, 4.4vw, 68px)", fontWeight: "600", lineHeight: "1", letterSpacing: "-0.035em" }}>{f.gName}</div>
                      </div>
                    </div>
                    <p style={{ margin: "0", maxWidth: "460px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>{f.gDesc}</p>
                  </div>
                </div>
              </>
            ) : null}
            <section className="alm-pt alm-pb" id={f.kind} style={{ padding: "96px 28px", background: f.bg, color: f.fg }}>
              <div className="m-fmt-row" style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", flexDirection: f.dir, gap: "56px", alignItems: "center" }}>
                <div style={{ flex: "999 1 600px", minWidth: "0" }}>
                  {f.live ? (
                    <>
                      <div style={{ borderRadius: "18px", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.35)" }}>
                        <LiveBoard />
                      </div>
                    </>
                  ) : null}
                  {f.still ? (
                    <>
                      <figure className="alm-tile alm-wipe m-fmt-fig" style={{ margin: "0", position: "relative", height: "620px", borderRadius: "18px", overflow: "hidden", background: "#0B1220" }}>
                        <img src={f.img} alt={f.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos, display: "block" }} loading="lazy" decoding="async" />
                        <figcaption className="m-fmt-cap" style={{ position: "absolute", left: "16px", bottom: "16px", padding: "8px 14px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em" }}>{f.caption}</figcaption>
                      </figure>
                    </>
                  ) : null}
                </div>
                <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", padding: "7px 12px", borderRadius: "999px", background: f.typeBg, color: f.typeFg }}>{f.type}</span>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", letterSpacing: "0.14em", color: f.mute }}>{f.stage}</span>
                  </div>
                  <h2 className="alm-in" style={{ margin: "0", fontSize: "clamp(34px, 4vw, 60px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>{f.name}</h2>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", fontWeight: "400", color: f.mute }}>{f.desc}</p>
                  <dl style={{ margin: "8px 0 0", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.5fr)", borderTop: `2px solid ${f.fg}` }}>
                    {(f.specs || []).map((s, sI) => (
                      <Fragment key={sI}>
                        <dt style={{ padding: "14px 0", borderBottom: `1px solid ${f.line}`, fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", color: f.mute }}>{s.k}</dt>
                        <dd style={{ margin: "0", padding: "14px 0", borderBottom: `1px solid ${f.line}`, fontSize: "15px", fontWeight: "700" }}>{s.v}</dd>
                      </Fragment>
                    ))}
                  </dl>
                  <div className="m-fmt-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
                    <A className="alm-btn" href={f.ctaHref} style={{ display: "inline-flex", alignItems: "center", minHeight: "54px", padding: "0 26px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>{f.cta}</A>
                    <A className="alm-btn" href="/contact" style={{ display: "inline-flex", alignItems: "center", minHeight: "54px", padding: "0 26px", borderRadius: "999px", border: `2px solid ${f.fg}`, fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Ask about specs</A>
                  </div>
                </div>
              </div>
            </section>
          </Fragment>
        ))}
        {/* COMPARISON */}
        <section className="alm-pt alm-pb" style={{ padding: "120px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Compare every format.</h2>
              <A className="alm-btn" href="/plan" style={{ display: "inline-flex", alignItems: "center", minHeight: "54px", padding: "0 26px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Build a plan</A>
            </div>
            <div className="m-fmt-table" style={{ marginTop: "48px", overflowX: "auto", borderTop: "3px solid #0B1220" }}>
              <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse", fontSize: "15px" }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th scope="col" style={{ padding: "18px 16px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>FORMAT</th>
                    <th scope="col" style={{ padding: "18px 16px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>TYPE</th>
                    <th scope="col" style={{ padding: "18px 16px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>JOURNEY STAGE</th>
                    <th scope="col" style={{ padding: "18px 16px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>BEST FOR</th>
                    <th scope="col" style={{ padding: "18px 16px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>BOOKING</th>
                  </tr>
                </thead>
                <tbody>
                  {(v.formats || []).map((f, fI) => (
                    <Fragment key={fI}>
                      <tr className="alm-trow" style={{ borderTop: "1px solid rgba(11,18,32,0.12)" }}>
                        <th scope="row" style={{ padding: "20px 16px", textAlign: "left", fontWeight: "700", fontSize: "15px" }}>
                          <A href={`#${f.kind}`}>{f.name}</A>
                        </th>
                        <td style={{ padding: "20px 16px", fontWeight: "600" }}>{f.type}</td>
                        <td style={{ padding: "20px 16px", fontWeight: "600" }}>{f.stageName}</td>
                        <td style={{ padding: "20px 16px", fontWeight: "500", color: "#4E586A" }}>{f.best}</td>
                        <td style={{ padding: "20px 16px" }}>
                          <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", padding: "6px 10px", borderRadius: "999px", background: f.ssBg, color: f.ssFg }}>{f.ss}</span>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                  <tr className="alm-trow" style={{ borderTop: "1px solid rgba(11,18,32,0.12)", borderBottom: "1px solid rgba(11,18,32,0.12)" }}>
                    <th scope="row" style={{ padding: "20px 16px", textAlign: "left", fontWeight: "700", fontSize: "15px" }}>Garage takeover</th>
                    <td style={{ padding: "20px 16px", fontWeight: "600" }}>Static + digital</td>
                    <td style={{ padding: "20px 16px", fontWeight: "600" }}>Whole journey</td>
                    <td style={{ padding: "20px 16px", fontWeight: "500", color: "#4E586A" }}>Launches, market domination</td>
                    <td style={{ padding: "20px 16px" }}>
                      <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", padding: "6px 10px", borderRadius: "999px", background: "#E3E5EA", color: "#0B1220" }}>WITH OUR TEAM</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="m-fmt-clist" style={{ display: "none" }}>
              {(v.formats || []).map((f, fI) => (
                <Fragment key={fI}>
                  <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(11,18,32,0.12)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                      <A href={`#${f.kind}`} style={{ display: "inline-block", padding: "11px 0", margin: "-11px 0", fontSize: "17px", fontWeight: "700", lineHeight: "1.3", letterSpacing: "-0.01em" }}>{f.name}</A>
                      <span style={{ flex: "none", marginTop: "1px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", padding: "6px 10px", borderRadius: "999px", background: f.ssBg, color: f.ssFg }}>{f.ss}</span>
                    </div>
                    <div style={{ marginTop: "8px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0B1220" }}>{f.type} <span style={{ color: "#8B95A7" }}>·</span> {f.stageName}</div>
                    <div style={{ marginTop: "6px", fontSize: "15px", lineHeight: "1.5", fontWeight: "500", color: "#4E586A" }}>{f.best}</div>
                  </div>
                </Fragment>
              ))}
              <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(11,18,32,0.12)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "700", lineHeight: "1.3", letterSpacing: "-0.01em" }}>Garage takeover</span>
                  <span style={{ flex: "none", marginTop: "1px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", padding: "6px 10px", borderRadius: "999px", background: "#E3E5EA", color: "#0B1220" }}>WITH OUR TEAM</span>
                </div>
                <div style={{ marginTop: "8px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0B1220" }}>Static + digital <span style={{ color: "#8B95A7" }}>·</span> Whole journey</div>
                <div style={{ marginTop: "6px", fontSize: "15px", lineHeight: "1.5", fontWeight: "500", color: "#4E586A" }}>Launches, market domination</div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
