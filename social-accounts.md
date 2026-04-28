# Social Media Account Structure — AF Sonnic
> Last updated: April 26, 2026
> **Security note:** Replace `[FILL IN]` values with references to your password manager. Do not store raw passwords in plain text.

---

## ABOUT THIS DOCUMENT

**Purpose:** Master reference for all social media, ad accounts, and streaming profiles belonging to Alexander Futoryan operating under the artist name **AF Sonnic** — an electronic music project based in Israel. First release: "Years. 2022." distributing via Amuse, release date **May 1, 2026**.

**Website:** https://afsonnic.com — an Eleventy static site. Source files are in `src/`. Key config file: `src/_data/site.json`. Deployed via GitHub Pages.

**Primary identity across all platforms:**
- Name: Alexander Futoryan / AF Sonnic
- Primary email: **murlex@gmail.com**
- Primary phone: **+972 54-550-3880**

**Symbol legend:**
- ✅ = Confirmed / verified value (sourced from codebase, API, or live page)
- ⚠️ = Unknown, placeholder, or action required — see that row for instructions

**This document can answer questions like:**
- "How do I log in to [platform]?" → see Section 5 (Quick Login Reference) and individual platform sections
- "What is not yet set up or needs fixing?" → see OPEN ITEMS section immediately below
- "How are accounts connected to each other?" → see Section 4 (Cross-Platform Connections)
- "What do I need to update in the website code?" → see OPEN ITEMS and individual ⚠️ rows

---

## OPEN ITEMS — What Is Not Done / Needs Changing

> These are all known gaps as of April 26, 2026. Grouped by urgency.

### 🔴 Fix After May 1, 2026 (Release Day)
| # | Item | Platform | How to fix |
|---|---|---|---|
| 1 | **Spotify artist URL is invalid** — `open.spotify.com/artist/afsonnic` returns 404. Spotify IDs are random strings, not handles. | Spotify | After May 1: open Spotify app → search "AF Sonnic" → open artist page → copy URL. Format: `https://open.spotify.com/artist/XXXXXXXXXXX`. Then update `src/_data/site.json` → `spotifyUrl` field and Section 9.1 of this doc. |
| 2 | **Apple Music artist URL unknown** — `site.json` has placeholder `your-id`. | Apple Music | After May 1: check Amuse dashboard → Releases → distribution links → Apple Music row. Then update `src/_data/site.json` → `appleUrl` field and Section 9.2 of this doc. |

### 🟡 Fix When Possible
| # | Item | Platform | How to fix |
|---|---|---|---|
| 3 | **Meta Pixel↔ad account link blocked** — Pixel `2046951969184192` IS receiving events (confirmed in BM Settings). Linking pixel to `act_1271767923712343` via BM is blocked because the personal ad account has not yet made a payment. Once first payment processes, go to BM Settings → Ad Accounts → Add → "Add an existing ad account" and enter `1271767923712343`. Then return to Datasets & pixels → AF Sonnic → Connected assets → Connect assets. | Meta / Website | After first payment: BM Settings → Ad Accounts → "+Add" center button → Add an existing ad account → enter `1271767923712343` → agree to terms → Add ad account. Then link pixel via Connected assets. |
| 4 | **TikTok Pixel ID unknown** — Events Manager is blocked by phone verification step. | TikTok | Complete phone verification at https://ads.tiktok.com/i18n/events_manager/ → find Pixel ID → update Section 3.4 of this doc. |
| 5 | **TikTok Pixel not on website** — no TikTok pixel code present in `src/assets/js/tracking.js`. | TikTok / Website | Add TikTok pixel snippet to `tracking.js` (or a new script include) once Pixel ID is known. |
| 6 | **Instagram @af.sonnic not in Business Manager** — it's linked to the Page and ad account, but not formally added to the BM. | Meta BM | In Meta Business Suite → Settings → Accounts → Instagram accounts → connect @af.sonnic. |

### 🟢 Manual Fill-In (from your password manager)
| # | Item | Where in this doc |
|---|---|---|
| 7 | Passwords for all accounts | Sections 1.1, 2.1, 3.1, 3.2, 8.1 |
| 8 | 2FA enabled/disabled for Facebook and both Instagram accounts | Sections 1.1, 2.1 |
| 9 | Password manager name (1Password / Bitwarden / etc.) | Section 6 |
| 10 | Backup codes storage location | Section 6 |
| 11 | YouTube monetization status (check YouTube Studio — likely not enabled, below 1K sub threshold) | Section 8.1 |

