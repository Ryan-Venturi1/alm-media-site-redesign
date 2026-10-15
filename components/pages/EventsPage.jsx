'use client';

// Ported from the design-canvas artboard Events.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import { playWhenVisible } from '@/lib/video';
import { sendInquiry } from '@/lib/inquiry';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import LiveBoard from '@/components/LiveBoard';
import Nav from '@/components/Nav';

export default class EventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderVals() {
    var self = this;
    var st = this.state || {};
    var B = '';
    var bkIdx = st.bk || 0;
    var kind = st.kind || 'all';

    var models = [
      { id: 'activations', title: 'Event activation', kicker: 'BRANDS & AGENCIES', img: '/media/photos/stock-car-event.webp?v=d303b124', pos: '55% 50%',
        alt: 'Crowd filming a car at a live automotive event at night (stock photo)', caption: 'LIVE ACTIVATION · STOCK PHOTO',
        desc: 'Branded spaces and consumer experiences inside the parking or event footprint — product demos, sampling, hospitality, content capture, pop-ups and vehicle test drives — surrounded by our screens and walls.',
        who: 'Brands, agencies and experiential producers', give: 'The space, tents, power, vehicles, signage and on-site static and digital media',
        price: 'Small event (under 20 spaces) or full activation (about 30 spaces)', ex: ['Pop-ups', 'Sampling', 'Product demos', 'Test drives'], cta: 'Plan an activation' },
      { id: 'vip', title: 'VIP park & shuttle', kicker: 'PREMIUM & GROUP ARRIVAL', img: '/media/photos/stock-rooftop-tent.webp?v=b0f4fddd', pos: '50% 50%',
        alt: 'Guests under a lit canopy at an evening rooftop event (stock photo)', caption: 'VIP HOSPITALITY · STOCK PHOTO',
        desc: 'Premium, pre-arranged parking paired with shuttles, guest routing and on-site coordination — plus bulk parking blocks for organizers, sponsors, fleets and large attendee groups.',
        who: 'Event organizers, sponsors, hospitality groups and agencies', give: 'Reserved and bulk parking, shuttles, tents, vehicles, generators, signage and barricades',
        price: 'Scoped per event, by guests, vehicles and cities', ex: ['VIP parking', 'Shuttles', 'Bulk parking', 'Hospitality'], cta: 'Plan VIP arrival' },
      { id: 'gameday', title: 'Game day & sponsorship', kicker: 'TEAMS, VENUES & SPONSORS', img: '/media/photos/stock-tailgate.webp?v=bdd01506', pos: '50% 50%',
        alt: 'Friends tailgating beside pickup trucks in a lot (stock photo)', caption: 'TAILGATE · STOCK PHOTO',
        desc: 'On game day the whole location becomes media: a tailgate takeover with activation and multiple media around the crowd, event pricing on the rate boards, and sponsorship packages that tie it all together.',
        who: 'Teams, venues, sponsors and promoters', give: 'Location takeover, activation, sponsor rights, event pricing on DDRBs and branded media',
        price: 'Domination: location takeover, activation and multiple media', ex: ['Tailgates', 'Sponsor takeovers', 'Event pricing', 'Wayfinding'], cta: 'Build a game-day package' }
    ];

