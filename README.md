# music-landing

Hypeddit-style artist landing page built with Eleventy and deployed to GitHub Pages.

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
- A GitHub repository named `music-landing`

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
  - `primaryCta.label`
  - `primaryCta.url`
  - `social.instagram`, `social.youtube`, `social.tiktok`
- `src/_data/links.json`
  - Add/replace streaming platform links

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

## 10) Updating future releases

- Change primary campaign CTA in `src/_data/site.json`.
- Update platform links in `src/_data/links.json`.
- Commit and push. GitHub Actions redeploys automatically.