---

## 1. FACEBOOK

### 1.0 Meta Object Map
> Facebook and Instagram share the same Meta identity. This tree covers all Meta-owned objects.

```
Personal Profile: Alexander Futoryan
│  ID: 100000081653329
│  Login: murlex@gmail.com
│  URL: facebook.com/alexander.futoryan/
│
├── Meta Business Manager: "Alexander Futoryan"
│   │  BM ID: 1285120136920909
│   │  Admin: Alexander Futoryan (only member)
│   │  Status: Unverified
│   │  URL: business.facebook.com (BM ID: 1285120136920909)
│   │
│   └── Facebook Page: "AF Sonnic"
│          Page ID: 61560793083538
│          Asset ID (in BM): 1089733854223369
│          Role: Admin | Category: Artist | Followers: 0
│          URL: facebook.com/profile.php?id=61560793083538
│
├── Ad Account: act_1271767923712343  ← NOT inside Business Manager
│   │  Currency: EUR | Timezone: PDT | Status: Active
│   │  Payment: PayPal | Spending limit: €40/day
│   │
│   └── Campaign: "Years 2022 release"  (Traffic, Active)
│       └── Ad Set: "New Traffic Ad Set"  (ID: 120243272850700726)
│           │  Budget: €5.00/day | Audience: Advantage+ broad
│           │  Start: Apr 25, 2026 | End: None
│           │
│           └── Ad: "New Traffic Ad"  (ID: 120243272850710726)
│                  Format: Video 0:33 | Status: Active
│                  Headline: "New single out May 1st! Pre-save now!"
│                  Destination: afsonnic.com/2022
│                  FB identity: AF Sonnic Page (61560793083538)
│                  IG identity: @af.sonnic (17841426081583540)
│
├── Datasets / Pixels
│   ├── "MeList"  (ID: 3087884218158499)  — 0 events, no integration
│   ├── "Wines"   (ID: 588683624527786)   — 0 events, no integration
│   └── Meta Pixel "AF Sonnic" ✅ — ID 2046951969184192 (deployed, receiving events; NOT yet linked to ad account — payment required)
│
└── Instagram accounts  (see Section 2 for full details)
    ├── @af.sonnic  (ID: 17841426081583540)  — Creator / Artist
    │      linked to AF Sonnic Page via ad identity (not formally in BM)
    └── @anemone.center  (ID: 17841439526157478)  — Creator / Educational Consultant
           login: anemone.center.info@gmail.com | NOT in BM
```

---

### 1.1 Personal Profile (Account Owner)
| Field | Value |
|---|---|
| Full name | ✅ Alexander Futoryan |
| User ID | ✅ 100000081653329 |
| Date of birth | ✅ May 28, 1980 |
| Lives in | ✅ Gan Yavne, Israel |
| From | ✅ Moscow, Russia |
| Relationship | ✅ Married to Elena Futoryan (since May 2008) |
| Work | ✅ R&D Engineer @ Elaris Technologies Ltd (Feb 2017–present) |
| Friends | ✅ 132 |
| Email | ✅ murlex@gmail.com |
| Password | ⚠️ [see password manager] |
| 2FA enabled | ⚠️ Yes / No |
| Profile URL | ✅ https://www.facebook.com/alexander.futoryan/ |

---

### 1.2 Business Manager / Meta Business Suite
| Field | Value |
|---|---|
| Business portfolio name | ✅ Alexander Futoryan |
| Business Manager ID | ✅ 1285120136920909 |
| Primary admin | ✅ Alexander Futoryan (personal profile) |
| Primary Page | ✅ None set |
| Legal business name | ✅ Not set |
| Verification status | ✅ Unverified |
| URL | https://business.facebook.com/latest/home?business_id=1285120136920909 |

#### People & Roles
| Name | Email | Role |
|---|---|---|
| Alexander Futoryan | ✅ murlex@gmail.com | Admin |

> Only 1 admin on record. No additional users.

---

### 1.3 Facebook Pages
| Page Name | Page ID | Role | Followers | Category | URL |
|---|---|---|---|---|---|
| AF Sonnic | ✅ 61560793083538 | ✅ Admin | ✅ 0 | ✅ Artist | ✅ https://www.facebook.com/profile.php?id=61560793083538 |

