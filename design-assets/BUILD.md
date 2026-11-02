Verify before publishing: Confirm the generated editorial illustrations and the historical summaries. The images illustrate ideas and materials; they are not historical documents, photographed artifacts, named locations, or evidence of philosophical claims. The page identifies them as original editorial illustrations. No people, affiliations, testimonials, operational values, or measured outcomes were invented.

## Implementation

Implemented the supplied homepage plan in the existing Next.js App Router and static-export pipeline. Preserved npm, Tailwind, Geist, Phosphor, all legal copy, and both legal routes. No framework, dependency version, lockfile, release configuration, or unrelated source was changed. The pre-existing untracked image/font assets and provenance ledger were reused. All 20 original image SHA-256 checksums still match the ledger.

The homepage has one Greek h1 and seven entry h2 headings. Reading links and the complete footer index use native hash navigation. Targets are focusable without scripting. System, Light, and Dark theme controls expose their selected state and persist the selection. Secondary text uses the approved contrast correction. Images reserve intrinsic dimensions and use deliberate crops. Fonts are loaded from the acquired local variable files, including genuine italic faces.

## Reference comparison and retained adaptations

`build-evidence/compare-*.jpg` places the selected reference on the left and the implementation on the right, at equal image widths. `overview-1.jpg` through `overview-3.jpg` show all nine desktop compositions. Compact captures include 470px and 390px; references with no compact image use the recorded derived transformation. Reference screenshots are comparison evidence only, never website media.

| Section | Preserved geometry | Content, access, or responsive adaptation |
| --- | --- | --- |
| Introduction | Distributed header; broad upper field; five uninterrupted tall frames with 8px gaps. Desktop band begins at 448.5px, compared with about 447px in the 1487px reference. Compact strip shows 73% width per frame with a next-image preview. | Greek identity, one introduction, and reading action occupy the reference's empty field. Compact height follows actual copy. The first desktop frame is slightly wider than the reference's cropped outer frame to preserve the complete Greek lettering. Navigation rows are 44px for touch access. Captions identify the editorial studies. |
| Meaning | Four-line left headline, opposing square Greek image, two equal bordered comparison panels, bottom terminology row. | Real definition and usage copy extend the height; panels fit their shorter comparisons rather than empty fixed-height areas. The coherent current theme replaces security colors and prohibited grid/shield ornaments. Below 420px the image follows the definition so the long headword remains readable. |
| Anaxagoras | Top rule, two-line left headline, metadata right, four unboxed portrait units with adjacent captions. | Introductory and concluding context extend height. Four material illustrations replace team portraits. Medium uses two columns; compact uses one, as recorded. |
| Plato | Shallow rounded banner, large pause, offset two-line heading, four compact concept units. | Context needs more prose than the reference. Indicators are entry metadata, not false progress dots. Compact thumbnails remain beside full definitions. |
| Aristotle | One broad 1.79:1 figure, inset dark caption bar, entry number, title, rule, terminology. | The prohibited sliced-blur treatment is omitted. Full definition and source remain below the figure. Compact uses a 3:4 crop retaining prism and illuminated paper; the caption moves into flow to avoid covering the subject or clipping terminology. |
| Plotinus | 65:35 feature/stack composition; main text and portrait; two right thumbnails; source thumbnail. Compact moves the main image above its text. | Definitions and context replace fictional author, dates, reading times, and article links. Longer readable copy extends compact height. |
| Christian theology | Centered introduction and five long rounded rows; compact 60:40 text/media cards. | All five illustrations and definitions are present. Below 420px imagery moves below text, preserving readable columns. Approved teal-tinted surfaces replace unrelated rainbow colors. Explanations have no fake service-link controls. |
| Modern usage | 34:66 upper split; lower label and three vocabulary units. Compact preserves the large image/headline frame and three left-media/right-definition units. | The headline uses an opaque approved light surface over the photograph. Supporting copy and action follow outside the compact image. Definitions replace metrics and require more height, especially the caution about paranoia. Thumbnails use shorter reference-like frames rather than forcing portrait source ratios into tall rows. |
| Footer | Lower reference region only; dark three-column field; stacked compact identity, complete entry index, policies. | Unrelated promotional collage, contact details, and social accounts are omitted. A continuous opaque surface behind the three open columns makes contrast independent of the stone texture. |

