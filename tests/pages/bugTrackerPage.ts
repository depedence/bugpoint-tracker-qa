// ! Page Object Model для ui тестов на PW
import { Page, Locator, expect } from '@playwright/test';

export class BugTrackerPage {
    private page: Page;
    private addBtn: Locator;
    private nameInput: Locator;
    private descriptionInput: Locator;
    private saveBtn: Locator;
    private prioritySelect: Locator;
    private editBtn: Locator;
    private editStatusSelect: Locator;
    private editPrioritySelect: Locator;

    constructor(page: Page) {
        this.page = page;

        this.addBtn = page.getByRole('button', { name: '+' });
        this.nameInput = page.locator('input[type="text"]').nth(1);
        this.descriptionInput = page.getByRole('textbox', { name: 'Описание бага' });
        this.saveBtn = page.getByRole('button', { name: 'Сохранить' });
        this.prioritySelect = page.locator('#priority');
        this.editBtn = page.getByRole('button', { name: 'Редактировать' });
        this.editStatusSelect = page.locator('#editStatus');
        this.editPrioritySelect = page.locator('#editPriority');
    }

    async addBug(name: string, description: string, priority: string = 'low'): Promise<void> {
        await this.addBtn.click();
        await this.nameInput.fill(name);
        await this.descriptionInput.fill(description);

        if (priority !== 'low') {
            await this.prioritySelect.click();
            await this.prioritySelect.selectOption(priority);
        }

        await this.saveBtn.click();
        await expect(this.page.getByRole('heading', { name })).toBeVisible();
    }

    async editBug(
        newName: string,
        newDescription: string,
        status: string = 'closed',
        priority: string = 'high'
    ): Promise<void> {
        await this.editBtn.first().click({ timeout: 30000 });
        await expect(this.page.getByRole('heading', { name: 'Редактировать баг' })).toBeVisible();

        await this.page.getByRole('textbox', { name: 'Название бага' }).fill(newName);
        await this.descriptionInput.fill(newDescription);
        await this.editStatusSelect.click();
        await this.editStatusSelect.selectOption(status);
        await this.editPrioritySelect.click();
        await this.editPrioritySelect.selectOption(priority);
        await this.saveBtn.click();

        await expect(this.page.getByText('Тикет обновлён')).toBeVisible();
        await expect(this.page.getByText(newName)).toBeVisible();
        await expect(this.page.getByText(newDescription)).toBeVisible();
    }
}
