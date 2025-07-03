import { test, expect } from '@playwright/test';

async function clickAdd(page) {
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.getByRole('heading', { name: 'Добавить баг' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Название бага' }).fill('Тестовый баг');
  await page.getByRole('textbox', { name: 'Описание бага' }).fill('Описание тестового бага');

  await expect(page.getByRole('button', { name: 'Сохранить' })).toBeVisible();
}

async function clickAdd2(page) {
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.getByRole('heading', { name: 'Добавить баг' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Сохранить' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Название бага' }).fill('Тестовый баг');
  await page.getByRole('textbox', { name: 'Описание бага' }).fill('Описание тестового бага');
  await page.locator('#status').selectOption('closed');
}

test.describe('Проверка на добавление бага в колонку "Открытые баги"', () => {
  test.beforeEach('Переход на необходимый URL', async ({ page }) => {
    console.log(`[${new Date().toISOString()}] Test started`);
    await page.goto('/');
    await clickAdd(page);
  });

  test('Создание открытого тикета с багом низкого приоритета', async ({ page }) => {
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(
      page.getByText('x Тестовый баг Описание тестового бага Приоритет: low 7/3/')
    ).toBeVisible();
  });

  test('Создание открытого тикета с багом среднего приоритета', async ({ page }) => {
    await page.locator('#priority').selectOption('medium');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(
      page.getByText('x Тестовый баг Описание тестового бага Приоритет: medium 7/3/')
    ).toBeVisible();
  });

  test('Создание открытого тикета с багом высокого приоритета', async ({ page }) => {
    await page.locator('#priority').selectOption('high');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(
      page.getByText('x Тестовый баг Описание тестового бага Приоритет: high 7/3/')
    ).toBeVisible();
  });
});

test.describe('Проверка на добавление бага в колонку "Закрытые баги"', () => {
  test.beforeEach('Переход на необходимый URL', async ({ page }) => {
    console.log(`[${new Date().toISOString()}] Test started`);
    await page.goto('/');
    await clickAdd2(page);
  });

  test('Создание закрытого тикета с багом низкого приоритета', async ({ page }) => {
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(
      page.getByText('x Тестовый баг Описание тестового бага Приоритет: low 7/3/')
    ).toBeVisible();
  });

  test('Создание закрытого тикета с багом среднего приоритета', async ({ page }) => {
    await page.locator('#priority').selectOption('medium');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(
      page.getByText('x Тестовый баг Описание тестового бага Приоритет: medium 7/3/')
    ).toBeVisible();
  });

  test('Создание закрытого тикета с багом высокого приоритета', async ({ page }) => {
    await page.locator('#priority').selectOption('high');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(
      page.getByText('x Тестовый баг Описание тестового бага Приоритет: high 7/3/')
    ).toBeVisible();
  });
});
