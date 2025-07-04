import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  // workers: process.env.CI ? 1 : undefined,
  workers: 1,

  reporter: [['list'], ['allure-playwright']],

  use: {
    baseURL: 'http://localhost:4000',

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
  ],

  timeout: 10000,
  expect: { timeout: 10000 },
});