> Asset ID (in Meta Business Suite): 1089733854223369

---

### 1.4 Ad Accounts
| Ad Account Name | Ad Account ID | Currency | Time Zone | Status |
|---|---|---|---|---|
| Personal (1271767923712343) | ✅ act_1271767923712343 | ✅ EUR (€) | ✅ PDT (Pacific Daylight Time / America/Los_Angeles — UTC-7) | ✅ Active |

> Note: This personal ad account is NOT linked to the Business Manager. Attempted to claim it into BM on April 26, 2026 — blocked by Meta: "payment has not been made" restriction. Once the first payment processes, retry via BM Settings → Ad Accounts → Add → "Add an existing ad account" → ID `1271767923712343`.
> Ad account admin: Alexander Futoryan

#### Billing / Contact
| Field | Value |
|---|---|
| Contact email | ✅ murlex@gmail.com |
| Contact phone | ✅ +972 54-550-3880 |
| WhatsApp | ✅ +972 54-550-3880 |
| Payment method | ✅ PayPal (h****@g****.com — likely murlex@gmail.com) |
| Spending limit | ✅ €40.00 daily (set by Meta; auto-charges at €2.00 threshold) |

---

### 1.5 Facebook Campaigns
| Campaign Name | Objective | Status | Budget | Ad Account |
|---|---|---|---|---|
| Years 2022 release | ✅ Traffic (Landing Page Views) | ✅ Active (On) | ✅ No campaign-level budget; ad set "New Traffic Ad Set" budget: €5.00/day (max daily €8.75, max weekly €35) | ✅ act_1271767923712343 |

#### Ad Set: "New Traffic Ad Set"
| Field | Value |
|---|---|
| Ad set ID | 120243272850700726 |
| Conversion location | Website |
| Performance goal | Maximize landing page views |
| Bid strategy | Highest volume (automatic) |
| Delivery type | Standard |
| Audience | Advantage+ audience (broad — est. 2.8–3.4B people, no manual targeting) |
| Placements | Advantage+ (all automatic): Feeds + In-stream for Reels; Stories/Status/Reels/Search/Apps and sites; Right column/Search |
| Start date | Apr 25, 2026 (04:12 AM PDT) |
| End date | None |

#### Ad: "New Traffic Ad" (ID: 120243272850710726)
| Field | Value |
|---|---|
| Format | Video (0:33 duration) |
| Headline / Text | “New single out May 1st! Pre-save now!” |
| Destination URL | https://afsonnic.com/2022 |
| Facebook identity | AF Sonnic (Page ID: 61560793083538) |
| Instagram identity | @af.sonnic (ID: 17841426081583540) |
| Status | Active |

---

### 1.6 Pixels & Tracking Assets
| Asset | ID | Events received | Connected To |
|---|---|---|---|
| Dataset "MeList" | ✅ 3087884218158499 | 0 (never received) | None set up |
| Dataset "Wines" | ✅ 588683624527786 | 0 (never received) | None set up |
| Meta Pixel "AF Sonnic" | ✅ 2046951969184192 | ✅ Receiving events (confirmed Apr 26, 2026 in BM Settings) | afsonnic website code — NOT yet linked to ad account (payment required) |
| Google Analytics 4 | ✅ G-QVXH2RHTVX | ✅ Active | afsonnic website |
| Conversions API | ✅ Not set up | — | — |
| Custom Audiences | ✅ None | No audiences created in this ad account |
| Product Catalog | ✅ Not set up | — | — |

---

## 2. INSTAGRAM

### 2.0 Object Map
> Both Instagram accounts are under the Meta identity. See the full Meta tree in **Section 1.0**.

```
murlex@gmail.com (Meta Accounts Center)
├── @af.sonnic  (Instagram ID: 17841426081583540)
│      Type: Creator account | Category: Artist
│      Linked Facebook Page: AF Sonnic (61560793083538)
│      In Meta BM: ⚠️ Partially — linked via ad identity, not formally added
│      Followers: 3 | Posts: 2
│
anemone.center.info@gmail.com (separate Meta Accounts Center)
└── @anemone.center  (Instagram ID: 17841439526157478)
       Type: Creator account | Category: Educational Consultant
       Linked Facebook Page: None
       In Meta BM: No
       Followers: 0 | Posts: 0
```

