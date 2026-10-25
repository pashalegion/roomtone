// Runs the browser checks. Install the tooling without adding a package.json to the site:
//   npm install --no-save @playwright/test@1.56.1 @axe-core/playwright@4.10.1
//   npx playwright install --with-deps chromium firefox
//   npx playwright test -c tests/playwright.config.mjs
import {fileURLToPath} from 'node:url';
import {defineConfig, devices} from '@playwright/test';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = process.env.PORT || 8123;

export default defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.mjs/,
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${port}/`,
    trace: 'retain-on-failure'
  },
  projects: [
    {name: 'chromium', use: {...devices['Desktop Chrome']}},
    {name: 'firefox', use: {...devices['Desktop Firefox']}}
  ],
  webServer: {
    command: `python3 -m http.server ${port} --bind 127.0.0.1`,
    cwd: root,
    url: `http://127.0.0.1:${port}/index.html`,
    reuseExistingServer: !process.env.CI
  }
});
