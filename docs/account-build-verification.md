# Nous Account build verification

Verify before publishing: Alex Example, alex@example.com, the AE initials, English and Asia/Kuala_Lumpur are illustrative profile defaults. Alternate demo choices are Bahasa Melayu, UTC and Asia/Singapore. The browser/session and linked email shown are examples, not authenticated records. Empty purchase, entitlement, credit, reservation, usage, transaction and support states are representative. All authentication, linking, sign-out, export and deletion actions are local previews. No identity, payment or email service was integrated or deployed.

## Implementation

The existing Next.js 16.3.4 / React 19 / Tailwind 4 app and static-export configuration are retained. No dependencies or package-manager files were changed. The root dictionary page is replaced with the approved account entry; the old dictionary components remain untouched. The `.taste` artifacts and acquired fonts are preserved.

- Signed-out entry offers Google/email demonstrations and direct demo exploration.
- Demo mode reveals four account destinations, a five-view task workspace and three data disclosures.
- Query parameters and browser history select account views. Profile drafts survive task changes; saving and discarding affect only memory.
- Native dialog reviews protect sensitive actions and return focus. Navigation supports Escape and visible keyboard focus.
- Local approved font files are served through explicit font-face declarations. No remote runtime font request is required.
- Hero motion uses owned transform-only animations after paint. Scroll reveals observe leaf groups once. Already-visible and restored-scroll content never hides; reduced-motion changes cancel only owned animations.

## Composition decisions

The comparisons in this section record an earlier design pass. The current supplied references and fresh verification are recorded under Current TasteCode Build verification below.

Compared desktop and compact captures against Fabrica, Scalient, Avoora work and Cipher FAQ at matched widths. Reference/render pair images are in `/tmp/nous-build-evidence` with `comparison` in their filenames. Full-section screenshots are captured after visiting each reveal group so offscreen paused reveals are not mistaken for missing content.

Recorded deviations follow the approved blueprint and brand:

- Fabrica's architectural photograph and portrait are replaced by the approved native sign-in component, not substitute imagery. The white inset grows to fit labeled fields and 44px targets. The dominant two-scale title, right explanation and lower-right inset remain. On compact screens the complete form requires more height than the portrait card.
- Manga square edges, hard shadows and approved typefaces override the internal references' rounded photographic styling. The approved 1124px container limits desktop task content width.
- Scalient retains four comparable destination cards. Credits uses the approved accent without the source's rotation or glow. Short task titles occupy one line rather than forcing the source's service-name wraps.
- Avoora's single dominant frame contains the approved native account workspace. The lower selector strip is in document flow so it cannot cover fields. Compact forms expand vertically for readable labels, controls and all five selectors. No second project is added.
- Cipher uses three relevant data disclosures instead of seven unrelated questions. Its repeated navigation is omitted; its centered heading and disclosure alignment remain. Heights adapt to actual answer and confirmation content.

## Checks

- `npm run build`: successful production compilation, TypeScript validation and static export.
- `npx tsc --noEmit`: passed.
- `npm run lint`: passed with zero errors; two pre-existing unused-import warnings remain in the untouched dictionary-entry.tsx and hero.tsx files.
- The build warns about an ignored package-lock.json outside this repository. The repository's existing package manager and configuration were preserved.
- `node scripts/verify-account.mjs`: isolated headless Chromium verification against the production export. It starts an ephemeral loopback file server inside the test process and closes it and the browser on completion. No Preview server remains running. Override `BROWSER_EXECUTABLE` for another Chromium installation; the default is the installed macOS Brave executable.
- Browser evidence: `/tmp/nous-build-evidence/results.json`, `fonts.json`, `responsive.json` and desktop/compact screenshots.
- All three actual font faces loaded: Dela Gothic One 400, Zen Kaku Gothic New 400 and 500. Awaited document.fonts.ready, checked loaded FontFace entries and document.fonts.check at each actual weight.
- Browser assertions cover production rendering, email validation and recovery, Google preview cancellation, profile draft retention and saving, linking review, empty commercial states, local export/deletion previews, menu Escape/focus, responsive hit areas, long identifiers and effective 200% layout reflow.
- Actual running hero, overview and workspace animations were observed. Rapid down/up scrolling twice, resize, middle-position reload, reduced-motion loading and changing the preference during playback leave visited content visible without replay. No uncaught browser exceptions were observed.

## Boundaries

This is an interface skeleton. Screenshots, local demos and a successful export do not prove production authentication, domain readiness, payment settlement, email delivery, real session revocation or backend authorization. Live integrations and deployment remain outside this build. Automated layout and keyboard checks do not constitute a complete WCAG conformance audit.

## Current TasteCode Build verification (2026-11-02)

The latest Build instruction authorizes targeted implementation of the supplied account plan. Existing uncommitted account work, local fonts, framework, dependencies, package lock and static-export pipeline were retained. No Preview server was started. The browser test serves the export through a temporary loopback server and closes both server and browser before it exits.

