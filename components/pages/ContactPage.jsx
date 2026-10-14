'use client';

// Ported from the design-canvas artboard Contact.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import { sendInquiry } from '@/lib/inquiry';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

export default class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderVals() {
    var self = this;
    var st = this.state || {};
    var ri = st.r || 0;
    var R = [
      { label: 'Advertiser', sub: 'Brand or agency', team: 'sales team', f1: 'COMPANY', p1: 'Brand or agency', f2: 'MARKETS OF INTEREST', p2: 'e.g. New York, Boston', pm: 'Goals, timing and budget range.' },
      { label: 'Property owner', sub: 'Garage or lot', team: 'real estate team', f1: 'PROPERTY ADDRESS', p1: 'Street, city, state', f2: 'NUMBER OF SPACES', p2: 'e.g. 450', pm: 'Tell us about the location.' },
      { label: 'Investor', sub: 'Fund or family office', team: 'leadership team', f1: 'FIRM', p1: 'Firm name', f2: 'INVESTOR TYPE', p2: 'VC, PE, strategic…', pm: 'What would you like to learn?' },
      { label: 'Press & careers', sub: 'Media or job seekers', team: 'communications team', f1: 'ORGANIZATION', p1: 'Outlet or current role', f2: 'TOPIC', p2: 'Story, interview or role', pm: 'How can we help?' }
    ];
    var cur = R[ri];
    return {
      routes: R.map(function (r, i) {
        var on = i === ri;
        return { label: r.label, sub: r.sub, checked: on ? 'true' : 'false', bg: on ? '#0B1220' : '#FFFFFF', fg: on ? '#FFFFFF' : '#0B1220', bd: on ? '#0B1220' : '#D5DAE3', pick: function () { self.setState({ r: i }); } };
      }),
      route: { team: cur.team, teamUpper: cur.team.toUpperCase(), f1: cur.f1, p1: cur.p1, f2: cur.f2, p2: cur.p2, pm: cur.pm },
      sent: !!st.sent,
      notSent: !st.sent,
      submit: function (e) { if (e && e.preventDefault) e.preventDefault(); sendInquiry(e, 'contact', { i_am: cur.label }); self.setState({ sent: true }); },
      reset: function () { self.setState({ sent: false }); }
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
        <Nav active="contact" />
        <section className="alm-pt alm-pb" style={{ padding: "96px 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "56px" }}>
            <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column" }}>
              <div className="alm-rise" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Contact</div>
              <h1 className="alm-rise" style={{ margin: "22px 0 0", fontSize: "clamp(48px, 6.4vw, 104px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600", animationDelay: ".1s" }}>Let’s talk.</h1>
              <p className="alm-rise" style={{ margin: "24px 0 0", maxWidth: "480px", fontSize: "18px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A", animationDelay: ".2s" }}>Tell us who you are and we’ll route you to the right team — sales, real estate or investor relations.</p>
              <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", borderTop: "3px solid #0B1220" }}>
                <A href="tel:18607169084" className="m-ct-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderBottom: "1px solid rgba(11,18,32,0.14)" }}>
                  <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>CALL</span>
                  <span className="m-ct-val" style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>1.860.716.9084</span>
                </A>
                <A href="mailto:team@alotmedia.com" className="m-ct-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderBottom: "1px solid rgba(11,18,32,0.14)" }}>
                  <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#4E586A" }}>EMAIL</span>
                  <span className="m-ct-val" style={{ fontSize: "22px", fontWeight: "650", letterSpacing: "-0.02em" }}>team@alotmedia.com</span>
                </A>
              </div>
              <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "700" }}>Hartford</div>
                  <div style={{ marginTop: "6px", fontSize: "14px", lineHeight: "1.55", fontWeight: "500", color: "#4E586A" }}>1 Financial Plaza, <span className="m-ct-nb">14th Fl</span><br />CT 06103</div>
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "700" }}>Los Angeles</div>
                  <div style={{ marginTop: "6px", fontSize: "14px", lineHeight: "1.55", fontWeight: "500", color: "#4E586A" }}>1335 Flower St<br />CA 90015</div>
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "700" }}>Chicago</div>
                  <div style={{ marginTop: "6px", fontSize: "14px", lineHeight: "1.55", fontWeight: "500", color: "#4E586A" }}>33 W Monroe St<br />IL 60603</div>
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "700" }}>New York</div>
                  <div style={{ marginTop: "6px", fontSize: "14px", lineHeight: "1.55", fontWeight: "500", color: "#4E586A" }}>231 W 29th St<br />NY 10001</div>
                </div>
              </div>
              <div style={{ marginTop: "40px", flex: "1", minHeight: "260px", borderRadius: "18px", overflow: "hidden", background: "#0B1220" }}>
                <img src="/media/photos/stock-nyc-trails.webp?v=99f803ae" alt="Manhattan skyline with highway light trails at night" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="m-ct-card" style={{ flex: "1 1 560px", minWidth: "0", padding: "40px", borderRadius: "18px", background: "#FFFFFF" }}>
              {v.sent ? (
                <>
                  <div style={{ minHeight: "600px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#FBAE4F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </div>
                    <div style={{ fontSize: "36px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Message sent.</div>
                    <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Routed to our {v.route?.team}.</p>
                    <button type="button" onClick={v.reset} style={{ alignSelf: "flex-start", marginTop: "8px", minHeight: "50px", padding: "0 26px", borderRadius: "999px", border: "2px solid #0B1220", background: "transparent", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Send another</button>
                  </div>
                </>
              ) : null}
              {v.notSent ? (
                <>
                  <form onSubmit={v.submit}>
                    <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em" }}>I’M A…</div>
                    <div className="m-ct-routes" role="radiogroup" aria-label="Who you are" style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "8px" }}>
                      {(v.routes || []).map((r, rI) => (
                        <Fragment key={rI}>
                          <button type="button" role="radio" aria-checked={r.checked} onClick={r.pick} style={{ minHeight: "84px", padding: "14px 16px", borderRadius: "18px", border: `2px solid ${r.bd}`, background: r.bg, color: r.fg, fontFamily: "'Montserrat', sans-serif", textAlign: "left", cursor: "pointer" }}>
                            <div style={{ fontSize: "15px", fontWeight: "700" }}>{r.label}</div>
                            <div style={{ marginTop: "4px", fontSize: "12px", fontWeight: "600", opacity: "0.8" }}>{r.sub}</div>
                          </button>
                        </Fragment>
                      ))}
                    </div>
                    <div className="m-ct-fields" style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px 20px" }}>
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Full name<input className="alm-input" type="text" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="full_name" /></label>
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Work email<input className="alm-input" type="email" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="work_email" /></label>
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>{v.route?.f1}<input className="alm-input" type="text" placeholder={v.route?.p1} style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name={(v.route?.f1 || "detail").toLowerCase().replace(/ /g, "_")} /></label>
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>{v.route?.f2}<input className="alm-input" type="text" placeholder={v.route?.p2} style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name={(v.route?.f2 || "more").toLowerCase().replace(/ /g, "_")} /></label>
                      <label style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Message<textarea className="alm-input" rows="5" placeholder={v.route?.pm} style={{ padding: "14px 16px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400", resize: "vertical" }} name="message" /></label>
                    </div>
                    <button type="submit" className="alm-btn" style={{ marginTop: "24px", width: "100%", minHeight: "60px", borderRadius: "999px", border: "0", background: "#FBAE4F", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Send to our {v.route?.team}</button>
                    <div style={{ marginTop: "16px", fontSize: "13px", fontWeight: "500", color: "#4E586A" }}>Already know your markets and formats? <A href="/plan" style={{ fontWeight: "600", color: "#0B1220", textDecoration: "underline" }}>Use the campaign planner</A>.</div>
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
