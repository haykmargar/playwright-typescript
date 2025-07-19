import { type Locator, type Page, expect} from "@playwright/test";

export class TodoPage {
    readonly page: Page;
    readonly newTodoInput: Locator;
    readonly todoItems: Locator;
    readonly todoCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTodoInput = page.locator('.new-todo');
        this.todoItems = page.locator('.todo-list li');
        this.todoCount = page.locator('.todo-count');
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc');
    }

    async createTodos(todoTexts: string[]): Promise<void> {
        for (const text of todoTexts) {
            await this.newTodoInput.fill(text);
            await this.newTodoInput.press('Enter');
        }
    }

    async verifyTodos(expectedTexts: string[]): Promise<void> {
        await expect(this.todoItems).toHaveText(expectedTexts);
    }

    async expectTodoCount(expectedCount: number) {
        await expect(this.todoCount).toHaveText(`${expectedCount} item${expectedCount !== 1 ? 's' : ''} left`);
    }

    async completeTodo(todoText: string) {
        const todo = this.todoItems.filter({ hasText: todoText });
        await todo.locator('.toggle').check();
    }

    async expectTodoToBeCompleted(todoText: string) {
        const todo = this.todoItems.filter({ hasText: todoText });
        await expect(todo).toHaveClass('completed');
    }

    async deleteTodo(todoText: string) {
        const todo = this.todoItems.filter({ hasText: todoText });
        await todo.hover();
        await todo.locator('.destroy').click();
    }

    async editTodo(originalText: string, newText: string) {
        const todo = this.todoItems.filter({ hasText: originalText });
        await todo.dblclick();
        const editInput = todo.locator('input.edit');
        await editInput.fill(newText);
        await editInput.press('Enter');
    }
}
