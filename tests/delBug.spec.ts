import { test, expect } from '@playwright/test';

test('Удаление только что созданных тикетов', async ({ page }) => {
  console.log(`[${new Date().toISOString()}] Test started`);
  await page.goto('/');
  await page.getByRole('button', { name: 'x' }).first().click();
  await page.getByRole('button', { name: 'Удалить' }).click();
  await page.getByRole('button', { name: 'x' }).first().click();
  await page.getByRole('button', { name: 'Удалить' }).click();
  await page.getByRole('button', { name: 'x' }).first().click();
  await page.getByRole('button', { name: 'Удалить' }).click();
  await page.getByRole('button', { name: 'x' }).first().click();
  await page.getByRole('button', { name: 'Удалить' }).click();
  await page.getByRole('button', { name: 'x' }).first().click();
  await page.getByRole('button', { name: 'Удалить' }).click();
  await page.getByRole('button', { name: 'x' }).first().click();
  await page.getByRole('button', { name: 'Удалить' }).click();
});
