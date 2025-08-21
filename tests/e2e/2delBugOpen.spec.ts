import { test, expect } from '@playwright/test';
import { BugTrackerPage } from '../pages/bugTrackerPage';
import { TICKET } from '../fixtures/bugTrackerFixtures';

test.describe('Удаление созданных тикетов', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('Удаление первого тикета СРЕДНЕГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.deleteBug(TICKET.openCardMed);
    });

    test('Удаление второго тикета ВЫСОКОГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.deleteBug(TICKET.openCardHigh);
    });

    test('Удаление отредактированного тикета из правой колонки', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.deleteBug(TICKET.openCardLow);
    });
});
