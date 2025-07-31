import { test, expect } from '@playwright/test';

async function tapAddBtn(page) {
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.locator('.modal-content').nth(1)).toBeVisible();
}

test.describe('Проверки на добавление бага в правую колонку', () => {});
