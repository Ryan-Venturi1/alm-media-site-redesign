'use client';

// Ported from the design-canvas artboard Footer.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import A from '@/components/SmartLink';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderVals() {
    return {};
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <footer style={{ fontFamily: "'Montserrat', system-ui, sans-serif", color: "#FFFFFF", background: "#070C17", WebkitFontSmoothing: "antialiased" }}>
        <div style={{ position: "relative", overflow: "hidden", background: "#0B1220" }}>
          <img src="/media/photos/stock-nyc-trails.webp" alt="" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 60%" }} loading="lazy" decoding="async" />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(7,12,23,0.92) 0%, rgba(7,12,23,0.6) 55%, rgba(7,12,23,0.35) 100%)" }} />
          <div style={{ position: "relative", maxWidth: "1360px", margin: "0 auto", padding: "128px 28px", display: "flex", flexWrap: "wrap", gap: "32px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
            <h2 style={{ margin: "0", maxWidth: "860px", fontSize: "clamp(36px, 5vw, 76px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Put your brand where <span style={{ color: "#FBAE4F" }}>3,000,000 cars</span> park every day.</h2>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <A href="/plan" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", textDecoration: "none" }}>Plan a campaign</A>
              <A href="/contact" style={{ display: "inline-flex", alignItems: "center", minHeight: "56px", padding: "0 26px", borderRadius: "999px", border: "2px solid #FFFFFF", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", textDecoration: "none" }}>Let’s talk</A>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "80px 28px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "48px 32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <img src="/media/brand/alm-logo.png" alt="A Lot Media" style={{ height: "48px", width: "auto", alignSelf: "flex-start" }} loading="lazy" decoding="async" />
              <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.65", fontWeight: "500", color: "#A3ACBC" }}>The premier out-of-home advertising company specializing in parking lots and garages. Designing and installing since 2016.</p>
              <A href="mailto:team@alotmedia.com" style={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF", textDecoration: "none" }}>team@alotmedia.com</A>
              <A href="tel:18607169084" style={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF", textDecoration: "none" }}>1.860.716.9084</A>
            </div>
            <nav aria-label="What we do" style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", fontWeight: "500" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#FBAE4F", marginBottom: "4px" }}>WHAT WE DO</div>
              <A href="/formats#static" style={{ color: "#D5DAE3", textDecoration: "none" }}>Static media</A>
              <A href="/formats#digital" style={{ color: "#D5DAE3", textDecoration: "none" }}>Digital screens</A>
              <A href="/events" style={{ color: "#D5DAE3", textDecoration: "none" }}>Events &amp; venues</A>
              <A href="/advertisers" style={{ color: "#D5DAE3", textDecoration: "none" }}>Advertiser solutions</A>
              <A href="/locations" style={{ color: "#D5DAE3", textDecoration: "none" }}>Locations</A>
              <A href="/plan" style={{ color: "#D5DAE3", textDecoration: "none" }}>Plan a campaign</A>
            </nav>
            <nav aria-label="Real estate" style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", fontWeight: "500" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#FBAE4F", marginBottom: "4px" }}>REAL ESTATE</div>
              <A href="/real-estate" style={{ color: "#D5DAE3", textDecoration: "none" }}>Parking garage owners</A>
              <A href="/real-estate" style={{ color: "#D5DAE3", textDecoration: "none" }}>Parking lot owners</A>
              <A href="/real-estate" style={{ color: "#D5DAE3", textDecoration: "none" }}>Digital Dynamic Rate Board™</A>
              <A href="/real-estate#streams" style={{ color: "#D5DAE3", textDecoration: "none" }}>Host events on your property</A>
              <A href="/real-estate" style={{ color: "#D5DAE3", textDecoration: "none" }}>Get your property assessed</A>
            </nav>
            <nav aria-label="Company" style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", fontWeight: "500" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#FBAE4F", marginBottom: "4px" }}>COMPANY</div>
              <A href="/company" style={{ color: "#D5DAE3", textDecoration: "none" }}>About &amp; gallery</A>
              <A href="/investors" style={{ color: "#D5DAE3", textDecoration: "none" }}>Investors</A>
              <A href="/insights" style={{ color: "#D5DAE3", textDecoration: "none" }}>News &amp; resources</A>
              <A href="/insights" style={{ color: "#D5DAE3", textDecoration: "none" }}>FAQ &amp; glossary</A>
              <A href="/contact" style={{ color: "#D5DAE3", textDecoration: "none" }}>Contact</A>
            </nav>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#FBAE4F", marginBottom: "4px" }}>OFFICES</div>
              <div style={{ lineHeight: "1.55" }}>
                <div style={{ fontWeight: "600" }}>Hartford</div>
                <div style={{ color: "#A3ACBC", fontWeight: "500" }}>1 Financial Plaza, 14th Fl, CT 06103</div>
              </div>
              <div style={{ lineHeight: "1.55" }}>
                <div style={{ fontWeight: "600" }}>Los Angeles</div>
                <div style={{ color: "#A3ACBC", fontWeight: "500" }}>1335 Flower St, CA 90015</div>
              </div>
              <div style={{ lineHeight: "1.55" }}>
                <div style={{ fontWeight: "600" }}>Chicago</div>
                <div style={{ color: "#A3ACBC", fontWeight: "500" }}>33 W Monroe St, IL 60603</div>
              </div>
              <div style={{ lineHeight: "1.55" }}>
                <div style={{ fontWeight: "600" }}>New York</div>
                <div style={{ color: "#A3ACBC", fontWeight: "500" }}>231 W 29th St, NY 10001</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "72px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.10)", display: "flex", flexWrap: "wrap", gap: "16px 32px", justifyContent: "space-between", fontSize: "13px", fontWeight: "500", color: "#8B95A7" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
              <span>© 2026 A Lot Media</span>
              <A href="https://www.alotmedia.com/privacy-policy/" style={{ color: "#8B95A7", textDecoration: "none" }}>Privacy policy</A>
              <A href="https://www.alotmedia.com/terms-conditions/" style={{ color: "#8B95A7", textDecoration: "none" }}>Terms &amp; conditions</A>
              <A href="/" style={{ color: "#8B95A7", textDecoration: "none" }}>Sitemap</A>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
              <A href="https://www.linkedin.com/company/a-lot-media/" style={{ color: "#8B95A7", textDecoration: "none" }}>LinkedIn</A>
              <A href="https://www.instagram.com/alotmedia/" style={{ color: "#8B95A7", textDecoration: "none" }}>Instagram</A>
              <A href="https://www.facebook.com/p/A-Lot-Media-100063648526986/" style={{ color: "#8B95A7", textDecoration: "none" }}>Facebook</A>
              <A href="https://www.youtube.com/@alotmediala5587" style={{ color: "#8B95A7", textDecoration: "none" }}>YouTube</A>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
