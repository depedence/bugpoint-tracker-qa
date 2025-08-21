import { test, expect } from '@playwright/test';
import { BugTrackerPage } from '../pages/bugTrackerPage';
import { TICKET } from '../fixtures/bugTrackerFixtures';

test.describe('Проверки на добавление бага в правую колонку', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('Добавление ЗАКРЫТОГО бага НИЗКОГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.addBug(
            TICKET.closeLowTicketName,
            TICKET.closeLowTicketDescription,
            undefined,
            TICKET.statusClose
        );
    });

    test('Добавление ЗАКРЫТОГО бага СРЕДНЕГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.addBug(
            TICKET.closeMedTicketName,
            TICKET.closeMedTicketDescription,
            TICKET.medPriority,
            TICKET.statusClose
        );
    });

    test('Добавление ЗАКРЫТОГО бага ВЫСОКОГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.addBug(
            TICKET.closeHighTicketName,
            TICKET.closeHighTicketDescription,
            TICKET.highPriority,
            TICKET.statusClose
        );
    });
});
