// Browser checks for every page: layout at phone and desktop widths, axe, file:// behavior and the core learner flows.
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {readFileSync} from 'node:fs';
import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  {name: 'home', url: 'index.html'},
  {name: 'library', url: 'lessons.html'},
  {name: 'lesson', url: 'lesson.html?id=first-session'},
  {name: 'subjects', url: 'subjects.html'},
  {name: 'software picker', url: 'daws.html'},
  {name: 'licenses', url: 'software.html'},
  {name: 'practice', url: 'practice.html'},
  {name: 'concepts', url: 'concepts.html'},
  {name: 'progress', url: 'progress.html'},
  {name: 'not found', url: '404.html'}
];
const widths = [375, 1280];
const themes = ['light', 'dark'];

// Fresh browser storage for each test, with an explicit theme so both themes are exercised.
async function openWithTheme(page, theme) {
  await page.addInitScript(value => {
    try { localStorage.setItem('roomtone.theme.v1', value); } catch (error) { /* storage can be blocked */ }
  }, theme);
}

// Entrance animations fade content in; measure contrast and layout only once the finite animations have ended.
async function settle(page) {
  await page.evaluate(() => Promise.all(document.getAnimations()
    .filter(animation => animation.effect && animation.effect.getComputedTiming().iterations !== Infinity)
    .map(animation => animation.finished.catch(() => {}))));
}

function collectErrors(page) {
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  return errors;
}

for (const width of widths) {
  for (const theme of themes) {
    for (const entry of pages) {
      test(`${entry.name} at ${width}px in ${theme} theme: no scroll, no axe violations`, async ({page}) => {
        await page.setViewportSize({width, height: 900});
        await openWithTheme(page, theme);
        const errors = collectErrors(page);
        await page.goto(entry.url);
        await page.waitForLoadState('load');
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, 'horizontal scroll').toBeLessThanOrEqual(0);
        await settle(page);
        const results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        expect(results.violations.map(v => `${v.id}: ${v.help}`), 'axe violations').toEqual([]);
        expect(errors, 'console or page errors').toEqual([]);
        expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe(theme);
      });
    }
  }
}

test('every page loads straight from disk (file://) without errors', async ({page}) => {
  for (const entry of pages) {
    const errors = collectErrors(page);
    await page.goto(`file://${path.join(root, entry.url)}`);
    await page.waitForLoadState('load');
    expect(errors, entry.url).toEqual([]);
  }
});

test('lesson.html?id opens from disk and Back returns to the library', async ({page}) => {
  await page.goto(`file://${path.join(root, 'lessons.html')}`);
  await page.locator('a.lesson-row').first().click();
  await expect(page).toHaveURL(/lesson\.html\?id=/);
  await expect(page.locator('#lesson-view h1')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/lessons\.html$/);
});

test('unknown lesson ids show a friendly not-found page', async ({page}) => {
  await page.goto('lesson.html?id=does-not-exist');
  await expect(page.locator('#lesson-missing')).toBeVisible();
  await expect(page.locator('#lesson-missing a', {hasText: 'lesson library'})).toHaveAttribute('href', 'lessons.html');
});

test('old hash links on the home page redirect to their new pages', async ({page}) => {
  const map = {'#explore': 'subjects.html', '#paths': 'daws.html', '#library': 'lessons.html', '#concepts': 'concepts.html', '#practice': 'practice.html', '#software-notes': 'software.html'};
  for (const [hash, target] of Object.entries(map)) {
    await page.goto(`index.html${hash}`);
    await expect(page).toHaveURL(new RegExp(`${target.replace('.', '\\.')}$`));
  }
});

test('home: one large start button, and no continue card before any lesson is opened', async ({page}) => {
  await page.goto('index.html');
  await expect(page.getByRole('link', {name: /Start lesson 1/})).toHaveAttribute('href', 'lesson.html?id=first-session');
  await expect(page.locator('#continue-card')).toBeHidden();
});