    var kinds = [['all', 'ALL'], ['media', 'MEDIA'], ['arrival', 'PARKING & ARRIVAL'], ['live', 'LIVE EXPERIENCE']];
    var venues = [
      { name: 'Permanent media', group: 'MEDIA', img: '/media/photos/mt-bank-ddrb.webp?v=9afe12a0', pos: '60% 50%', note: 'REAL INSTALL', alt: 'A Lot Media Digital Dynamic Rate Board with an M&T Bank ad at a garage entrance',
        desc: 'Installed digital and static media in and around parking, event sites and high-traffic centers — sold by the placement or across the network.', cap: 'Installed · 110+ digital units in NY & CT', best: 'Always-on presence in priority markets',
        fits: ['media'] },
      { name: 'Temporary media', group: 'MEDIA', img: '/media/photos/a-beautiful-noise-posters.webp?v=88fee631', pos: '50% 50%', note: 'REAL INSTALL', alt: 'A Beautiful Noise posters along a parking garage wall',
        desc: 'Short-duration signage and displays deployed around events, seasonal traffic or a targeted campaign — flexible timing, locations and formats.', cap: 'Campaign · on demand', best: 'Event windows and seasonal pushes',
        fits: ['media'] },
      { name: 'Mobile media', group: 'MEDIA', img: '/media/photos/stock-nyc-trails.webp?v=99f803ae', pos: '50% 60%', note: 'STOCK PHOTO', alt: 'City traffic at night seen from above',
        desc: 'Branded vehicles, trailers and mobile display units that follow the crowd along event routes, arrival zones and high-traffic corridors.', cap: 'Mobile · on demand', best: 'Reach beyond a single venue',
        fits: ['media'] },
      { name: 'VIP park & shuttle', group: 'PARKING & ARRIVAL', img: '/media/photos/stock-rooftop-tent.webp?v=b0f4fddd', pos: '50% 50%', note: 'STOCK PHOTO', alt: 'Guests under a lit canopy at an evening rooftop event (stock photo)',
        desc: 'Premium, pre-arranged parking with shuttles, guest routing and on-site coordination for VIPs, sponsors and hospitality groups.', cap: 'Per event', best: 'Premium arrivals',
        fits: ['arrival'] },
      { name: 'Bulk parking', group: 'PARKING & ARRIVAL', img: '/media/photos/stock-aerial.webp?v=1f2e8bf5', pos: '50% 50%', note: 'STOCK PHOTO', alt: 'Aerial view of a large surface parking lot',
        desc: 'Blocks of parking reserved for organizers, sponsors, fleets, employees or large attendee groups — one solution for access, allocation and arrival.', cap: 'Blocks of spaces', best: 'Large groups and fleets',
        fits: ['arrival'] },
      { name: 'Event activation', group: 'LIVE EXPERIENCE', img: '/media/photos/stock-car-event.webp?v=d303b124', pos: '55% 50%', note: 'STOCK PHOTO', alt: 'Crowd filming a car at a live automotive event at night (stock photo)',
        desc: 'Branded spaces and consumer experiences in the parking or event footprint — product demos, sampling, hospitality and content capture.', cap: 'Small · full activation · takeover', best: 'Launches, sampling, test drives',
        fits: ['live'] },
      { name: 'Sponsorship', group: 'LIVE EXPERIENCE', img: '/media/photos/stock-tailgate.webp?v=bdd01506', pos: '50% 50%', note: 'STOCK PHOTO', alt: 'Friends tailgating beside pickup trucks in a lot (stock photo)',
        desc: 'Custom packages that combine brand rights with media, parking, shuttle and activation inventory across the attendee journey.', cap: 'Custom packages', best: 'Game days, tailgates, festivals',
        fits: ['live'] }
    ];

    var bkData = [
      { label: 'Brand activation', head: 'Tell us what you’re launching.', sub: 'We’ll come back with locations, dates and a production plan.',
        orgLabel: 'COMPANY', orgPh: 'Brand or agency', typeLabel: 'ACTIVATION TYPE', types: ['Pop-up', 'Sampling', 'Product demo', 'Vehicle test drive', 'Not sure yet'],
        datePh: 'e.g. late spring, two weekends', sizeLabel: 'EXPECTED ATTENDANCE', notesLabel: 'WHAT ARE YOU LAUNCHING?', notesPh: 'A few lines on the product, the goal and the feel.' },
      { label: 'VIP & group parking', head: 'Tell us who’s arriving.', sub: 'We’ll plan reserved parking, shuttles and on-site coordination around your event.',
        orgLabel: 'ORGANIZATION', orgPh: 'Organizer, agency or company', typeLabel: 'WHAT YOU NEED', types: ['VIP parking', 'Shuttle service', 'Bulk parking', 'Tents & hospitality', 'Other'],
        datePh: 'Event days', sizeLabel: 'GUESTS OR VEHICLES', notesLabel: 'WHAT DOES THE ARRIVAL NEED?', notesPh: 'Venue, guest count, shuttles, tents, power, signage.' },
      { label: 'Game day & sponsorship', head: 'Own the crowd on game day.', sub: 'We’ll map parking, activation and media around your venue or schedule.',
        orgLabel: 'TEAM, VENUE OR SPONSOR', orgPh: 'Who you represent', typeLabel: 'PACKAGE', types: ['Tailgate takeover', 'Single event', 'Sponsorship package', 'Parking only', 'Not sure yet'],
        datePh: 'Season, fixtures or single dates', sizeLabel: 'VENUE CAPACITY', notesLabel: 'WHICH VENUE AND EVENTS?', notesPh: 'Stadium or arena, events and what success looks like.' }
    ];

