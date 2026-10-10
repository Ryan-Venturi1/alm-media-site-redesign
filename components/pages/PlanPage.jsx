'use client';

// Ported from the design-canvas artboard Plan.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';
import { sendInquiry } from '@/lib/inquiry';
import A from '@/components/SmartLink';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

export default class PlanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!(this.state && this.state.start)) {
      var d = new Date(Date.now() + 21 * 86400000);
      d.setDate(d.getDate() + ((8 - d.getDay()) % 7));
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      this.setState({ start: d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) });
    }
  }

  renderVals() {
    var self = this;
    var st = this.state || {};
    var B = '';
    var step = st.step || 0;
    var ms = st.ms || { 'New York': true, 'Hartford': true };
    var fs = st.fs || { 'Rate boards': true };
    var weeks = st.weeks || 4;
    var budget = st.budget || 50000;
    var start = st.start || '2026-11-02';
    var mlist = [
      ['New York', 'DIGITAL LIVE', '/media/markets/nyc.webp', true], ['Hartford', 'DIGITAL LIVE', '/media/markets/hartford.webp', true],
      ['Los Angeles', 'STATIC', '/media/markets/la.webp'], ['Chicago', 'STATIC', '/media/markets/chicago.webp'],
      ['Miami', 'STATIC', '/media/markets/miami.webp'], ['Austin', 'STATIC', '/media/markets/austin.webp'],
      ['Boston', 'STATIC', '/media/markets/boston.webp'], ['Washington DC', 'ON REQUEST', '/media/markets/dc.webp'],
      ['Atlanta', 'ON REQUEST', '/media/markets/atlanta.webp'], ['Nashville', 'ON REQUEST', '/media/markets/nashville.webp'],
      ['Detroit', 'ON REQUEST', '/media/markets/detroit.webp']
    ];
    var anyDigital = mlist.some(function (m) { return m[3] && ms[m[0]]; });
    var flist = [
      ['Rate boards', 'Digital · :15 / :30 spots', '/media/photos/ddrb-connecticut.webp', '50% 34%', true],
      ['Digital panels', 'Digital · interactive', '/media/photos/blank-street-interactive-panel.webp', '30% 50%', true],
      ['Wallscapes', 'Static · per location', '/media/photos/hartford-healthcare-entrance-wallscape.webp', '50% 40%'],
      ['Elevator wraps', 'Static · per bank', '/media/photos/hartford-healthcare-elevator-wraps.webp', '50% 50%'],
      ['Gate arms', 'Static · entry & exit', '/media/renders/gate-arm-wrap.webp', '50% 50%'],
      ['Tickets', 'Static · front & back', '/media/renders/branded-ticket.webp', '62% 50%']
    ];
    var tog = function (key, name) {
      return function () {
        var cur = Object.assign({}, (self.state && self.state[key]) || (key === 'ms' ? ms : fs));
        cur[name] = !cur[name];
        var o = {}; o[key] = cur; self.setState(o);
      };
    };
    var labels = ['MARKETS', 'FORMATS', 'FLIGHT & BUDGET', 'CREATIVE & SUBMIT'];
    var keys = ['markets', 'formats', 'flight', 'review'];
    var is = {}; keys.forEach(function (k, i) { is[k] = i === step; });
    var selM = mlist.filter(function (m) { return ms[m[0]]; }).map(function (m) { return m[0]; });
    var selF = flist.filter(function (f) { return fs[f[0]] && (!f[4] || anyDigital); }).map(function (f) { return f[0]; });
    var fmt = function (n) { return '$' + n.toLocaleString('en-US'); };
    var d0 = new Date(start + 'T00:00:00');
    var d1 = new Date(d0.getTime() + weeks * 7 * 86400000);
    var mo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var ds = function (d) { return isNaN(d.getTime()) ? '—' : mo[d.getMonth()] + ' ' + d.getDate(); };
    return {
      steps: labels.map(function (l, i) {
        return { no: '0' + (i + 1), label: l, bar: i <= step ? '#FBAE4F' : '#D5DAE3', numColor: i <= step ? '#8A5300' : '#8B95A7', op: i === step ? 1 : 0.6, current: i === step ? 'step' : 'false', go: function () { self.setState({ step: i }); } };
      }),
      is: is,
      markets: mlist.map(function (m) {
        var on = !!ms[m[0]];
        return { name: m[0], status: m[1], img: B + m[2], toggle: tog('ms', m[0]), pressed: on ? 'true' : 'false',
          bd: on ? '#FBAE4F' : 'transparent', shadow: on ? '0 16px 40px rgba(251,174,79,0.35)' : 'none',
          checkBg: on ? '#FBAE4F' : 'rgba(255,255,255,0.15)', check: on ? '✓' : '',
          chipBg: m[1] === 'DIGITAL LIVE' ? '#FBAE4F' : '#FFFFFF' };
      }),
      formats: flist.map(function (f) {
        var avail = !f[4] || anyDigital;
        var on = !!fs[f[0]] && avail;
        return { name: f[0], meta: avail ? f[1] : 'Select New York or Hartford to add', img: B + f[2], pos: f[3], pressed: on ? 'true' : 'false',
          toggle: avail ? tog('fs', f[0]) : function () {}, op: avail ? 1 : 0.45,
          bd: on ? '#FBAE4F' : 'transparent', shadow: on ? '0 16px 40px rgba(251,174,79,0.3)' : 'none',
          checkBg: on ? '#FBAE4F' : '#FFFFFF', check: on ? '✓' : '' };
      }),
      durations: [2, 4, 8, 12].map(function (w) {
        var on = w === weeks;
        return { label: w + ' WEEKS', checked: on ? 'true' : 'false', bg: on ? '#0B1220' : '#FFFFFF', fg: on ? '#FFFFFF' : '#0B1220', bd: '#0B1220', pick: function () { self.setState({ weeks: w }); } };
      }),
      start: start,
      setStart: function (e) { self.setState({ start: e.target.value }); },
      budget: budget,
      budgetLabel: budget >= 250000 ? '$250K+' : fmt(budget),
      setBudget: function (e) { self.setState({ budget: parseInt(e.target.value, 10) }); },
      sum: {
        markets: selM.length ? selM.join(', ') : 'None selected',
        formats: selF.length ? selF.join(', ') : 'None selected',
        flight: ds(d0) + ' – ' + ds(d1) + ' · ' + weeks + ' weeks'
      },
      submitted: !!st.submitted,
      notSubmitted: !st.submitted,
      submit: function (e) { if (e && e.preventDefault) e.preventDefault(); sendInquiry(e, 'plan', { markets: selM, formats: selF, start: start, weeks: weeks, budget: fmt(budget) }); self.setState({ submitted: true }); },
      restart: function () { self.setState({ submitted: false, step: 0 }); },
      back: function () { self.setState({ step: Math.max(0, step - 1) }); },
      backOp: step === 0 ? 0.35 : 1,
      next: function () { self.setState({ step: Math.min(3, step + 1) }); },
      showNext: step < 3,
      nextLabel: step === 2 ? 'ADD CREATIVE' : 'CONTINUE'
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div className="alm-root" style={{ background: "#F5F5F7", color: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased", minHeight: "100vh" }}>
        <Nav active="plan" />
        <section style={{ padding: "72px 28px 40px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600", letterSpacing: "-0.005em", opacity: "0.72" }}><span style={{ width: "7px", height: "7px", background: "#FBAE4F", borderRadius: "50%" }} />Self-serve · beta</div>
              <h1 style={{ margin: "18px 0 0", fontSize: "clamp(40px, 5.6vw, 84px)", lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }}>Plan a campaign.</h1>
            </div>
            <div style={{ fontSize: "15px", fontWeight: "400", color: "#4E586A", maxWidth: "420px" }}>Build a plan in minutes. Our team confirms availability and rates, then it goes live. <A href="/contact" style={{ fontWeight: "600", color: "#0B1220", textDecoration: "underline" }}>Prefer a planner?</A></div>
          </div>
          <ol style={{ maxWidth: "1360px", margin: "40px auto 0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px" }}>
            {(v.steps || []).map((s, sI) => (
              <Fragment key={sI}>
                <li>
                  <button type="button" onClick={s.go} aria-current={s.current} style={{ width: "100%", minHeight: "64px", padding: "12px 16px", border: "0", borderTop: `4px solid ${s.bar}`, background: "transparent", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", textAlign: "left", cursor: "pointer" }}>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: s.numColor }}>{s.no}</div>
                    <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: "700", letterSpacing: "0.04em", opacity: s.op }}>{s.label}</div>
                  </button>
                </li>
              </Fragment>
            ))}
          </ol>
        </section>
        <section style={{ padding: "8px 28px 128px" }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "flex-start" }}>
            <div style={{ flex: "999 1 640px", minWidth: "0" }}>
              {v.is?.markets ? (
                <>
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h2 className="alm-in" style={{ margin: "0", fontSize: "30px", fontWeight: "650", letterSpacing: "-0.02em" }}>Where should you run?</h2>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#4E586A" }}>Select one or more markets</div>
                    </div>
                    <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "12px" }}>
                      {(v.markets || []).map((m, mI) => (
                        <Fragment key={mI}>
                          <button className="alm-pick" type="button" aria-pressed={m.pressed} onClick={m.toggle} style={{ position: "relative", height: "180px", padding: "0", borderRadius: "18px", overflow: "hidden", border: `3px solid ${m.bd}`, background: "#0B1220", cursor: "pointer", textAlign: "left", fontFamily: "'Montserrat', sans-serif", boxShadow: m.shadow }}>
                            <img src={m.img} alt="" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", opacity: "0.85" }} loading="lazy" decoding="async" />
                            {' '}
                            <span style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(11,18,32,0.05) 30%, rgba(11,18,32,0.85) 100%)" }} />
                            {' '}
                            <span style={{ position: "absolute", top: "12px", left: "12px", fontSize: "10px", fontWeight: "600", letterSpacing: "0.08em", padding: "5px 9px", borderRadius: "999px", background: m.chipBg, color: "#0B1220" }}>{m.status}</span>
                            {' '}
                            <span style={{ position: "absolute", top: "10px", right: "10px", width: "30px", height: "30px", borderRadius: "50%", background: m.checkBg, border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", color: "#0B1220", fontSize: "16px", fontWeight: "700" }}>{m.check}</span>
                            {' '}
                            <span style={{ position: "absolute", left: "14px", bottom: "12px", color: "#FFFFFF", fontSize: "20px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{m.name}</span>
                          </button>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
              {v.is?.formats ? (
                <>
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h2 className="alm-in" style={{ margin: "0", fontSize: "30px", fontWeight: "650", letterSpacing: "-0.02em" }}>Choose your formats</h2>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#4E586A" }}>Digital runs in New York &amp; Connecticut</div>
                    </div>
                    <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
                      {(v.formats || []).map((f, fI) => (
                        <Fragment key={fI}>
                          <button className="alm-pick" type="button" aria-pressed={f.pressed} onClick={f.toggle} style={{ padding: "0", borderRadius: "18px", overflow: "hidden", border: `3px solid ${f.bd}`, background: "#FFFFFF", cursor: "pointer", textAlign: "left", fontFamily: "'Montserrat', sans-serif", color: "#0B1220", opacity: f.op, boxShadow: f.shadow }}>
                            <div style={{ height: "150px", overflow: "hidden", background: "#0B1220" }}>
                              <img src={f.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos, display: "block" }} loading="lazy" decoding="async" />
                            </div>
                            <div style={{ padding: "16px 18px 18px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "17px", fontWeight: "700" }}>{f.name}</span>
                                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: f.checkBg, border: "2px solid #0B1220", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>{f.check}</span>
                              </div>
                              <div style={{ marginTop: "6px", fontSize: "13px", fontWeight: "600", color: "#4E586A" }}>{f.meta}</div>
                            </div>
                          </button>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
              {v.is?.flight ? (
                <>
                  <div style={{ padding: "36px", borderRadius: "18px", background: "#FFFFFF" }}>
                    <h2 className="alm-in" style={{ margin: "0", fontSize: "30px", fontWeight: "650", letterSpacing: "-0.02em" }}>Flight &amp; budget</h2>
                    <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Start date <input className="alm-input" type="date" value={v.start} onChange={v.setStart} style={{ minHeight: "54px", padding: "0 14px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "16px", fontWeight: "600", color: "#0B1220" }} name="start_date" /></label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>DURATION</div>
                        <div role="radiogroup" aria-label="Duration" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {(v.durations || []).map((d, dI) => (
                            <Fragment key={dI}>
                              <button type="button" role="radio" aria-checked={d.checked} onClick={d.pick} style={{ minHeight: "54px", padding: "0 18px", borderRadius: "999px", border: `2px solid ${d.bd}`, background: d.bg, color: d.fg, fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>{d.label}</button>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: "32px" }}>
                      <label htmlFor="alm-budget" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>TOTAL BUDGET <span style={{ fontSize: "32px", fontWeight: "650", letterSpacing: "-0.02em" }}>{v.budgetLabel}</span></label>
                      {' '}
                      <input id="alm-budget" type="range" min="5000" max="250000" step="5000" value={v.budget} onInput={v.setBudget} onChange={v.setBudget} style={{ marginTop: "16px", width: "100%", height: "32px" }} name="budget" />
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Geist Mono', monospace", fontSize: "12px", color: "#4E586A" }}>
                        <span>$5K</span>
                        <span>$250K+</span>
                      </div>
                    </div>
                    <div style={{ marginTop: "28px", padding: "18px 20px", borderRadius: "16px", background: "#F0F1F4", fontSize: "14px", lineHeight: "1.6", fontWeight: "500", color: "#4E586A" }}>Rates are set per property. We’ll recommend the strongest locations for your budget when we confirm the plan.</div>
                  </div>
                </>
              ) : null}
              {v.is?.review ? (
                <>
                  <div style={{ padding: "36px", borderRadius: "18px", background: "#FFFFFF" }}>
                    {v.submitted ? (
                      <>
                        <div style={{ minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
                          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#FBAE4F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M5 12l5 5 9-10" />
                            </svg>
                          </div>
                          <div style={{ fontSize: "36px", fontWeight: "650", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Plan submitted.</div>
                          <p style={{ margin: "0", maxWidth: "520px", fontSize: "16px", lineHeight: "1.6", fontWeight: "400", color: "#4E586A" }}>Your planner will confirm availability and rates. You’ll be able to track it from your advertiser dashboard.</p>
                          <button type="button" onClick={v.restart} style={{ alignSelf: "flex-start", marginTop: "8px", minHeight: "50px", padding: "0 26px", borderRadius: "999px", border: "2px solid #0B1220", background: "transparent", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Start a new plan</button>
                        </div>
                      </>
                    ) : null}
                    {v.notSubmitted ? (
                      <>
                        <form onSubmit={v.submit}>
                          <h2 className="alm-in" style={{ margin: "0", fontSize: "30px", fontWeight: "650", letterSpacing: "-0.02em" }}>Creative &amp; contact</h2>
                          <div style={{ marginTop: "24px", padding: "40px 24px", borderRadius: "18px", border: "2px dashed #B8BFCC", background: "#F5F5F7", textAlign: "center" }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
                            </svg>
                            <div style={{ marginTop: "12px", fontSize: "16px", fontWeight: "600" }}>Drop creative files here</div>
                            <div style={{ marginTop: "4px", fontSize: "13px", fontWeight: "500", color: "#4E586A" }}>or upload later — our design team can build it for you</div>
                            <label style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", minHeight: "46px", padding: "0 18px", borderRadius: "16px", border: "2px solid #0B1220", fontSize: "14px", fontWeight: "600", letterSpacing: "0", cursor: "pointer" }}>Browse files<input type="file" multiple style={{ position: "absolute", width: "1px", height: "1px", opacity: "0" }} name="creative" /></label>
                          </div>
                          <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
                            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Company<input className="alm-input" type="text" placeholder="Brand or agency" style={{ minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="company" /></label>
                            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", letterSpacing: "0" }}>Work email<input className="alm-input" type="email" placeholder="you@company.com" style={{ minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: "2px solid #D5DAE3", fontFamily: "'Montserrat', sans-serif", fontSize: "15px", fontWeight: "400" }} name="work_email" /></label>
                          </div>
                          <label style={{ marginTop: "18px", display: "flex", gap: "12px", alignItems: "center", fontSize: "14px", fontWeight: "600", color: "#4E586A" }}><input type="checkbox" style={{ width: "20px", height: "20px", accentColor: "#FBAE4F" }} name="design_help" />I’d like the A Lot Media design team to produce creative</label>
                          {' '}
                          <button type="submit" className="alm-btn" style={{ marginTop: "28px", width: "100%", minHeight: "60px", borderRadius: "999px", border: "0", background: "#FBAE4F", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>Submit for confirmation</button>
                        </form>
                      </>
                    ) : null}
                  </div>
                </>
              ) : null}
              <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <button type="button" onClick={v.back} style={{ minHeight: "54px", padding: "0 26px", borderRadius: "999px", border: "2px solid #0B1220", background: "transparent", color: "#0B1220", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer", opacity: v.backOp }}>← Back</button>
                {v.showNext ? (
                  <>
                    <button type="button" className="alm-btn" onClick={v.next} style={{ minHeight: "54px", padding: "0 26px", borderRadius: "999px", border: "0", background: "#0B1220", color: "#FFFFFF", fontFamily: "'Montserrat', sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.005em", cursor: "pointer" }}>{v.nextLabel} →</button>
                  </>
                ) : null}
              </div>
            </div>
            <aside aria-label="Plan summary" style={{ flex: "1 1 340px", minWidth: "0", padding: "32px", borderRadius: "8px", background: "#0B1220", color: "#FFFFFF" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.14em", color: "#FBAE4F" }}>YOUR PLAN</div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: "#8B95A7" }}>DRAFT · AUTOSAVED</div>
              </div>
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>MARKETS</div>
                  <div style={{ marginTop: "6px", fontSize: "16px", fontWeight: "700", lineHeight: "1.4" }}>{v.sum?.markets}</div>
                </div>
                <div style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>FORMATS</div>
                  <div style={{ marginTop: "6px", fontSize: "16px", fontWeight: "700", lineHeight: "1.4" }}>{v.sum?.formats}</div>
                </div>
                <div style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>FLIGHT</div>
                  <div style={{ marginTop: "6px", fontSize: "16px", fontWeight: "700" }}>{v.sum?.flight}</div>
                </div>
                <div style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.14)", borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#8B95A7" }}>BUDGET</div>
                  <div style={{ marginTop: "6px", fontSize: "30px", fontWeight: "650", letterSpacing: "-0.02em" }}>{v.budgetLabel}</div>
                </div>
              </div>
              <div style={{ marginTop: "20px", fontSize: "13px", lineHeight: "1.6", fontWeight: "500", color: "#A3ACBC" }}>Estimated reach and final pricing are confirmed by our team. [Connect rate card &amp; Geopath audience data for instant estimates.]</div>
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", fontWeight: "600", color: "#C9D0DB" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FBAE4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg> Sign in to save plans, track approvals and reorder.</div>
            </aside>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
