import type { Metadata } from "next";
import Link from "next/link";
import { BusinessDetails } from "@/components/business-details";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Nous",
  description: "How Nous handles website, account, app, and service information, including privacy choices and data requests.",
  alternates: { canonical: "https://nous.my/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "About this policy",
    content: <>
      <BusinessDetails />
      <p>This policy covers nous.my, Nous Account at profile.nous.my, and Nous apps and services that link to this policy (together, the “Services”). References to “we” and “us” mean the operator identified above. A product-specific notice may explain additional processing for a particular feature. Third-party services and products with their own privacy notices are governed by those notices.</p>
    </>,
  },
  {
    id: "information",
    title: "Information we handle",
    content: <>
      <p>You can browse the informational website without an account. When you use account or app features, the information processed depends on the feature:</p>
      <ul>
        <li>Account information: name, email address, verification status, language, time zone, account identifiers, and linked sign-in methods. Where Google sign-in is enabled and you choose it, we receive basic profile and identity information, not access to your Gmail or Drive.</li>
        <li>Security information: session identifiers, browser or device information, sign-in activity, security events, and records of account changes or data requests.</li>
        <li>Access and usage information: product access grants, usage receipts, credit or wallet entries, and purchase or transaction references where applicable. A recorded entitlement or wallet does not mean that paid purchases are available.</li>
        <li>Content: documents, prompts, messages, files, and other information you choose to process through an app. Whether content stays on your device or is transmitted depends on the feature and providers you use.</li>
        <li>Correspondence: messages and contact details you provide when seeking support.</li>
      </ul>
      <p>Cloudflare processes technical information needed to deliver and protect the Services, which may include IP addresses, requested URLs, request times, and security events.</p>
    </>,
  },
  {
    id: "use",
    title: "How information is used",
    content: <ul>
      <li>To deliver content, authenticate you, maintain your profile, and provide requested app features.</li>
      <li>To check product access and maintain applicable usage, purchase, and credit records.</li>
      <li>To process content through the tools and providers used by a feature.</li>
      <li>To identify technical problems, prevent abuse, and protect accounts and the Services.</li>
      <li>To respond to support, export, deletion, and other privacy requests.</li>
      <li>To comply with applicable legal obligations.</li>
    </ul>,
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    content: <>
      <p>The informational website does not add advertising cookies, analytics scripts, or tracking pixels. Fonts are served with the website rather than requested from Google by your browser.</p>
      <p>Account and app features use essential cookies or similar storage for sign-in, sessions, security, and feature state. Cloudflare may also use security mechanisms to prevent abuse. Blocking these can prevent sign-in or other features from working. You can manage cookies through your browser and revoke available sessions through Nous Account.</p>
    </>,
  },
  {
    id: "sharing",
    title: "Providers and disclosure",
    content: <>
      <p>We do not sell personal information or share it for targeted advertising. Providers receive information needed for the features they support:</p>
      <ul>
        <li><a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a> supplies hosting, security, and account data storage.</li>
        <li>Where email sign-in is enabled, an email delivery provider such as <a href="https://resend.com/legal/privacy-policy">Resend</a> processes your email address and sign-in email.</li>
        <li>Where you choose Google sign-in, <a href="https://policies.google.com/privacy">Google</a> processes authentication under its own policy.</li>
        <li>Participating apps receive the identity, profile, and access information needed to authenticate you and check your entitlements. Product content may be managed separately by the product.</li>
      </ul>
      <p>If you use an AI or connected-tool feature, your prompt and relevant content may be sent to the configured model or integration provider to perform the request. That provider’s retention and training practices depend on its terms, settings, and your account. Review the provider before sending confidential information; do not assume all processing is local.</p>
      <p>Information may also be disclosed when required by law or necessary to investigate abuse or protect legal rights. External platforms handle information under their own policies.</p>
    </>,
  },
  {
    id: "retention",
    title: "Retention, security, and location",
    content: <>
      <p>We retain account information while needed to provide your account, and retain support, security, access, usage, and transaction records as needed for their purpose, dispute handling, fraud prevention, or applicable legal obligations. Retention of product content depends on the product and its storage model. Provider logs and backups follow applicable provider settings and retention processes.</p>
      <p>Deletion requests are reviewed; submitting a request does not immediately erase your account or all product data. Some records may need to be retained for legal or security reasons. Locally stored files and data held by external providers may require separate action.</p>
      <p>We use HTTPS for hosted Services and access controls for account data. No method of transmission or storage is completely secure. Our providers may process information outside your country, subject to applicable legal requirements for international transfers.</p>
    </>,
  },
  {
    id: "choices",
    title: "Your choices and rights",
    content: <>
      <p>Your rights depend on applicable law, including Malaysia’s Personal Data Protection Act 2010 and its amendments where applicable. These may include rights to access or correct personal information, request deletion or a portable copy, object to or restrict processing, withdraw consent where processing relies on consent, or complain to the relevant data protection authority. We process information to provide requested Services, protect legitimate security and operational interests, meet legal obligations, or with consent where required.</p>
      <p>Nous Account provides profile editing, session controls, an account export, and a deletion-request function where available. The account export covers account information; it does not automatically include all data held by every product. Contact us for other requests or if you cannot access your account. We may need to verify your identity and will respond as required by applicable law.</p>
      <p>Please do not post sensitive personal information in public GitHub issues. The Services are not directed to children under 18. Contact us if you believe a child has provided personal information.</p>
    </>,
  },
  {
    id: "contact",
    title: "Contact and updates",
    content: <>
      <p>Use the data controls in Nous Account for account export or deletion requests. For other privacy questions or requests, email <a href="mailto:khalil.himura@gmail.com">khalil.himura@gmail.com</a> or write to THE FUTURE IS SOLO ENTERPRISE at the registered business address above, marked “Nous privacy request.” Include a way for us to respond and enough information to identify the request; do not send passwords or sign-in codes.</p>
      <p>We may update this policy as the Services change. The date above identifies the latest revision. We will provide additional notice of material changes where required by law. Please also read our <Link href="/terms-of-service">Terms of Service</Link>.</p>
    </>,
  },
];

export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" introduction="How information is handled across the Nous website, Nous Account, and the apps and services that link to this policy." sections={sections} />;
}
