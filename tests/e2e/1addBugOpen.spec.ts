import { test, expect } from '@playwright/test';
import { BugTrackerPage } from '../pages/bugTrackerPage';
import { TICKET } from '../fixtures/bugTrackerFixtures';

test.describe('Проверки на добавление бага в левую колонку', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('Добавление ОТКРЫТОГО бага НИЗКОГО приоритета', async ({ page }) => {
        const BPT = new BugTrackerPage(page);

        await BPT.addBug(TICKET.openLowTicketName, TICKET.openLowTicketDescription);
    });

    test('Добавление ОТКРЫТОГО бага СРЕДНЕГО приоритета', async ({ page }) => {
        const BPT = new BugTrackerPage(page);

        await BPT.addBug(
            TICKET.openMedTicketName,
            TICKET.openMedTicketDescription,
            TICKET.medPriority
        );
    });

    test('Добавление ОТКРЫТОГО бага ВЫСОКОГО приоритета', async ({ page }) => {
        const BPT = new BugTrackerPage(page);

        await BPT.addBug(
            TICKET.openHighTicketName,
            TICKET.openHighTicketDescription,
            TICKET.highPriority
        );
    });

    test('Проверка редактирования ОТКРЫТОГО бага НИЗКОГО приоритета', async ({ page }) => {
        const BPT = new BugTrackerPage(page);

        await BPT.editBug(
            TICKET.editTicketName,
            TICKET.editTicketDescription,
            TICKET.status,
            TICKET.lowPriority
        );
    });
});
