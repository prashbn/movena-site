# Preserved homepage — 18 October 2026

The owner-positioning brief replaces the earlier homepage direction. This work
is a dev review only. Do not publish to the production branch without Prash's
new explicit approval.

## Exact baseline

- Commit: `913fc45153ba90a4a4d4338016fd561907dddc54`.
- Git tag: `home-before-owner-positioning-2026-10-18`.
- Preserved live rendering on dev: `/review/home-before/` (noindex, nofollow;
  not included in the sitemap).
- `LegacyMain` defaults to the preserved rendering. Only the primary homepage
  opts into the owner version through `HomePageShell`.
- `content/legacy/index.html`, its existing copy transformations, the app
  showcase, Loop, discovery tabs, community, badges, and original homepage
  styles remain available. No existing image assets were deleted.

The local review outputs also include the baseline source archive and full-page
desktop and phone screenshots. Restore baseline files selectively from the tag;
do not reset other pages or unrelated later work.

## Content to consider moving later

| Preserved material | Candidate destination after review |
| --- | --- |
| Member app showcase and QR | Members |
| Record → Keep → Act Loop | Members or Platform |
| Hangout photography and community story | Members |
| Milestones, challenges and badges | Members; owner retention detail on Platform |
| Training disciplines and Pilates photo | Businesses or Platform |
| Provider-branded connections | Review separately; no provider promotion on the owner homepage |
| Member ownership and sharing detail | Members; legal pages remain untouched |

These are candidates, not approved relocations. This change does not modify
Members, Platform, Businesses, Pricing, the app download page, legal pages,
their metadata or shared navigation.
