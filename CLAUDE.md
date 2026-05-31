# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static 2-page Hebrew lead magnet funnel for Hadar Cohen, a marketing coach targeting female service-business owners (therapists, coaches, mentors). No build step — open HTML files directly in a browser.

## Architecture

```
index.html      ← Page 1: opt-in / lead capture
tutorial.html   ← Page 2: video + discovery-call offer
style.css       ← Shared styles (pink & white, RTL)
script.js       ← Form logic: validate → webhook → redirect/success
```

**Funnel flow:** Visitor fills form on `index.html` → webhook fires (fire-and-forget) → redirect to `tutorial.html?name=ENCODED_NAME` → watches video → fills discovery-call form.

## Key Implementation Details

**Language & direction:** All copy is Hebrew, `dir="rtl"` on `<html>`. Font is Heebo from Google Fonts.

**Webhook:** `const WEBHOOK_URL = "REPLACE_ME"` at top of `script.js`. Both forms POST JSON but don't block on the response — redirect/success happens regardless of webhook result.

**Form payloads:**
- Page 1 (lead): `{ type: "lead", name, email, phone, source: "landing_page" }`
- Page 2 (discovery): `{ type: "discovery_call", name, email, phone, message, source: "tutorial_page" }`

**Name personalization:** Page 2 reads `?name=` from the URL and injects it into `<span id="greeting-name">`.

**YouTube video:** In `tutorial.html` around line 50, the `<iframe>` is commented out. Uncomment and replace `YOUR_VIDEO_ID` with the real ID to activate.

**Image placeholders:** `<div class="img-placeholder">` blocks throughout — replace with `<img>` tags when photos are available.

**Testimonials:** All testimonial cards are placeholders marked with `[ להחליף בעדות אמיתית ]`.

## Design Tokens (style.css)

| Variable | Value |
|----------|-------|
| `--pink` | `#E91E8C` |
| `--pink-light` | `#FCE4F3` |
| `--text` | `#1A1A2E` |
| `--radius` | `14px` |
| `--max-w` | `1100px` |

## Copy Guidelines

- Audience addressed as feminine (את, שלך) — she is the service provider
- Her clients are referred to as masculine (הוא, הם, מגיעים) — clients are male
- Tone: warm, direct, not salesy
- Core message: clients don't come because of 3 objections that can be neutralized in content before they ever reach out
