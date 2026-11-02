# Visual repair attempt 1

Fixed only the four validated root causes. Approved reference IDs, page/brand artifacts, image files, content identification, motion code, legal copy, and unrelated working changes remain unchanged.

- Skip link: replaced the 1px hiding box with offscreen positioning. Its rendered box stays 151.8×48px at all tested widths; keyboard focus restores it onscreen with an outline, and Enter focuses main content. This resolves both duplicated skip-link audit groups.
- Plato: retained an explicit space before the responsive line break. Compact text now reads “Plato turns the mind toward the Forms.” Expanded text retains the two-line composition.
- Theology: removed the unconditional below-420px image stacking. Compact cards use flexible 60:40 columns, 16px horizontal padding, 20px headings, and 16px definitions. All five square images remain beside their text at 320, 390, and 470px without page overflow or text clipping.
- Footer: removed the inset grid background and side/top texture frame. The opaque dark reading surface spans the full footer. The existing stone image sits only in bottom padding, outside the text area. Column structure and every entry/policy link remain intact.

Verification used the existing TasteCode-owned preview at http://127.0.0.1:58565. No server was started or stopped. `verify-repair.cjs` requires an existing local preview URL and never creates a server. Screenshots wait for the relevant images to decode.

Browser assertions passed at widths 320, 390, 470, 900, and 1487px: zero targets below 44×44px, no page overflow, correct heading word separation, keyboard skip behavior, readable compact columns, loaded square images, transparent footer grid, and footer texture below the reading area. Both legal links remain present. Actual results are in `repair-1/checks.json`; desktop/mobile captures of all three changed compositions are in `repair-1/` and were visually inspected against the supplied references.

`npm run build` passed, including TypeScript and static export of the homepage and legal routes. `npm run lint` passed with the existing unused ArrowUpRight warning in unchanged `dictionary-entry.tsx`. `git diff --check` passed.

This repair did not change animation triggers or timing. Repair captures use reduced motion for stable geometry; prior Build motion evidence remains in `build-evidence/browser-checks.json`. These captures do not establish new timing claims. No publication, merge, or deployment was performed.
