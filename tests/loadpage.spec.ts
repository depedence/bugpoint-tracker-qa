import { test, expect } from '@playwright/test';

test('Проверка загрузки страницы', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Bugpoint Tracker');
  await expect(page).toHaveURL('http://localhost:4000/');
  await expect(page.getByText('Bugpoint Tracker')).toBeVisible();
});
