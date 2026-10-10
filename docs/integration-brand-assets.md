# Integration brand assets

The integrations page uses official artwork from product websites or the
Movena team's supplied Partner Asset folder. Brand colours, proportions and
vector path geometry are preserved. The marks identify compatibility or the
explicitly stated review/availability status; they do not imply endorsement.

| Asset | Official source | SHA-256 |
| --- | --- | --- |
| `xero-logo.svg` | `https://www.xero.com/content/dam/xero/pilot-images/admin/icons/favicon/favicon.svg` | `7ead92e7fe3098f8957593dd5598c16f80aa21f4ff541b86f1779465b5fd4e45` |
| `kisi-logo.png` | `https://res.cloudinary.com/kisi-kloud/image/upload/c_limit,w_228/v1646657122/logos/kisi/kbr-kisi-favicon-228px` | `7cb16c8d270c31e89a685bbe341e06c9b4d83e69376c590dda9a2d9a042fc1e5` |
| `health-connect-logo.png` | `https://developer.android.com/static/downloads/assets/health_connect_logo.png` | `f0a04c920d6871fe132d6d333bc7627b985ad8ec3242df0f4f54a1a13b9f000e` |
| `brevo-logo.svg` | `https://corp-backend.brevo.com/wp-content/uploads/2025/07/Brevo_logo.svg` | `b6a8f454586580a1d79f86cb10b694f316c6bcc0af6e8b88d813d23d85f81f67` |
| `facebook-logo.png` | Meta Facebook Brand Asset Pack, `Logo/Primary Logo/Facebook_Logo_Primary.png` (provided locally) | `2adfd474d91fd20c51084309ed000c1ae6cc7f5f70af14d375930f5a71301308` |

## Additional artwork (10 October 2026)

New files are under `public/integration-logos/`; existing approved assets above
are retained. Supplied files come from iCloud Drive:
`Final Images for CRM/Partner Asset/`.

| Asset | Source | SHA-256 |
| --- | --- | --- |
| `quickbooks-logo.png` | Official QuickBooks website: `https://quickbooks.intuit.com/cas/dam/IMAGE/A7mjJ5rpg/apple-touch-icon-196x196.png` | `fbb9a774485736d868563505d849ce6fb080cf6019bc0161402f3df7f4616095` |
| `google-g-logo.png` | Supplied `Google/GoogleG_FullColor_RGB.png` | `4d5cfbd85af19c003770a74f8de210156ca42c54ac0a4cb0d95572c286c882a6` |
| `apple-health-badge.svg` | Supplied `Works with Apple Health/SVG_onscreen/ENGLISH/Apple_Health_badge_US-UK_blk_sRGB.svg` | `31782111fb788796a204688ac9eaba0a0b5d33c9711c14f4f9f60fd03b81bb13` |
| `stripe-logo.svg` | Supplied `asset-wordmark/Stripe wordmark - Blurple.svg` | `4448c4b4f954285d2b2aeb6d92391c85fdc290e008c2679d2c006d6d72ae1ae9` |
| `openai-blossom.svg` | Supplied `OpenAI-logos/SVGs/OAI_OpenAI-Blossom_Black.svg`; Blossom selected by the Movena team | `75c1e9fffa5e8c437bec1d67197a73992bca45d166c6ff23215185dea8fae92a` |
| `anthropic-symbol.svg` | Supplied `Anthropic/Anthropic_Symbol_6.svg`; black symbol | `ec4b07d5814fe6171bb21cc074f5f56bcd358f38cacd31773e1d37777df09907` |

The supplied Health Connect PNG is byte-identical to the existing official
asset, so it is not duplicated. Google G replaces the plain-text Google tile.
Its supplied 2820px canvas has a visible G approximately 920px wide. A dedicated
centred sizing rule compensates for that transparent margin without editing
the PNG, stretching the mark or changing the tile dimensions.
The payment card uses the supplied Stripe wordmark and is titled Stripe, as
requested by the Movena team. Claude by Anthropic is explicitly **In review**,
not yet available, and has no connection CTA.

The ChatGPT card uses OpenAI's black Blossom, with its built-in clear space
preserved. Claude uses the supplied black Anthropic symbol. Neither is a
co-branded partnership lockup or a claim of endorsement.

Apple's badge is used unchanged, associated with the published Movena iPhone
app integration, on a light plate in both themes. It exceeds Apple's 30px
onscreen minimum height with clear space exceeding one quarter of its height.
Apple's credit line is included below the grid. Do not substitute an Apple
Fitness logo or recreate the Apple Health icon.

## MYOB text-only treatment (11 October 2026)

The MYOB logo has been removed from the page and public assets. Its public
availability on MYOB's website did not establish permission to publish it.
The tile now uses ordinary text, "MYOB", with the existing factual description
"MYOB-ready exports." It does not claim a direct connection or partnership.
Obtain the required written branding approval before restoring MYOB artwork.

Reference guidelines:

- [MYOB developer branding terms, sections 55–56](https://developer.myob.com/program/terms-conditions/business-api-tandcs/)
- [Apple Health badge](https://developer.apple.com/licensing-trademarks/works-with-apple-health/)
- [Health Connect assets](https://developer.android.com/health-and-fitness/health-connect/ui/guidelines)
- [OpenAI marks](https://openai.com/brand/)