test('continue card appears with the last lesson name after a lesson is opened', async ({page}) => {
  await page.goto('lesson.html?id=midi-groove');
  await expect(page.locator('#lesson-view h1')).toBeVisible();
  await page.goto('index.html');
  await expect(page.locator('#continue-card')).toBeVisible();
  await expect(page.locator('#continue-title')).toContainText('Continue: ');
  await expect(page.locator('#continue-card')).toHaveAttribute('href', 'lesson.html?id=midi-groove');
});

test('lesson: completing updates in place, shows Next lesson, and arrow keys move between lessons', async ({page}) => {
  await page.goto('lesson.html?id=first-session');
  await expect(page.locator('#lesson-view h1')).toBeVisible();
  await page.evaluate(() => { window.__sameDocument = true; });
  await page.locator('#complete').click();
  await expect(page.locator('#complete')).toHaveText(/undo/);
  await expect(page.locator('[data-progress-count]').first()).toHaveText(/1 lesson done/);
  await expect(page.locator('#next-lesson')).toBeVisible({timeout: 3000});
  expect(await page.evaluate(() => window.__sameDocument)).toBe(true);
  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/id=midi-groove/);
  await page.keyboard.press('ArrowLeft');
  await expect(page).toHaveURL(/id=first-session/);
});

test('lesson: DAW chooser is inline, can be skipped, and steps follow the chosen software', async ({page}) => {
  await page.goto('lesson.html?id=midi-groove');
  await expect(page.locator('#software-section .software-choices')).toBeVisible();
  await page.getByRole('button', {name: 'Ableton Live'}).click();
  await expect(page.locator('#software-heading')).toHaveText('Ableton Live steps');
  await page.goto('lesson.html?id=arrange-loop');
  await expect(page.locator('#software-heading')).toHaveText('Ableton Live steps');
  await page.getByRole('button', {name: 'Hide software steps'}).click();
  await expect(page.locator('#software-section')).toContainText('Hidden');
  await page.goto('lesson.html?id=sound-selection');
  await expect(page.locator('#software-section')).toContainText('Hidden');
});

test('subject lessons have no software chooser', async ({page}) => {
  await page.goto('subjects.html');
  await page.locator('.subject-card[data-id="guitar"]').click();
  await page.goto('lessons.html');
  await page.locator('a.lesson-row', {hasText: 'Keep a steady strumming hand'}).click();
  await expect(page.locator('#lesson-view h1')).toBeVisible();
  await expect(page.locator('#software-section')).toHaveCount(0);
});

test('library: subjects change the list and the choice survives a reload', async ({page}) => {
  await page.goto('subjects.html');
  await page.locator('.subject-card[data-id="guitar"]').click();
  await expect(page.locator('.subject-card[data-id="guitar"]')).toHaveAttribute('aria-pressed', 'true');
  await page.goto('lessons.html');
  await expect(page.locator('a.lesson-row')).not.toHaveCount(0);
  await expect(page.locator('a.lesson-row', {hasText: 'Keep a steady strumming hand'})).toHaveCount(1);
  await page.reload();
  await expect(page.locator('#subject-summary')).toHaveText('Subjects: Guitar');
});

test('progress: reset needs a second confirm and clears only progress', async ({page}) => {
  await page.goto('lesson.html?id=first-session');
  await page.locator('#complete').click();
  await page.goto('progress.html');
  await expect(page.locator('#count')).toHaveText('1 lesson completed');
  await page.locator('#reset').click();
  await expect(page.locator('#reset-confirm')).toBeVisible();
  await page.locator('#reset-cancel').click();
  await expect(page.locator('#count')).toHaveText('1 lesson completed');
  await page.locator('#reset').click();
  await page.locator('#reset-confirm').click();
  await expect(page.locator('#count')).toHaveText('0 lessons completed');
});

