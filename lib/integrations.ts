export const publicIntegrations = [
  {
    name: "Xero",
    description: "Connect directly to Xero, with exports also available.",
    mark: {
      kind: "image",
      src: "/assets/integrations/xero-logo.svg",
      width: 144,
      height: 144,
    },
  },
  {
    name: "QuickBooks®",
    description: "Export CSV statements for QuickBooks. No direct connection.",
    mark: {
      kind: "image",
      src: "/integration-logos/quickbooks-logo.png",
      width: 196,
      height: 196,
    },
  },
  {
    name: "MYOB",
    description: "Export OFX statements for MYOB. No direct connection.",
    mark: {
      kind: "text",
      text: "MYOB",
    },
  },
  {
    name: "Facebook",
    description: "New Facebook leads arrive in Movena automatically.",
    mark: {
      kind: "image",
      src: "/assets/integrations/facebook-logo.png",
      width: 2084,
      height: 2084,
    },
  },
  {
    name: "Google",
    description: "Bring Google marketing leads into Movena.",
    mark: {
      kind: "image",
      src: "/integration-logos/google-g-logo.png",
      width: 2820,
      height: 2820,
      layout: "google",
    },
  },
  {
    name: "Kisi",
    description: "Access control integration — listed in Kisi’s marketplace.",
    href: "/integrations/kisi/",
    mark: {
      kind: "image",
      src: "/assets/integrations/kisi-logo.png",
      width: 228,
      height: 228,
    },
  },
  {
    name: "Apple Health",
    description: "Member-controlled workout and health data from iPhone.",
    mark: {
      kind: "image",
      src: "/integration-logos/apple-health-badge.svg",
      width: 122.747,
      height: 34.016,
      layout: "wordmark",
    },
  },
  {
    name: "Health Connect",
    description: "Member-controlled health and fitness data from Android.",
    mark: {
      kind: "image",
      src: "/assets/integrations/health-connect-logo.png",
      width: 192,
      height: 192,
    },
  },
  {
    name: "Stripe",
    description: "Take payments for memberships, bookings and gym purchases.",
    mark: {
      kind: "image",
      src: "/integration-logos/stripe-logo.svg",
      width: 360,
      height: 150,
      layout: "wordmark",
    },
  },
  {
    name: "ChatGPT",
    description: "Explore your gym’s performance and your own approved training information.",
    mark: {
      kind: "image",
      src: "/integration-logos/openai-blossom.svg",
      width: 716,
      height: 716,
      layout: "blossom",
    },
  },
  {
    name: "Claude by Anthropic",
    status: "Directory listing in review",
    description: "Connect Claude with approved Movena information. Connector enabled in production; directory listing in review.",
    mark: {
      kind: "image",
      src: "/integration-logos/anthropic-symbol.svg",
      width: 92.2,
      height: 65,
    },
  },
] as const;
