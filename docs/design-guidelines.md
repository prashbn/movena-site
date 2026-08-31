# Movena visual design and approved colour palette

**Status:** approved repository guidance  
**Visual source of truth:** the current reviewed homepage at `/`

This guidance applies to every public marketing page, the shared header and
footer, and any new public-facing component. Its purpose is to keep the site
visually consistent as new pages are added.

## Source-of-truth rule

The homepage is the canonical expression of Movena's visual identity. Other
pages should reuse its colour hierarchy, restraint, contrast, spacing rhythm,
surface treatment, and interaction language. They should not introduce a
separate visual theme.

When a design reference, page-specific stylesheet, or older document conflicts
with the homepage, the homepage wins. External sites may inspire simplicity or
layout discipline, but they are not a colour or brand source of truth.

Consistency means reproducing the homepage's balance, not merely choosing a few
of the same hex values. The overall impression should remain clean and cool:
bright neutral surfaces, dark ink, restrained blue actions, and occasional
navy contrast. Warm supporting tones must never dominate a page.

## Approved palette

All public pages should consume these variables from `styles/tokens.css`.

| Role | Token | Value | Approved use |
| --- | --- | --- | --- |
| Page canvas | `--site-paper` | `#f6f4ef` | Subtle neutral base used by the homepage. Keep most content surfaces brighter so the page does not read as beige. |
| Raised surface | `--site-paper-bright` | `#fcfbf8` | Cards and quiet panels. |
| Bright surface | `--site-white` | `#ffffff` | Primary cards, media frames, navigation surfaces, and areas needing crisp contrast. |
| Primary text | `--site-ink` | `#101820` | Headings and high-emphasis copy. |
| Secondary text | `--site-ink-soft` | `#4c555d` | Body copy and secondary labels. |
| Tertiary text | `--site-ink-faint` | `#737b82` | Captions, notes, and low-emphasis metadata. |
| Primary action | `--site-blue` | `#3158e2` | Main calls to action, links, kickers, and selected states. |
| Action hover | `--site-blue-deep` | `#2545bd` | Hover and active treatment for blue actions. |
| Strong contrast | `--site-navy` | `#0c1c2c` | Deliberate dark panels or major contrast moments. Use sparingly. |
| Supporting cool tone | `--site-sage` | `#dfe8df` | An isolated supporting band, card, or media backdrop. Never a default page canvas. |
| Supporting warm tone | `--site-sand` | `#e9e2d7` | An isolated supporting band, card, or media backdrop. Never a default page canvas. |
| Border | `--site-line` | `rgba(16, 24, 32, 0.14)` | Standard borders and separators on light surfaces. |
| Border on dark | `--site-line-light` | `rgba(255, 255, 255, 0.16)` | Separators on navy or other dark surfaces. |

Colours inside product screenshots, official third-party brand assets, and
small UI demonstrations are content, not additions to the website palette.

## Application rules

1. Start with the existing semantic tokens. Do not create a page-local base
   palette or hard-code a near-duplicate neutral.
2. Let white, paper, ink, blue, and navy create the dominant page hierarchy.
3. Treat sage and sand as supporting accents. Do not use them across a whole
   page, as the default background for a card grid, or in several consecutive
   sections.
4. Use blue for purposeful interaction and emphasis, not decoration on every
   element.
5. Use navy for one strong contrast moment where the content benefits from it;
   avoid stacking several dark sections.
6. Keep official integration logos in their native brand colours, contained
   within their own logo tile. A partner's colours must not spread into page
   backgrounds, typography, or controls.
7. Reuse existing success and warning tokens for functional states. Do not
   repurpose sage, sand, or partner colours as status colours.
8. Preserve accessible text and control contrast, visible focus states, and
   readable hover and disabled states.

## What to avoid

- A new beige, cream, tan, terracotta, or pastel family added for one page.
- Pure grayscale styling that makes a page look disconnected from Movena.
- Copying another company's palette or branded component treatment.
- Hard-coded colours where an approved token already expresses the same role.
- Letting a third-party integration logo redefine the surrounding page.
- Making every section a coloured panel; the homepage relies on space and
  restraint as much as colour.

## Review checklist

Before approving a visual change:

- Compare the page with `/` at desktop and mobile widths.
- Confirm the page still reads as part of the homepage system when viewed
  without its navigation context.
- Check that the dominant surfaces are bright neutral rather than warm.
- Confirm every site colour maps to an approved token and has a clear role.
- Confirm sage and sand, if present, are isolated supporting accents.
- Confirm official partner colours are contained within their brand assets.
- Check focus, hover, text, and control contrast.
- Review the shared header and footer for unintended palette overrides.

## Changing the palette

Any proposed palette change must first be demonstrated on the homepage and
approved there. Once approved, update `styles/tokens.css`, this document, and
the affected shared components together. Do not make a one-off exception on an
individual page.
