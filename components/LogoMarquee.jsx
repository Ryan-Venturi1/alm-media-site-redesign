'use client';

// Ported from the design-canvas artboard LogoMarquee.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import A from '@/components/SmartLink';

export default class LogoMarquee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderVals() {
    var props = this.props || {};
    var tone = props.tone === 'light' ? 'light' : 'dark';
    var B = '';
    var all = [
      ['Citibank', '/media/logos/citibank.png'], ['Anheuser-Busch', '/media/logos/anheuser-busch.png'], ['Allstate', '/media/logos/allstate.png'],
      ['Panera Bread', '/media/logos/panera.png'], ['eBay', '/media/logos/ebay.png'], ['Gatorade', '/media/logos/gatorade.png'],
      ['General Mills', '/media/logos/general-mills.png'], ['New York Yankees', '/media/logos/yankees.png'], ['Live Nation', '/media/logos/live-nation.png'],
      ['Optum', '/media/logos/optum.png'], ['Renault', '/media/logos/renault.png'], ['Rimowa', '/media/logos/rimowa.png'],
      ['The Peninsula Hotels', '/media/logos/peninsula-hotels.png'], ['Hartford HealthCare', '/media/logos/hartford-healthcare.png'], ['NetApp', '/media/logos/netapp.png'],
      ['Bumble', '/media/logos/bumble.png'], ['FILA', '/media/logos/fila.png'], ['Lucky Charms', '/media/logos/lucky-charms.png'],
      ['Getaround', '/media/logos/getaround.png'], ['Blank Street', '/media/logos/blank-street.png'], ['CubeSmart', '/media/logos/cubesmart.png'],
      ['IFC Center', '/media/logos/ifc-center.png'], ['Pinehurst', '/media/logos/pinehurst.png'], ['VNS Health', '/media/logos/vns-health.png'],
      ['Big Apple Circus', '/media/logos/big-apple-circus.png'], ['STP', '/media/logos/stp.png'], ['Lucas Oil', '/media/logos/lucas-oil.png'],
      ['Recess', '/media/logos/recess.png'], ['Vertex', '/media/logos/vertex.png'], ['Moke', '/media/logos/moke.png'],
      ['A Beautiful Noise', '/media/logos/a-beautiful-noise.png'], ['Dr. Barbara Sturm', '/media/logos/barbara-sturm.png'], ['Chubbies', '/media/logos/chubbies.png'],
      ['GoHealth Urgent Care', '/media/logos/gohealth.png'], ['Greg Yüna', '/media/logos/greg-yuna.png'], ['Malibu Mylk', '/media/logos/malibu-mylk.png'],
      ['Marlo Laz', '/media/logos/marlo-laz.png'], ['OANDA', '/media/logos/oanda.png'], ['Planned Parenthood', '/media/logos/planned-parenthood.png'],
      ['PulsePoint', '/media/logos/pulsepoint.png'], ['Rise Brewing Co.', '/media/logos/rise.png'], ['Sophia', '/media/logos/sophia.png'],
      ['Summers', '/media/logos/summers.png'], ['Sweet Home Alabama', '/media/logos/sweet-home-alabama.png'], ['Temptations', '/media/logos/temptations.png'],
      ['UC Riverside', '/media/logos/uc-riverside.png'], ['Urban Air', '/media/logos/urban-air.png'], ['Wizest', '/media/logos/wizest.png']
    ].map(function (l) { return { name: l[0], src: B + l[1] }; });
    var double = String(props.rows == null ? '2' : props.rows) !== '1';
    // Interleave so big national names are spread across both rows
    var a = [], b = [];
    all.forEach(function (l, i) { (i % 2 === 0 ? a : b).push(l); });
    return {
      t: tone === 'dark'
        ? { bg: '#0B1220', fg: '#FFFFFF', mute: '#A3ACBC', line: 'rgba(255,255,255,0.08)', filter: 'brightness(0) invert(1)', op: 0.72 }
        : { bg: '#F5F5F7', fg: '#0B1220', mute: '#4E586A', line: 'rgba(11,18,32,0.08)', filter: 'none', op: 0.8 },
      label: props.label || 'BRANDS THAT PARK WITH US',
      note: props.note == null ? 'Plus Coca-Cola, Ford, Samsung, Toyota, IKEA and more.' : props.note,
      double: double,
      rowA: double ? a : all,
      rowB: b
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <section className="alm-mq" aria-label="Brands that have advertised on the A Lot Media network" style={{ background: v.t?.bg, color: v.t?.fg, fontFamily: "'Montserrat', system-ui, sans-serif", padding: "48px 0 52px", overflow: "hidden", WebkitFontSmoothing: "antialiased", borderTop: `1px solid ${v.t?.line}` }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 28px", display: "flex", flexWrap: "wrap", gap: "12px 32px", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />{v.label}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: v.t?.mute }}>{v.note}</span>
            <A className="alm-mq-link" href="/advertisers" style={{ color: v.t?.fg, textDecoration: "none", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em" }}>CASE STUDIES <span className="alm-mq-arrow">→</span></A>
          </div>
        </div>
        <div className="alm-mq-row" style={{ marginTop: "36px", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)" }}>
          <div className="alm-mq-l" style={{ display: "flex", width: "max-content" }}>
            <ul style={{ display: "flex", alignItems: "center", margin: "0", padding: "0", listStyle: "none" }}>
              {(v.rowA || []).map((lg, lgI) => (
                <Fragment key={lgI}>
                  <li style={{ flex: "0 0 auto", height: "64px", padding: "0 34px", display: "flex", alignItems: "center" }}>
                    <img className="alm-mq-logo" src={lg.src} alt={lg.name} style={{ maxHeight: "38px", maxWidth: "150px", width: "auto", height: "auto", objectFit: "contain", display: "block", filter: v.t?.filter, opacity: v.t?.op }} />
                  </li>
                </Fragment>
              ))}
            </ul>
            <ul aria-hidden="true" style={{ display: "flex", alignItems: "center", margin: "0", padding: "0", listStyle: "none" }}>
              {(v.rowA || []).map((lg, lgI) => (
                <Fragment key={lgI}>
                  <li style={{ flex: "0 0 auto", height: "64px", padding: "0 34px", display: "flex", alignItems: "center" }}>
                    <img className="alm-mq-logo" src={lg.src} alt="" style={{ maxHeight: "38px", maxWidth: "150px", width: "auto", height: "auto", objectFit: "contain", display: "block", filter: v.t?.filter, opacity: v.t?.op }} />
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
        {v.double ? (
          <>
            <div className="alm-mq-row" style={{ marginTop: "14px", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)" }}>
              <div className="alm-mq-r" style={{ display: "flex", width: "max-content" }}>
                <ul style={{ display: "flex", alignItems: "center", margin: "0", padding: "0", listStyle: "none" }}>
                  {(v.rowB || []).map((lg, lgI) => (
                    <Fragment key={lgI}>
                      <li style={{ flex: "0 0 auto", height: "64px", padding: "0 34px", display: "flex", alignItems: "center" }}>
                        <img className="alm-mq-logo" src={lg.src} alt={lg.name} style={{ maxHeight: "38px", maxWidth: "150px", width: "auto", height: "auto", objectFit: "contain", display: "block", filter: v.t?.filter, opacity: v.t?.op }} />
                      </li>
                    </Fragment>
                  ))}
                </ul>
                <ul aria-hidden="true" style={{ display: "flex", alignItems: "center", margin: "0", padding: "0", listStyle: "none" }}>
                  {(v.rowB || []).map((lg, lgI) => (
                    <Fragment key={lgI}>
                      <li style={{ flex: "0 0 auto", height: "64px", padding: "0 34px", display: "flex", alignItems: "center" }}>
                        <img className="alm-mq-logo" src={lg.src} alt="" style={{ maxHeight: "38px", maxWidth: "150px", width: "auto", height: "auto", objectFit: "contain", display: "block", filter: v.t?.filter, opacity: v.t?.op }} />
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </section>
    );
  }
}
