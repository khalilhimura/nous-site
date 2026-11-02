import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { EditorialMedia } from "./editorial-media";

const images = [
  ["greek_text_detail", "Contemporary Greek letterpress illustration", "Language"],
  ["bound_book_detail", "Teal clothbound book on pale stone", "Transmission"],
  ["light_on_paper", "Daylight across a curved fold of paper", "Attention"],
  ["stone_surface_detail", "Dark limestone with a central seam", "Material"],
  ["open_page_detail", "Open blank book with layered cream pages", "Possibility"],
];
export function Hero() {
  return <section className="hero" aria-labelledby="hero-heading">
    <div className="hero-copy shell">
      <h1 id="hero-heading" lang="el" data-hero>νοῦς</h1>
      <div className="hero-intro"><p data-hero>Nous <span className="pronunciation">/nuːs/</span>: the Greek word for mind, intellect, and intuitive understanding. Explore how its meaning changes across philosophy, theology, and everyday language.</p><a data-hero className="primary-action" href="#meaning">Explore the entries <ArrowRight size={20} aria-hidden /></a></div>
    </div>
    <div className="hero-strip" tabIndex={0} role="region" aria-label="Five editorial illustrations. Scroll horizontally to explore.">
      {images.map(([name, alt, caption], i) => <figure key={name} data-hero-media><EditorialMedia name={name} alt={alt} priority={i < 2} /><figcaption><span>0{i + 1}</span>{caption}</figcaption></figure>)}
    </div>
    <p className="image-note shell">Original editorial illustrations, exploring language, books, light, and material.</p>
  </section>;
}
