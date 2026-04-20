---
description: "Add or update a release in site data with safe validation steps"
name: "Update Release Entry"
argument-hint: "Release title, slug, date, CTA, links, and artwork"
agent: "agent"
---
Update the release data in [src/_data/site.json](../../src/_data/site.json) using the user input.

Requirements:
- Modify only source files, not generated output under [_site](../../_site).
- Keep the data model compatible with existing templates in [src/index.njk](../../src/index.njk) and [src/_includes/release-page.njk](../../src/_includes/release-page.njk).
- Preserve existing keys unless the user explicitly asks to remove or rename them.
- For new release entries, keep or set this structure:
  - title
  - slug (optional)
  - releaseDate (optional)
  - artwork: src, srcMobile (optional), alt (optional)
  - primaryCta: label, url
  - links: array of objects with name and url
- Keep JSON valid and consistently formatted.

Execution steps:
1. Read current releases and determine whether this is a create or update operation.
2. Apply the smallest possible edit to [src/_data/site.json](../../src/_data/site.json).
3. If required release fields are missing from user input, ask for only the missing values.
4. Run a production build with npm run build.
5. Confirm resulting homepage and release route assumptions:
   - Homepage uses the first release in releases.
   - Release permalink is based on slug or slugified title.
6. Summarize exactly what changed and include the updated release object.

Output format:
- Operation: Added or Updated
- Target release: title and slug
- Files changed
- Validation results
- Final release JSON snippet
