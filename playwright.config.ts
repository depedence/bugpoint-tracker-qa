import { defineConfig, devices } from '@playwright/test';
import { OutputFileType } from 'typescript';

export default defineConfig({
    reporter: [
        ['list'], // Вывод Allure отчета в консоль
        ['html'],
        [
            'allure-playwright',
            {
                outputFolder: 'allure-results',
                detail: true,
                suiteTitle: false,
            },
        ],
    ],

    testDir: './tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    // workers: process.env.CI ? 1 : undefined,

    workers: 1,

    use: {
        baseURL: 'http://localhost:4000',

        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'], headless: true },
        },
    ],

    timeout: 20000,
    expect: { timeout: 20000 },
});
