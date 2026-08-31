# Movena visual design and approved colour palette

**Status:** approved repository guidance  
**Visual source of truth:** the current reviewed Platform page at `/platform/`

This guidance applies to every public marketing page, the shared header and
footer, and any new public-facing component. Its purpose is to keep the site
visually consistent as new pages are added.

## Source-of-truth rule

The Platform page is the canonical expression of Movena's visual identity.
Every other page should reuse its colour hierarchy, restraint, contrast,
spacing rhythm, surface treatment, and interaction language. Pages must not
introduce a separate visual theme.

When a design reference, page-specific stylesheet, or older document conflicts
with the Platform page, the Platform page wins. External sites may inspire
simplicity or layout discipline, but they are not a colour or brand source of
truth.

Consistency means reproducing the Platform page's balance, not merely choosing
a few of the same hex values. The overall impression is clean and cool: a white
canvas, very pale blue-grey washes, dark ink, cobalt actions, white bordered
cards, and isolated navy contrast.

Preserve that layering: shared navigation and page heroes sit on white; major
content areas may use the cool `#f5f7fb` wash; nested component surfaces use
`#fafbfd`; primary cards return to white with a visible border. Do not collapse
all four roles into one continuous white surface.

## Approved palette

The canonical primitives live in `assets/site.css`. Newer components consume
their matching `--site-*` aliases from `styles/tokens.css`.

| Role | Token | Value | Approved use |
| --- | --- | --- | --- |
| Page canvas and cards | `--bg` / `--site-canvas` / `--site-surface` | `#ffffff` | The dominant canvas and primary bordered-card surface. |
| Section wash | `--bg-tint` / `--site-surface-tint` | `#f5f7fb` | Cool section washes, integration mark tiles, and quiet insets. |
| Soft component surface | `--bg-soft` / `--site-surface-soft` | `#fafbfd` | Component chrome and subtle nested surfaces. |
| Primary text | `--ink` / `--site-ink` | `#14161b` | Headings and high-emphasis copy. |
| Secondary text | `--ink-2` / `--site-ink-soft` | `#59606b` | Body copy and secondary labels. |
| Tertiary text | `--ink-3` / `--site-ink-faint` | `#8a909b` | Captions, notes, and low-emphasis metadata. |
| Primary action | `--accent` / `--site-blue` | `#2f54d0` | Main calls to action, links, kickers, and selected states. |
| Action hover | `--accent-ink` / `--site-blue-deep` | `#2646b4` | Hover and active treatment for blue actions. |
| Action tint | `--accent-soft` / `--site-blue-soft` | `#edf1fc` | Selected and interactive control backgrounds. |
| Strong contrast | `--site-navy` | `#0c1c2c` | Deliberate dark panels or major contrast moments. Use sparingly. |
| Pale blue wash | `--tint-blue` / `--site-wash-blue` | `#eef2fd` | Fact strips and an isolated supporting surface. |
| Pale violet wash | `--tint-violet` / `--site-wash-violet` | `#f6f3ff` | An isolated capability surface. |
| Pale slate wash | `--tint-sage` / `--site-wash-slate` | `#f0f4fa` | Banded sections such as team or privacy. Despite the legacy primitive name, the value is a cool blue-grey. |
| Pale mint wash | `--tint-mint` / `--site-wash-mint` | `#eef7f1` | A restrained closing call to action. |
| Border | `--line` / `--site-line` | `#e8eaef` | Standard borders and separators on light surfaces. |
| Strong border | `--line-2` | `#d3d8e2` | Hover borders and more visible section separators. |
| Border on dark | `--site-line-light` | `rgba(255, 255, 255, 0.16)` | Separators on navy or other dark surfaces. |

Colours inside product screenshots, official third-party brand assets, and
small UI demonstrations are content, not additions to the website palette.

## Application rules

1. Start with the existing semantic tokens. Do not create a page-local base
   palette or hard-code a near-duplicate neutral.
2. Let white, ink, cobalt, cool washes, and occasional navy create the page
   hierarchy.
3. Use the cool section wash to distinguish major content areas, then place
   white bordered cards above it. Tinted surfaces must not consume the entire
   page or replace the white hero.
4. Use blue for purposeful interaction and emphasis, not decoration on every
   element.
5. Use navy for one strong contrast moment where the content benefits from it;
   avoid stacking several dark sections.
6. Keep official integration logos in their native brand colours, contained
   within their own logo tile. A partner's colours must not spread into page
   backgrounds, typography, or controls.
7. Reuse existing success and warning tokens for functional states. Do not
   repurpose section washes or partner colours as status colours.
8. Preserve accessible text and control contrast, visible focus states, and
   readable hover and disabled states.

## What to avoid

- A beige, cream, tan, terracotta, or unrelated pastel family added for one
  page.
- Pure grayscale styling that makes a page look disconnected from Movena.
- Copying another company's palette or branded component treatment.
- Hard-coded colours where an approved token already expresses the same role.
- Letting a third-party integration logo redefine the surrounding page.
- Making every section a coloured panel; the Platform page relies on space and
  restraint as much as colour.

## Review checklist

Before approving a visual change:

- Compare the page with `/platform/` at desktop and mobile widths.
- Confirm the page still reads as part of the Platform system when viewed
  without its navigation context.
- Check that the dominant surfaces are bright neutral rather than warm.
- Confirm every site colour maps to an approved token and has a clear role.
- Confirm tinted washes, if present, are isolated supporting accents.
- Confirm official partner colours are contained within their brand assets.
- Check focus, hover, text, and control contrast.
- Review the shared header and footer for unintended palette overrides.

## Changing the palette

Any proposed palette change must first be demonstrated on `/platform/` and
approved there. Once approved, update the canonical primitives, aliases, this
document, and the affected shared components together. Do not make a one-off
exception on an individual page.
