export const publicIntegrations = [
  {
    name: "Xero",
    description: "Accounting integration.",
    image: "/assets/integrations/xero-accounting.svg",
    imageAlt: "Xero accounting dashboard illustration",
  },
  {
    name: "Kisi",
    description: "Access control integration.",
    href: "/integrations/kisi/",
    image: "/assets/integrations/kisi-access-control.svg",
    imageAlt: "Kisi connected access control illustration",
  },
  {
    name: "Apple Health",
    description: "Supported member health and workout data.",
    image: "/assets/integrations/apple-health-data.svg",
    imageAlt: "Apple Health workout and heart data illustration",
  },
  {
    name: "Health Connect",
    description: "Supported Android health and fitness data.",
    image: "/assets/integrations/health-connect-data.svg",
    imageAlt: "Health Connect linked fitness data illustration",
  },
  {
    name: "Payments built in",
    description: "Payments and billing, built into Movena.",
    image: "/assets/integrations/movena-payments.svg",
    imageAlt: "Movena payments and billing illustration",
  },
  {
    name: "Brevo — Coming soon",
    image: "/assets/integrations/brevo-messaging.svg",
    imageAlt: "Brevo customer messaging illustration",
  },
] as const;
