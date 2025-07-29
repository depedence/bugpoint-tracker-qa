import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

async function tapAddBtn(page) {
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.locator('.modal-content').nth(1)).toBeVisible();
}

test.describe('Проверки на добавление бага @addBug', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Добавление ОТКРЫТОГО бага НИЗКОГО приоритета', async ({ page }) => {
    await tapAddBtn(page);

    await page.locator('input[type="text"]').nth(1).fill('Открытый низкий');
    await page.getByRole('textbox', { name: 'Описание бага' }).fill('Открытый низкий описание');

    await page.getByRole('button', { name: 'Сохранить' }).click();

    await expect(page.getByRole('heading', { name: 'Открытый низкий' })).toBeVisible();
    console.log('! Открытый баг низкого приоритета успешно создан !');
  });

  test('Добавление ОТКРЫТОГО бага СРЕДНЕГО приоритета', async ({ page }) => {
    await tapAddBtn(page);

    await page.locator('input[type="text"]').nth(1).fill('Открытый средний');
    await page.getByRole('textbox', { name: 'Описание бага' }).fill('Открытый средний описание');

    await page.locator('#priority').click();
    await page.locator('#priority').selectOption('medium');

    await page.getByRole('button', { name: 'Сохранить' }).click();

    await expect(page.getByRole('heading', { name: 'Открытый средний' })).toBeVisible();
    console.log('! Открытый баг среднего приоритета успешно создан !');
  });

  test('Добавление ОТКРЫТОГО бага ВЫСОКОГО приоритета', async ({ page }) => {
    await tapAddBtn(page);

    await page.locator('input[type="text"]').nth(1).fill('Открытый высокий');
    await page.getByRole('textbox', { name: 'Описание бага' }).fill('Открытый высокий описание');

    await page.locator('#priority').click();
    await page.locator('#priority').selectOption('high');

    await page.getByRole('button', { name: 'Сохранить' }).click();

    await expect(page.getByRole('heading', { name: 'Открытый высокий' })).toBeVisible();
    console.log('! Открытый баг высокого приоритета успешно создан !');
  });
});
