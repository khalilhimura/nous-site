import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { DictionaryEntry } from "@/components/dictionary-entry";
import { Footer } from "@/components/footer";

const entries = [
  {
    headword: "νοῦς",
    transliteration: "nous",
    phonetic: "nuːs",
    partOfSpeech: "noun, masculine",
    definition:
      "Mind, intellect, reason — the highest cognitive faculty. In early Greek thought, nous is the capacity for direct intellectual apprehension, distinct from sensory perception (aisthēsis) and discursive reasoning (dianoia). It sees truth the way the eye sees light: immediately, without intermediary steps.",
    etymology:
      "From Proto-Indo-European *nes- (to return home, to come safely). The semantic arc moves from 'coming to one's senses' toward 'the faculty that brings understanding.' Cognate with Sanskrit नासिका (nā́sikā, 'nose') and Latin nōscō ('to know, to recognize').",
    usageNote:
      "In Homer, nous is primarily a sensory-mental faculty — perceiving a situation for what it is. By Plato and Aristotle, it has become the immortal, divine aspect of the soul. The shift from 'perception' to 'pure intellect' is the central story of Greek philosophy.",
    relatedTerms: [
      { term: "dianoia", definition: "Discursive thought, reasoning step by step." },
      { term: "aisthēsis", definition: "Sensory perception, the raw data of experience." },
      { term: "logos", definition: "Ordered account, argument, or the rational structure of reality." },
    ],
  },
  {
    headword: "Anaxagoras",
    transliteration: "Nous as Cosmic Principle",
    partOfSpeech: "philosophical concept",
    definition:
      "For Anaxagoras (5th century BCE), Nous is the cosmic Mind that set the primordial mixture into ordered motion — the first unmoved mover. It is infinite, self-ruled, and mixed with nothing. It 'knew all things and had the greatest power,' initiating the rotation that separated cosmos from chaos.",
    etymology:
      "Anaxagoras of Clazomenae, fragment B12 (DK). The first philosopher to posit a transcendent intelligence as the cause of cosmic order, influencing Plato's demiurge and Aristotle's unmoved mover.",
    usageNote:
      "Socrates reports in Plato's Phaedo that he was initially thrilled by Anaxagoras's Nous but became disillusioned when Anaxagoras failed to use it to explain why things are as they are — falling back on mechanical causes instead of teleological ones.",
    relatedTerms: [
      { term: "demiurge", definition: "Plato's divine craftsman who shapes the material world according to the Forms." },
      { term: "arche", definition: "The originating principle or first cause of all things." },
    ],
  },
  {
    headword: "Plato",
    transliteration: "Nous as the Rational Soul",
    partOfSpeech: "philosophical concept",
    definition:
      "In Plato, nous is the rational part of the soul (to logistikon), seated in the head and capable of apprehending the Forms — the eternal, changeless realities behind the world of appearances. To exercise nous is to turn the eye of the soul toward truth itself, away from the shadows on the cave wall.",
    etymology:
      "Plato develops the concept across the Republic, Phaedo, Phaedrus, and Timaeus. The allegory of the cave is a metaphor for the soul's journey from ignorance (absence of nous) to enlightenment (active nous contemplating the Form of the Good).",
    usageNote:
      "Plato's nous is not merely cognitive — it is also ethical. To know the Good is to be oriented toward it. Nous and virtue are inseparable. This unity of intellect and moral character is the foundation of eudaimonia (flourishing).",
    relatedTerms: [
      { term: "eidos", definition: "Form or Idea — the eternal archetype that nous apprehends." },
      { term: "to logistikon", definition: "The rational, calculating part of the tripartite soul." },
      { term: "eudaimonia", definition: "The state of living well and doing well, the aim of philosophical life." },
    ],
  },
  {
    headword: "Aristotle",
    transliteration: "Nous Poētikos",
    phonetic: "nous poɪˈɛtɪkɒs",
    partOfSpeech: "noun, phrase",
    definition:
      "Aristotle distinguishes between passive nous (nous pathētikos), which receives intelligible forms and is perishable, and active nous (nous poētikos), which illuminates them and is immortal and eternal. Like light making colours visible, active nous makes understanding possible — and it alone survives death.",
    etymology:
      "From De Anima (On the Soul) III.5. The distinction between active and passive intellect has been debated for millennia: is the active nous a part of the individual soul, or is it a separate divine intellect that enters from outside (thurathen)?",
    usageNote:
      "The philosopher Alexander of Aphrodisias identified the active nous with God. Averroes argued for a single, universal active intellect shared by all humans. Thomas Aquinas took a middle position: each person has their own active intellect, but it is a 'light' derived from God. The debate shaped medieval philosophy.",
    relatedTerms: [
      { term: "nous pathētikos", definition: "The passive, receptive intellect that perishes with the body." },
      { term: "nous poētikos", definition: "The active, productive intellect that is immortal." },
      { term: "thurathen", definition: "Literally 'from outside' — the idea that nous enters the soul from the divine." },
    ],
  },
  {
    headword: "Plotinus",
    transliteration: "Nous as the Second Hypostasis",
    partOfSpeech: "philosophical concept",
    definition:
      "In Neoplatonism, Nous is the second emanation from the One (to Hen) — the first determinate reality, a timeless, perfect intellect that contains all Forms as a unified, living awareness. It is both thinker and thought, subject and object united in eternal self-contemplation.",
    etymology:
      "Plotinus (204-270 CE) in the Enneads. The One overflows not by choice but by its superabundance, generating Nous as the first reflection of its own simplicity. Nous then generates Soul (Psychē), which in turn produces the material world.",
    usageNote:
      "This is the origin of the 'Great Chain of Being' — the hierarchical cosmos where everything emanates from the One, descends through Nous and Soul, and can return through contemplation and virtue. Nous here is not just a faculty but an entire metaphysical level of reality.",
    relatedTerms: [
      { term: "to Hen", definition: "The One — the ineffable, transcendent source beyond being and thought." },
      { term: "Psychē", definition: "Soul — the third hypostasis, bridging intellect and matter." },
      { term: "henosis", definition: "Union with the One — the ultimate goal of Neoplatonic practice." },
    ],
  },
  {
    headword: "Patristic & Medieval",
    transliteration: "Nous in Christian Theology",
    partOfSpeech: "theological term",
    definition:
      "The Greek Church Fathers adopted nous to denote the innermost spiritual faculty of the human person — the 'eye of the soul' capable of knowing God. In Eastern Orthodox theology, nous (often translated as 'noetic faculty') is distinct from reason (dianoia) and must be purified (katharsis) to participate in divine energies.",
    etymology:
      "Key figures: Evagrius Ponticus, the Cappadocian Fathers (Basil, Gregory of Nyssa, Gregory Nazianzen), Maximus the Confessor, and Gregory Palamas. The distinction between essence (ousia) and energies (energeiai) in God preserves the transcendence of the divine while allowing real participation.",
    usageNote:
      "In the Philokalia, a collection of texts on contemplative prayer, the 'purification of the nous' is the first stage of spiritual life. The Jesus Prayer — 'Lord Jesus Christ, Son of God, have mercy on me, a sinner' — is a practice for drawing the nous into the heart.",
    relatedTerms: [
      { term: "katharsis", definition: "Purification of the passions and the nous for union with God." },
      { term: "theosis", definition: "Deification — the process of becoming partakers of the divine nature." },
      { term: "nepsis", definition: "Watchfulness or sobriety of the nous — guarding against distracting thoughts." },
    ],
  },
  {
    headword: "Modern Legacy",
    transliteration: "Nous in Contemporary Thought",
    partOfSpeech: "cultural concept",
    definition:
      "The word nous survives in modern English primarily in the phrase 'use your nous' — a colloquial British expression for common sense, practical intelligence, or savvy. In philosophy, 'noetic' (from nous) refers to the study of intellect and intuitive knowledge. The term also lives on in 'paranoia' (beside-mind) and 'noesis' (the act of understanding).",
    etymology:
      "The Greek word entered Latin as nōs, then into English via the French nouz in the 17th century. The modern colloquial sense ('practical intelligence, gumption') developed in 19th-century British slang, a democratisation of what was once the highest faculty of the soul.",
    usageNote:
      "This page is itself a work of nous — a gathering together of meanings into a single, coherent vision. To read it is to exercise the very faculty it describes: the direct apprehension of a thing as a whole.",
    relatedTerms: [
      { term: "noesis", definition: "The act of intellectual intuition or direct understanding." },
      { term: "noetic", definition: "Relating to the intellect, especially intuitive or mystical knowledge." },
      { term: "paranoia", definition: "From para-'beside' + nous — a mind beside itself." },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {entries.map((entry, i) => (
          <DictionaryEntry key={entry.headword} {...entry} index={i} />
        ))}
      </main>
      <Footer />
    </>
  );
}
