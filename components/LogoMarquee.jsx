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
      ['Chase', '/media/logos/chase.png?v=36175c78'], ['Clorox', '/media/logos/clorox.png?v=94b22c30'], ['McCormick', '/media/logos/mccormick.png?v=6482d04f'],
      ['Citibank', '/media/logos/citibank.png?v=4e895247'], ['Anheuser-Busch', '/media/logos/anheuser-busch.png?v=46d09486'], ['Allstate', '/media/logos/allstate.png?v=ddd0329f'],
      ['Panera Bread', '/media/logos/panera.png?v=5633a8b9'], ['eBay', '/media/logos/ebay.png?v=07a76120'], ['Gatorade', '/media/logos/gatorade.png?v=c1888be6'],
      ['General Mills', '/media/logos/general-mills.png?v=20a2b94e'], ['New York Yankees', '/media/logos/yankees.png?v=1860f7ef'], ['Live Nation', '/media/logos/live-nation.png?v=0184e138'],
      ['Optum', '/media/logos/optum.png?v=972ba8e4'], ['Renault', '/media/logos/renault.png?v=e4c6584d'], ['Rimowa', '/media/logos/rimowa.png?v=8a9dad9f'],
      ['The Peninsula Hotels', '/media/logos/peninsula-hotels.png?v=a252e99f'], ['Hartford HealthCare', '/media/logos/hartford-healthcare.png?v=d63767e1'], ['NetApp', '/media/logos/netapp.png?v=5e24d22a'],
      ['Corcoran', '/media/logos/corcoran.png?v=612f3cb7'], ['AriZona', '/media/logos/arizona.png?v=d155c443'], ['Avail', '/media/logos/avail.png?v=0248d690'],
      ['Bumble', '/media/logos/bumble.png?v=70070fb5'], ['FILA', '/media/logos/fila.png?v=eaa1cdc1'], ['Lucky Charms', '/media/logos/lucky-charms.png?v=e81a2cd1'],
      ['Getaround', '/media/logos/getaround.png?v=214c8213'], ['Blank Street', '/media/logos/blank-street.png?v=2c18d517'], ['CubeSmart', '/media/logos/cubesmart.png?v=fb3ad9e1'],
      ['IFC Center', '/media/logos/ifc-center.png?v=a68e9a22'], ['Pinehurst', '/media/logos/pinehurst.png?v=149ccd10'], ['VNS Health', '/media/logos/vns-health.png?v=70e65c7c'],
      ['Big Apple Circus', '/media/logos/big-apple-circus.png?v=e0b67887'], ['STP', '/media/logos/stp.png?v=bf97bbb4'], ['Lucas Oil', '/media/logos/lucas-oil.png?v=76cae19d'],
      ['Recess', '/media/logos/recess.png?v=709c3d68'], ['Vertex', '/media/logos/vertex.png?v=6888bc26'], ['Moke', '/media/logos/moke.png?v=f2751c10'],
      ['A Beautiful Noise', '/media/logos/a-beautiful-noise.png?v=4209fb83'], ['Dr. Barbara Sturm', '/media/logos/barbara-sturm.png?v=487b3939'], ['Chubbies', '/media/logos/chubbies.png?v=4823392f'],
      ['GoHealth Urgent Care', '/media/logos/gohealth.png?v=52d395d4'], ['Greg Yüna', '/media/logos/greg-yuna.png?v=36598325'], ['Malibu Mylk', '/media/logos/malibu-mylk.png?v=0d9f734e'],
      ['Marlo Laz', '/media/logos/marlo-laz.png?v=4fb3e784'], ['OANDA', '/media/logos/oanda.png?v=42ca2a90'], ['Planned Parenthood', '/media/logos/planned-parenthood.png?v=41440419'],
      ['PulsePoint', '/media/logos/pulsepoint.png?v=274f1425'], ['Rise Brewing Co.', '/media/logos/rise.png?v=abdc745b'], ['ÖDD', '/media/logos/odd.png?v=da197040'], ['Sophia', '/media/logos/sophia.png?v=63763d12'],
      ['Summers', '/media/logos/summers.png?v=30c80830'], ['Sweet Home Alabama', '/media/logos/sweet-home-alabama.png?v=2681a39d'], ['Temptations', '/media/logos/temptations.png?v=feab304c'],
      ['UC Riverside', '/media/logos/uc-riverside.png?v=89f47f66'], ['Urban Air', '/media/logos/urban-air.png?v=22d2fba9'], ['Wizest', '/media/logos/wizest.png?v=a2db4400']
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
