// Sends a form to /api/inquiry. Fire-and-forget: the page shows its thank-you
// state immediately, and delivery is handled server-side (see README).

const MAX_FIELD = 4000;

function plain(state) {
  const out = {};
  if (!state) return out;
  for (const [k, v] of Object.entries(state)) {
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') out[k] = v;
    else if (Array.isArray(v) && v.every((x) => ['string', 'number', 'boolean'].includes(typeof x))) out[k] = v;
    else if (v && typeof v === 'object' && !Array.isArray(v)) {
      const keys = Object.keys(v).filter((key) => v[key] === true);
      if (keys.length) out[k] = keys;
    }
  }
  return out;
}

export function sendInquiry(event, kind, context) {
  if (typeof window === 'undefined') return;
  try {
    const form = event && (event.currentTarget || event.target);
    const fields = {};
    if (form && form.tagName === 'FORM') {
      new FormData(form).forEach((value, key) => {
        if (typeof value === 'string' && value.trim()) fields[key] = value.slice(0, MAX_FIELD);
      });
      form.querySelectorAll('input[type=checkbox]').forEach((box) => {
        if (box.name) fields[box.name] = box.checked ? 'yes' : 'no';
      });
    }
    const body = JSON.stringify({ kind, page: window.location.pathname, fields, context: plain(context) });
    if (navigator.sendBeacon && navigator.sendBeacon('/api/inquiry', new Blob([body], { type: 'application/json' }))) return;
    fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch {
    // never block the thank-you state on a network problem
  }
}