---

### 2.1 Account(s)
| Field | Account 1 (@af.sonnic) | Account 2 (@anemone.center) |
|---|---|---|
| Full name | ✅ Alexander Futoryan | ✅ Anemone Center |
| Username | ✅ @af.sonnic | ✅ @anemone.center |
| Instagram Account ID | ✅ 17841426081583540 | ✅ 17841439526157478 |
| Email | ✅ murlex@gmail.com (shared via Accounts Center) | ✅ anemone.center.info@gmail.com |
| Password | ⚠️ [see password manager] | ⚠️ [see password manager] |
| 2FA enabled | ⚠️ Yes / No | ⚠️ Yes / No |
| Account type | ✅ Creator account | ✅ Creator account (confirmed via Instagram API: `is_business_account: false`, `is_professional_account: true`) |
| Category | ✅ Artist | ✅ Educational Consultant |
| Bio | ✅ af-sonnic is an electronic music project exploring the intersection of digital precision and organic energy. | ✅ מומחית להתפתחות הילד — MA Tel Aviv Univ. \| 20 yrs exp. \| practical parenting tools \| free guide 👇 |
| Website in bio | ✅ afsonnic.com | ✅ youtube.com/@anemonecenter (+ 1 more link) |
| Linked Facebook Page | ✅ Not set (no linked page configured) | ✅ None (confirmed via Instagram API — no `connected_fb_page` or `page_id` returned) |
| Profile URL | ✅ https://www.instagram.com/af.sonnic/ | ✅ https://www.instagram.com/anemone.center/ |
| Followers | ✅ 3 | ✅ 0 |
| Following | ✅ 2 | ✅ 3 |
| Posts | ✅ 2 | ✅ 0 |
| Connected to BM | ✅ Linked to AF Sonnic Facebook Page and personal ad account (act_1271767923712343) — confirmed via ad identity in Ads Manager. NOT in Business Manager (BM). | ✅ NOT in Meta Business Manager (confirmed) |

> **Phone (via Accounts Center):** +972 54-550-3880 (Israel)
> Both Instagram accounts share the same Meta Accounts Center linked to Facebook account (Alexander Futoryan, ID: 100000081653329)

---

### 2.2 Instagram Campaigns (Ads via Meta)
> Instagram ads are managed through the Meta Ads Manager (see Facebook > Ad Accounts above). The "Years 2022 release" campaign targets Instagram placements automatically via Advantage+ alongside Facebook.

| Campaign Name | Placement | Status | Budget |
|---|---|---|
| Years 2022 release | ✅ Advantage+ (includes Instagram Feed, Stories, Reels, Search automatically) | ✅ Active | ✅ See ad set above: €5.00/day |

> Ad identity for Instagram placements: @af.sonnic (ID: 17841426081583540). The ad shows as “af.sonnic · Ad” on Instagram.

---

### 2.3 Shopping / Catalog
| Field | Value |
|---|---|
| Shop enabled | ✅ No |
| Catalog connected | ✅ None |
| Product tagging | ✅ N/A |

---

## 3. TIKTOK

### 3.0 TikTok Object Map

```
Personal Creator Account: @afsonnic
│  Display name: AF Sonnic
│  Login: murlex@gmail.com | Phone: +972 54-550-3880
│  Region: Israel | 2FA: Yes | Followers: 3 | Likes: 12
│  URL: tiktok.com/@afsonnic
│
└── Business Center: "AF Sonnic_bc_o9a2ll"
    │  BC ID: 7632665069930889217
    │  Members: 1 (Alexander Futoryan, Admin)
    │  Verified: No
    │
    └── Ad Account: "AF Sonnic_adv"
        │  Ad Account ID: 7632665045658550288
        │  Currency: USD | Status: Active
        │  Balance: $48.75 (prepaid, no card on file)
        │
        └── Campaign: "Traffic years 2022"  (Traffic, Active)
            │  Stats Apr 18–25: $10.61 spend | 12,726 impressions
            │  222 clicks | 1.74% CTR | $0.05 CPC
            │
            └── [Ad Group details — not documented]

Assets
├── TikTok Pixel — ⚠️ ID unknown (Events Manager blocked by phone verification)
├── Custom Audiences — ✅ None (confirmed)
└── TikTok Shop — N/A (music artist)
```