## Motion evidence

The hero uses a 700ms transform-only entrance after mount, with 80ms relationship delays capped at 240ms. It never hides already painted text while waiting for assets. Meaning uses a horizontal heading entrance and opacity-only explanation/panels. Anaxagoras uses individual 8px rises. The native observer prepares only below-viewport groups, triggers at threshold 0 with a positive 96px margin, unobserves immediately, and retains completed states. Other reading sections remain static as planned. Feedback lasts 160ms; hover movement is restricted to fine, hover-capable pointers. Reduced motion cancels only owned animations and restores readable final states.

Actual Chromium evidence is in `build-evidence/browser-checks.json`: eight hero/media animations completed, eight later groups completed, and all groups retained opacity 1 and transform none after two rapid down/up cycles. Reload at scrollY 8364 retained readable content and created zero hero animations. Switching reduced motion during playback left all groups visible with zero running animations. Resize did not reset completed groups. A screenshot alone was not used to establish animation playback.

## Verification

- `npm ci`: completed using the existing lockfile.
- `npm run build`: passed; homepage and both legal routes exported successfully.
- `npx tsc --noEmit`: passed.
- `npm run lint`: passed with one pre-existing unused `ArrowUpRight` warning in the unchanged `dictionary-entry.tsx`.
- `git diff --check`: passed.
- `design-assets/verify-build.cjs`: real headless Chromium against a temporary server for the production export, closed in `finally`. No preview server remains running. No runtime page errors.
- Widths 1487, 900, 470, 420, 390, and 320px: document width matches viewport; no unintended horizontal overflow; every visible homepage interactive target is at least 44×44px. The hidden skip link expands to 151.8×48px on keyboard focus.
- Keyboard skip focuses main content; reading action focuses `#meaning`; native horizontal media strip responds to ArrowRight (40px movement measured).
- Theme selection, saved Dark restoration, and System dark preference passed. No-script rendering remains readable without page overflow.
- Both legal routes render their existing h1 and content.
- `document.fonts.ready`, matching loaded FontFace records, and `document.fonts.check` passed for Sans weights 400/500/600 and Mono 400/500. CDP reports Georgia for three Greek glyphs and Times New Roman for one accented glyph, both intentional system-serif faces, with no Arial fallback.
- 200% reflow equivalent tested at 744×529 CSS pixels, half the expanded viewport dimensions, without horizontal overflow. Native browser UI zoom was not controlled by the headless harness.
- Computed-color contrast scan: 157 text samples per theme, no failures. Minimum normal-text contrast was 5.61:1 in light and 7.19:1 in dark; primary-action boundaries measured 3.59:1 and 7.94:1. The approved light hover fill with black text measures 4.55:1. Results are in `build-evidence/contrast-checks.json`.
- No unit-test script exists in the project; the browser assertions cover the required reading and motion behavior.

The browser harness can use an existing Playwright installation and Chromium executable via `NOUS_PLAYWRIGHT_MODULE` and `NOUS_CHROMIUM_EXECUTABLE`. It adds no app dependency or build step.

## Release boundaries and remaining risk

`npm audit` reports 21 existing dependency advisories: 16 moderate, 4 high, and 1 critical. The critical advisory is reported against the pinned Next.js version. Dependency versions were preserved as required; the audit findings need separate release assessment. The successful design build does not establish that these advisories are resolved.

Production appearance, PR state, merge, deployment, and the live reading journey were not changed or claimed in this Build phase. TasteCode Preview and the downstream release phase own those checks. Asset provenance is retained in `provenance.json`; historical copy remains supplied editorial content, not independently verified scholarship.
