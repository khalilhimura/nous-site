import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { EditorialMedia as Media } from "@/components/editorial-media";
import { PageEffects } from "@/components/page-effects";

const anaxagoras = [
  ["mixture", "Mixture", "The starting condition contains things together.", "Mixed pebbles, mineral fragments, and grains in a ceramic tray"],
  ["mind", "Mind", "Nous remains distinct from the mixture it orders.", "A pale stone separated from surrounding dark grains"],
  ["motion", "Motion", "Rotation begins the process of separation.", "A pebble beside a circular trail in sand"],
  ["order", "Order", "The account connects intelligence with the formation of the cosmos.", "Stones, shells, crystals, and sand arranged in distinct groups"],
];
const plato = [
  ["Forms", "The intelligible realities that understanding seeks.", "forms_material_detail", "Cream vessel and its shadow"],
  ["Rational soul", "The part of the soul associated with reasoning and understanding.", "bound_book_detail", "Teal clothbound book"],
  ["The Good", "Knowledge carries an ethical orientation, not only information.", "light_on_paper", "Daylight across folded paper"],
  ["Flourishing", "Eudaimonia concerns living well, linking understanding with the shape of a life.", "open_page_detail", "Open blank book"],
];
const theology = [
  ["Noetic faculty", "The inward capacity for spiritual attention and understanding.", "attention", "Open book on a desk beside a sunlit window"],
  ["Katharsis", "Purification of the passions and attention.", "purification", "Water bowl, linen, and a closed book"],
  ["Nepsis", "Watchfulness over thoughts and distractions.", "watchfulness", "Pale stone holding a blank page corner"],
  ["Theosis", "Participation in divine life.", "participation", "Two open books in shared daylight"],
  ["Contemplative prayer", "A practice associated with gathering attention and directing it toward God.", "prayer", "Closed book and an unlit beeswax candle"],
];
export default function Home() {
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Nav home />
    <main id="main-content" tabIndex={-1} className="editorial-page">
      <Hero />
      <section id="meaning" tabIndex={-1} className="meaning section shell" aria-labelledby="meaning-heading">
        <div className="meaning-top">
          <div><p className="eyebrow">Entry 01 / Meaning</p><h2 id="meaning-heading" data-reveal="slide">MIND,<br />INTELLECT,<br />DIRECT<br />UNDERSTANDING</h2><p className="reading" data-reveal="fade">Nous names the capacity to understand. In Greek philosophical writing, it can describe an immediate grasp of something rather than a conclusion reached through a sequence of arguments.</p><a className="text-action" href="#anaxagoras">Read Anaxagoras <ArrowRight size={20} aria-hidden /></a></div>
          <Media name="greek_text_detail" alt="Contemporary letterpress illustration of the Greek word νοῦς" className="meaning-image" />
        </div>
        <div className="comparison-grid">
          <article data-reveal="fade"><h3>Perception</h3><p>Aisthēsis means sensory perception, the experience from which understanding can begin.</p></article>
          <article data-reveal="fade" data-delay="80"><h3>Reasoning</h3><p>Dianoia means thinking through a question step by step. Logos can mean an account, argument, or rational explanation.</p></article>
        </div>
        <div className="terminology-row"><span className="eyebrow">Usage</span><p>The meaning of nous changes between authors. Read each interpretation in its own context.</p><span className="terms">νοῦς · dianoia · aisthēsis · logos</span></div>
      </section>
      <section id="anaxagoras" tabIndex={-1} className="anaxagoras section shell" aria-labelledby="anaxagoras-heading">
        <div className="section-heading"><h2 id="anaxagoras-heading">Mind orders<br />the cosmos</h2><p className="eyebrow">Entry 02 / Anaxagoras</p></div>
        <p className="reading section-intro">Anaxagoras presents Nous as a distinct intelligence that sets the primordial mixture into motion. It explains how an ordered cosmos can emerge from an original mixture.</p>
        <div className="material-sequence">{anaxagoras.map(([id, title, text, alt], i) => <figure key={id} data-reveal="rise" data-delay={i * 80}><span className="sequence-number">0{i + 1}/</span><Media name={`anaxagoras_${id}`} alt={alt} /><figcaption><h3>{title}</h3><p>{text}</p></figcaption></figure>)}</div>
        <p className="reading closing-note">Socrates later questions whether this account explains why things are arranged as they are, rather than only how they move.</p>
      </section>
      <section id="plato" tabIndex={-1} className="plato section" aria-labelledby="plato-heading">
        <Media name="light_on_paper" alt="Daylight reveals the curve of folded cream paper" className="plato-banner" />
        <div className="shell"><div className="plato-copy"><p className="eyebrow">Entry 03 / Plato</p><div><h2 id="plato-heading">Plato turns the mind{" "}<br />toward the Forms.</h2><p className="reading">For Plato, intellectual understanding reaches beyond changing appearances toward the Forms. The cave allegory describes a movement from familiar shadows toward a clearer account of reality.</p></div></div>
        <div className="concept-grid">{plato.map(([title, text, image, alt], i) => <article key={title}><span className="eyebrow">03 / 0{i + 1}</span><div><Media name={image} alt={alt} /><div><h3>{title}</h3><p>{text}</p></div></div></article>)}</div></div>
      </section>
      <section id="aristotle" tabIndex={-1} className="aristotle section shell" aria-labelledby="aristotle-heading">
        <figure className="aristotle-figure"><Media name="aristotle_light_study" alt="Glass prism casts a band of color onto cream paper" /><figcaption><span className="eyebrow">04</span><h2 id="aristotle-heading">Aristotle</h2><span className="caption-rule" /><span className="terms">Nous pathētikos<br />Nous poētikos</span></figcaption></figure>
        <div className="aristotle-copy"><p className="reading">Passive intellect receives intelligible forms. Active intellect makes understanding possible, compared with light making colors visible.</p><div><dl className="term-definitions"><div><dt>Nous pathētikos</dt><dd>The receptive intellect.</dd></div><div><dt>Nous poētikos</dt><dd>The active intellect.</dd></div></dl><p>The relationship between these terms, the individual soul, and immortality has produced competing interpretations. Read the distinction as a philosophical problem rather than a settled formula.</p><p className="source-note">Context: <cite>De Anima</cite>, Book III.</p></div></div>
      </section>
      <section id="plotinus" tabIndex={-1} className="plotinus section shell" aria-labelledby="plotinus-heading">
        <header className="plotinus-heading"><h2 id="plotinus-heading">Intellect as a level of reality</h2><p className="eyebrow">Entry 05 / Plotinus</p></header>
        <div className="plotinus-grid"><article className="plotinus-feature"><div className="plotinus-feature-copy"><span className="eyebrow">Nous</span><h3>Thinker and thought, united.</h3><p>In Plotinus, Nous is more than a human faculty. It is the intelligible reality in which thinker and thought are united.</p><div className="source-block"><Media name="open_page_detail" alt="Open cream-paper book" /><p>Context: Plotinus,<br /><cite>Enneads</cite>.</p></div></div><Media name="plotinus_reflection_study" alt="Open book and its reflection in a mirror" /></article>
        <div className="plotinus-side"><article><div><h3>The One</h3><p>The source beyond ordinary categories of being and thought.</p></div><Media name="plotinus_source_study" alt="Closed book illuminated by window light" /></article><article><div><h3>Soul</h3><p>The level that connects intellect with the living, material world.</p></div><Media name="plotinus_connection_study" alt="Book signatures connected with linen thread" /></article></div></div>
        <p className="reading closing-note">The account moves from the One through Nous to Soul. Contemplation concerns a return toward the source.</p>
      </section>
      <section id="christian_theology" tabIndex={-1} className="theology section shell" aria-labelledby="theology-heading">
        <header><p className="eyebrow">Entry 06 / Christian theology</p><h2 id="theology-heading">The inward faculty of understanding</h2><p className="reading">In Eastern Christian writing, nous can name the inward faculty through which a person attends to God. It is often distinguished from discursive reasoning.</p></header>
        <div className="theology-rows">{theology.map(([title, text, image, alt]) => <article key={title}><Media name={`theology_${image}_study`} alt={alt} /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section id="modern_usage" tabIndex={-1} className="modern section" aria-labelledby="modern-heading">
        <div className="modern-top"><div className="modern-intro"><p className="eyebrow">Entry 07 / Modern usage</p><h2 id="modern-heading">Use your<br />nous.</h2><p>In everyday British English, nous means practical intelligence or common sense. The word also survives in vocabulary about thought and understanding.</p><a className="primary-action" href="#meaning">Back to entries <ArrowRight size={20} aria-hidden /></a></div><Media name="everyday_reading_scene" alt="Open book beside a cream chair in an anonymous reading room" /></div>
        <div className="modern-bottom shell"><div className="modern-label"><p className="eyebrow">Words that remain</p><p>Thought in everyday language.</p></div>{[
          ["Noetic", "Relating to intellect or intuitive understanding.", "bound_book_detail", "Teal clothbound book"],
          ["Noesis", "The act of intellectual understanding.", "open_page_detail", "Open blank book"],
          ["Paranoia", "A related word with a distinct modern meaning. Its medical use should not be reduced to a literal translation of its Greek parts.", "greek_text_detail", "Contemporary Greek letterpress illustration"],
        ].map(([title, text, image, alt]) => <article key={title}><Media name={image} alt={alt} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>
    </main>
    <Footer /><PageEffects />
  </>;
}