    var data = [
      { title: 'Brief', desc: 'Start with the outcome — trial, sales, sign-ups, ticket sales or buzz. We shape the format around it, from a single-level pop-up to a multi-market tour.' },
      { title: 'Venue match', desc: 'We match rooftops, lots and levels to your headcount and audience using the same Geopath, Census and on-site data behind our media plans.' },
      { title: 'Approvals', desc: 'We handle access, dates and operations with the property owner, so your team never has to chase a landlord.' },
      { title: 'Build & promote', desc: 'We produce the build with our partners, and the rate boards, wallscapes and tickets on site announce it before day one.' },
      { title: 'Event day', desc: 'Our team coordinates load-in, guest parking, run of show and strike with the property.' },
      { title: 'Recap', desc: 'A wrap-up with proof-of-performance photos of what ran, where and when.' }
    ];
    var idx = st.step || 0;
    var steps = data.map(function (d, i) {
      var on = i === idx;
      return { no: '0' + (i + 1), title: d.title, sel: on ? 'true' : 'false',
        bg: on ? '#0B1220' : 'transparent', fg: on ? '#FFFFFF' : '#0B1220', bd: on ? '#FBAE4F' : 'rgba(11,18,32,0.12)',
        pick: function () { self.setState({ step: i }); } };
    });