### Changes in this pass

- Account overview and profile now identify Account as the current main-navigation destination. Other represented task destinations keep their selected state, including browser back/forward navigation.
- Initial authentication actions now say Preview Google sign-in and Preview email sign-in. Their existing behavior remains local demonstration only.
- Data disclosure groups have the planned vertical scroll entrance, distinct from the horizontal destination-card sequence. Reveal cleanup now marks owned groups complete as it cancels their animations, preserving final visibility.
- Essential data-disclosure borders use the approved pale cyan. Dark regions use the approved dark focus ring, while light insets and the teal card retain ink focus outlines with a white separation.
- The existing browser verifier now checks current navigation, history restoration, data-disclosure animation and exact loaded font families/weights. Hero verification polls for an actual running animation instead of sampling after a fixed delay.

### Fresh checks

- `npm run build`: passed, including Next.js TypeScript validation and static export. The existing warning about an ignored parent-directory package-lock.json remains; repository configuration was preserved.
- `npx tsc --noEmit`: passed.
- `npm run lint`: passed with zero errors. Two pre-existing unused ArrowUpRight imports remain in the untouched dictionary-entry.tsx and hero.tsx files.
- `git diff --check`: passed.
- `ACCOUNT_EVIDENCE_DIR=/tmp/nous-build-current node scripts/verify-account.mjs`: 38 browser assertions passed against the production export, with zero uncaught runtime exceptions.
- Browser viewport checks: 320, 390, 768, 834, 1440 and 1505 CSS pixels. Visible interactive targets met 44px dimensions and no horizontal page overflow was observed. An effective 200 percent zoom reflow width and long profile name were also checked.
- All three approved local font faces were observed loaded at their actual family and weight after document.fonts.ready, with matching document.fonts.check results.
- Actual hero, overview, workspace and data-disclosure animations were observed running. Rapid down/up scrolling twice, resizing, middle-position reload and reduced-motion changes preserved visibility without replaying completed scroll entrances.
- Initial failing browser checks reproduced the missing current-navigation state and missing data-disclosure entrance before their fixes.

### Current reference comparison and deliberate departures

Desktop and mobile section captures were visually inspected beside Nubo hero, Meridian services, Meridian introduction and Waveyu FAQ. Diagnostic pairs are `/tmp/nous-build-current/comparison-{section}-{width}.png`, with widths 390 and 1505; full-section captures, fonts.json, responsive.json and results.json are in the same directory. These are local verification artifacts, not page assets or proof of live deployment.

The result is not a pixel reproduction of those photographic references. The supplied blueprint explicitly preserves the existing account composition and documents these functional and brand departures:

- Nubo: retain the existing two-scale NOUS/ACCOUNT identity, dark field, right explanation and native authentication inset rather than a robot photograph and centered marketing copy. Mobile places the complete labeled form before the secondary demo action. Its height follows usable controls rather than a photographic spacer.
- Meridian services: use the four required account destinations instead of three photographic service columns. Keep existing icons, square task cards and the approved teal Credits treatment. Mobile keeps all four tasks available without a carousel.
- Meridian introduction: retain the existing summary-left/controls-right workspace and five task destinations instead of a tall photograph with editorial copy. Compact screens put the task heading before the form; the panel grows to keep all fields and actions readable.
- Waveyu FAQ: retain the existing centered data heading and bounded disclosure column. Three real account choices replace six unrelated questions; no beach photography, contact card or team content is added. Inline reviews keep scope and preview controls together.

No new representative values were introduced. The publishing note at the top of this document still identifies the existing illustrative profile, session and empty commercial states. Full live authentication, transactions, email delivery, authorization, domain parity and deployment remain unverified.

## TasteCode visual repair 1 (2026-11-02)

Resolved `hero_content_grouping` through the existing stylesheet only. One shared grid places the explanation and entry actions directly beneath the identity. The compact explanation now shares the heading and form gutter. Desktop retains the native authentication inset; compact screens retain the form before the secondary demo action. Approved reference assignments, artifacts, copy, fonts, account behavior and later sections were preserved.

Assumption: retain the documented account-specific form and two-scale identity while restoring the reference's contiguous introductory grouping. Do not add its unrelated robot photography.

- `npm run build`, `./node_modules/.bin/tsc --noEmit` and `git diff --check`: passed. Lint has zero errors and the same two unused-import warnings in untouched components.
- Reused TasteCode's running server at 127.0.0.1:3000. No server was started. Temporary browser verification scripts and captures are outside the project in `/tmp/nous-repair-1`.
- Visually inspected repaired 1440px and 390px captures. Geometry assertions passed at 320, 390, 768, 834, 1099, 1100 and 1440px: explanation follows and aligns with the identity, desktop/medium actions follow the explanation, and compact copy aligns with the form. No page overflow was observed.
- Browser verification completed 41 successful assertions across geometry, actual font loading, hit areas, account previews, navigation, scroll entrances, rapid scrolling, resizing and reduced-motion changes, with no uncaught runtime exceptions.
- One separate check failed: the workspace is briefly hidden by its entrance on middle-scroll reload. Follow-up samples recorded opacity 0 at roughly 100ms and final visibility by roughly 600ms. This is a confirmed runtime limitation, not a passed continuity check. Its cause was not established; reveal logic was left unchanged because this repair is limited to the validated hero finding. Evidence: `failure.json` and `reload-samples.json` in the repair evidence directory.

