import { test, expect } from '@playwright/test';

test.describe('Удаление созданных тикетов', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('Удаление первого тикета СРЕДНЕГО приоритета', async ({ page }) => {
        const ticket1 = page.getByText('x Редактировать Закрытый низкий Закрытый низкий');

        // ! Удаление первого тикета СРЕДНЕГО приоритета
        await expect(ticket1).toBeVisible();
        await page.getByRole('button', { name: 'x' }).first().click();
        await expect(page.getByRole('heading', { name: 'Удалить тикет?' })).toBeVisible();
        await page.getByRole('button', { name: 'Удалить' }).click();
        await expect(page.getByText('Тикет успешно удалён')).toBeVisible();
        await expect(ticket1).not.toBeVisible();
    });

    test('Удаление второго тикета ВЫСОКОГО приоритета', async ({ page }) => {
        const ticket2 = page.getByText('x Редактировать Закрытый средний Закрытый средний');

        await expect(ticket2).toBeVisible();
        await page.getByRole('button', { name: 'x' }).first().click();
        await expect(page.getByRole('heading', { name: 'Удалить тикет?' })).toBeVisible();
        await page.getByRole('button', { name: 'Удалить' }).click();
        await expect(page.getByText('Тикет успешно удалён')).toBeVisible();
        await expect(ticket2).not.toBeVisible();
    });

    test('Удаление отредактированного тикета из правой колонки', async ({ page }) => {
        const ticket3 = page.getByText('x Редактировать Закрытый высокий Закрытый высокий');

        await expect(ticket3).toBeVisible();
        await page.getByRole('button', { name: 'x' }).first().click();
        await expect(page.getByRole('heading', { name: 'Удалить тикет?' })).toBeVisible();
        await page.getByRole('button', { name: 'Удалить' }).click();
        await expect(page.getByText('Тикет успешно удалён')).toBeVisible();
        await expect(ticket3).not.toBeVisible();
    });
});
