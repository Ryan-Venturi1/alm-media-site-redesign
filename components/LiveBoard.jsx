'use client';

// Ported from the design-canvas artboard LiveBoard.dc.html.
// Markup lives in render(); data and interaction in renderVals().
import React, { Fragment } from 'react';

export default class LiveBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var self = this;
    this.setState({ ph: 0, w: 0 });
    this.measure = function () {
      if (self.box) {
        var w = self.box.clientWidth;
        if (w && w !== ((self.state && self.state.w) || 0)) self.setState({ w: w });
      }
    };
    setTimeout(this.measure, 30);
    setTimeout(this.measure, 400);
    setTimeout(this.measure, 1500);
    window.addEventListener('resize', this.measure);
    if (window.ResizeObserver) {
      this.ro = new ResizeObserver(function () { self.measure(); });
      setTimeout(function () { if (self.box && self.ro) self.ro.observe(self.box); }, 0);
    }
    this.timer = setInterval(function () {
      var cur = (self.state && self.state.ph) || 0;
      self.setState({ ph: (cur + 1) % 6 });
    }, 2600);
  }
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
    window.removeEventListener('resize', this.measure);
    if (this.ro) this.ro.disconnect();
  }
  homography(src, dst) {
    var A = [], b = [];
    for (var i = 0; i < 4; i++) {
      var x = src[i][0], y = src[i][1], u = dst[i][0], v = dst[i][1];
      A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
      A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
    }
    var n = 8;
    for (var c = 0; c < n; c++) {
      var p = c;
      for (var r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
      var t = A[c]; A[c] = A[p]; A[p] = t; var tb = b[c]; b[c] = b[p]; b[p] = tb;
      for (var r2 = c + 1; r2 < n; r2++) {
        var f = A[r2][c] / A[c][c];
        for (var k = c; k < n; k++) A[r2][k] -= f * A[c][k];
        b[r2] -= f * b[c];
      }
    }
    var h = new Array(n);
    for (var i2 = n - 1; i2 >= 0; i2--) {
      var s = b[i2];
      for (var k2 = i2 + 1; k2 < n; k2++) s -= A[i2][k2] * h[k2];
      h[i2] = s / A[i2][i2];
    }
    return h;
  }
  renderVals() {
    var self = this;
    var st = this.state || {};
    var ph = st.ph || 0;
    var w = st.w || 0;
    var variant = this.props.variant || 'photo';
    var hero = variant === 'hero';
    var product = variant === 'product';
    var crop = variant === 'photo' && this.props.crop !== false;
    var PRODUCT = {
      img: '/media/renders/ddrb-product.webp', nw: 1136, nh: 1408,
      alt: 'Product render of the A Lot Media Digital Dynamic Rate Board on a dark background',
      quad: [[0.3838, 0.1136], [0.6215, 0.1286], [0.6215, 0.4972], [0.3838, 0.4666]],
      dh: 752, split: 466, gap: 0, adTop: 466, bezel: false, padTop: 28, rowPad: 14, adFont: 42, adFont2: 38,
      caption: 'PRODUCT RENDER · LIVE SCREEN DEMO'
    };
    var V = product ? PRODUCT : hero ? {
      img: '/media/renders/ddrb-hero.webp', nw: 2400, nh: 1349,
      alt: 'Product render of the A Lot Media Digital Dynamic Rate Board at a parking garage entrance at night',
      quad: [[0.6075, 0.1446], [0.7467, 0.0986], [0.7467, 0.7932], [0.6083, 0.7821]],
      dh: 1040, split: 490, gap: 38, adTop: 528, bezel: true, padTop: 34, rowPad: 18, adFont: 52, adFont2: 46,
      caption: 'LIVE DEMO · PRODUCT RENDER'
    } : {
      img: '/media/photos/ddrb-connecticut.webp', nw: 1073, nh: 1438,
      alt: 'A Lot Media Digital Dynamic Rate Board installed at a parking garage entrance in Connecticut',
      quad: [[0.2844, 0.2098], [0.6189, 0.2214], [0.5911, 0.6186], [0.3011, 0.6235]],
      dh: 660, split: 470, gap: 0, adTop: 470, bezel: false, padTop: 26, rowPad: 12, adFont: 38, adFont2: 34,
      caption: 'LIVE DEMO · DIGITAL DYNAMIC RATE BOARD™ · CONNECTICUT'
    };
    var cropTop = 0.06875, cropFrac = 0.7;
    var imgH = w * V.nh / V.nw;
    var matrix = 'none';
    if (w) {
      var dst = V.quad.map(function (p) { return [p[0] * w, p[1] * imgH]; });
      var h = this.homography([[0, 0], [400, 0], [400, V.dh], [0, V.dh]], dst);
      matrix = 'matrix3d(' + [h[0], h[3], 0, h[6], h[1], h[4], 0, h[7], 0, 0, 1, 0, h[2], h[5], 0, 1].map(function (x) { return x.toFixed(8); }).join(',') + ')';
    }
    var ev = ph >= 3;
    var adf = ph % 3;
    var d = new Date();
    var hh = d.getHours(), mm = d.getMinutes();
    return {
      setBox: function (el) { self.box = el; },
      v: {
        img: V.img, alt: V.alt, dh: V.dh, split: V.split, gap: V.gap, adTop: V.adTop, bezel: V.bezel, padTop: V.padTop, rowPad: V.rowPad, adFont: V.adFont, adFont2: V.adFont2, caption: V.caption,
        natural: V.nw + ' / ' + V.nh,
        aspect: crop ? (V.nw + ' / ' + (V.nh * cropFrac).toFixed(1)) : (V.nw + ' / ' + V.nh),
        imgTop: crop ? (-cropTop / cropFrac * 100).toFixed(3) : '0'
      },
      matrix: matrix,
      ready: w ? 1 : 0,
      clock: !w ? '' : ((hh % 12) || 12) + ':' + (mm < 10 ? '0' : '') + mm + (hh < 12 ? ' AM' : ' PM'),
      showCaption: this.props.showCaption !== false,
      dot: ph % 2 === 0 ? 1 : 0.35,
      pill: ev ? { label: 'EVENT PRICING ACTIVE', bg: '#FBAE4F', fg: '#0B1220' } : { label: 'STANDARD PRICING', bg: 'rgba(255,255,255,0.16)', fg: '#FFFFFF' },
      rates: [
        { label: 'First hour', price: ev ? '$12' : '$8', color: ev ? '#FBAE4F' : '#FFFFFF' },
        { label: 'Daily max', price: ev ? '$34' : '$24', color: ev ? '#FBAE4F' : '#FFFFFF' },
        { label: 'Evening', price: ev ? '$20' : '$8', color: ev ? '#FBAE4F' : '#FFFFFF' }
      ],
      ad: { a: adf === 1 ? 1 : 0, b: adf === 2 ? 1 : 0 }
    };
  }

  render() {
    const v = this.renderVals() || {};
    return (
      <div ref={v.setBox} style={{ position: "relative", width: "100%", aspectRatio: v.v?.aspect, overflow: "hidden", background: "#0B1220", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
        <img src={v.v?.img} alt={v.v?.alt} style={{ position: "absolute", left: "0", top: `${v.v?.imgTop}%`, width: "100%", height: "auto", display: "block" }} loading="lazy" decoding="async" />
        <div style={{ position: "absolute", left: "0", top: `${v.v?.imgTop}%`, width: "100%", aspectRatio: v.v?.natural, pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "0", top: "0", width: "400px", height: `${v.v?.dh}px`, transformOrigin: "0 0", transform: v.matrix, overflow: "hidden", borderRadius: "3px", color: "#FFFFFF", opacity: v.ready, transition: "opacity .6s ease" }}>
            <div style={{ position: "absolute", left: "0", right: "0", top: "0", height: `${v.v?.split}px`, background: "linear-gradient(180deg, #1A3BE0 0%, #1530C8 100%)" }} />
            {v.v?.bezel ? (
              <>
                <div style={{ position: "absolute", left: "0", right: "0", top: `${v.v?.split}px`, height: `${v.v?.gap}px`, background: "#07090F" }} />
              </>
            ) : null}
            <div style={{ position: "relative", height: "54px", background: "#F4F6FF", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#1530D8", color: "#FFFFFF", fontWeight: "900", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>P</div>
                <div style={{ fontWeight: "800", fontSize: "15px", color: "#1530D8", letterSpacing: "0.04em" }}>LEVEL P1</div>
              </div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "13px", color: "#1530D8" }}>{v.clock}</div>
            </div>
            <div style={{ position: "relative", padding: `${v.v?.padTop}px 30px 0`, textAlign: "center" }}>
              <div style={{ fontWeight: "800", fontSize: "22px", letterSpacing: "0.04em" }}>WELCOME</div>
              <div style={{ margin: "14px auto 0", display: "inline-block", padding: "8px 18px", border: "2.5px solid #FFFFFF", fontWeight: "900", fontSize: "25px", letterSpacing: "0.02em" }}>PARKING RATES</div>
              <div style={{ marginTop: "14px", height: "28px", display: "flex", justifyContent: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0 12px", borderRadius: "999px", background: v.pill?.bg, color: v.pill?.fg, fontSize: "12px", fontWeight: "800", letterSpacing: "0.08em", transition: "background .5s, color .5s" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: v.pill?.fg }} />{v.pill?.label}</div>
              </div>
            </div>
            <div style={{ position: "relative", padding: "12px 30px 0" }}>
              {(v.rates || []).map((r, rI) => (
                <Fragment key={rI}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: `${v.v?.rowPad}px 0 12px`, borderBottom: "2px solid rgba(255,255,255,0.85)" }}>
                    <span style={{ fontWeight: "800", fontSize: "21px" }}>{r.label}</span>
                    <span style={{ fontWeight: "900", fontSize: "27px", color: r.color, transition: "color .5s" }}>{r.price}</span>
                  </div>
                </Fragment>
              ))}
            </div>
            <div style={{ position: "absolute", left: "0", right: "0", top: `${v.v?.adTop}px`, bottom: "0" }}>
              <div style={{ position: "absolute", inset: "0", background: "#FBAE4F", color: "#0B1220", padding: "24px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: v.ad?.a, transition: "opacity .9s ease" }}>
                <div style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0.14em" }}>A LOT MEDIA</div>
                <div style={{ fontWeight: "900", fontSize: `${v.v?.adFont}px`, lineHeight: "0.95", letterSpacing: "-0.01em" }}>YOUR BRAND<br />HERE.</div>
                <div style={{ fontSize: "14px", fontWeight: "700" }}>3,000,000+ cars park with us every day.</div>
              </div>
              <div style={{ position: "absolute", inset: "0", background: "#0B1220", color: "#FFFFFF", padding: "24px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: v.ad?.b, transition: "opacity .9s ease" }}>
                <div style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0.14em", color: "#FBAE4F" }}>LIVE ON THIS SCREEN</div>
                <div style={{ fontWeight: "900", fontSize: `${v.v?.adFont2}px`, lineHeight: "0.98" }}>LIVE RATES.<br /><span style={{ color: "#FBAE4F" }}>LIVE ADS.</span></div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#C9D0DB" }}>Updated from a phone, network-wide.</div>
              </div>
            </div>
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(125deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 40%)", pointerEvents: "none" }} />
          </div>
        </div>
        {v.showCaption ? (
          <>
            <div style={{ position: "absolute", left: "16px", bottom: "16px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "999px", background: "rgba(11,18,32,0.72)", color: "#FFFFFF", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF453A", opacity: v.dot, transition: "opacity .3s" }} /> {v.v?.caption}</div>
          </>
        ) : null}
      </div>
    );
  }
}
