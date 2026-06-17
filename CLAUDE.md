# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static 2-page Hebrew lead magnet funnel for Hadar Cohen, a marketing coach targeting female service-business owners (therapists, coaches, mentors). No build step — open HTML files directly in a browser.

## Architecture

```
index.html      ← Page 1: opt-in squeeze page (training pitch + lead capture)
tutorial.html   ← Page 2: video + breakthrough-call (פגישת פיצוח) offer
style.css       ← Shared design system (dark navy + neon pink, RTL)
script.js       ← Form logic: validate → webhook → redirect/success
```

**Visual design:** Dark navy background with neon-pink accents, glowing form cards, and outline Material-Symbols icons — matched to a client-supplied reference image. Both pages share `style.css` (linked from each) and layer Tailwind CDN utilities on top for layout.

**Funnel flow:** Visitor fills opt-in form on `index.html` (name + phone) → webhook fires (fire-and-forget) → redirect to `tutorial.html?name=ENCODED_NAME` → watches the training video → fills the breakthrough-call form.

## Key Implementation Details

**Language & direction:** All copy is Hebrew, `dir="rtl"` on `<html>`. Fonts: **Rubik** (display/headings) + **Assistant** (body) + **Gveret Levin AlefAlefAlef** (the rotated handwritten accent), all from Google Fonts.

**Webhooks:** `WEBHOOK_URL` (lead) and `DISCOVERY_WEBHOOK_URL` (breakthrough call) at top of `script.js`. Both forms POST JSON fire-and-forget — redirect/success happens regardless of the webhook result.

**Form payloads:**
- Page 1 (lead): `{ type: "lead", name, phone, source: "landing_page" }` — email is **not** collected (matches the reference's two-field form).
- Page 2 (discovery): `{ type: "discovery_call", name, email, phone, business_domain, clients_to_add, pricing, main_challenge, source: "tutorial_page" }`

**Name personalization:** Page 2 reads `?name=` from the URL and injects it into `<span id="greeting-name">`.

**YouTube video:** Active in `tutorial.html` — `<iframe>` embeds `https://www.youtube.com/embed/4c5BlCtuzRg`. Swap the ID to change the video.

**Testimonials:** The three cards on `index.html` are placeholders marked `[ להחליף בעדות אמיתית ]`.

## Design Tokens (style.css, OKLCH)

| Variable | Role | Value |
|----------|------|-------|
| `--bg-0` | page base (deep navy) | `oklch(0.17 0.045 285)` |
| `--surface` | cards | `oklch(0.23 0.045 287)` |
| `--pink` | neon accent / icons | `oklch(0.68 0.27 0)` |
| `--pink-deep` | CTA gradient end | `oklch(0.58 0.24 1)` |
| `--ink` | near-white text | `oklch(0.97 0.008 300)` |
| `--radius` | card radius | `18px` |
| `--max-w` | content column | `720px` |

## Copy Guidelines

- Audience addressed as feminine (את, שלך) — she is the service provider
- Her clients are referred to as masculine (הוא, הם, מגיעים) — clients are male
- Tone: warm, direct, not salesy
- Core message: clients don't come because of 3 objections that can be neutralized in content before they ever reach out