---

### 3.1 TikTok Personal / Creator Account
| Field | Value |
|---|---|
| Display name | ✅ AF Sonnic |
| Username | ✅ @afsonnic |
| Email | ✅ murlex@gmail.com |
| Phone | ✅ +972 54-550-3880 |
| Password | ⚠️ [see password manager] |
| 2FA enabled | ✅ Yes |
| Account type | ✅ Personal (not TikTok Business Account type; Business Center used for ads) |
| Region | ✅ Israel |
| Bio | ✅ af-sonnic is an electronic music project. https://afsonnic.com |
| Website in bio | ✅ https://afsonnic.com |
| Profile URL | ✅ https://www.tiktok.com/@afsonnic |
| Followers | ✅ 3 |
| Following | ✅ 0 |
| Likes | ✅ 12 |

---

### 3.2 TikTok for Business (Ads)
| Field | Value |
|---|---|
| Business Center name | ✅ AF Sonnic_bc_o9a2ll |
| Business Center ID | ✅ 7632665069930889217 |
| Business verified | ✅ No (unverified) |
| Members | ✅ 1 |
| Login email | ✅ murlex@gmail.com |
| TikTok Ads User ID | ✅ 7632661302791422997 |
| Password | ⚠️ [see password manager] |
| 2FA enabled | ✅ Yes |
| URL | https://ads.tiktok.com |

#### Ad Accounts
| Ad Account Name | Ad Account ID | Currency | Status |
|---|---|---|---|
| ✅ AF Sonnic_adv | ✅ 7632665045658550288 | ✅ USD | ✅ Active |

#### Billing
| Field | Value |
|---|---|
| Payment method | ✅ Prepaid cash balance — no saved card/PayPal (balance as of Apr 25, 2026: $48.75 USD) |
| Billing email | ✅ murlex@gmail.com |

---

### 3.3 TikTok Campaigns
| Campaign Name | Objective | Status | Budget | Ad Account |
|---|---|---|---|---|
| ✅ "Traffic years 2022" | ✅ Traffic | ✅ Active (On) | ✅ No campaign-level budget (budget set at ad group level) | ✅ 7632665045658550288 |

> 1 campaign total as of April 25, 2026. Campaign URL: https://ads.tiktok.com/i18n/manage/campaign?aadvid=7632665045658550288
> Stats (Apr 18–25, 2026): $10.61 USD spend | 12,726 impressions | 222 clicks | 1.74% CTR | $0.05 CPC | $0.83 CPM | 0 conversions

---

### 3.4 TikTok Pixel & Assets
| Asset | ID | Connected To |
|---|---|---|
| TikTok Pixel | ⚠️ [Not retrieved — Events Manager requires phone verification; check ads.tiktok.com > Tools > Events Manager] | afsonnic website |
| Custom Audiences | ✅ None (Audience Manager shows "No Data" — confirmed in TikTok Ads Manager) | — |
| TikTok Shop | ✅ Not applicable (music artist, no products to sell) | — |

> Note: TikTok Events Manager (ads.tiktok.com/i18n/events_manager/) requires phone number verification before access. Likely no pixel set up yet (similar to Meta where no real pixel is integrated).

---

## 4. CROSS-PLATFORM CONNECTIONS

| Connection | Status | Notes |
|---|---|---|
| Instagram ↔ Facebook Page linked | ✅ Yes | @af.sonnic (ID: 17841426081583540) is linked to "AF Sonnic" Page (ID: 61560793083538) — confirmed via ad identity in Ads Manager showing both as the ad’s identities |
| Instagram ↔ Meta Business Manager | ⚠️ Partial | @af.sonnic is linked to the AF Sonnic Facebook Page and ad account (confirmed in ad setup); @anemone.center is NOT in the BM |
| TikTok ↔ TikTok Business Center | ✅ Yes | BC: AF Sonnic_bc_o9a2ll (ID: 7632665069930889217) |
| Meta Pixel on website | ✅ code present, ID set to 2046951969184192 | ⚠️ Deploy site + verify with Meta Pixel Helper |
| Google Analytics 4 on website | ✅ Active | ID: G-QVXH2RHTVX |
| TikTok Pixel on website | ✅ No | No TikTok pixel code present in tracking.js or site source |
| Spotify artist profile | ⚠️ Pre-save only — track releases May 1, 2026. URL `https://open.spotify.com/artist/afsonnic` is invalid (404). Find real artist ID in Spotify for Artists after release. | — |
| SoundCloud | ✅ Linked | https://soundcloud.com/af-sonnic |
| YouTube / YouTube Music | ✅ Linked | https://www.youtube.com/@murlexmurlex |
| Distribution (Amuse) | ✅ Active | https://share.amuse.io/track/af-sonnic-years-2022 |

