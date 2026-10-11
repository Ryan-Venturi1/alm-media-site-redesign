'use client';

// Site header. Ported from the design-canvas artboard Nav.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import A from '@/components/SmartLink';
import { startMotion } from '@/lib/motion';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // The header mounts once per page, so it owns the page's scroll motion.
    this.stopMotion = startMotion(this);
  }

  componentWillUnmount() {
    if (this.stopMotion) this.stopMotion();
  }

  renderVals() {
    var self = this;
    var active = this.props.active || 'home';
    var biz = [
      { ids: ['static', 'formats'], label: 'Static media', href: '/formats#static', dot: '#FFFFFF' },
      { ids: ['digital', 'formats'], label: 'Digital', href: '/formats#digital', dot: '#8FDCE8' },
      { ids: ['events'], label: 'Events & venues', href: '/events', dot: '#FBAE4F' }
    ];
    var items = [
      { ids: ['network'], label: 'Locations', href: '/locations' },
      { ids: ['owners'], label: 'Real estate', href: '/real-estate' },
      { ids: ['investors'], label: 'Investors', href: '/investors' }
    ];
    var map = function (it) {
      var on = it.ids.indexOf(active) !== -1;
      return { label: it.label, href: it.href, dot: it.dot || '', color: on ? '#FFFFFF' : 'rgba(255,255,255,0.78)', bg: on ? 'rgba(255,255,255,0.1)' : 'transparent' };
    };
    if (!this._refs) {
      this._refs = {
        bar: function (el) { self.bar = el; },
        head: function (el) { self.head = el; }
      };
    }
    return { biz: biz.map(map), links: items.map(map), barRef: this._refs.bar, headRef: this._refs.head };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <header className="alm-nav-head" ref={v.headRef} style={{ fontFamily: "'Montserrat', system-ui, sans-serif", color: "#FFFFFF", background: "#070C17", WebkitFontSmoothing: "antialiased" }}>
        <div className="alm-nav-util" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 28px", minHeight: "34px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2px 24px", fontSize: "12px", fontWeight: "500" }}>
            <nav aria-label="Audience" style={{ display: "flex", gap: "22px", flexWrap: "wrap" }}>
              <A className="alm-nl" href="/advertisers" style={{ color: "rgba(255,255,255,0.62)", textDecoration: "none", padding: "9px 0" }}>Advertisers</A>
              <A className="alm-nl" href="/events#book" style={{ color: "rgba(255,255,255,0.62)", textDecoration: "none", padding: "9px 0" }}>Event organizers</A>
              <A className="alm-nl" href="/real-estate" style={{ color: "rgba(255,255,255,0.62)", textDecoration: "none", padding: "9px 0" }}>Property owners</A>
              <A className="alm-nl" href="/investors" style={{ color: "rgba(255,255,255,0.62)", textDecoration: "none", padding: "9px 0" }}>Investors</A>
            </nav>
            <div style={{ display: "flex", gap: "22px", flexWrap: "wrap", alignItems: "center" }}>
              <A className="alm-nl" href="tel:18607169084" style={{ color: "rgba(255,255,255,0.62)", textDecoration: "none", padding: "9px 0" }}>1.860.716.9084</A>
              <A className="alm-nl" href="/company" style={{ color: "rgba(255,255,255,0.62)", textDecoration: "none", padding: "9px 0" }}>Company</A>
              <A className="alm-nl" href="/contact" style={{ color: "rgba(255,255,255,0.62)", textDecoration: "none", padding: "9px 0" }}>Contact</A>
              <A className="alm-nl" href="/insights" style={{ color: "rgba(255,255,255,0.62)", textDecoration: "none", padding: "9px 0" }}>News &amp; FAQ</A>
            </div>
          </div>
        </div>
        <div className="alm-nav-bar" ref={v.barRef} style={{ position: "relative", background: "rgba(11,18,32,0.92)", backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 28px", minHeight: "68px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px 28px" }}>
            <A href="/" aria-label="A Lot Media home" style={{ display: "inline-flex", padding: "14px 0" }}>
              <img src="/media/brand/alm-logo.png" alt="A Lot Media" style={{ height: "34px", width: "auto", display: "block" }} />
            </A>
            <nav className="alm-nav-links" aria-label="Primary" style={{ flex: "1 1 560px", minWidth: "0", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2px", overflowX: "auto" }}>
              {(v.biz || []).map((l, lI) => (
                <Fragment key={lI}>
                  <A className="alm-nl" href={l.href} style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 12px", borderRadius: "999px", background: l.bg, fontSize: "14px", fontWeight: "500", textDecoration: "none", color: l.color, whiteSpace: "nowrap" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: l.dot }} />{l.label}</A>
                </Fragment>
              ))}
              <span aria-hidden="true" style={{ flex: "0 0 1px", alignSelf: "center", height: "18px", margin: "0 8px", background: "rgba(255,255,255,0.16)" }} />
              {(v.links || []).map((l, lI) => (
                <Fragment key={lI}>
                  <A className="alm-nl" href={l.href} style={{ flex: "0 0 auto", padding: "10px 12px", borderRadius: "999px", background: l.bg, fontSize: "14px", fontWeight: "500", textDecoration: "none", color: l.color, whiteSpace: "nowrap" }}>{l.label}</A>
                </Fragment>
              ))}
            </nav>
            <A className="alm-ncta" href="/plan" style={{ display: "inline-flex", alignItems: "center", minHeight: "40px", padding: "0 20px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "14px", textDecoration: "none", whiteSpace: "nowrap" }}>Plan a campaign</A>
          </div>
          <span className="alm-nav-prog" aria-hidden="true" />
        </div>
      </header>
    );
  }
}
