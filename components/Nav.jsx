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
    var st = this.state || {};
    var open = !!st.menu;
    if (!this._menu) {
      this._menu = {
        open: function () { self.setState({ menu: true }); },
        close: function () { self.setState({ menu: false }); }
      };
    }
    var menuMain = biz.concat(items).map(function (it) {
      var on = it.ids.indexOf(active) !== -1;
      return { label: it.label, href: it.href, dot: it.dot || 'rgba(255,255,255,0.28)', color: on ? '#FBAE4F' : '#FFFFFF' };
    });
    var menuMore = [
      { label: 'Advertisers', href: '/advertisers' },
      { label: 'Event organizers', href: '/events#book' },
      { label: 'Company & gallery', href: '/company' },
      { label: 'News & FAQ', href: '/insights' },
      { label: 'Contact', href: '/contact' },
      { label: 'Formats & specs', href: '/formats' }
    ];
    return {
      biz: biz.map(map), links: items.map(map), barRef: this._refs.bar, headRef: this._refs.head,
      menuOpen: open, menuExpanded: open ? 'true' : 'false', openMenu: this._menu.open, closeMenu: this._menu.close,
      menuMain: menuMain, menuMore: menuMore
    };
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
              <img src="/media/brand/alm-logo.png?v=6fceb514" alt="A Lot Media" style={{ height: "34px", width: "auto", display: "block" }} />
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
            <div className="alm-nav-end" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <A className="alm-ncta" href="/plan" style={{ display: "inline-flex", alignItems: "center", minHeight: "40px", padding: "0 20px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "14px", textDecoration: "none", whiteSpace: "nowrap" }}>Plan a campaign</A>
              <button type="button" className="alm-nav-menu" aria-label="Open menu" aria-expanded={v.menuExpanded} onClick={v.openMenu} style={{ display: "none", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", padding: "0", border: "0", borderRadius: "999px", background: "rgba(255,255,255,0.1)", color: "#FFFFFF", cursor: "pointer" }}>
                <span aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <span style={{ display: "block", width: "18px", height: "2px", borderRadius: "1px", background: "#FFFFFF" }} />
                  <span style={{ display: "block", width: "18px", height: "2px", borderRadius: "1px", background: "#FFFFFF" }} />
                </span>
              </button>
            </div>
          </div>
          <span className="alm-nav-prog" aria-hidden="true" />
        </div>
        {v.menuOpen ? (
          <>
            <div className="alm-msheet" role="dialog" aria-modal="true" aria-label="Menu" style={{ position: "fixed", inset: "0", zIndex: "3000", display: "flex", flexDirection: "column", background: "#070C17", color: "#FFFFFF", overflowY: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", minHeight: "68px", padding: "0 20px 0 28px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <A href="/" aria-label="A Lot Media home" onClick={v.closeMenu} style={{ display: "inline-flex", padding: "14px 0" }}>
                  <img src="/media/brand/alm-logo.png?v=6fceb514" alt="A Lot Media" style={{ height: "30px", width: "auto", display: "block" }} />
                </A>
                <button type="button" aria-label="Close menu" onClick={v.closeMenu} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", padding: "0", border: "0", borderRadius: "999px", background: "rgba(255,255,255,0.1)", color: "#FFFFFF", fontSize: "22px", lineHeight: "1", cursor: "pointer" }}>×</button>
              </div>
              <nav aria-label="Menu" style={{ padding: "20px 28px 8px", display: "flex", flexDirection: "column" }}>
                {(v.menuMain || []).map((m, mI) => (
                  <Fragment key={mI}>
                    <A href={m.href} onClick={v.closeMenu} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", color: m.color, fontSize: "26px", fontWeight: "600", letterSpacing: "-0.03em", textDecoration: "none" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.dot }} />{m.label}</A>
                  </Fragment>
                ))}
              </nav>
              <nav aria-label="More" style={{ padding: "16px 28px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
                {(v.menuMore || []).map((m, mI) => (
                  <Fragment key={mI}>
                    <A href={m.href} onClick={v.closeMenu} style={{ padding: "12px 0", color: "rgba(255,255,255,0.72)", fontSize: "15px", fontWeight: "500", textDecoration: "none" }}>{m.label}</A>
                  </Fragment>
                ))}
              </nav>
              <div style={{ marginTop: "auto", padding: "28px", display: "grid", gap: "10px" }}>
                <A href="/plan" onClick={v.closeMenu} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "54px", borderRadius: "999px", background: "#FBAE4F", color: "#0B1220", fontWeight: "600", fontSize: "16px", textDecoration: "none" }}>Plan a campaign</A>
                <A href="tel:18607169084" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "54px", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.4)", color: "#FFFFFF", fontWeight: "600", fontSize: "16px", textDecoration: "none" }}>Call 1.860.716.9084</A>
              </div>
            </div>
          </>
        ) : null}
      </header>
    );
  }
}
