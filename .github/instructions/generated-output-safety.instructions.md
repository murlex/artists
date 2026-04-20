---
applyTo: "_site/**"
description: "Generated Eleventy output safety guardrail for _site files"
---

The _site directory is generated build output.

Rules:
- Do not edit files in _site directly unless the user explicitly asks for output-only edits.
- For feature/content/style fixes, edit source files under src/ and then rebuild.
- When validating behavior in _site, treat changes there as build artifacts from source edits.
- If a task appears to require touching both src and _site, prefer src changes and document why.
