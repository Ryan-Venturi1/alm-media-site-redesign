# A Lot Media — site redesign

The new alotmedia.com: an 11-page Next.js (React) site covering the three businesses (static media, digital screens and events & venues), the real-estate pitch for property owners, and the investor story. It includes Apple-style scroll motion.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript for the app shell. There is no CSS framework and no UI library.
- **Hosting:** built for Vercel with zero config. Every page is pre-rendered as static HTML; the only server code is the form endpoint.
- **Design source:** each page was ported one-to-one from the Claude Design canvas *A Lot Media — Website Redesign*.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (what Vercel runs)
npm run start      # serve the production build
```

Node 20.9 or newer.

## Deploy to Vercel

1. In Vercel, **Add New → Project**, import `alm-media-site-redesign`, and keep the detected **Next.js** preset. You don't need to change any build settings.
2. Add the environment variables you need (below), then **Deploy**.
3. When it goes live on the real domain, set `NEXT_PUBLIC_SITE_URL` and `ALLOW_INDEXING=1` on the **Production** environment and redeploy. Until then, `robots.txt` blocks search engines, so previews stay out of Google.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonical links, the sitemap and social cards. Defaults to `https://alotmedia.com`. |
| `ALLOW_INDEXING` | Set to `1` on production to let search engines index the site. |
| `INQUIRY_WEBHOOK_URL` | Every form submission is POSTed here as JSON, with a readable `text` field. Works with a Slack incoming webhook, Zapier, Make or a CRM. |
| `RESEND_API_KEY` + `INQUIRY_EMAIL_TO` | Emails every submission through [Resend](https://resend.com). `INQUIRY_EMAIL_TO` takes a comma-separated list. |
| `INQUIRY_EMAIL_FROM` | Optional sender, e.g. `A Lot Media <web@alotmedia.com>`. Use a domain you've verified in Resend. |

If you set none of the delivery variables, form submissions are written to the Vercel function log, so nothing is lost. See `.env.example`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, brand marquee, KPIs, a statement that fills in as you scroll, a pinned three-business story, events showcase, investor case, a "from above" film, real installs, rate board product, sideways-scrolling formats, markets, audiences, campaign planner |
| `/advertisers` | Advertise: the journey timeline, four solutions, targeting, process, brands, Hartford HealthCare case study |
| `/formats` | Formats & specs: static, digital and events & venues, with a compare table |
| `/events` | Events & venues: three models, game-day pricing, the seven-product portfolio, recent work, process, inquiry form |
| `/real-estate` | Property owners: how it works, rate board simulator, configurations, hardware and Device Hub, installs in the field, three revenue streams, FAQ, assessment form |
| `/locations` | Locations: market search and filters |
| `/investors` | Investors: the opportunity, metrics, three engines, thesis, flywheel, roadmap, team and advisors, data room request |
| `/company` | Company: vertical integration, gallery with lightbox, offices |
| `/insights` | News, FAQ, glossary, newsletter |
| `/plan` | Campaign planner (four steps) that sends a request to the team |
| `/contact` | Contact form that routes to the right team |
| `/privacy-policy` | Privacy Policy, copied word for word from the current site |
| `/terms-conditions` | Terms & Conditions, copied word for word from the current site |

## How the code is organised

```
app/
  layout.tsx            fonts, metadata, motion boot script
  globals.css           shared states, keyframes and the whole scroll-motion system
  <route>/page.tsx      metadata + the page component
  api/inquiry/route.ts  form endpoint (webhook / email / log)
  sitemap.ts, robots.ts, not-found.tsx, icon.png
components/
  pages/*.jsx           one component per page: markup in render(), data and state in renderVals()
  Nav.jsx, Footer.jsx   site header (starts the motion engine) and footer
  LiveBoard.jsx         rate board screen drawn live on a photo with a perspective transform
  LogoMarquee.jsx       two-row brand marquee
  LegalPage.jsx         layout for the privacy and terms pages (text in lib/legal.js)
  SmartLink.jsx         internal links use client-side navigation
lib/
  motion.js             scroll engine: measures, then writes CSS variables and classes
  video.js              muted background videos that play only while on screen
  inquiry.js            sends any form to /api/inquiry
public/
  media/                photos (real installs and proof-of-performance shots), renders, market images, logos, video loops + posters
  fonts/                Montserrat (variable) and Geist Mono, self-hosted
  og.jpg                social share image
```

Copy, layout and data live directly in each page component, so a text change is an edit to the matching file in `components/pages/`.

## Scroll motion

Motion turns on before first paint when the visitor's browser supports it, and it switches off completely for visitors who have **reduce motion** turned on. To use an effect on new markup, add the class or attribute:

| Hook | Effect |
| --- | --- |
| `className="alm-in"` | Fades and rises in when it reaches the screen; siblings stagger |
| `className="alm-wipe"` | Photo tile opens from the bottom as the image settles |
| `className="alm-hero" data-scrub="exit"` | Hero: media pushes in (`.alm-hero-media`), copy lifts away (`.alm-hero-copy`) and the frame tucks into a card |
| `className="alm-expand" data-scrub="enter"` | Full-bleed media grows out of a rounded card |
| `className="alm-par" data-scrub="cover"` | Parallax |
| `className="alm-lift" data-scrub="enter"` | Product shot rises and scales into place |
| `<span className="alm-fill" data-scrub="text">` | Statement text fills in as you read (`alm-fill-lt` on dark backgrounds) |
| `className="alm-story" data-scrub="pin" data-steps="3"` | Pinned section whose chapters advance with scroll |
| `className="alm-hs" data-scrub="pin"` + `data-track` | Horizontal card track while the section holds |

## Where the content comes from

Every claim on the site comes from one of two places: the current alotmedia.com, or the company materials in the data room. Nothing is invented.

- **From alotmedia.com:** 12,000 locations, 400+ cities, 40 states, 3,000,000+ cars parked daily, dwell times of up to 10 minutes, "designing and installing since 2016" (2016 is the founding year used throughout), the venue types and targeting options, the Geopath, DOT, Census and Wi-Fi beacon data sources, the market list, the LA, Chicago and NY offices, the brand logos, the gallery photos, the news posts and the "no risk, percentage of the gross" owner offer.
- **From the data room:**
  - The 2026 DDRB deck: rate board features, configurations, hardware lineup, Device Hub, field installs (Denison, Bethlehem Parking Authority, Avail), the Hartford HealthCare case study, programmatic and quarterly revenue share, and the extra client logos.
  - The product model: 110+ units in NY and CT, 1,000 planned for the top 35 markets, and the event products.
  - The event assumptions: event package sizes.
  - The leadership bios.
  - The technology roadmap pillars.
  - The proof-of-performance photos.
  - The Hartford address.
- **Recent event work** (VIP parking and shuttle in four cities, June 2026; a drone show launch site in Austin, July 2026) is described without client names.

Deliberately left out, because the data room marks it confidential: financials and projections, the raise and its terms, contract values, partner names from private agreements, rate-board hardware prices and Device Hub pricing.

## Before launch

- **News posts.** The Insights cards link to the old blog posts on alotmedia.com. The blog isn't being moved, so remove those cards or point them elsewhere before the domain switch.
- **Confirm these with the team:**
  - The NY office address. The website says 231 W 29th St; a 2023 contract lists 239 W 29th St.
  - Manufacturing. The website says A Lot Media owns its plants; the DDRB deck says manufacturing, printing and the CMS come from sister companies MetroClick and faytech. The site uses the deck's wording.
- **Images that aren't straight photos.** They are labeled on the page: "Concept render" on the event, gate-arm and ticket images, and "Stock footage" or "Stock photo" on the videos and generic images. Some older gallery photos were retouched (cleaned and color-corrected), and the home gallery says so. The new proof-of-performance photos only have their color and exposure corrected. Swap in real event photography when you have it.
