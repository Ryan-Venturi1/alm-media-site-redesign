'use client';

// Ported from the design-canvas artboard Insights.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import { sendInquiry } from '@/lib/inquiry';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

export default class InsightsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderVals() {
    var self = this;
    var st = this.state || {};
    var B = '';
    var fq = st.fq || '';
    var open = st.open == null ? 0 : st.open;
    var faqData = [
      ['How do I buy advertising with A Lot Media?', 'Start a plan online with markets, formats and dates, or talk to our sales team. Campaigns can be a single format or a package built around your goals.'],
      ['How much does a campaign cost?', 'Rates are set per property and depend on market, format and flight. Start a plan and we will confirm availability and pricing.'],
      ['Where is the network?', '12,000 locations across 400+ cities and 40 states, with digital networks live in New York and Connecticut and static placements in Los Angeles, Chicago, Miami, Austin and Boston.'],
      ['Can you target a specific audience?', 'Yes — by profession, income, age, gender, car type and even specific companies, using Geopath, DOT and US Census data, Wi-Fi beacons and on-site data.'],
      ['Do you produce the creative?', 'Yes. Our in-house design team can create campaigns built for the parking context, and we handle printing and installation. Digital screens take JPEG, PDF and MP4 files.'],
      ['How is performance reported?', 'Every placement is documented with proof-of-performance photos, and digital creative can be updated at any time. Expanded measurement — exposure and dwell metrics and campaign dashboards — is on our technology roadmap.'],
      ['Can I buy programmatically?', 'Digital screen space that owners opt in can be offered through programmatic exchanges. Every campaign is approved by A Lot Media first — nothing illicit, such as tobacco, alcohol, cannabis or adult entertainment.'],
      ['Do you run events?', 'Yes. Event activation, VIP park & shuttle, bulk parking, temporary and mobile media, and sponsorship packages — sold together or on their own.'],
      ['I own a garage or lot. How do I join?', 'Request a free assessment on our Real Estate page. We install our equipment and sell the advertising, and you receive a percentage of the gross revenue, shared quarterly — with no risk to you.']
    ];
    var ql = fq.trim().toLowerCase();
    var fl = faqData.map(function (f, i) { return { f: f, i: i }; }).filter(function (x) { return !ql || (x.f[0] + ' ' + x.f[1]).toLowerCase().indexOf(ql) >= 0; });
    var W = 'https://www.alotmedia.com/';
    var posts = [
      ['ADVERTISING', 'Why Advertise in a Garage?', 'why-advertise-in-a-garage/', '/media/photos/panera-now-open.webp?v=2fa97a26', '60% 50%'],
      ['EVENTS', 'The Event Space of the Future', 'the-event-space-of-the-future/', '/media/photos/stock-car-event.webp?v=d303b124', '55% 50%'],
      ['REAL ESTATE', 'Goodbye Garage, Hello Mobility Hub', 'goodbye-garage-hello-mobility-hub/', '/media/photos/msk-garage-entrance.webp?v=a0e27476', '50% 50%'],
      ['DIGITAL', 'Six Unique Benefits of Digital Out of Home Ads', 'six-unique-benefits-of-digital-out-of-home-ads/', '/media/photos/ddrb-connecticut.webp?v=088e4141', '50% 34%'],
      ['ADVERTISING', 'How To Reach Your Audience at High-Impact Times', 'how-to-reach-your-audience-at-high-impact-times/', '/media/photos/united-digital-panel.webp?v=366cb758', '19% 50%'],
      ['TECHNOLOGY', 'Smart Cities Infrastructure Beginning with Connected Parking Kiosks', 'smart-cities-infrastructure-beginning-with-connected-parking-kiosks/', '/media/photos/blank-street-interactive-panel.webp?v=6f1265ae', '30% 50%']
    ];
    var archive = [
      ['Everything You Need to Know About Drivers for 2022', 'everything-you-need-to-know-about-drivers-for-2022/'],
      ['Traffic is slowing down while personal vehicle sales are speeding up', 'traffic-is-slowing-down-while-personal-vehicle-sales-are-speeding-up/'],
      ['How to Use OOH Ad Space to Tell a Memorable Story', 'how-to-use-ooh-ad-space-to-tell-a-memorable-story/'],
      ['A New Era for Advertising', 'a-new-era-for-advertising/'],
      ['Advertising in a Garage Will Take Your Next Campaign into the Future', 'advertising-in-a-garage-will-take-your-next-campaign-into-the-future/'],
      ['This 1994 technology might be the best way to engage with customers in 2021!', 'this-1994-technology-might-be-the-best-way-to-engage-with-customers-in-2021/'],
      ['America is Driving Again', 'america-is-driving-again/']
    ];
    var terms = [
      ['OOH', 'Out-of-home advertising — any media people encounter outside the home, from billboards to garage screens.'],
      ['DOOH', 'Digital out-of-home: screens whose creative can change by time, audience or event.'],
      ['DDRB', 'Digital Dynamic Rate Board™ — our screen that shows live parking rates and advertising together.'],
      ['Dwell time', 'How long an audience stays in front of a placement. In our locations, up to ten minutes.'],
      ['Impressions', 'Estimated number of times an ad is seen, typically measured against Geopath data.'],
      ['Geopath', 'The out-of-home industry’s audience measurement standard.'],
      ['Wallscape', 'A large-format ad applied directly to a wall.'],
      ['Gate arm wrap', 'Branded wrap on the entry or exit barrier every car passes.'],
      ['Elevator wrap', 'Branded graphics applied to elevator doors.'],
      ['Flight', 'The dates a campaign runs.'],
      ['Garage takeover', 'Every available surface in a location carrying one brand.'],
      ['Market domination', 'Owning multiple formats across a market at once for maximum share of voice.'],
      ['Programmatic', 'Buying digital inventory automatically through ad-tech platforms.'],
      ['CPM', 'Cost per thousand impressions.'],
      ['Proof of performance', 'Photos that document an ad running in place, taken for every placement.'],
      ['Device Hub', 'Our content and device management system for rate boards and screens.']
    ];
    return {
      fq: fq,
      setFq: function (e) { self.setState({ fq: e.target.value }); },
      faqs: fl.map(function (x) {
        var isOpen = x.i === open || (ql && fl.length <= 2);
        return { q: x.f[0], a: x.f[1], open: isOpen, expanded: isOpen ? 'true' : 'false', sign: isOpen ? '−' : '+', toggle: function () { self.setState({ open: x.i === open ? -1 : x.i }); } };
      }),
      posts: posts.map(function (p) { return { cat: p[0], title: p[1], meta: 'READ ON ALOTMEDIA.COM', href: W + p[2], img: B + p[3], pos: p[4] }; }),
      archive: archive.map(function (a) { return { title: a[0], href: W + a[1] }; }),
      terms: terms.map(function (t) { return { term: t[0], def: t[1] }; }),
      subbed: !!st.subbed,
      notSubbed: !st.subbed,
      sub: function (e) { if (e && e.preventDefault) e.preventDefault(); sendInquiry(e, 'newsletter', null); self.setState({ subbed: true }); }
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="insights" />
        <section className="alm-pt" style={{ padding: "104px 28px 64px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Insights</div>
            <h1 className="alm-rise" style={{ margin: "22px 0 0", maxWidth: "1200px", fontSize: "clamp(44px, 7vw, 112px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600", animationDelay: ".1s" }}>News, resources<br />&amp; answers.</h1>
            <nav className="alm-rise m-ins-seg" aria-label="Insights sections" style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "8px", animationDelay: ".2s" }}>
              <A href="#news" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: "2px solid #0B1220", fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em" }}>NEWS &amp; RESOURCES</A>
              <A href="#faq" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: "2px solid #0B1220", fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em" }}>FAQ</A>
              <A href="#glossary" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: "2px solid #0B1220", fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em" }}>GLOSSARY</A>
            </nav>
          </div>
        </section>
        {/* NEWS */}
        <section className="alm-pb" id="news" style={{ padding: "0 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <A className="alm-tile alm-in m-ins-feat" href="/advertisers" style={{ display: "flex", flexWrap: "wrap", background: "#0B1220", color: "#FFFFFF", borderRadius: "18px", overflow: "hidden" }}>
              <div className="m-ins-featimg" style={{ flex: "3 1 560px", minHeight: "460px", overflow: "hidden" }}>
                <img src="/media/photos/hartford-healthcare-wallscape.webp?v=0b3f98d9" alt="Hartford HealthCare wallscape inside a Connecticut parking garage" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
              </div>
              <div className="m-ins-feattext" style={{ flex: "2 1 380px", padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "32px" }}>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#FBAE4F" }}>FEATURED · CASE STUDY</div>
                  <div className="m-ins-feath" style={{ marginTop: "16px", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: "600", lineHeight: "0.98", letterSpacing: "-0.035em" }}>Hartford HealthCare: 30 Connecticut garages, renewed for five more years.</div>
                  <p style={{ margin: "16px 0 0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#C9D0DB" }}>Signed in 2019 to reach decision makers across the state — and more than $1.5M of value created for our parking partners.</p>
                </div>
                <div style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em" }}>Read the case study →</div>
              </div>
            </A>
            <div className="m-ins-posts" style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "16px" }}>
              {(v.posts || []).map((p, pI) => (
                <Fragment key={pI}>
                  <A className="alm-tile alm-in m-ins-post" href={p.href} style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: "16px", overflow: "hidden" }}>
                    <div className="m-ins-postimg" style={{ height: "220px", overflow: "hidden", background: "#0B1220" }}>
                      <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos, display: "block" }} loading="lazy" decoding="async" />
                    </div>
                    <div className="m-ins-posttext" style={{ padding: "24px 26px 28px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                      <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#C2630A" }}>{p.cat}</div>
                      <div className="m-ins-posth" style={{ fontSize: "21px", fontWeight: "650", lineHeight: "1.1", letterSpacing: "-0.02em" }}>{p.title}</div>
                      <div style={{ marginTop: "auto", paddingTop: "8px", fontSize: "12px", fontWeight: "700", color: "#4E586A" }}>{p.meta}</div>
                    </div>
                  </A>
                </Fragment>
              ))}
            </div>
            <div style={{ marginTop: "40px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>MORE FROM THE ARCHIVE</div>
            <ul style={{ margin: "12px 0 0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "0 40px", borderTop: "2px solid #0B1220" }}>
              {(v.archive || []).map((a, aI) => (
                <Fragment key={aI}>
                  <li style={{ borderBottom: "1px solid rgba(11,18,32,0.14)" }}>
                    <A className="alm-link" href={a.href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", minHeight: "64px", padding: "14px 0", fontSize: "16px", fontWeight: "600" }}>{a.title} <span className="alm-arrow" style={{ flex: "0 0 auto", display: "inline-block", color: "#C2630A" }}>→</span></A>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
        </section>
        {/* FAQ */}
        <section className="alm-pt alm-pb" id="faq" style={{ padding: "128px 28px", background: "#0B1220", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "48px 64px" }}>
            <div style={{ flex: "1 1 360px" }}>
              <h2 className="alm-in" style={{ margin: "0", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Frequently asked.</h2>
              <label style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", padding: "0 18px", borderRadius: "999px", background: "#FFFFFF", color: "#0B1220" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>Search questions</span>
                <input type="text" value={v.fq} onInput={v.setFq} onChange={v.setFq} placeholder="Search questions" style={{ flex: "1", minWidth: "0", height: "52px", border: "0", outline: "none", background: "transparent", fontFamily: "'Montserrat', sans-serif", fontSize: "16px", fontWeight: "400", color: "#0B1220" }} name="search_questions" />
              </label>
            </div>
            <div style={{ flex: "2 1 560px", borderTop: "3px solid #FBAE4F" }}>
              {(v.faqs || []).map((q, qI) => (
                <Fragment key={qI}>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.16)" }}>
                    <button type="button" aria-expanded={q.expanded} onClick={q.toggle} style={{ width: "100%", minHeight: "76px", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", border: "0", background: "transparent", color: "#FFFFFF", fontFamily: "'Montserrat', sans-serif", fontSize: "18px", fontWeight: "600", textAlign: "left", cursor: "pointer" }}>
                      <span>{q.q}</span>
                      <span style={{ flex: "0 0 auto", width: "36px", height: "36px", borderRadius: "50%", border: "2px solid #FBAE4F", color: "#FBAE4F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{q.sign}</span>
                    </button>
                    {q.open ? (
                      <>
                        <p className="m-ins-ans" style={{ margin: "0", padding: "0 60px 24px 0", fontSize: "16px", lineHeight: "1.65", fontWeight: "400", color: "#C9D0DB" }}>{q.a}</p>
                      </>
                    ) : null}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* GLOSSARY */}
        <section className="alm-pt alm-pb" id="glossary" style={{ padding: "128px 28px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <h2 className="alm-in" style={{ margin: "0", fontSize: "clamp(38px, 5.2vw, 80px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Glossary</h2>
            <dl style={{ margin: "48px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "0 40px", borderTop: "3px solid #0B1220" }}>
              {(v.terms || []).map((t, tI) => (
                <Fragment key={tI}>
                  <div style={{ padding: "24px 0", borderBottom: "1px solid rgba(11,18,32,0.14)" }}>
                    <dt style={{ fontSize: "18px", fontWeight: "700" }}>{t.term}</dt>
                    <dd style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>{t.def}</dd>
                  </div>
                </Fragment>
              ))}
            </dl>
          </div>
        </section>
        {/* NEWSLETTER */}
        <section className="alm-pb" style={{ padding: "0 28px 128px" }}>
          <div className="m-ins-news" style={{ maxWidth: "1360px", margin: "0 auto", padding: "56px", borderRadius: "18px", background: "#344567", color: "#FFFFFF", display: "flex", flexWrap: "wrap", gap: "32px 48px", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ maxWidth: "560px" }}>
              <div className="m-ins-news-h" style={{ fontSize: "clamp(28px, 3.4vw, 48px)", fontWeight: "600", lineHeight: "0.95", letterSpacing: "-0.035em" }}>The parking media briefing.</div>
              <div style={{ marginTop: "12px", fontSize: "16px", fontWeight: "400", color: "#D5DAE3" }}>New markets, formats and campaign news from A Lot Media.</div>
            </div>
            {v.subbed ? (
              <>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#FBAE4F" }}>YOU’RE ON THE LIST.</div>
              </>
            ) : null}
            {v.notSubbed ? (
              <>
                <form className="m-ins-form" onSubmit={v.sub} style={{ flex: "1 1 380px", maxWidth: "520px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <label style={{ flex: "1 1 240px", display: "flex" }}>
                    <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>Email</span>
                    <input className="alm-input" type="email" placeholder="you@company.com" style={{ flex: "1", minHeight: "56px", padding: "0 18px", borderRadius: "8px", border: "2px solid transparent", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="email" />
                  </label>
                  <button type="submit" className="alm-btn" style={{ minHeight: "56px", padding: "0 26px", borderRadius: "999px", border: "0", background: "#FBAE4F", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Subscribe</button>
                </form>
              </>
            ) : null}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
