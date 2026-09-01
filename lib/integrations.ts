export const publicIntegrations = [
  {
    name: "Xero",
    description: "Xero-ready exports.",
    mark: {
      kind: "image",
      src: "/assets/integrations/xero-logo.svg",
      width: 144,
      height: 144,
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
    name: "Brevo — Available shortly",
    mark: {
      kind: "image",
      src: "/assets/integrations/brevo-logo.svg",
      width: 32,
      height: 32,
    },
  },
] as const;
