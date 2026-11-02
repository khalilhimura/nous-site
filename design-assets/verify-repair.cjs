/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS browser verification harness. */
const { chromium } = require(process.env.NOUS_PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
// Connect only to the preview already managed by TasteCode. Never start a server.
const url = process.env.NOUS_PREVIEW_URL;
assert(url && /^http:\/\/127\.0\.0\.1:\d+\/?$/.test(url), 'Supply the existing local TasteCode preview URL');
const evidence = path.join(process.cwd(), 'design-assets/repair-1');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.NOUS_CHROMIUM_EXECUTABLE, headless: true });
  const report = { url, views: [], errors: [] };
  try {
    const page = await browser.newPage({ colorScheme: 'dark', reducedMotion: 'reduce' });
    page.on('pageerror', error => report.errors.push(error.message));
    for (const width of [320, 390, 470, 900, 1487]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(250);
      await page.locator('#plato, #christian_theology, footer').evaluateAll(groups => Promise.all(groups.flatMap(group => [...group.querySelectorAll('img')]).map(image => {
        image.loading = 'eager';
        return image.decode();
      })));
      const result = await page.evaluate(() => {
        const rect = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom }; };
        const skip = document.querySelector('.skip-link');
        const footer = document.querySelector('.site-footer');
        const grid = document.querySelector('.footer-grid');
        const texture = document.querySelector('.footer-texture');
        const cards = [...document.querySelectorAll('.theology-rows article')].map(card => {
          const image = card.querySelector('img'), heading = card.querySelector('h3'), text = card.querySelector('p');
          const c = rect(card), i = rect(image), h = rect(heading), p = rect(text);
          return { columns: getComputedStyle(card).gridTemplateColumns, imageRightOfText: i.x >= p.right - 1, imageSpansTextRows: i.y < p.bottom && i.bottom > h.y, textInside: p.x >= c.x && p.right <= c.right && h.right <= c.right && p.bottom <= c.bottom, imageRatio: i.height / i.width, imageLoaded: image.naturalWidth > 0, bodySize: getComputedStyle(text).fontSize };
        });
        return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, skip: rect(skip), smallTargets: [...document.querySelectorAll('a,button,[tabindex="0"]')].filter(e => { const r = rect(e); return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44); }).map(e => ({ label: e.textContent.trim(), ...rect(e) })), heading: document.querySelector('#plato-heading').innerText, cards, footer: { width: rect(footer).width, background: getComputedStyle(footer).backgroundColor, gridBackground: getComputedStyle(grid).backgroundColor, textureOutsideText: rect(texture).y >= rect(grid).bottom - 1 }, modernPresent: !!document.querySelector('#modern_usage'), legalLinkCount: document.querySelectorAll('footer nav[aria-label="Site policies"] a').length };
      });
      report.views.push(result);
      assert.equal(result.scrollWidth, width, 'Page overflow');
      assert.equal(result.smallTargets.length, 0, 'Targets below 44px');
      assert(result.skip.width >= 44 && result.skip.height >= 44, 'Skip link shrank');
      assert.match(result.heading.replace(/\s+/g, ' '), /mind toward/, 'Joined heading words');
      assert.equal(result.footer.gridBackground, 'rgba(0, 0, 0, 0)', 'Inset footer panel remains');
      assert(result.footer.textureOutsideText, 'Footer texture overlaps reading surface');
      assert.equal(result.legalLinkCount, 2, 'Legal links missing');
      if (width < 700) assert(result.cards.every(c => c.imageRightOfText && c.imageSpansTextRows && c.textInside && c.imageLoaded && c.imageRatio > .99 && c.imageRatio < 1.01 && parseFloat(c.bodySize) >= 16), 'Compact card composition or reading fit failed');
      await page.locator('.skip-link').focus();
      const focused = await page.locator('.skip-link').evaluate(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, outline: getComputedStyle(e).outlineStyle }; });
      result.focusedSkip = focused;
      assert(focused.x >= 0 && focused.y >= 0 && focused.width >= 44 && focused.height >= 44 && focused.outline === 'solid', 'Skip focus visibility failed');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content', 'Skip target focus');
      if (width === 390 || width === 1487) {
        for (const [selector, name] of [['#plato','plato'], ['#christian_theology','theology'], ['footer','footer']]) {
          await page.locator(selector).screenshot({ path: path.join(evidence, `${name}-${width}.png`) });
        }
      }
    }
    assert.equal(report.errors.length, 0, 'Browser runtime errors');
    fs.writeFileSync(path.join(evidence, 'checks.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report.views.map(v => ({ width: v.width, smallTargets: v.smallTargets.length, skip: [v.skip.width, v.skip.height], heading: v.heading, cardsFit: v.cards.every(c => c.textInside), footer: v.footer })), null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
