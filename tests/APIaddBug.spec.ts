import { test, expect } from '@playwright/test';

let apiContext;

test.describe('API Проверка на добавление бага в колонку "Открытые баги', () => {
  test.beforeAll(async ({ playwright }) => {
    console.log(`[${new Date().toISOString()}] Test started`);
    apiContext = await playwright.request.newContext({
      baseURL: 'http://localhost:5000',
    });
  });

  test.afterAll(async ({ playwright }) => {
    await apiContext.dispose();
  });

  test('API Создание и удаление открытого тикета с багом низкого приоритета', async ({ page }) => {
    // Создание тикета путём отправки POST запроса
    const addBug1 = await apiContext.post('/api/bugs', {
      data: {
        title: 'API Тестовый баг',
        description: 'API Описание тестового бага',
        status: 'open',
        priority: 'low',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(addBug1.status()).toBe(201);

    // Проверка на то, что тикет появился в UI
    await page.goto('/');
    await expect(
      page.getByText('x API Тестовый баг API Описание тестового бага Приоритет: low 7/3/')
    ).toBeVisible();

    const body1 = await addBug1.json();
    const bugId1 = body1.id;

    // Удаление этого тикета путём отправки DELETE запроса
    const delBug1 = await apiContext.delete('/api/bugs', {
      data: {
        id: bugId1,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(delBug1.status()).toBe(200);

    // Проверка на то, что тикет пропал из UI
    await page.goto('/');
    await expect(
      page.getByText('x API Тестовый баг API Описание тестового бага Приоритет: low 7/3/')
    ).not.toBeVisible();
  });
});
