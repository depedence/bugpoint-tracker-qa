import {test, expect} from '@playwright/test'

test.describe('Проверка на загрузку страницы', () => {
    test('Проверка загрузки', async ({page}) => {
        await page.goto('/')
    })
})
