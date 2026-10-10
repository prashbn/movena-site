import type { LegacySource } from "./routes.ts";
import { siteConfig } from "./site-config.ts";

function emailLink(email: string): string {
  return `<a href="mailto:${email}">${email}</a>`;
}

// Only update contact details on named public pages. Keep the approved source
// documents, policy dates and all substantive legal wording intact.
export function rewriteWebsiteContactEmails(
  markup: string,
  source: LegacySource,
): string {
  const general = emailLink(siteConfig.email);
  const privacy = emailLink(siteConfig.privacyEmail);
  const support = emailLink(siteConfig.supportEmail);

  switch (source) {
    case "legal/privacy/index.html":
      return markup
        .replaceAll(general, privacy)
        .replace(
          `<li><strong>Privacy and legal enquiries:</strong> ${privacy}</li>`,
          `<li><strong>Privacy enquiries:</strong> ${privacy}</li>\n      <li><strong>General legal enquiries:</strong> ${general}</li>`,
        )
        .replace(
          `<li>Privacy and legal enquiries: ${privacy}</li>`,
          `<li>Privacy enquiries: ${privacy}</li>\n      <li>General legal enquiries: ${general}</li>`,
        );
    case "legal/terms/index.html":
      return markup
        .replace(
          `<li>Legal and privacy matters: ${general}</li>`,
          `<li>Legal matters: ${general}</li>\n      <li>Privacy matters: ${privacy}</li>`,
        )
        .replace(
          `To request access to, correction of, or deletion of your personal information, contact ${general}.`,
          `To request access to, correction of, or deletion of your personal information, contact ${privacy}.`,
        )
        .replace(
          `<li><strong>A legal or privacy issue:</strong> ${general}</li>`,
          `<li><strong>A legal issue:</strong> ${general}</li>\n      <li><strong>A privacy issue:</strong> ${privacy}</li>`,
        )
        .replace(
          `Australia. Legal and privacy: ${general} Product support:`,
          `Australia. Legal: ${general} Privacy: ${privacy} Product support:`,
        );
    case "help/index.html":
      return markup
        .replace(
          `<li><strong>Privacy and legal:</strong> ${general} — your personal information, access, correction or deletion requests.</li>`,
          `<li><strong>Privacy:</strong> ${privacy} — your personal information, access, correction or deletion requests.</li>\n        <li><strong>General legal enquiries:</strong> ${general}</li>`,
        )
        .replace(
          `To access, correct or delete your personal information, email ${general}.`,
          `To access, correct or delete your personal information, email ${privacy}.`,
        );
    case "help/ai-assistants/index.html":
      return markup.replace(
        `Questions? Write to ${support}.`,
        `Questions? Write to ${privacy}.`,
      );
    default:
      return markup;
  }
}