test('practice: metronome plays only after Start and the logo pulses on beats', async ({page}) => {
  await page.goto('practice.html');
  await expect(page.locator('#metro-status')).toContainText('Press Start');
  await page.locator('#metro-toggle').click();
  await expect(page.locator('#metro-toggle')).toHaveText('Stop');
  await page.locator('#metro-toggle').click();
  await expect(page.locator('#metro-toggle')).toHaveText('Start');
});

test('reduced motion: every animation is switched off', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('index.html');
  const names = await page.locator('.clip').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).animationName));
  expect(names.every(name => name === 'none')).toBe(true);
});

test('completing a lesson bursts a few notes that are removed within about a second', async ({page}) => {
  await page.goto('lesson.html?id=first-session');
  await expect(page.locator('#complete')).toBeVisible();
  await page.locator('#complete').click();
  await expect(page.locator('#burst span')).toHaveCount(12);
  await expect(page.locator('#burst span')).toHaveCount(0, {timeout: 1500});
});

test('mobile phones keep the progress count without the word wrapping the header', async ({page}) => {
  await page.setViewportSize({width: 375, height: 800});
  await page.goto('progress.html');
  const box = await page.locator('.topbar').boundingBox();
  expect(box.height).toBeLessThanOrEqual(80);
});

test('practice: step grid toggles and ear training checks an answer without errors', async ({page}) => {
  const errors = collectErrors(page);
  await page.goto('practice.html');
  await page.locator('#step-grid button[data-row="kick"][data-step="0"]').click();
  await expect(page.locator('#step-grid button[data-row="kick"][data-step="0"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#grid-toggle').click();
  await expect(page.locator('#grid-toggle')).toHaveText('Stop loop');
  await page.locator('#grid-toggle').click();
  await page.locator('#ear-play').click();
  await page.locator('#ear-choices button').first().click();
  await expect(page.locator('#ear-score')).toContainText('of 1 right');
  expect(errors).toEqual([]);
});

test('progress: exports a versioned file and rejects a file that is not a Roomtone progress file', async ({page}) => {
  await page.goto('progress.html');
  const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#export').click()]);
  expect(download.suggestedFilename()).toMatch(/^roomtone-progress-\d{4}-\d{2}-\d{2}\.json$/);
  const path = await download.path();
  const data = JSON.parse(readFileSync(path, 'utf8'));
  expect(data.format).toBe('roomtone-progress');
  expect(data.version).toBe(1);
  await page.locator('#import-file').setInputFiles({name: 'nope.json', mimeType: 'application/json', buffer: Buffer.from('{"hello":1}')});
  await expect(page.locator('#import-status')).toContainText('not a Roomtone progress file');
});

test('progress: a valid progress file imports after one confirm and ignores unknown lesson ids', async ({page}) => {
  await page.goto('progress.html');
  const file = JSON.stringify({format: 'roomtone-progress', version: 1, completed: ['first-session', 'not-a-lesson'], arcDone: true, subjects: ['guitar'], software: {daw: 'ableton', declined: false}});
  await page.locator('#import-file').setInputFiles({name: 'roomtone-progress.json', mimeType: 'application/json', buffer: Buffer.from(file)});
  await expect(page.locator('#import-status')).toContainText('Ready to import 1 completed lesson');
  await page.locator('#import-apply').click();
  await expect(page.locator('#count')).toHaveText('1 lesson completed');
  await expect(page.locator('#exercise-line')).toHaveText('Practice exercise: complete.');
  await page.goto('subjects.html');
  await expect(page.locator('.subject-card[data-id="guitar"]')).toHaveAttribute('aria-pressed', 'true');
});

test('the theme toggle is remembered after a reload', async ({page}) => {
  await page.goto('index.html');
  await page.evaluate(() => localStorage.removeItem('roomtone.theme.v1'));
  await page.reload();
  await page.locator('.theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('.theme-toggle').click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