---

## 5. SHARED ASSETS & TOOLS

### 5.1 Quick Login Reference
> All platforms use the same primary email unless noted.

| Platform | Login URL | Email | Notes |
|---|---|---|---|
| Facebook (personal) | https://www.facebook.com/login | murlex@gmail.com | Also accessible via https://facebook.com |
| Facebook Business Suite | https://business.facebook.com | murlex@gmail.com | Manage Page, ads, Instagram from one place |
| Meta Ads Manager | https://adsmanager.facebook.com | murlex@gmail.com | Direct link to ad account: https://adsmanager.facebook.com/adsmanager/accounts?act=1271767923712343 |
| Instagram (@af.sonnic) | https://www.instagram.com | murlex@gmail.com | Same Meta account as Facebook |
| Instagram (@anemone.center) | https://www.instagram.com | anemone.center.info@gmail.com | Separate Google account |
| TikTok (personal @afsonnic) | https://www.tiktok.com/login | murlex@gmail.com | Personal creator account |
| TikTok Ads Manager | https://ads.tiktok.com | murlex@gmail.com | Business Center + Ad Account |
| YouTube / YouTube Studio | https://studio.youtube.com | murlex@gmail.com | Google account login; channel @murlexmurlex |
| Google Analytics 4 | https://analytics.google.com | murlex@gmail.com | Property ID: G-QVXH2RHTVX |
| Spotify for Artists | https://artists.spotify.com | murlex@gmail.com | Artist dashboard (after May 1, 2026 release) |
| Amuse (distribution) | https://artists.amuse.io | murlex@gmail.com | Release manager; release ID 4531331 |
| afsonnic.com domain / GitHub | https://github.com | murlex@gmail.com (assumed) | Static site; deployed via GitHub Actions |

### 5.2 Account Hierarchy

```
murlex@gmail.com  (Google account — primary identity)
│
├── Facebook: Alexander Futoryan (ID: 100000081653329)
│   ├── Meta Business Manager: "Alexander Futoryan" (BM ID: 1285120136920909)
│   │   └── Facebook Page: "AF Sonnic" (Page ID: 61560793083538)
│   ├── Ad Account (personal): act_1271767923712343  ← NOT in BM
│   │   ├── Campaign: "Years 2022 release" (Traffic, Active)
│   │   └── Ad identity: AF Sonnic Page + @af.sonnic Instagram
│   └── Datasets (Pixels): "MeList" (3087884218158499), "Wines" (588683624527786) — no events received
│
├── Instagram: @af.sonnic (ID: 17841426081583540)
│   ├── Type: Creator / Artist
│   ├── Linked to: AF Sonnic Facebook Page (ad identity only; NOT formally in BM)
│   └── Shared via Meta Accounts Center with @anemone.center
│
├── TikTok Business Center: "AF Sonnic_bc_o9a2ll" (BC ID: 7632665069930889217)
│   └── Ad Account: "AF Sonnic_adv" (ID: 7632665045658550288)
│       └── Campaign: "Traffic years 2022" (Active, $48.75 balance)
│
├── YouTube channel: @murlexmurlex (ID: UClrpz8X7WDKCjj8Cn-d3RJA)
│   └── YouTube Music: auto-linked at music.youtube.com/channel/UClrpz8X7WDKCjj8Cn-d3RJA
│
└── Amuse (distribution)
    └── Release: "Years. 2022." (ID: 4531331) → Spotify + Apple Music (releasing May 1, 2026)

anemone.center.info@gmail.com  (separate Google account)
└── Instagram: @anemone.center (ID: 17841439526157478)
    ├── Type: Creator / Educational Consultant
    └── NOT connected to Meta BM or any Facebook Page
```

