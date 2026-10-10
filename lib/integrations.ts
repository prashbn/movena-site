export const publicIntegrations = [
  {
    name: "Xero",
    description: "Connect Xero directly to Movena.",
    mark: {
      kind: "image",
      src: "/assets/integrations/xero-logo.svg",
      width: 144,
      height: 144,
    },
  },
  {
    name: "QuickBooks®",
    description: "Connect QuickBooks directly to Movena.",
    mark: {
      kind: "image",
      src: "/integration-logos/quickbooks-logo.png",
      width: 196,
      height: 196,
    },
  },
  {
    name: "MYOB",
    description: "MYOB-ready exports.",
    mark: {
      kind: "image",
      src: "/integration-logos/myob-logo.png",
      width: 994,
      height: 488,
      layout: "wordmark",
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
    description: "Payments and billing through Stripe, built into Movena.",
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
    description: "Beyond dashboards. Into conversation.",
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
    status: "In review",
    description: "The Claude integration is in review and is not yet available.",
    mark: {
      kind: "image",
      src: "/integration-logos/anthropic-symbol.svg",
      width: 92.2,
      height: 65,
    },
  },
  {
    name: "Brevo — Available shortly",
    mark: {
      kind: "image",
      src: "/assets/integrations/brevo-logo.svg",
      width: 32,
      height: 32,
    },
  },
] as const;
