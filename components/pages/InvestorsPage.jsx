'use client';

// Ported from the design-canvas artboard Investors.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import { playWhenVisible } from '@/lib/video';
import { sendInquiry } from '@/lib/inquiry';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

export default class InvestorsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var self = this;
    this.setState({ w: 0 });
    this.timer = setInterval(function () {
      var cur = (self.state && self.state.w) || 0;
      self.setState({ w: (cur + 1) % 4 });
    }, 1800);
  }
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }
  renderVals() {
    var self = this;
    var st = this.state || {};
    var B = '';
    var wi = st.w || 0;
    var steps = [
      ['More locations', 'Owners join for pricing and revenue share'],
      ['More inventory', 'Screens, walls and gates across markets'],
      ['More advertisers', 'National and local brands buy the reach'],
      ['More owner revenue', 'Payouts bring the next owner in']
    ];
    var logos = [['Chase', '/media/logos/chase.png?v=36175c78'], ['Clorox', '/media/logos/clorox.png?v=94b22c30'], ['McCormick', '/media/logos/mccormick.png?v=6482d04f'], ['Citibank', '/media/logos/citibank.png?v=4e895247'], ['Anheuser-Busch', '/media/logos/anheuser-busch.png?v=46d09486'], ['Allstate', '/media/logos/allstate.png?v=ddd0329f'], ['Panera Bread', '/media/logos/panera.png?v=5633a8b9'], ['General Mills', '/media/logos/general-mills.png?v=20a2b94e'], ['New York Yankees', '/media/logos/yankees.png?v=1860f7ef'], ['Hartford HealthCare', '/media/logos/hartford-healthcare.png?v=d63767e1'], ['Live Nation', '/media/logos/live-nation.png?v=0184e138'], ['Rimowa', '/media/logos/rimowa.png?v=8a9dad9f'], ['Bumble', '/media/logos/bumble.png?v=70070fb5'], ['FILA', '/media/logos/fila.png?v=eaa1cdc1'], ['Getaround', '/media/logos/getaround.png?v=214c8213'], ['Blank Street', '/media/logos/blank-street.png?v=2c18d517'], ['Corcoran', '/media/logos/corcoran.png?v=612f3cb7'], ['Avail', '/media/logos/avail.png?v=0248d690']];
    if (!this._vidRef) {
      this._vidRef = playWhenVisible;
    }
    var engines = [
      { no: '01', name: 'STATIC MEDIA', dot: '#FFFFFF', img: '/media/photos/hartford-healthcare-wallscape.webp?v=0b3f98d9', pos: '50% 50%', note: 'REAL INSTALL', alt: 'Hartford HealthCare wallscape in a parking garage',
        head: 'Walls, wraps & gates', earn: 'Campaign fees for wallscapes, elevator wraps, gate arms, branded tickets and garage takeovers', scale: 'Every new property adds walls, gates and elevators to sell' },
      { no: '02', name: 'DIGITAL', dot: '#8FDCE8', img: '/media/photos/ddrb-connecticut.webp?v=088e4141', pos: '50% 30%', note: 'REAL INSTALL · CT', alt: 'A Lot Media Digital Dynamic Rate Board installed in Connecticut',
        head: 'Rate boards & screens', earn: 'Ad time on rate boards and panels, sold by our team and on programmatic exchanges — plus rate boards and Device Hub software for owners who buy', scale: 'Software-driven inventory with remote management and unlimited creative updates' },
      { no: '03', name: 'EVENTS & VENUES', dot: '#FBAE4F', img: '/media/photos/stock-car-event.webp?v=d303b124', pos: '55% 50%', note: 'STOCK PHOTO', tag: 'NEXT GROWTH ENGINE', alt: 'Crowd filming a car at a live automotive event at night (stock photo)',
        head: 'The real estate itself', earn: 'Event activation, VIP park & shuttle, bulk parking, temporary and mobile media, and sponsorship', scale: 'Sold on demand with partners, on parking real estate the network already reaches' }
    ];
    return {
      vidRef: this._vidRef,
      engines: engines.map(function (e) {
        var hot = !!e.tag;
        return { no: e.no, name: e.name, dot: e.dot, img: B + e.img, pos: e.pos, note: e.note, tag: e.tag || '', alt: e.alt, head: e.head, earn: e.earn, scale: e.scale,
          bg: hot ? '#0B1220' : '#FFFFFF', fg: hot ? '#FFFFFF' : '#0B1220', line: hot ? 'rgba(255,255,255,0.16)' : 'rgba(11,18,32,0.12)',
          ring: hot ? 'inset 0 0 0 3px #FBAE4F' : 'none' };
      }),
      wheel: steps.map(function (s, i) {
        var on = i === wi;
        return { no: '0' + (i + 1), title: s[0], desc: s[1], arrow: i === 3 ? '↺' : '→', bg: on ? '#FBAE4F' : '#FFFFFF', fg: '#0B1220' };
      }),
      logos: logos.map(function (l) { return { name: l[0], src: B + l[1] }; }),
      leaders: [
        { ini: 'JL', name: 'Jonah Lazowski', role: 'FOUNDER & CEO', bio: 'Founded A Lot Media to turn the media value inside parking lots and garages into a national advertising and technology platform. Leads vision, operator relationships and expansion.' },
        { ini: 'KV', name: 'Ken Venturi', role: 'PRESIDENT · COMMERCIAL STRATEGY', bio: 'Former National CineMedia executive in interactive media, creative strategy and advertiser platforms; founder and CEO of the integrated agency Focus.' },
        { ini: 'JC', name: 'Jesse Cooper', role: 'PARTNER', bio: 'Partner and CEO of faytech North America and founder and CEO of MetroClick — touchscreen displays, interactive technology and physical media production.' },
        { ini: 'JC', name: 'Josh Cooper', role: 'PARTNER', bio: 'Founder and operator across MetroClick, Proof 7 and Rochambeau — digital signage, touchscreens, installation and place-based brand activation.' },
        { ini: 'KG', name: 'Kevin Gavrushenko', role: 'DIRECTOR OF OPERATIONS', bio: 'Five years running operations at A Lot Media: deployments, vendors, properties and field execution across the network.' },
        { ini: 'RV', name: 'Ryan Venturi', role: 'APPLIED AI ENGINEER', bio: 'Brings AI, automation and data workflows to sales, operations and location and audience intelligence. University of Colorado Boulder engineering and business.' }
      ],
      advisors: [
        { ini: 'AL', name: 'Al Lazowski', role: 'STRATEGIC ADVISOR', bio: 'Co-founded LAZ Parking in 1981 and serves as its Chairman and CEO — today more than $3B in managed revenue and 21,000+ employees.' },
        { ini: 'KH', name: 'Kurt Hall', role: 'EXECUTIVE ADVISOR', bio: 'Former Chairman, President and CEO of National CineMedia, which he built into the world’s largest cinema media network.' },
        { ini: 'CM', name: 'Cliff Marks', role: 'EXECUTIVE ADVISOR', bio: 'Former President of National CineMedia, where he also led sales and marketing and served as interim CEO.' },
        { ini: 'DM', name: 'Dan Migala', role: 'STRATEGIC GROWTH', bio: 'Chief Impact Officer at LAZ Parking; co-founder of 4FRONT, now part of Legends. Sports, live events and sponsorship strategy.' },
        { ini: 'CC', name: 'Charles “Chip” Chimera', role: 'EXECUTIVE ADVISOR', bio: 'Career in out-of-home media sales with Clear Channel and Outfront Media; advises on sales leadership and agency relationships.' }
      ],
      sent: !!st.sent,
      notSent: !st.sent,
      submit: function (e) { if (e && e.preventDefault) e.preventDefault(); sendInquiry(e, 'investor', null); self.setState({ sent: true }); }
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="investors" />
        {/* HERO */}
        <div style={{ background: "#05080F" }}>
          <section className="alm-hero m-inv-hero" data-scrub="exit" style={{ position: "relative", minHeight: "820px", background: "#0B1220", color: "#FFFFFF", overflow: "hidden" }}>
            <video className="alm-hero-media m-inv-hero-media" ref={v.vidRef} src="/media/video/highway-night.mp4?v=0f116ba5" poster="/media/video/highway-night-poster.webp?v=cdef3b33" autoPlay muted loop playsInline preload="auto" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%" }} />
            <div className="m-inv-hero-shade" style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(11,18,32,0.5) 0%, rgba(11,18,32,0.35) 40%, rgba(11,18,32,0.94) 100%)" }} />
            <div className="alm-hero-copy m-inv-hero-copy" style={{ position: "relative", maxWidth: "1360px", minHeight: "820px", margin: "0 auto", padding: "0 28px 72px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Investor relations</div>
              <h1 className="alm-rise" style={{ margin: "22px 0 0", maxWidth: "1240px", fontSize: "clamp(44px, 7.2vw, 116px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600", animationDelay: ".1s" }}>The media layer of <span style={{ color: "#FBAE4F" }}>America’s parking.</span></h1>
              <div className="alm-rise" style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "flex-end", justifyContent: "space-between", animationDelay: ".2s" }}>
                <p className="m-inv-hero-p" style={{ margin: "0", maxWidth: "620px", fontSize: "19px", lineHeight: "1.55", fontWeight: "400", color: "#E4E8EF" }}>A vertically integrated out-of-home network across 12,000 parking locations — screens, print and CMS through our sister companies MetroClick and faytech, software and ad sales in-house.</p>
                <div className="m-inv-hero-cta" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <A className="alm-btn" href="#access" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Request the data room</A>
                  <A className="alm-btn" href="#thesis" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", border: "2px solid #FFFFFF", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Read the thesis</A>
                </div>
              </div>
              <div className="m-inv-credit" style={{ position: "absolute", right: "28px", bottom: "24px", fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)" }}>STOCK DRONE FOOTAGE</div>
            </div>
          </section>
        </div>
        {/* MARKET OPPORTUNITY */}
        <section className="alm-pt" style={{ padding: "140px 28px 40px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
            <div className="m-inv-opp-head" style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "17px", fontWeight: "600", letterSpacing: "-0.01em", color: "#C2630A" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />The opportunity</div>
              <h2 className="alm-in" style={{ margin: "16px auto 0", maxWidth: "960px", fontSize: "clamp(40px, 6vw, 88px)", lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "600" }}>Every trip ends<br />in a parking space.</h2>
              <p className="alm-in m-inv-opp-p" style={{ margin: "24px auto 0", maxWidth: "680px", fontSize: "21px", lineHeight: "1.5", fontWeight: "400", color: "#5B6474" }}>Drivers spend up to ten minutes there — three million cars a day across our network. We’re turning that moment into a national media platform, starting with the screens already live.</p>
            </div>
            <div style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
              <div className="alm-in alm-autoh m-inv-oppcard" style={{ padding: "36px", minHeight: "260px", borderRadius: "28px", background: "#0B1220", color: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#A3ACBC" }}>Installed today</div>
                <div>
                  <div style={{ fontSize: "clamp(56px, 5.4vw, 84px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.05em", background: "linear-gradient(90deg, #FBAE4F, #FFE1B8)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>110+</div>
                  <div style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#C9D0DB" }}>digital units in New York and Connecticut.</div>
                </div>
              </div>
              <div className="alm-in alm-autoh m-inv-oppcard" style={{ padding: "36px", minHeight: "260px", borderRadius: "28px", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#5B6474" }}>Planned</div>
                <div>
                  <div style={{ fontSize: "clamp(56px, 5.4vw, 84px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.05em" }}>1,000</div>
                  <div style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#5B6474" }}>more units for the top 35 US media markets.</div>
                </div>
              </div>
              <div className="alm-in alm-autoh m-inv-oppcard" style={{ padding: "36px", minHeight: "260px", borderRadius: "28px", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#5B6474" }}>Partner value</div>
                <div>
                  <div style={{ fontSize: "clamp(56px, 5.4vw, 84px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.05em", color: "#1D7F92" }}>$1.5M+</div>
                  <div style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#5B6474" }}>created for our parking partners.</div>
                </div>
              </div>
              <div className="alm-in alm-autoh m-inv-oppcard" style={{ padding: "36px", minHeight: "260px", borderRadius: "28px", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#5B6474" }}>Why now</div>
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gap: "12px", fontSize: "16px", lineHeight: "1.45", fontWeight: "500" }}>
                  <li style={{ display: "flex", gap: "10px" }}><span style={{ color: "#FBAE4F" }}>●</span>Digital screens open the door to programmatic buying</li>
                  <li style={{ display: "flex", gap: "10px" }}><span style={{ color: "#FBAE4F" }}>●</span>Events and activations put the real estate itself to work</li>
                  <li style={{ display: "flex", gap: "10px" }}><span style={{ color: "#FBAE4F" }}>●</span>Owners earn a share of the gross, with no risk</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* METRICS */}
        <section className="alm-pt alm-pb" style={{ padding: "104px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />At a glance</div>
            <div className="m-inv-glance" style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px 32px" }}>
              <div style={{ borderTop: "3px solid #0B1220", paddingTop: "20px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 76px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>12,000</div>
                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>PARKING LOCATIONS</div>
              </div>
              <div style={{ borderTop: "3px solid #0B1220", paddingTop: "20px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 76px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>3M+</div>
                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>CARS PARKED DAILY</div>
              </div>
              <div style={{ borderTop: "3px solid #0B1220", paddingTop: "20px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 76px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>400+</div>
                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>CITIES · 40 STATES</div>
              </div>
              <div style={{ borderTop: "3px solid #0B1220", paddingTop: "20px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 76px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>11</div>
                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>FLAGSHIP MARKETS</div>
              </div>
              <div style={{ borderTop: "3px solid #0B1220", paddingTop: "20px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 76px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>50+</div>
                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>ADVERTISER BRANDS</div>
              </div>
              <div style={{ borderTop: "3px solid #0B1220", paddingTop: "20px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 76px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>2016</div>
                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>DESIGNING &amp; INSTALLING SINCE</div>
              </div>
            </div>
            <div className="m-inv-sum" style={{ marginTop: "48px", padding: "32px", borderRadius: "18px", background: "#0B1220", color: "#FFFFFF", display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "center", justifyContent: "space-between" }}>
              <div className="m-inv-sum-grid" style={{ display: "flex", flexWrap: "wrap", gap: "24px 48px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>DIGITAL UNITS INSTALLED</div>
                  <div style={{ marginTop: "6px", fontSize: "28px", fontWeight: "650", letterSpacing: "-0.02em" }}>110+</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>UNITS PLANNED</div>
                  <div style={{ marginTop: "6px", fontSize: "28px", fontWeight: "650", letterSpacing: "-0.02em" }}>1,000</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>VALUE FOR PARKING PARTNERS</div>
                  <div style={{ marginTop: "6px", fontSize: "28px", fontWeight: "650", letterSpacing: "-0.02em" }}>$1.5M+</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>OWNER PAYOUTS</div>
                  <div style={{ marginTop: "6px", fontSize: "28px", fontWeight: "650", letterSpacing: "-0.02em" }}>Quarterly</div>
                </div>
              </div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#FBAE4F" }}>FINANCIALS AVAILABLE UNDER NDA</div>
            </div>
          </div>
        </section>
        {/* THREE ENGINES */}
        <section className="alm-pb" style={{ padding: "24px 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />The business</div>
                <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "980px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Three revenue engines.<br />One footprint.</h2>
              </div>
              <p style={{ margin: "0", maxWidth: "440px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>The same locations monetize three ways — and every product can be packaged together or sold on its own.</p>
            </div>
            <div className="m-inv-barcard" style={{ marginTop: "48px", padding: "32px", borderRadius: "18px", background: "#FFFFFF" }}>
              <div className="m-inv-bars" style={{ display: "grid", gridTemplateColumns: "minmax(120px, 160px) 1fr", gap: "16px 24px", alignItems: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>TODAY</div>
                <div style={{ display: "flex", gap: "4px", height: "44px" }}>
                  <div style={{ flex: "1", minWidth: "0", borderRadius: "4px", background: "#0B1220", color: "#FFFFFF", display: "flex", alignItems: "center", padding: "0 14px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", overflow: "hidden" }}>STATIC</div>
                  <div style={{ flex: "1", minWidth: "0", borderRadius: "4px", background: "#8FDCE8", color: "#0B1220", display: "flex", alignItems: "center", padding: "0 14px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", overflow: "hidden" }}>DIGITAL</div>
                  <div style={{ flex: "1", minWidth: "0", borderRadius: "4px", background: "#FBAE4F", color: "#0B1220", display: "flex", alignItems: "center", padding: "0 14px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", overflow: "hidden" }}>EVENTS</div>
                </div>
                <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>WHERE WE’RE HEADED</div>
                <div style={{ display: "flex", gap: "4px", height: "44px" }}>
                  <div style={{ flex: "1", minWidth: "0", borderRadius: "4px", background: "#0B1220", color: "#FFFFFF", display: "flex", alignItems: "center", padding: "0 14px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", overflow: "hidden" }}>STATIC</div>
                  <div style={{ flex: "1", minWidth: "0", borderRadius: "4px", background: "#8FDCE8", color: "#0B1220", display: "flex", alignItems: "center", padding: "0 14px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", overflow: "hidden" }}>DIGITAL</div>
                  <div className="alm-grow" style={{ flex: "1.7", minWidth: "0", borderRadius: "4px", backgroundImage: "repeating-linear-gradient(135deg, #FBAE4F 0 10px, #F5A136 10px 20px)", backgroundSize: "28.28px 28.28px", color: "#0B1220", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", overflow: "hidden" }}>
                    <span>EVENTS &amp; VENUES</span>
                    <span>↗</span>
                  </div>
                </div>
              </div>
              <div className="m-inv-cap" style={{ marginTop: "16px", fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#8A93A3" }}>DIRECTIONAL · NOT TO SCALE · DETAIL IN THE DATA ROOM</div>
            </div>
            <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px" }}>
              {(v.engines || []).map((e, eI) => (
                <Fragment key={eI}>
                  <article className="alm-tile alm-in" style={{ display: "flex", flexDirection: "column", borderRadius: "18px", overflow: "hidden", background: e.bg, color: e.fg, boxShadow: e.ring }}>
                    <div style={{ position: "relative", height: "260px", overflow: "hidden", background: "#0B1220" }}>
                      <img src={e.img} alt={e.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: e.pos, display: "block" }} loading="lazy" decoding="async" />
                      {e.tag ? (
                        <>
                          <span style={{ position: "absolute", top: "14px", left: "14px", padding: "6px 11px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em" }}>{e.tag}</span>
                        </>
                      ) : null}
                      <span className="m-inv-note" style={{ position: "absolute", right: "12px", bottom: "12px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.75)" }}>{e.note}</span>
                    </div>
                    <div className="m-inv-engbody" style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "14px", flex: "1" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em" }}><span style={{ width: "7px", height: "7px", background: e.dot, outline: "1px solid rgba(127,127,127,0.4)", borderRadius: "50%" }} />{e.no} · {e.name}</div>
                      <div style={{ fontSize: "28px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{e.head}</div>
                      <dl className="m-inv-dl" style={{ margin: "6px 0 0", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", borderTop: `1px solid ${e.line}` }}>
                        <dt style={{ padding: "12px 0", borderBottom: `1px solid ${e.line}`, fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", opacity: "0.7" }}>HOW IT EARNS</dt>
                        <dd style={{ margin: "0", padding: "12px 0", borderBottom: `1px solid ${e.line}`, fontSize: "14px", fontWeight: "600", lineHeight: "1.5" }}>{e.earn}</dd>
                        <dt style={{ padding: "12px 0", borderBottom: `1px solid ${e.line}`, fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", opacity: "0.7" }}>WHY IT SCALES</dt>
                        <dd style={{ margin: "0", padding: "12px 0", borderBottom: `1px solid ${e.line}`, fontSize: "14px", fontWeight: "600", lineHeight: "1.5" }}>{e.scale}</dd>
                      </dl>
                    </div>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* THESIS */}
        <section className="alm-pt alm-pb" id="thesis" style={{ padding: "128px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />The thesis</div>
            <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "1000px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Why we win.</h2>
            <div style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "48px 40px" }}>
              <div style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", color: "#FBAE4F" }}>01</div>
                <div style={{ marginTop: "14px", fontSize: "26px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>An overlooked venue</div>
                <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "1.65", fontWeight: "400", color: "#C9D0DB" }}>Parking is the first and last stop of the trip, with up to ten minutes of dwell. We believe it is one of the least-mediated high-attention venues in out-of-home.</p>
              </div>
              <div style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", color: "#FBAE4F" }}>02</div>
                <div style={{ marginTop: "14px", fontSize: "26px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Vertically integrated</div>
                <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "1.65", fontWeight: "400", color: "#C9D0DB" }}>Signage manufacturing, large-format printing and our CMS come from sister companies MetroClick and faytech; software development and ad sales are in-house. Fewer vendors means faster deployment.</p>
              </div>
              <div style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", color: "#FBAE4F" }}>03</div>
                <div style={{ marginTop: "14px", fontSize: "26px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>A wedge with owners</div>
                <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "1.65", fontWeight: "400", color: "#C9D0DB" }}>The Digital Dynamic Rate Board™ gives owners dynamic pricing they value on its own — and puts our screen at the entrance of every garage that installs it.</p>
              </div>
              <div style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", color: "#FBAE4F" }}>04</div>
                <div style={{ marginTop: "14px", fontSize: "26px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Built to become a platform</div>
                <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "1.65", fontWeight: "400", color: "#C9D0DB" }}>Our technology roadmap takes location data, media measurement and self-service from an internal tool to sales, agencies and brands — on top of Geopath, DOT, Census and Wi-Fi beacon data.</p>
              </div>
            </div>
          </div>
        </section>
        {/* FLYWHEEL */}
        <section className="alm-pt alm-pb" style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "center" }}>
            <div style={{ flex: "1 1 400px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />The flywheel</div>
              <h2 className="alm-in" style={{ margin: "22px 0 0", fontSize: "clamp(38px, 5vw, 72px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Every location makes the next one easier.</h2>
              <p style={{ margin: "24px 0 0", maxWidth: "520px", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>A two-sided network: owners supply the space, advertisers buy the audience, and each side’s growth strengthens the other.</p>
            </div>
            <div style={{ flex: "1 1 560px", minWidth: "0" }}>
              <ol style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                {(v.wheel || []).map((w, wI) => (
                  <Fragment key={wI}>
                    <li className="m-inv-wheel" style={{ padding: "28px", borderRadius: "18px", background: w.bg, color: w.fg, transition: "background .5s ease, color .5s ease", minHeight: "170px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", fontWeight: "600" }}>{w.no}</span>
                        <span style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>{w.arrow}</span>
                      </div>
                      <div style={{ marginTop: "16px" }}>
                        <div style={{ fontSize: "22px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{w.title}</div>
                        <div className="m-inv-wdesc" style={{ marginTop: "8px", fontSize: "14px", fontWeight: "600", opacity: "0.85" }}>{w.desc}</div>
                      </div>
                    </li>
                  </Fragment>
                ))}
              </ol>
            </div>
          </div>
        </section>
        {/* ROADMAP */}
        <section className="alm-pt alm-pb" style={{ padding: "128px 28px", background: "#344567", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Roadmap</div>
            <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "1000px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>From installer to platform.</h2>
            <ol className="m-inv-road" style={{ margin: "64px 0 0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "0", borderTop: "3px solid #FBAE4F" }}>
              <li style={{ padding: "28px 24px 0 0" }}>
                <div style={{ fontSize: "36px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>2016</div>
                <div style={{ marginTop: "12px", fontSize: "18px", fontWeight: "700" }}>Founded</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.55", fontWeight: "400", color: "#D5DAE3" }}>Designing and installing parking media.</div>
              </li>
              <li style={{ padding: "28px 24px 0 0" }}>
                <div style={{ fontSize: "36px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>2019</div>
                <div style={{ marginTop: "12px", fontSize: "18px", fontWeight: "700" }}>Hartford HealthCare</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.55", fontWeight: "400", color: "#D5DAE3" }}>30 Connecticut garages signed — since renewed for five more years.</div>
              </li>
              <li style={{ padding: "28px 24px 0 0" }}>
                <div style={{ fontSize: "36px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>Today</div>
                <div style={{ marginTop: "12px", fontSize: "18px", fontWeight: "700" }}>Digital in NY &amp; CT</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.55", fontWeight: "400", color: "#D5DAE3" }}>110+ units installed; 12,000 locations and 11 flagship markets in the network.</div>
              </li>
              <li style={{ padding: "28px 24px 0 0" }}>
                <div style={{ fontSize: "36px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>2026</div>
                <div style={{ marginTop: "12px", fontSize: "18px", fontWeight: "700" }}>Events</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.55", fontWeight: "400", color: "#D5DAE3" }}>VIP parking and shuttle programs in four cities, and event sites for brand partners.</div>
              </li>
              <li style={{ padding: "28px 24px 0 0" }}>
                <div style={{ fontSize: "36px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>Next</div>
                <div style={{ marginTop: "12px", fontSize: "18px", fontWeight: "700" }}>1,000 units</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.55", fontWeight: "400", color: "#D5DAE3" }}>Planned for the top 35 US media markets.</div>
              </li>
              <li style={{ padding: "28px 24px 0 0" }}>
                <div style={{ fontSize: "36px", fontWeight: "650", color: "#FBAE4F", letterSpacing: "-0.02em" }}>Next</div>
                <div style={{ marginTop: "12px", fontSize: "18px", fontWeight: "700" }}>The platform</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.55", fontWeight: "400", color: "#D5DAE3" }}>Location intelligence, smart power, media measurement and new display hardware — then agency and brand self-service.</div>
              </li>
            </ol>
          </div>
        </section>
        {/* PROOF */}
        <section className="alm-pt alm-pb" style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <h2 className="alm-in" style={{ margin: "0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Proof in the field.</h2>
            <p className="m-inv-cap" style={{ margin: "16px 0 0", fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#8A93A3" }}>REAL INSTALLATIONS · PHOTOS RETOUCHED FOR LIGHT AND CLEAN-UP · ADS UNALTERED</p>
            <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px" }}>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", height: "380px", borderRadius: "16px", overflow: "hidden", position: "relative", background: "#0B1220" }}>
                <img src="/media/photos/lucid-garage-panel-unedited.webp?v=63c8d27f" alt="Drivers walking past a Lucid ad on an A Lot Media digital panel in a New York garage" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "65% 50%", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "16px", bottom: "16px", padding: "8px 14px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "12px", fontWeight: "700" }}>LUCID · DIGITAL · NEW YORK</figcaption>
              </figure>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", height: "380px", borderRadius: "16px", overflow: "hidden", position: "relative", background: "#0B1220" }}>
                <img src="/media/photos/hartford-healthcare-wallscape.webp?v=0b3f98d9" alt="Hartford HealthCare wallscape" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "16px", bottom: "16px", padding: "8px 14px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "12px", fontWeight: "700" }}>HARTFORD HEALTHCARE · STATIC</figcaption>
              </figure>
              <figure className="alm-tile alm-wipe" style={{ margin: "0", height: "380px", borderRadius: "16px", overflow: "hidden", position: "relative", background: "#0B1220" }}>
                <img src="/media/photos/ddrb-connecticut.webp?v=088e4141" alt="A Lot Media Digital Dynamic Rate Board installed in Connecticut" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 34%", display: "block" }} loading="lazy" decoding="async" />
                <figcaption style={{ position: "absolute", left: "16px", bottom: "16px", padding: "8px 14px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "12px", fontWeight: "700" }}>RATE BOARD · CONNECTICUT</figcaption>
              </figure>
            </div>
            <div className="m-inv-logos" style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1px", background: "rgba(11,18,32,0.08)", border: "1px solid rgba(11,18,32,0.08)" }}>
              {(v.logos || []).map((lg, lgI) => (
                <Fragment key={lgI}>
                  <div className="alm-in" style={{ background: "#F5F5F7", height: "104px", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", boxSizing: "border-box" }}>
                    <img src={lg.src} alt={lg.name} style={{ maxWidth: "72%", maxHeight: "40px", objectFit: "contain", opacity: "0.82" }} loading="lazy" decoding="async" />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* LEADERSHIP */}
        <section className="alm-pb" style={{ padding: "0 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>The team.</h2>
              <p style={{ margin: "0", maxWidth: "460px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Operators from parking, place-based media and display technology — advised by the people who built LAZ Parking and National CineMedia.</p>
            </div>
            <div style={{ marginTop: "48px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>LEADERSHIP</div>
            <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "16px" }}>
              {(v.leaders || []).map((p, pI) => (
                <Fragment key={pI}>
                  <article className="alm-in" style={{ padding: "26px", borderRadius: "16px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <span aria-hidden="true" style={{ flex: "0 0 auto", width: "64px", height: "64px", borderRadius: "50%", background: "#0B1220", color: "#FBAE4F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700", letterSpacing: "0.02em" }}>{p.ini}</span>
                      <div>
                        <div style={{ fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>{p.name}</div>
                        <div style={{ marginTop: "4px", fontSize: "13px", fontWeight: "700", letterSpacing: "0.06em", color: "#C2630A" }}>{p.role}</div>
                      </div>
                    </div>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>{p.bio}</p>
                  </article>
                </Fragment>
              ))}
            </div>
            <div style={{ marginTop: "48px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>ADVISORS</div>
            <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {(v.advisors || []).map((p, pI) => (
                <Fragment key={pI}>
                  <article className="alm-in" style={{ padding: "26px", borderRadius: "16px", background: "#0B1220", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <span aria-hidden="true" style={{ flex: "0 0 auto", width: "64px", height: "64px", borderRadius: "50%", background: "#FBAE4F", color: "#0B1220", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700", letterSpacing: "0.02em" }}>{p.ini}</span>
                      <div>
                        <div style={{ fontSize: "20px", fontWeight: "650", letterSpacing: "-0.02em" }}>{p.name}</div>
                        <div style={{ marginTop: "4px", fontSize: "13px", fontWeight: "700", letterSpacing: "0.06em", color: "#FBAE4F" }}>{p.role}</div>
                      </div>
                    </div>
                    <p className="m-inv-advbio" style={{ margin: "0", fontSize: "14px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>{p.bio}</p>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* ACCESS */}
        <section className="alm-pt alm-pb" id="access" style={{ padding: "128px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "64px" }}>
            <div style={{ flex: "1 1 380px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Data room</div>
              <h2 className="alm-in" style={{ margin: "22px 0 0", fontSize: "clamp(38px, 5vw, 72px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Request investor access.</h2>
              <p style={{ margin: "24px 0 0", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>Financials, unit economics and the deployment pipeline are shared under NDA. Or email team@alotmedia.com.</p>
            </div>
            <div className="m-inv-form" style={{ flex: "999 1 560px", minWidth: "0", padding: "40px", borderRadius: "18px", background: "#FFFFFF", color: "#0B1220" }}>
              {v.sent ? (
                <>
                  <div style={{ minHeight: "320px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
                    <div style={{ fontSize: "32px", fontWeight: "650", letterSpacing: "-0.02em" }}>Request received.</div>
                    <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Our team will follow up with an NDA and data room access.</p>
                  </div>
                </>
              ) : null}
              {v.notSent ? (
                <>
                  <form onSubmit={v.submit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "18px 20px" }}>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Full name<input className="alm-input" type="text" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="full_name" /></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Firm<input className="alm-input" type="text" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="firm" /></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Email<input className="alm-input" type="email" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="email" /></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Investor type<select className="alm-input" style={{ minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="investor_type"><option>Venture capital</option><option>Private equity</option><option>Family office</option><option>Strategic</option><option>Angel</option></select></label>
                    <button type="submit" className="alm-btn" style={{ gridColumn: "1 / -1", minHeight: "58px", borderRadius: "999px", border: "0", background: "#FBAE4F", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Request access</button>
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