### 5.3 Tools & Platforms Table
| Tool / Asset | Platform | Purpose | Login email |
|---|---|---|---|
| Meta Business Suite | Facebook / Instagram | Page + ad management dashboard | murlex@gmail.com |
| Meta Ads Manager | Facebook / Instagram | Campaign and ad creation | murlex@gmail.com |
| TikTok Ads Manager | TikTok | Ad management | murlex@gmail.com |
| YouTube Studio | YouTube | Channel management, video upload | murlex@gmail.com |
| Google Analytics 4 | Website | Traffic analytics | murlex@gmail.com |
| Amuse | Distribution | Music releases to all streaming platforms | murlex@gmail.com |
| Spotify for Artists | Spotify | Artist dashboard, streaming stats | murlex@gmail.com |

---

## 6. NOTES & RECOVERY INFO

| Item | Detail |
|---|---|
| Facebook recovery email | ✅ murlex@gmail.com (primary contact email on account) |
| Facebook recovery phone | ✅ +972 54-550-3880 |
| Instagram recovery email (@af.sonnic) | ✅ murlex@gmail.com |
| Instagram recovery email (@anemone.center) | ✅ anemone.center.info@gmail.com |
| TikTok recovery email | ✅ murlex@gmail.com (same as login email) |
| Password manager used | ⚠️ [1Password / Bitwarden / etc.] |
| Backup codes stored | ⚠️ [FILL IN — e.g. in password manager / printed] |

---

## 7. ARTIST PROFILES & STREAMING

| Platform | URL | Handle |
|---|---|---|
| Spotify | ⚠️ Artist page not confirmed — `https://open.spotify.com/artist/afsonnic` is INVALID (returns 404; Spotify IDs are random strings, not handles). Track "Years. 2022." is in **pre-save** status (releases May 1, 2026). Find real artist ID in Spotify for Artists after release. | AF Sonnic |
| Apple Music | ⚠️ Track "Years. 2022." is in **pre-save** status (releases May 1, 2026). Real artist URL unknown. Check Amuse dashboard after release date, then update site.json placeholder `your-id`. | AF Sonnic |
| YouTube / YouTube Music | ✅ https://www.youtube.com/@murlexmurlex | @murlexmurlex — see Section 8 for full details |
| SoundCloud | ✅ https://soundcloud.com/af-sonnic | af-sonnic |
| Instagram | ✅ https://www.instagram.com/af.sonnic/ | @af.sonnic |
| TikTok | ✅ https://www.tiktok.com/@afsonnic | @afsonnic |

---

## 8. YOUTUBE

### 8.0 YouTube Object Map

```
Google account: murlex@gmail.com
│
└── YouTube Channel: Alexander Futoryan
    │  Handle: @murlexmurlex
    │  Channel ID: UClrpz8X7WDKCjj8Cn-d3RJA
    │  URL: youtube.com/@murlexmurlex
    │  Subscribers: 3 | Videos: 4 | Monetization: ⚠️ likely off (<1K subs)
    │
    ├── Videos (all "Years 2022" release variants)
    │   ├── "Years, 2022"  (Dt2Naq0fJxs) — YouTube Short
    │   ├── "Years. 2022." (8PNee3umj50)
    │   ├── "Years. 2022." (Jk2lYc-kj4o)
    │   └── "Years. 2022." (sOOJkITPB5Q)
    │
    └── YouTube Music (auto-linked)
           URL: music.youtube.com/channel/UClrpz8X7WDKCjj8Cn-d3RJA

YouTube Studio: studio.youtube.com
Distributed via: Amuse (share.amuse.io/track/af-sonnic-years-2022)
```

---

### 8.1 Channel
| Field | Value |
|---|---|
| Channel name | ✅ Alexander Futoryan |
| Handle | ✅ @murlexmurlex |
| Channel ID | ✅ UClrpz8X7WDKCjj8Cn-d3RJA |
| Channel URL (handle) | ✅ https://www.youtube.com/@murlexmurlex |
| Channel URL (ID) | ✅ https://www.youtube.com/channel/UClrpz8X7WDKCjj8Cn-d3RJA |
| Description | ✅ AF Sonnic music. Contact: murlex@gmail.com |
| Keywords | ✅ "AF Sonnic Music" |
| Login email | ✅ murlex@gmail.com (Google account) |
| Password | ⚠️ [see password manager] |
| Subscribers | ✅ 3 |
| Videos | ✅ 4 |
| Monetization | ⚠️ [FILL IN — likely not enabled, below 1,000 subscriber threshold] |

