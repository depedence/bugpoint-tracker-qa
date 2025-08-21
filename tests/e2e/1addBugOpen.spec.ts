import { test, expect } from '@playwright/test';
import { BugTrackerPage } from '../pages/bugTrackerPage';
import { TICKET } from '../fixtures/bugTrackerFixtures';

test.describe('Проверки на добавление бага в левую колонку', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('Добавление ОТКРЫТОГО бага НИЗКОГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.addBug(TICKET.openLowTicketName, TICKET.openLowTicketDescription);
    });

    test('Добавление ОТКРЫТОГО бага СРЕДНЕГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.addBug(
            TICKET.openMedTicketName,
            TICKET.openMedTicketDescription,
            TICKET.medPriority
        );
    });

    test('Добавление ОТКРЫТОГО бага ВЫСОКОГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.addBug(
            TICKET.openHighTicketName,
            TICKET.openHighTicketDescription,
            TICKET.highPriority
        );
    });

    test('Проверка редактирования ОТКРЫТОГО бага НИЗКОГО приоритета', async ({ page }) => {
        const BTP = new BugTrackerPage(page);

        await BTP.editBug(
            TICKET.editTicketName,
            TICKET.editTicketDescription,
            TICKET.statusClose,
            TICKET.lowPriority
        );
    });
});
