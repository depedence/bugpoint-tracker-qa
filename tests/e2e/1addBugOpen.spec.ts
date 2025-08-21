import { test, expect } from '@playwright/test';
import { tapAddBtn } from '../helpers/func';

test.describe('Проверки на добавление бага в левую колонку', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('Добавление ОТКРЫТОГО бага НИЗКОГО приоритета', async ({ page }) => {
        await tapAddBtn(page);

        await page.locator('input[type="text"]').nth(1).fill('Открытый низкий');
        await page.getByRole('textbox', { name: 'Описание бага' }).fill('Открытый низкий описание');

        await page.getByRole('button', { name: 'Сохранить' }).click();

        await expect(page.getByRole('heading', { name: 'Открытый низкий' })).toBeVisible();
    });

    test('Добавление ОТКРЫТОГО бага СРЕДНЕГО приоритета', async ({ page }) => {
        await tapAddBtn(page);

        await page.locator('input[type="text"]').nth(1).fill('Открытый средний');
        await page
            .getByRole('textbox', { name: 'Описание бага' })
            .fill('Открытый средний описание');

        await page.locator('#priority').click();
        await page.locator('#priority').selectOption('medium');

        await page.getByRole('button', { name: 'Сохранить' }).click();

        await expect(page.getByRole('heading', { name: 'Открытый средний' })).toBeVisible();
    });

    test('Добавление ОТКРЫТОГО бага ВЫСОКОГО приоритета', async ({ page }) => {
        await tapAddBtn(page);

        await page.locator('input[type="text"]').nth(1).fill('Открытый высокий');
        await page
            .getByRole('textbox', { name: 'Описание бага' })
            .fill('Открытый высокий описание');

        await page.locator('#priority').click();
        await page.locator('#priority').selectOption('high');

        await page.getByRole('button', { name: 'Сохранить' }).click();

        await expect(page.getByRole('heading', { name: 'Открытый высокий' })).toBeVisible();
    });

    test('Проверка редактирования ОТКРЫТОГО бага НИЗКОГО приоритета', async ({ page }) => {
        const newName = 'Открытый низкий отредактированный';
        const newDescription = 'Открытый низкий описание отредактированное';

        await page.getByRole('button', { name: 'Редактировать' }).first().click();
        await expect(page.getByRole('heading', { name: 'Редактировать баг' })).toBeVisible();

        // ! Меняем данные тикета (название, описание, статус, приоритет) и сохраняем
        await page.getByRole('textbox', { name: 'Название бага' }).fill(newName);
        await page.getByRole('textbox', { name: 'Описание бага' }).fill(newDescription);
        await page.locator('#editStatus').click();
        await page.locator('#editStatus').selectOption('closed');
        await page.locator('#editPriority').click();
        await page.locator('#editPriority').selectOption('high');
        await page.getByRole('button', { name: 'Сохранить' }).click();
        await expect(page.getByText('Тикет обновлён')).toBeVisible();

        // ! Проверяем, что тикет обновился
        await expect(page.getByText(newName)).toBeVisible();
        await expect(page.getByText(newDescription)).toBeVisible();
    });
});
