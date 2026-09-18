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
      kind: "text",
      label: "QuickBooks®",
    },
  },
  {
    name: "MYOB",
    description: "MYOB-ready exports.",
    mark: {
      kind: "text",
      label: "MYOB",
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
      kind: "text",
      label: "Google",
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
      kind: "text",
      label: "Apple Health",
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
    name: "Payments built in",
    description: "Payments and billing, built into Movena.",
    mark: {
      kind: "text",
      label: "Movena",
    },
  },
  {
    name: "ChatGPT — In development",
    description: "Beyond dashboards. Into conversation.",
    mark: {
      kind: "text",
      label: "ChatGPT",
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
