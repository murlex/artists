# afsonnic.github.io

[![Deploy To GitHub Pages](https://github.com/murlex/artists/actions/workflows/deploy.yml/badge.svg)](https://github.com/murlex/artists/actions/workflows/deploy.yml)

Hypeddit-style artist landing page built with Eleventy and deployed to GitHub Pages.
Live URL: **https://afsonnic.github.io**

## What this project includes

- Responsive music landing page (hero + release CTA + streaming links + social links)
- Click tracking hooks for key outbound actions
- Optional consent-based tracking with:
  - Google Analytics 4
  - Meta Pixel
- GitHub Actions workflow that deploys to GitHub Pages on push to main

## 1) Prerequisites

- Node.js 20+
- GitHub account
- A GitHub repository named **`afsonnic.github.io`** (this gives you the clean root URL)

## 2) Local setup

```bash
npm install
npm run dev
```

Local preview will run on the URL shown in terminal (usually http://localhost:8080).

Production build:

```bash
npm run build
```

## 3) Configure your artist links

Update these files:

- `src/_data/site.json`
  - `title`
  - `tagline`
  - `description`
  - `releases` (array of release objects)
    - `title`
    - `slug` (optional share path, e.g. `2022` creates `/2022/`)
    - `releaseDate` (optional display date)
    - `artwork.src` (desktop/default cover image URL or local path like `/assets/img/cover.jpg`)
    - `artwork.srcMobile` (optional mobile-specific cover image)
    - `artwork.alt` (optional image alt text)
    - `primaryCta.label`
    - `primaryCta.url`
    - `links[]` (`name`, `url`)
  - `social.instagram`, `social.youtube`, `social.tiktok`
- `src/_data/links.json`
  - Optional old file; not used by the release-based pages

Example release config:

```json
"releases": [
  {
    "title": "Years 2022",
    "slug": "2022",
    "releaseDate": "April 19, 2026",
    "artwork": {
      "src": "/assets/img/years-2022-cover.jpg",
      "srcMobile": "/assets/img/years-2022-cover-mobile.jpg",
      "alt": "Cover artwork for Years 2022"
    },
    "primaryCta": {
      "label": "Pre-Save / Listen",
      "url": "https://example.com/release"
    },
    "links": [
      { "name": "Spotify", "url": "https://open.spotify.com/..." },
      { "name": "Apple Music", "url": "https://music.apple.com/..." }
    ]
  },
  {
    "title": "Night Drive",
    "status": "Previous Release",
    "primaryCta": {
      "label": "Listen Now",
      "url": "https://example.com/night-drive"
    },
    "links": [
      { "name": "Spotify", "url": "https://open.spotify.com/..." }
    ]
  }
]
```

Local artwork workflow:

1. Put image files in `src/assets/img/`.
2. Set `artwork.src` for desktop and optionally `artwork.srcMobile` for phones.
3. Build and deploy; the correct image will be used on `/` and release URLs like `/2022/`.

## 4) Connect Google Analytics 4 (GA4)

1. Open [Google Analytics](https://analytics.google.com).
2. Create an account/property if needed.
3. In Admin, create a Data Stream for Web.
4. Copy your Measurement ID (looks like `G-XXXXXXXXXX`).
5. Put this value in `src/_data/site.json` under:

```json
"analytics": {
  "ga4MeasurementId": "G-XXXXXXXXXX",
  "metaPixelId": "000000000000000"
}
```

## 5) Connect Meta Pixel

1. Open [Meta Events Manager](https://www.facebook.com/events_manager2).
2. Create a Pixel (Data Source).
3. Copy Pixel ID (numbers only).
4. Put this value in `src/_data/site.json` under `analytics.metaPixelId`.

## 6) How tracking works in this project

- Tracking is consent-based.
- User clicks `Allow Tracking` on the page to enable GA4 and Meta Pixel scripts.
- User clicks `Decline Tracking` to keep tracking disabled.
- Click events tracked:
  - `primary_cta_click`
  - `outbound_stream_click`
  - `social_click`

## 7) Verify tracking after deployment

### GA4 check

1. Open your deployed site.
2. Click `Allow Tracking`.
3. Click some streaming/social links.
4. In GA4, open Realtime and DebugView to confirm events.

### Meta Pixel check

1. Open your deployed site.
2. Click `Allow Tracking`.
3. Use Meta Events Manager -> Test Events.
4. Confirm `PageView` and custom events appear.

## 8) Deploy to GitHub Pages

1. Push this project to GitHub (branch `main`).
2. In GitHub repo settings:
   - Go to Pages.
   - Ensure source is GitHub Actions.
3. The workflow file `.github/workflows/deploy.yml` will build and deploy automatically.
4. Your site URL will appear in workflow output and in Pages settings.

## 9) Important notes for Pages

- `.nojekyll` is included to prevent underscore folder issues.
- The workflow auto-detects correct path prefix for:
  - user/org sites (`username.github.io`)
  - project sites (`username.github.io/music-landing`)

## 10) Set up custom domain (afsonnic.com)

### Step A — Buy and prepare the domain on GoDaddy
1. Purchase `afsonnic.com` on [GoDaddy](https://www.godaddy.com).
2. In GoDaddy dashboard go to **My Products → DNS** (or **Manage DNS** next to the domain).
3. Delete the default A record that points to GoDaddy's parking page (`@` → Parked).
4. Delete any default CNAME for `www` if present.
5. Add these records:

| Type  | Name | Value                | TTL    |
|-------|------|----------------------|--------|
| A     | @    | 185.199.108.153      | 1 Hour |
| A     | @    | 185.199.109.153      | 1 Hour |
| A     | @    | 185.199.110.153      | 1 Hour |
| A     | @    | 185.199.111.153      | 1 Hour |
| CNAME | www  | afsonnic.github.io   | 1 Hour |

> These are GitHub's official Pages IP addresses. All four A records are needed for redundancy.

### Step B — Configure GitHub Pages
1. Go to your `afsonnic.github.io` repo on GitHub.
2. Open **Settings → Pages**.
3. Under **Custom domain**, type `afsonnic.com` and click **Save**.
4. GitHub will run a DNS check (can take a few minutes).
5. Once verified, tick **Enforce HTTPS** (free SSL via Let's Encrypt).

### Step C — The CNAME file (already done)
`CNAME` is already committed in the root of this project with `afsonnic.com`.
The deploy workflow copies it to the site output automatically — no extra action needed.

### DNS propagation
Changes typically propagate within **15 minutes to 2 hours**, but can take up to 48 hours.
You can check progress at https://dnschecker.org (search for `afsonnic.com`, type A).

---

## 11) Updating future releases

- Add or edit entries in `src/_data/site.json` under `releases`.
- Each release gets its own page at `/{slug}/` (or slugified title if slug is omitted).
- The homepage `/` shows only the first release in the array.
- Commit and push. GitHub Actions redeploys automatically.
