import { test, expect } from '@playwright/test';
import { TICKET } from '../fixtures/bugTrackerFixtures';
import { BugTrackerPage } from '../pages/bugTrackerPage';

test.describe('Удаление созданных тикетов', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('Удаление первого тикета НИЗКОГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.deleteBug(TICKET.closeCardLow);
    });

    test('Удаление второго тикета СРЕДНЕГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.deleteBug(TICKET.closeCardMed);
    });

    test('Удаление отретьего тикета ВЫСОКГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.deleteBug(TICKET.closeCardHigh);
    });
});
