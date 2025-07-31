import { test, expect } from '@playwright/test';

test.describe('Удаление созданных тикетов', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Удаление тикетов с колонки ОТКРЫТЫЕ БАГИ', async ({ page }) => {
    // ! Завернём тикеты в константы для удобства
    const ticket1 = await page.getByText(
      'x Редактировать Открытый средний Открытый средний описание Приоритет: medium'
    );
    const ticket2 = await page.getByText(
      'x Редактировать Открытый высокий Открытый высокий описание Приоритет: high'
    );
    const ticket3 = await page.getByText('x Редактировать Открытый низкий отредактированный');

    // ! Удаление первого тикета СРЕДНЕГО приоритета
    expect(ticket1).toBeVisible();
    await page.getByRole('button', { name: 'x' }).first().click();
    await expect(page.getByRole('heading', { name: 'Удалить тикет?' })).toBeVisible();
    await page.getByRole('button', { name: 'Удалить' }).click();
    await expect(page.getByText('Тикет успешно удалён')).toBeVisible();
    expect(ticket1).not.toBeVisible();

    // ! Удаление второго тикета ВЫСОКОГО приоритета
    expect(ticket2).toBeVisible();
    await page.getByRole('button', { name: 'x' }).first().click();
    await expect(page.getByRole('heading', { name: 'Удалить тикет?' })).toBeVisible();
    await page.getByRole('button', { name: 'Удалить' }).click();
    await expect(page.getByText('Тикет успешно удалён')).toBeVisible();
    expect(ticket2).not.toBeVisible();

    // ! Удаление отредактированного тикета из правой колонки
    expect(ticket3).toBeVisible();
    await page.getByRole('button', { name: 'x' }).first().click();
    await expect(page.getByRole('heading', { name: 'Удалить тикет?' })).toBeVisible();
    await page.getByRole('button', { name: 'Удалить' }).click();
    await expect(page.getByText('Тикет успешно удалён')).toBeVisible();
    expect(ticket3).not.toBeVisible();
  });
});
