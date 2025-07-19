import { test, expect } from '@playwright/test';
import {TodoPage} from "../pages/TodoPage";

test.describe('TodoMVC Core Functionality', () => {

    // A test-level variable for our Page Object
    let todoPage: TodoPage;

    // `beforeEach` hook runs before each test in this describe block.
    // This is the perfect place to initialize page objects and navigate to the page.
    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.goto();
    });

    test('should allow me to add todo items', async () => {
        const todosToAdd = ['Feed the cat', 'Buy groceries'];
        await todoPage.createTodos(todosToAdd);
        await todoPage.verifyTodos(todosToAdd);
        await todoPage.expectTodoCount(2);
    });

    test('should allow me to clear the input field after adding a todo', async () => {
        await todoPage.createTodos(['A single todo']);
        await expect(todoPage.newTodoInput).toBeEmpty();
    });

    test('should allow me to complete a todo item', async () => {
        const todos = ['Do the laundry', 'Wash the dishes'];
        await todoPage.createTodos(todos);

        await todoPage.completeTodo('Do the laundry');

        await todoPage.expectTodoToBeCompleted('Do the laundry');
        await todoPage.expectTodoCount(1);
    });

    test('should allow me to delete a todo item', async () => {
        const todos = ['Read a book', 'Write some code', 'Go for a walk'];
        await todoPage.createTodos(todos);

        await todoPage.deleteTodo('Write some code');

        await todoPage.verifyTodos(['Read a book', 'Go for a walk']);
        await todoPage.expectTodoCount(2);
    });

    test('should allow me to edit a todo item', async () => {
        const todos = ['Learn Playwright'];
        await todoPage.createTodos(todos);

        await todoPage.editTodo('Learn Playwright', 'Learn Playwright and TypeScript');

        await todoPage.verifyTodos(['Learn Playwright and TypeScript']);
    });

    test('should persist todos between page reloads', async ({ page }) => {
        const todos = ['Make coffee'];
        await todoPage.createTodos(todos);

        await page.reload();

        await todoPage.verifyTodos(todos);
        await todoPage.expectTodoCount(1);
    });
});