---

### 8.2 Videos
| # | Title | Video ID | URL |
|---|---|---|---|
| 1 | Years, 2022 | Dt2Naq0fJxs | https://www.youtube.com/watch?v=Dt2Naq0fJxs |
| 2 | Years. 2022. | 8PNee3umj50 | https://www.youtube.com/watch?v=8PNee3umj50 |
| 3 | Years. 2022. | Jk2lYc-kj4o | https://www.youtube.com/watch?v=Jk2lYc-kj4o |
| 4 | Years. 2022. | sOOJkITPB5Q | https://www.youtube.com/watch?v=sOOJkITPB5Q |

> All 4 videos are variants of the "Years 2022" release. Video 1 (Dt2Naq0fJxs) is a YouTube Short (vertical format).

---

### 8.3 YouTube Music / Distribution
| Field | Value |
|---|---|
| YouTube Music artist page | ✅ Auto-generated from channel — https://music.youtube.com/channel/UClrpz8X7WDKCjj8Cn-d3RJA |
| Distributed via | ✅ Amuse (https://share.amuse.io/track/af-sonnic-years-2022) |
| YouTube Studio | https://studio.youtube.com |

---

## 9. SPOTIFY & APPLE MUSIC

### 9.0 Distribution Object Map

```
Amuse distribution account: murlex@gmail.com
│  Dashboard: artists.amuse.io
│
└── Release: "Years. 2022."  (Amuse release ID: 4531331)
    │  Pre-save page: share.amuse.io/track/af-sonnic-years-2022
    │  Release date: May 1, 2026
    │
    ├── Spotify
    │      Artist name: AF Sonnic
    │      Artist ID: ⚠️ Unknown (find after May 1 — see Section 9.1)
    │      Artist page: ⚠️ Not yet live
    │      Spotify for Artists: artists.spotify.com (murlex@gmail.com)
    │
    └── Apple Music
           Artist name: AF Sonnic
           Artist page: ⚠️ Not yet live (find after May 1 — see Section 9.2)
           site.json field: appleUrl — currently placeholder "your-id"
```

---

### 9.1 Spotify Status
| Field | Value |
|---|---|
| Artist name | AF Sonnic |
| Artist ID | ⚠️ Unknown — `https://open.spotify.com/artist/afsonnic` returns 404 (Spotify IDs are random alphanumeric strings, not handles) |
| Artist page URL | ⚠️ Not confirmed — find after release date (see below) |
| Monthly listeners | ⚠️ Unknown (no artist page found) |
| Followers | ⚠️ Unknown |
| Spotify for Artists login | murlex@gmail.com — https://artists.spotify.com |
| Distribution | ✅ Via Amuse — release ID 4531331 |
| Release in Amuse | "Years. 2022." — https://share.amuse.io/track/af-sonnic-years-2022 |
| Release status | ⚠️ Pre-save (as of April 25, 2026) — release date May 1, 2026 |

> **To find the real Spotify artist ID after release (May 1, 2026):**
> 1. Open the Spotify app, search "AF Sonnic", click the artist profile → copy the URL (format: `https://open.spotify.com/artist/XXXXXXXXXX`)
> 2. OR log into https://artists.spotify.com — the URL will contain the artist ID
> 3. OR check the Amuse dashboard → Releases → distribution links → Spotify row
> 4. Then update `src/_data/site.json` → `spotifyUrl` field and this document

### 9.2 Apple Music Status
| Field | Value |
|---|---|
| Artist name | AF Sonnic |
| Artist page URL | ⚠️ Not confirmed — release date May 1, 2026; check Amuse dashboard after release |
| Distribution | ✅ Via Amuse — same release as Spotify |
| Release status | ⚠️ Pre-save (as of April 25, 2026) — release date May 1, 2026 |
| site.json field | `appleUrl` — currently has placeholder `your-id`; update after release |

> **To find the Apple Music artist URL after release:**
> 1. Check Amuse dashboard → Releases → distribution links → Apple Music row
> 2. OR search "AF Sonnic" on music.apple.com and copy the artist page URL
> 3. Then update `src/_data/site.json` → `appleUrl` and this document
