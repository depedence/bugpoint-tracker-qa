import { expect } from '@playwright/test';

export async function tapAddBtn(page) {
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.locator('.modal-content').nth(1)).toBeVisible();
}
