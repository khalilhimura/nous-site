import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service — Nous",
  description: "Terms for accessing and using the Nous informational website.",
  alternates: { canonical: "https://nous.my/terms-of-service" },
};

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "About these terms",
    content: <>
      <p>These terms govern your use of the informational website at nous.my, maintained by the Nous site maintainer. By using the website, you agree to these terms. If you do not agree, please stop using the website.</p>
      <p>These terms apply only to this website. Separate applications or services, including those on subdomains, may have their own terms. This website does not offer user accounts, paid subscriptions, or purchases.</p>
    </>,
  },
  {
    id: "content",
    title: "Informational content",
    content: <p>Nous presents educational content about language, philosophy, and related ideas. The material is provided for general information and may contain errors, omissions, or interpretations that are open to debate. It is not professional advice. Please verify information independently before relying on it.</p>,
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: <>
      <p>You may browse and use the website for lawful purposes. You must not:</p>
      <ul>
        <li>Attempt to gain unauthorized access to the website or its infrastructure.</li>
        <li>Disrupt availability, introduce malicious software, or bypass security controls.</li>
        <li>Use the website in a way that infringes another person’s rights or violates applicable law.</li>
        <li>Misrepresent your affiliation with Nous or the site maintainer.</li>
      </ul>
    </>,
  },
  {
    id: "ownership",
    title: "Content and intellectual property",
    content: <>
      <p>Content, design, and other materials on the website belong to their respective rights holders. You may link to the website and use content to the extent allowed by applicable law or an express license from the relevant rights holder.</p>
      <p>Public availability of this website or its source code does not by itself grant a license to reproduce, distribute, or commercially exploit protected material. Nothing in these terms restricts public-domain material or rights you have under applicable law.</p>
    </>,
  },
  {
    id: "external-links",
    title: "External links and privacy",
    content: <>
      <p>Links to other websites are provided for convenience. We do not control their content, availability, or practices. Your use of external services is subject to their own terms and policies.</p>
      <p>Our <Link href="/privacy-policy">Privacy Policy</Link> explains how information is handled when you visit this website.</p>
    </>,
  },
  {
    id: "availability",
    title: "Availability and changes",
    content: <p>We may update, suspend, restrict, or discontinue all or part of the website, including to carry out maintenance or prevent abuse. We do not guarantee that the website will always be available, uninterrupted, secure, or free of errors.</p>,
  },
  {
    id: "liability",
    title: "Disclaimers and liability",
    content: <>
      <p>To the extent permitted by applicable law, the website and its content are provided “as is” and “as available,” without warranties of any kind, including warranties of accuracy, fitness for a particular purpose, or non-infringement.</p>
      <p>To the extent permitted by applicable law, the site maintainer is not liable for indirect or consequential losses, loss of data, loss of profits, or business interruption arising from your use of, or inability to use, the website.</p>
      <p>Nothing in these terms excludes or limits any liability or consumer right that cannot lawfully be excluded or limited.</p>
    </>,
  },
  {
    id: "contact",
    title: "Questions and updates",
    content: <>
      <p>For questions about these terms, contact the site maintainer through <a href="https://github.com/khalilhimura">the maintainer’s GitHub profile</a>.</p>
      <p>We may revise these terms as the website changes. Revisions will be posted on this page with an updated date. Your continued use after revised terms take effect is subject to those terms. If any provision is unenforceable, the remaining provisions continue to apply to the extent permitted by law.</p>
    </>,
  },
];

export default function TermsOfService() {
  return <LegalPage title="Terms of Service" introduction="These terms explain the conditions for using Nous. Please read them alongside our Privacy Policy." sections={sections} />;
}