    if (!this._vidRef) {
      this._vidRef = playWhenVisible;
    }
    var bk = bkData[bkIdx];
    return {
      vidRef: this._vidRef,
      models: models.map(function (m, i) {
        return { id: m.id, no: '0' + (i + 1), title: m.title, kicker: m.kicker, img: B + m.img, pos: m.pos, alt: m.alt, caption: m.caption,
          desc: m.desc, who: m.who, give: m.give, price: m.price, cta: m.cta, dir: i % 2 === 0 ? 'row' : 'row-reverse',
          ex: m.ex.map(function (t) { return { t: t }; }),
          book: function () { self.setState({ bk: i, btype: 0, sent: false }); } };
      }),
      kinds: kinds.map(function (k) {
        var on = k[0] === kind;
        return { label: k[1], pressed: on ? 'true' : 'false', bg: on ? '#0B1220' : 'transparent', fg: on ? '#FFFFFF' : '#0B1220',
          pick: function () { self.setState({ kind: k[0] }); } };
      }),
      venues: venues.map(function (v) {
        var match = kind !== 'all' && v.fits.indexOf(kind) !== -1;
        var dim = kind !== 'all' && !match;
        return { name: v.name, group: v.group, img: B + v.img, pos: v.pos, note: v.note, alt: v.alt, desc: v.desc, cap: v.cap, best: v.best,
          match: true, op: dim ? 0.38 : 1, ring: match ? '0 0 0 3px #FBAE4F, 0 24px 60px rgba(11,18,32,0.14)' : 'none' };
      }),
      past: [
        { type: 'VIP PARK & SHUTTLE', when: 'JUNE 2026', big: 'NY\u00a0· MIA\u00a0· DAL\u00a0· LA', name: 'Four-city VIP arrival program', where: 'New\u00a0York\u00a0· Miami\u00a0· Dallas\u00a0· Los\u00a0Angeles',
          desc: 'VIP parking, shuttle pick-up and drop-off, tents, vehicles, generators, signage, displays and barricades for a national brand program.' },
        { type: 'EVENT SITE', when: 'JULY 2026', big: 'Austin', name: 'Drone show launch site', where: 'Downtown Austin, TX',
          desc: 'A downtown Austin location turned into the launch site for a sponsored drone show.' }
      ],
      steps: steps,
      cur: { no: steps[idx].no, title: data[idx].title, desc: data[idx].desc },
      bk: { head: bk.head, sub: bk.sub, orgLabel: bk.orgLabel, orgPh: bk.orgPh, typeLabel: bk.typeLabel, datePh: bk.datePh,
        sizeLabel: bk.sizeLabel, notesLabel: bk.notesLabel, notesPh: bk.notesPh, types: bk.types.map(function (t, j) { var on = j === (st.btype || 0); return { t: t, pressed: on ? 'true' : 'false', bg: on ? '#FFF1DE' : '#FFFFFF', bd: on ? '#FBAE4F' : '#D5DAE3', pick: function () { self.setState({ btype: j }); } }; }) },
      bkTabs: bkData.map(function (b, i) {
        var on = i === bkIdx;
        return { label: b.label, sel: on ? 'true' : 'false', bg: on ? '#FFFFFF' : 'transparent', fg: on ? '#0B1220' : '#4E586A',
          sh: on ? '0 2px 10px rgba(11,18,32,0.12)' : 'none', pick: function () { self.setState({ bk: i, btype: 0 }); } };
      }),
      sent: !!st.sent,
      notSent: !st.sent,
      submit: function (e) { if (e && e.preventDefault) e.preventDefault(); sendInquiry(e, 'events', { inquiry: bk.label, type: bk.types[st.btype || 0] }); self.setState({ sent: true }); },
      reset: function () { self.setState({ sent: false }); }
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="events" />
        {/* HERO */}
        <div style={{ background: "#05080F" }}>
          <section className="alm-hero" data-scrub="exit" style={{ position: "relative", minHeight: "860px", background: "#05080F", color: "#FFFFFF", overflow: "hidden" }}>
            <video className="alm-hero-media" ref={v.vidRef} src="/media/video/garage-car.mp4?v=20843b73" poster="/media/video/garage-car-poster.webp?v=494a528b" autoPlay muted loop playsInline preload="auto" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 55%" }} />
            <div className="m-evt-shade" style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(5,8,15,0.45) 0%, rgba(5,8,15,0.2) 38%, rgba(5,8,15,0.92) 100%)" }} />
            <div className="alm-hero-copy" style={{ position: "relative", maxWidth: "1360px", minHeight: "860px", margin: "0 auto", padding: "0 28px 64px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", color: "#FBAE4F" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Events &amp; venues</div>
              <h1 className="alm-rise" style={{ margin: "22px 0 0", fontSize: "clamp(56px, 9.4vw, 150px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600", animationDelay: ".1s" }}>The lot is<br /><span style={{ color: "#FBAE4F" }}>the venue.</span></h1>
              <div className="alm-rise" style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "flex-end", justifyContent: "space-between", animationDelay: ".2s" }}>
                <p style={{ margin: "0", maxWidth: "560px", fontSize: "20px", lineHeight: "1.5", fontWeight: "400", color: "#E4E8EF" }}>Parking lots and garages where the audience already arrives — with the parking, access and media in place. Activate a brand, move your VIPs, or own the crowd on game day.</p>
                <div className="m-evt-ctas" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <A className="alm-btn" href="#book" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>Plan an event</A>
                  <A className="alm-btn" href="#venues" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", border: "2px solid #FFFFFF", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>See all products</A>
                </div>
              </div>
              <nav className="alm-rise" aria-label="Ways to work with us" style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", borderTop: "1px solid rgba(255,255,255,0.22)", animationDelay: ".3s" }}>
                {(v.models || []).map((m, mI) => (
                  <Fragment key={mI}>
                    <A className="alm-link" href={`#${m.id}`} style={{ display: "flex", alignItems: "baseline", gap: "14px", padding: "20px 20px 4px 0", fontSize: "15px", letterSpacing: "-0.005em", fontWeight: "600" }}>
                      <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", color: "#FBAE4F" }}>{m.no}</span>
                      <span style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "-0.005em" }}>{m.title}</span>
                      <span className="alm-arrow" style={{ marginLeft: "auto", color: "#FBAE4F" }}>→</span>
                    </A>
                  </Fragment>
                ))}
              </nav>
              <div style={{ position: "absolute", right: "28px", top: "24px", fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)" }}>STOCK FOOTAGE · ILLUSTRATIVE</div>
            </div>
          </section>
        </div>
        {/* STATEMENT (fills as you read) */}
        <section className="alm-pt" style={{ padding: "128px 28px 24px" }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <p style={{ margin: "0", fontSize: "clamp(34px, 4.8vw, 72px)", lineHeight: "1.1", letterSpacing: "-0.035em", fontWeight: "600", color: "#0B1220" }}>
              <span className="alm-fill" data-scrub="text">The space is already built. The audience already arrives by car. The parking is already solved. All that’s missing is your brand.</span>
            </p>
          </div>
        </section>
        {/* THREE WAYS */}
        <section className="alm-pt" style={{ padding: "104px 28px 40px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Three ways to put parking to work</div>
              <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}><span className="m-evt-l">Activate it.</span> <span className="m-evt-l">Arrive in style.</span><br className="m-evt-br" />Own game day.</h2>
            </div>
            <p style={{ margin: "0", maxWidth: "440px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Every product can be packaged together or sold on its own — and every event can come with static, digital and mobile media around it.</p>
          </div>
        </section>
        {(v.models || []).map((m, mI) => (
          <Fragment key={mI}>
            <section className="m-evt-model" id={m.id} style={{ padding: "56px 28px" }}>
              <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", flexDirection: m.dir, gap: "40px 64px", alignItems: "center" }}>
                <figure className="alm-tile alm-wipe m-evt-fig" style={{ flex: "1.35 1 600px", minWidth: "0", margin: "0", position: "relative", height: "620px", borderRadius: "18px", overflow: "hidden", background: "#0B1220" }}>
                  <img src={m.img} alt={m.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos, display: "block" }} loading="lazy" decoding="async" />
                  <figcaption style={{ position: "absolute", left: "16px", bottom: "16px", padding: "8px 14px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em" }}>{m.caption}</figcaption>
                </figure>
                <div className="alm-in" style={{ flex: "1 1 400px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", color: "#C2630A" }}>{m.no}</span>
                    <span style={{ height: "1px", flex: "0 0 48px", background: "#0B1220" }} />
                    <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>{m.kicker}</span>
                  </div>
                  <h3 style={{ margin: "0", fontSize: "clamp(36px, 4.2vw, 64px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>{m.title}</h3>
                  <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>{m.desc}</p>
                  <dl style={{ margin: "4px 0 0", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.7fr)", borderTop: "2px solid #0B1220" }}>
                    <dt style={{ padding: "14px 0", borderBottom: "1px solid rgba(11,18,32,0.12)", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>WHO BOOKS</dt>
                    <dd style={{ margin: "0", padding: "14px 0", borderBottom: "1px solid rgba(11,18,32,0.12)", fontSize: "15px", fontWeight: "700" }}>{m.who}</dd>
                    <dt style={{ padding: "14px 0", borderBottom: "1px solid rgba(11,18,32,0.12)", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>WE PROVIDE</dt>
                    <dd style={{ margin: "0", padding: "14px 0", borderBottom: "1px solid rgba(11,18,32,0.12)", fontSize: "15px", fontWeight: "700" }}>{m.give}</dd>
                    <dt style={{ padding: "14px 0", borderBottom: "1px solid rgba(11,18,32,0.12)", fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>PACKAGES</dt>
                    <dd style={{ margin: "0", padding: "14px 0", borderBottom: "1px solid rgba(11,18,32,0.12)", fontSize: "15px", fontWeight: "700" }}>{m.price}</dd>
                  </dl>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {(m.ex || []).map((x, xI) => (
                      <Fragment key={xI}>
                        <span style={{ padding: "7px 12px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid rgba(11,18,32,0.12)", fontSize: "13px", fontWeight: "700" }}>{x.t}</span>
                      </Fragment>
                    ))}
                  </div>
                  <div style={{ marginTop: "6px" }}>
                    <A className="alm-btn" href="#book" onClick={m.book} style={{ display: "inline-flex", alignItems: "center", minHeight: "54px", padding: "0 26px", borderRadius: "999px", background: "#0B1220", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em" }}>{m.cta}</A>
                  </div>
                </div>
              </div>
            </section>
          </Fragment>
        ))}
        {/* GAME DAY PRICING */}
        <section className="alm-pt alm-pb m-evt-gd" style={{ marginTop: "72px", padding: "120px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "48px 72px", alignItems: "center" }}>
            <div className="alm-lift" data-scrub="enter" style={{ flex: "1 1 520px", minWidth: "0", borderRadius: "18px", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.45)" }}>
              <LiveBoard />
            </div>
            <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", color: "#FBAE4F" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Where events meet digital</div>
              <h2 className="alm-in" style={{ margin: "0", fontSize: "clamp(36px, 4.6vw, 72px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Game day,<br />priced live.</h2>
              <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>When the stadium fills up, our Digital Dynamic Rate Boards™ switch to event pricing and hand the screen to the night’s sponsor. Parking revenue and media revenue rise together — that’s the whole network working as one.</p>
              <ul style={{ margin: "6px 0 0", padding: "0", listStyle: "none", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.16)" }}>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", color: "#FBAE4F" }}>01</span>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>Event rates scheduled around the fixture list</span>
                </li>
                <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.16)" }}>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", color: "#FBAE4F" }}>02</span>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>Sponsor takeovers on screens, walls and tickets</span>
                </li>
                <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.16)" }}>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", color: "#FBAE4F" }}>03</span>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>Wayfinding that moves the crowd to the gate</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* VENUE FINDER */}
        <section className="alm-pt alm-pb" id="venues" style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />The product portfolio</div>
                <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Seven products.<br />Package them or pick one.</h2>
              </div>
              <div className="m-evt-chips" role="group" aria-label="Filter products" style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "680px" }}>
                {(v.kinds || []).map((k, kI) => (
                  <Fragment key={kI}>
                    <button type="button" aria-pressed={k.pressed} onClick={k.pick} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: "2px solid #0B1220", background: k.bg, color: k.fg, fontFamily: "'Montserrat', sans-serif", fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", cursor: "pointer", transition: "background .2s ease, color .2s ease" }}>{k.label}</button>
                  </Fragment>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "16px" }}>
              {(v.venues || []).map((v, vI) => (
                <Fragment key={vI}>
                  <article className="alm-venue alm-tile alm-in" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: "18px", overflow: "hidden", opacity: v.op, boxShadow: v.ring }}>
                    <div style={{ position: "relative", height: "280px", overflow: "hidden", background: "#0B1220" }}>
                      <img src={v.img} alt={v.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: v.pos, display: "block" }} loading="lazy" decoding="async" />
                      {v.match ? (
                        <>
                          <span style={{ position: "absolute", top: "14px", left: "14px", padding: "6px 11px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em" }}>{v.group}</span>
                        </>
                      ) : null}
                      <span className="m-evt-note" style={{ position: "absolute", right: "12px", bottom: "12px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.75)" }}>{v.note}</span>
                    </div>
                    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flex: "1" }}>
                      <div style={{ fontSize: "24px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{v.name}</div>
                      <div style={{ fontSize: "15px", lineHeight: "1.55", fontWeight: "400", color: "#4E586A" }}>{v.desc}</div>
                      <dl style={{ margin: "auto 0 0", display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 14px", paddingTop: "14px", borderTop: "1px solid rgba(11,18,32,0.1)", fontSize: "13px" }}>
                        <dt style={{ fontWeight: "600", letterSpacing: "0.08em", color: "#4E586A" }}>INVENTORY</dt>
                        <dd style={{ margin: "0", fontWeight: "700" }}>{v.cap}</dd>
                        <dt style={{ fontWeight: "600", letterSpacing: "0.08em", color: "#4E586A" }}>BEST FOR</dt>
                        <dd style={{ margin: "0", fontWeight: "700" }}>{v.best}</dd>
                      </dl>
                    </div>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* WHY */}
        <section className="alm-pt alm-pb" style={{ padding: "120px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Why a parking venue</div>
            <h2 className="alm-in" style={{ margin: "22px 0 0", maxWidth: "960px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>The audience is <span style={{ color: "#FBAE4F" }}>already parked.</span></h2>
            <div style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "48px 32px" }}>
              <div style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 72px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>12,000</div>
                <div style={{ marginTop: "14px", fontSize: "18px", fontWeight: "700" }}>Locations in the network</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#A3ACBC" }}>Garages, lots and rooftops in 400+ cities.</div>
              </div>
              <div style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 72px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>3M+</div>
                <div style={{ marginTop: "14px", fontSize: "18px", fontWeight: "700" }}>Cars parked daily</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#A3ACBC" }}>Built-in foot traffic, every day of the week.</div>
              </div>
              <div style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 72px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>1</div>
                <div style={{ marginTop: "14px", fontSize: "18px", fontWeight: "700" }}>Partner, end to end</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#A3ACBC" }}>Property approvals, design, print, build and install — with our partners.</div>
              </div>
              <div style={{ borderTop: "3px solid #FBAE4F", paddingTop: "24px" }}>
                <div style={{ fontSize: "clamp(48px, 5vw, 72px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>+MEDIA</div>
                <div style={{ marginTop: "14px", fontSize: "18px", fontWeight: "700" }}>Surround the event</div>
                <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#A3ACBC" }}>Rate boards, wallscapes and tickets on site drive people to you.</div>
              </div>
            </div>
          </div>
        </section>
        {/* RECENT EVENTS (placeholders) */}
        <section className="alm-pt m-evt-recent" style={{ padding: "128px 28px 64px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className="alm-in" style={{ margin: "0", maxWidth: "820px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Recent work.</h2>
              <p style={{ margin: "0", maxWidth: "420px", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Event programs we delivered in 2026. Client names are confidential; ask us for details.</p>
            </div>
            <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px" }}>
              {(v.past || []).map((p, pI) => (
                <Fragment key={pI}>
                  <article className="alm-in" style={{ borderRadius: "18px", overflow: "hidden", background: "#FFFFFF" }}>
                    <div style={{ height: "220px", padding: "26px 28px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B1220", color: "#FFFFFF" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.14em" }}>
                        <span style={{ color: "#FBAE4F" }}>{p.type}</span>
                        <span style={{ color: "#A3ACBC" }}>{p.when}</span>
                      </div>
                      <div className="m-evt-big" style={{ fontSize: "clamp(40px, 4.4vw, 64px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.04em" }}>{p.big}</div>
                    </div>
                    <div style={{ padding: "22px 28px 28px" }}>
                      <div style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>{p.name}</div>
                      <div style={{ marginTop: "8px", fontSize: "14px", fontWeight: "600", color: "#C2630A" }}>{p.where}</div>
                      <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>{p.desc}</p>
                    </div>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* PROCESS */}
        <section className="alm-pt alm-pb" style={{ padding: "96px 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <h2 className="alm-in" style={{ margin: "0", maxWidth: "900px", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>How an event comes together.</h2>
            <div role="tablist" aria-label="Event steps" style={{ marginTop: "56px", display: "flex", flexWrap: "wrap", gap: "0", borderTop: "3px solid #0B1220" }}>
              {(v.steps || []).map((s, sI) => (
                <Fragment key={sI}>
                  <button type="button" role="tab" aria-selected={s.sel} onClick={s.pick} style={{ flex: "1 1 160px", minHeight: "84px", padding: "18px 18px", border: "0", borderBottom: `4px solid ${s.bd}`, background: s.bg, color: s.fg, fontFamily: "'Montserrat', sans-serif", textAlign: "left", cursor: "pointer", transition: "background .25s, border-color .25s" }}>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", opacity: "0.8" }}>{s.no}</div>
                    <div style={{ marginTop: "6px", fontSize: "15px", fontWeight: "700" }}>{s.title}</div>
                  </button>
                </Fragment>
              ))}
            </div>
            <div role="tabpanel" style={{ padding: "48px 0 0", display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "clamp(96px, 12vw, 180px)", fontWeight: "600", lineHeight: "1", color: "#FBAE4F", letterSpacing: "-0.035em" }}>{v.cur?.no}</div>
              <div style={{ flex: "1 1 420px" }}>
                <div style={{ fontSize: "34px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{v.cur?.title}</div>
                <p style={{ margin: "16px 0 0", maxWidth: "640px", fontSize: "18px", lineHeight: "1.65", fontWeight: "400", color: "#4E586A" }}>{v.cur?.desc}</p>
              </div>
            </div>
          </div>
        </section>
        {/* INQUIRY */}
        <section className="alm-pt alm-pb" id="book" style={{ padding: "128px 28px", background: "#344567", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "64px" }}>
            <div style={{ flex: "1 1 380px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Plan an event</div>
              <h2 className="alm-in" style={{ margin: "22px 0 0", fontSize: "clamp(38px, 5vw, 72px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>{v.bk?.head}</h2>
              <p style={{ margin: "24px 0 0", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#D5DAE3" }}>{v.bk?.sub} Prefer to talk? Call 1.860.716.9084.</p>
              <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.2)", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#D5DAE3" }}>Own a garage or lot? <A href="/real-estate#streams" style={{ color: "#FBAE4F", fontWeight: "600" }}>Host events on your property →</A></div>
            </div>
            <div className="m-evt-card" style={{ flex: "999 1 560px", minWidth: "0", padding: "40px", borderRadius: "18px", background: "#FFFFFF", color: "#0B1220" }}>
              {v.sent ? (
                <>
                  <div style={{ minHeight: "460px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#FBAE4F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: "650", letterSpacing: "-0.02em" }}>Request received.</div>
                    <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Our events team will reach out with venues, dates and a plan.</p>
                    <button type="button" onClick={v.reset} style={{ marginTop: "8px", minHeight: "50px", padding: "0 26px", borderRadius: "999px", border: "2px solid #0B1220", background: "transparent", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Start another</button>
                  </div>
                </>
              ) : null}
              {v.notSent ? (
                <>
                  <div className="m-evt-seg" role="radiogroup" aria-label="What do you need?" style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "6px", borderRadius: "20px", background: "#EEF0F3" }}>
                    {(v.bkTabs || []).map((b, bI) => (
                      <Fragment key={bI}>
                        <button type="button" role="radio" aria-checked={b.sel} onClick={b.pick} style={{ flex: "1 1 150px", minHeight: "48px", padding: "0 14px", borderRadius: "999px", border: "0", background: b.bg, color: b.fg, boxShadow: b.sh, fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", cursor: "pointer" }}>{b.label}</button>
                      </Fragment>
                    ))}
                  </div>
                  <form className="m-evt-form" onSubmit={v.submit} style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "18px 20px" }}>
                    <fieldset style={{ gridColumn: "1 / -1", margin: "0", padding: "0", border: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <legend style={{ padding: "0", marginBottom: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>{v.bk?.typeLabel}</legend>
                      <div className="m-evt-types" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {(v.bk?.types || []).map((o, oI) => (
                          <Fragment key={oI}>
                            <button type="button" aria-pressed={o.pressed} onClick={o.pick} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: `2px solid ${o.bd}`, background: o.bg, color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>{o.t}</button>
                          </Fragment>
                        ))}
                      </div>
                    </fieldset>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>{v.bk?.orgLabel} <input className="alm-input" type="text" name="company" placeholder={v.bk?.orgPh} style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", background: "#FFFFFF", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400", letterSpacing: "0" }} /></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Work email <input className="alm-input" type="email" name="email" placeholder="you@company.com" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", background: "#FFFFFF", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400", letterSpacing: "0" }} /></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Market <select className="alm-input" name="market" style={{ minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: "2px solid #D5DAE3", background: "#FFFFFF", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400", letterSpacing: "0" }}><option>New York</option><option>Hartford</option><option>Boston</option><option>Washington DC</option><option>Atlanta</option><option>Miami</option><option>Nashville</option><option>Detroit</option><option>Chicago</option><option>Austin</option><option>Los Angeles</option><option>Multiple markets</option></select></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Dates <input className="alm-input" type="text" name="dates" placeholder={v.bk?.datePh} style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", background: "#FFFFFF", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400", letterSpacing: "0" }} /></label>
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>{v.bk?.sizeLabel} <input className="alm-input" type="text" name="size" placeholder="Approximate" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", background: "#FFFFFF", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400", letterSpacing: "0" }} /></label>
                    <label style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>{v.bk?.notesLabel} <textarea className="alm-input" name="notes" rows="4" placeholder={v.bk?.notesPh} style={{ padding: "14px 16px", borderRadius: "12px", border: "2px solid #D5DAE3", background: "#FFFFFF", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400", letterSpacing: "0", resize: "vertical" }} /></label>
                    <button type="submit" className="alm-btn" style={{ gridColumn: "1 / -1", minHeight: "58px", borderRadius: "999px", border: "0", background: "#FBAE4F", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Send request</button>
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