## TasteCode visual repair 2 (2026-11-02)

Resolved `workspace_reload_reveal`. Initial hash navigation previously queued its scroll after reveal installation had already measured and hidden the workspace. Reveal installation now runs in the animation frame after the navigation callback, so the restored destination is measured in its actual viewport position and remains in its final visible state. Cleanup cancels the queued frame or cleans up the installed reveals. The shared reveal implementation, composition, CSS, artifacts and account content are unchanged.

Assumption: preserve normal first-scroll entrances below the viewport while skipping entrances for groups already visible at the restored hash destination. This addresses the validated visibility failure without introducing custom scroll restoration.

- The browser verifier can reuse an existing server with `ACCOUNT_BASE_URL`. No server was started during this repair; TasteCode's existing 127.0.0.1:3000 server was reused.
- The new regression check samples every animation frame from document creation. It reproduced the desktop failure before the fix: 30 hidden/animated samples. After the fix, 50 desktop samples and 51 compact samples were fully visible with no workspace animation. It also checks no replay after rapid down/up scrolling twice and resizing. Evidence: `/tmp/nous-repair-2/reload-samples-{1440,390}.json`; baseline evidence is in `/tmp/nous-repair-2-before`.
- `ACCOUNT_BASE_URL=http://127.0.0.1:3000 ACCOUNT_EVIDENCE_DIR=/tmp/nous-repair-2 node scripts/verify-account.mjs`: all 41 assertions passed. Actual hero, overview, workspace and data entrances still run on their normal triggers. Reduced-motion loading and preference changes, responsive targets, overflow, account preview flows and navigation passed, with zero uncaught runtime exceptions.
- `npm run build`, `./node_modules/.bin/tsc --noEmit` and `git diff --check`: passed. `npm run lint`: zero errors, the same two warnings in untouched components. The existing ignored parent-lockfile build warning remains.
- Inspected current desktop and compact workspace captures; no composition changes were introduced. These browser results concern the local development page; the production export compiled successfully but was not served in a new preview process.
- Additional diagnostic limit: after removing the hash before reload, the browser did not restore the workspace into view, so no workspace visibility samples were collected. That separate unanchored scroll-position behavior was not changed or claimed as verified. The validated hash-destination reload now passes.

This supersedes repair 1's unresolved workspace visibility finding. No representative content or publishing claims were added.

## PR integration verification (2026-11-02)

The user authorized committing and merging the account implementation and design audit findings into `khalilhimura/nous-site`. The branch includes the existing account components, licensed local fonts and regression verifier required by the active page. Local `.npm` and `.taste` working files are excluded.

Integrated the latest `origin/main` legal-policy change before preparing the commit. Both policy routes and their text are preserved. Account heading, paragraph and link resets are scoped to the account root so the policies retain Geist typography, spacing and underlined links. The account footer links to both policies. Legal links use the approved dark teal for readable contrast on white.

Code review identified one additional keyboard issue: the Data controls navigation destination could not accept focus. Its section now accepts programmatic focus, and the next Tab reaches its first disclosure. The production verifier covers both steps and resolves Next.js extensionless exported policy routes.

- `npm run build`: passed, including TypeScript and all static routes. The ignored parent-directory lockfile warning remains.
- `./node_modules/.bin/tsc --noEmit`: passed.
- `npm run lint`: zero errors, with the same two unused-import warnings in untouched dictionary components.
- `git diff --cached --check -- . ':(exclude)public/fonts/*/OFL.txt'`: passed. The two original OFL license files each contain one upstream trailing space; their exact licensed bytes and recorded hashes are preserved.
- `ACCOUNT_EVIDENCE_DIR=/tmp/nous-pr-verification node scripts/verify-account.mjs`: all 54 assertions passed against the production export, with zero uncaught browser exceptions. This includes the account flows, actual motion triggers, hash-destination reload visibility, no replay, reduced motion, responsive targets and overflow, legal-page routes, typography, spacing and link color. The temporary test server and browser closed on completion.
- Visually inspected the compact Privacy Policy and desktop Terms of Service captures. Verification evidence is local to `/tmp/nous-pr-verification`.
- Final source review found no remaining important issues after these corrections.

Publishing boundaries remain unchanged: profile/session records are illustrative, commercial states are empty, and authentication, account operations and data actions are local previews. This is not verification of live authentication or deployed behavior. Reload scroll restoration after removing the hash remains unresolved; only hash-destination visibility is verified here.
