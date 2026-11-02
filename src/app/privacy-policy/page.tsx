import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Nous",
  description: "How the Nous website handles information, hosting data, cookies, and privacy requests.",
  alternates: { canonical: "https://nous.my/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "About this policy",
    content: <p>This policy covers the informational website at nous.my, maintained by the Nous site maintainer. It explains how information is handled when you browse this website. It does not cover separate applications or services, including those on subdomains, which may have their own privacy notices.</p>,
  },
  {
    id: "information",
    title: "Information we handle",
    content: <>
      <p>You can read this website without creating an account or providing personal information. The website does not provide registration, payment, or contact forms.</p>
      <p>When you visit, our hosting and security provider, Cloudflare, processes technical information needed to deliver and protect the website. This may include your IP address, browser and device information, requested URLs, request times, and security events.</p>
      <p>If you contact the maintainer through an external platform, we receive the information you choose to share, such as your username, message, and any contact details you provide.</p>
    </>,
  },
  {
    id: "use",
    title: "How information is used",
    content: <ul>
      <li>To deliver website content and keep the website available.</li>
      <li>To identify technical problems, prevent abuse, and protect the website.</li>
      <li>To respond to questions or requests you send us.</li>
      <li>To comply with applicable legal obligations.</li>
    </ul>,
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    content: <>
      <p>The website does not add advertising cookies, analytics scripts, or tracking pixels, and does not store visitor information in browser local storage. Fonts are served with the website rather than requested from Google by your browser.</p>
      <p>Our hosting and security provider may use cookies or similar mechanisms when needed for security or abuse prevention. You can manage cookies through your browser settings; blocking security cookies may affect access to the website.</p>
    </>,
  },
  {
    id: "sharing",
    title: "Providers and disclosure",
    content: <>
      <p>We do not sell personal information or share it for targeted advertising. Cloudflare processes connection and security data to host and protect this website. Read the <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare Privacy Policy</a> for details about its practices.</p>
      <p>Information may also be disclosed when required by law or necessary to investigate abuse or protect legal rights. External links, including GitHub links, lead to services that handle information under their own policies.</p>
    </>,
  },
  {
    id: "retention",
    title: "Retention, security, and location",
    content: <>
      <p>Information shared in correspondence is kept only as long as needed to respond, resolve the matter, or meet applicable legal obligations. Hosting and security data is retained according to the provider’s applicable settings and policies.</p>
      <p>We use HTTPS to protect information in transit. No method of transmission or storage is completely secure. Cloudflare and any platform you use to contact us may process information in countries outside your own.</p>
    </>,
  },
  {
    id: "choices",
    title: "Your choices and rights",
    content: <>
      <p>Depending on applicable law, you may have rights to access, correct, or delete personal information, object to or restrict processing, or make a complaint to a relevant data protection authority. Contact the maintainer to make a request. We may need information to verify your request and will respond as required by applicable law.</p>
      <p>Please do not post sensitive personal information in public GitHub issues. This website is intended for a general audience and does not ask children to submit personal information.</p>
    </>,
  },
  {
    id: "contact",
    title: "Contact and updates",
    content: <>
      <p>For privacy questions or to arrange a private channel for a personal information request, contact the site maintainer through <a href="https://github.com/khalilhimura">the maintainer’s GitHub profile</a>.</p>
      <p>We may update this policy as the website changes. The date above identifies the latest revision. Please also read our <Link href="/terms-of-service">Terms of Service</Link>.</p>
    </>,
  },
];

export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" introduction="Your privacy matters. This policy describes the information involved in visiting Nous and the choices available to you." sections={sections} />;
}
