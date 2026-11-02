import Link from "next/link";
import { EditorialMedia } from "./editorial-media";
export const entries = [
  ["meaning", "Meaning"], ["anaxagoras", "Anaxagoras"], ["plato", "Plato"], ["aristotle", "Aristotle"], ["plotinus", "Plotinus"], ["christian_theology", "Christian theology"], ["modern_usage", "Modern usage"],
];
export function Footer() {
  return <footer className="site-footer">
    <EditorialMedia name="stone_surface_detail" alt="" className="footer-texture" />
    <div className="footer-grid shell">
      <div className="footer-identity"><Link href="/" className="footer-mark" lang="el" aria-label="Nous home">νοῦς</Link><p>Mind, intellect, and understanding.</p><p className="image-note">Images are original editorial illustrations.</p></div>
      <nav aria-label="All entries"><h2 className="eyebrow">Entries</h2>{entries.map(([id, title]) => <a key={id} href={`/#${id}`}>{title}<span aria-hidden>↗</span></a>)}</nav>
      <nav aria-label="Site policies"><h2 className="eyebrow">Site</h2><a href="/privacy-policy">Privacy Policy<span aria-hidden>↗</span></a><a href="/terms-of-service">Terms of Service<span aria-hidden>↗</span></a></nav>
    </div>
  </footer>;
}
