import { test, expect } from '@playwright/test';
import { tapAddBtn } from './helpers/func';

test.describe('Проверки на добавление бага в правую колонку', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Добавление ЗАКРЫТОГО бага НИЗКОГО приоритета', async ({ page }) => {
        await tapAddBtn(page);

        await page.locator('input[type="text"]').nth(1).fill('Закрытый низкий');
        await page.getByRole('textbox', { name: 'Описание бага' }).fill('Закрытый низкий описание');

        // ! Выставляем тикету статус closed
        await page.locator('#status').click();
        await page.locator('#status').selectOption('closed');

        await page.getByRole('button', { name: 'Сохранить' }).click();

        await expect(page.getByText('Закрытый низкий').first()).toBeVisible();
    });

    test('Добавление ЗАКРЫТОГО бага СРЕДНЕГО приоритета', async ({ page }) => {
        await tapAddBtn(page);

        await page.locator('input[type="text"]').nth(1).fill('Закрытый средний');
        await page
            .getByRole('textbox', { name: 'Описание бага' })
            .fill('Закрытый средний описание');

        await page.locator('#status').click();
        await page.locator('#status').selectOption('closed');

        await page.locator('#priority').click();
        await page.locator('#priority').selectOption('medium');

        await page.getByRole('button', { name: 'Сохранить' }).click();

        await expect(page.getByText('Закрытый средний').first()).toBeVisible();
    });

    test('Добавление ЗАКРЫТОГО бага ВЫСОКОГО приоритета', async ({ page }) => {
        await tapAddBtn(page);

        await page.locator('input[type="text"]').nth(1).fill('Закрытый высокий');
        await page
            .getByRole('textbox', { name: 'Описание бага' })
            .fill('Закрытый высокий описание');

        await page.locator('#status').click();
        await page.locator('#status').selectOption('closed');

        await page.locator('#priority').click();
        await page.locator('#priority').selectOption('high');

        await page.getByRole('button', { name: 'Сохранить' }).click();

        await expect(page.getByText('Закрытый высокий').first()).toBeVisible();
    });
});
