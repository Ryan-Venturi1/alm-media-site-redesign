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
| `/` | Home: hero, brand marquee, KPIs, a statement that fills in as you scroll, a pinned three-business story, events showcase, investor case, a "from above" film, real installs, rate board product, sideways-scrolling formats, markets, audiences, self-serve |
| `/advertisers` | Advertise: the journey timeline, four solutions, targeting, process, brands, case study |
| `/formats` | Formats & specs: static, digital and events & venues, with a compare table |
| `/events` | Events & venues: three models, game-day pricing, venue finder, process, inquiry form |
| `/real-estate` | Property owners: three revenue streams, rate board pricing simulator, who does what, FAQ, assessment form |
| `/locations` | Locations: market search and filters |
| `/investors` | Investors: market opportunity, metrics, three engines, flywheel, roadmap, data room request |
| `/company` | Company: vertical integration, gallery with lightbox, offices |
| `/insights` | News, FAQ, glossary, newsletter |
| `/plan` | Self-serve campaign planner (four steps) |
| `/contact` | Contact form that routes to the right team |

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
  SmartLink.jsx         internal links use client-side navigation
lib/
  motion.js             scroll engine: measures, then writes CSS variables and classes
  video.js              muted background videos that play only while on screen
  inquiry.js            sends any form to /api/inquiry
public/
  media/                photos (retouched real installs), renders, market images, logos, video loops + posters
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

## Content to fill before launch

Bracketed placeholders are deliberately visible on the pages:

- Event stats (`[#]`), the recent-events cards and the Chicago case study results
- Investor metrics (`[Figure]`), the founding year of in-house manufacturing (`[Year]`), leadership portraits and names, and the IR email
- The rate card estimate in the planner, payout cadence, programmatic timing, open roles and the latest announcement
- Labels such as "Concept render", "Stock footage" and "Photos retouched" mark imagery that isn't a straight photo. Keep them until real event photography replaces the renders.
