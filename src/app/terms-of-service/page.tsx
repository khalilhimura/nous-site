import type { Metadata } from "next";
import Link from "next/link";
import { BusinessDetails } from "@/components/business-details";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service — Nous",
  description: "Terms for the Nous website, Nous Account, apps, AI features, and related services.",
  alternates: { canonical: "https://nous.my/terms-of-service" },
};

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "About these terms",
    content: <>
      <BusinessDetails />
      <p>These terms govern nous.my, Nous Account at profile.nous.my, and Nous apps and services that link to these terms (the “Services”). References to “we” and “us” mean the operator identified above. By using the Services, you agree to these terms. If you do not agree, please stop using them.</p>
      <p>Additional product, checkout, or third-party terms may apply to specific features. Where additional terms expressly govern a feature, they control for that feature. These terms do not automatically replace terms for other products that use Nous Account to sign you in.</p>
    </>,
  },
  {
    id: "accounts",
    title: "Eligibility and your account",
    content: <>
      <p>You must be at least 18 and legally able to enter into these terms to create an account or use app services. If acting for an organization, you must have authority to bind it.</p>
      <p>Provide accurate account information, keep your sign-in methods secure, and use the available session controls if you suspect unauthorized access. You are responsible for activity you authorize. Contact us promptly about suspected compromise.</p>
      <p>Nous Account provides a shared identity for participating apps. An account does not automatically grant paid access, merge existing accounts, or transfer purchases. Access depends on the relevant product’s verified grants and terms.</p>
    </>,
  },
  {
    id: "content",
    title: "Information, AI, and automation",
    content: <>
      <p>Educational content and AI outputs may contain errors, omissions, or interpretations that are open to debate. They are not professional advice. Verify information independently before relying on it, especially for legal, financial, medical, or other consequential decisions.</p>
      <p>Where a feature uses models, agents, or connected tools, review its configuration, permissions, and proposed actions. You remain responsible for decisions and actions you authorize. AI output may be incomplete, inaccurate, or similar to output received by other users. Do not treat an output as a guarantee of accuracy, originality, or ownership.</p>
    </>,
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: <>
      <p>You may use the Services for lawful purposes. You must not:</p>
      <ul>
        <li>Attempt to gain unauthorized access to the website or its infrastructure.</li>
        <li>Disrupt availability, introduce malicious software, or bypass security controls.</li>
        <li>Use the website in a way that infringes another person’s rights or violates applicable law.</li>
        <li>Misrepresent your affiliation with Nous or the site maintainer.</li>
        <li>Submit content you have no right to process, misuse another person’s account, or evade access, usage, or payment controls.</li>
      </ul>
    </>,
  },
  {
    id: "your-content",
    title: "Your content and connected services",
    content: <>
      <p>You retain the rights you hold in documents, prompts, files, and other content you provide. You grant us permission to host, process, transmit, and display that content only as needed to provide requested features, secure the Services, and comply with applicable law. You must have the rights and permissions needed to submit it.</p>
      <p>Connecting a model, tool, or external account can send relevant content to that provider and incur charges under its terms. Review permissions and provider policies before connecting or submitting confidential information. You are responsible for credentials and provider accounts you supply.</p>
      <p>Keep independent copies of important data. Account exports and deletion requests may have a different scope from product data, locally stored files, and information held by third parties, as explained in our Privacy Policy.</p>
    </>,
  },
  {
    id: "payments",
    title: "Purchases, credits, and usage",
    content: <>
      <p>Paid features are available only when explicitly offered. Any price, currency, taxes, recurring billing, credit validity, usage limits, cancellation, and refund conditions must be disclosed in the applicable offer or checkout before you purchase. A wallet display or usage record does not by itself create a right to purchase or use a feature.</p>
      <p>Where credits are offered, they are service usage units and are not a bank deposit or an investment. Any transfer, redemption, or refund rights are governed by the applicable offer and law. Nothing in these terms removes statutory refund or consumer rights.</p>
      <p>Purchases from another product or merchant remain subject to that product’s terms. Nous Account does not independently change those purchase terms.</p>
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
      <p>We do not control third-party content, availability, or practices. Your use of external services is subject to their own terms and policies.</p>
      <p>Our <Link href="/privacy-policy">Privacy Policy</Link> explains how information is handled across the Services.</p>
    </>,
  },
  {
    id: "availability",
    title: "Availability, suspension, and leaving",
    content: <>
      <p>We may update or interrupt the Services for maintenance, security, or operational reasons. We may restrict or suspend access for a breach of these terms, suspected abuse, or a legal requirement. We do not guarantee uninterrupted, secure, or error-free availability. Any paid commitments remain subject to the applicable offer and mandatory law.</p>
      <p>You may stop using the Services at any time, revoke available sessions, and submit an account deletion request through Nous Account. A deletion request is reviewed and does not cause immediate erasure of every record. Cancel any recurring purchase through its applicable product or billing channel; signing out alone does not cancel it.</p>
    </>,
  },
  {
    id: "liability",
    title: "Disclaimers and liability",
    content: <>
      <p>To the extent permitted by applicable law, the Services and their content are provided “as is” and “as available,” without warranties of any kind, including warranties of accuracy, fitness for a particular purpose, or non-infringement.</p>
      <p>To the extent permitted by applicable law, the Nous operator is not liable for indirect or consequential losses, loss of data, loss of profits, or business interruption arising from your use of, or inability to use, the Services.</p>
      <p>Nothing in these terms excludes or limits any liability or consumer right that cannot lawfully be excluded or limited.</p>
    </>,
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: <p>These terms are governed by the laws of Malaysia. This choice does not deprive you of mandatory consumer protections or rights to bring a claim in a forum available to you under applicable law.</p>,
  },
  {
    id: "contact",
    title: "Questions and updates",
    content: <>
      <p>For questions or to raise a dispute, email <a href="mailto:khalil.himura@gmail.com">khalil.himura@gmail.com</a> or write to THE FUTURE IS SOLO ENTERPRISE at the registered business address above, marked “Nous service enquiry,” with details of the issue and a way for us to respond. These terms do not restrict any right to contact a regulator or pursue a remedy available under applicable law.</p>
      <p>We may revise these terms as the Services change. Revisions will be posted with an updated date, with additional notice where legally required. Your continued use after revised terms take effect is subject to those terms. If any provision is unenforceable, the remaining provisions continue to apply to the extent permitted by law.</p>
    </>,
  },
];

export default function TermsOfService() {
  return <LegalPage title="Terms of Service" introduction="The conditions for using the Nous website, Nous Account, and the apps and services that link to these terms. Please read them alongside our Privacy Policy." sections={sections} />;
}
