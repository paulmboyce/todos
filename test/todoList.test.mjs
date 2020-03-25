import * as TODO from '../src/todoList.mjs';

const todoList = TODO.todoList;

beforeEach(() => {
    TODO.initApp();
    todoList.add('There is one Todo created.', () => {});
});

afterEach(() => {
    localStorage.clear();
});

test('can add a todo', () => {
    // ARRANGE:
    const mockFnDisplay = jest.fn(() => {});
    const numTodos = todoList.todos.length;
    const result = todoList.add('Buy Coffee at Starbucks', mockFnDisplay);

    // validate list has grown by 1
    expect(todoList.todos.length).toBe(numTodos + 1);

    // validate new object props
    expect(result.text).toEqual('Buy Coffee at Starbucks');
    expect(result.completed).toEqual(false);

    // validate type is a stringContaining
    expect(todoList.add(99, null)).toBe('oops should be a string');
    expect(todoList.add({}, null)).toBe('oops should be a string');
    expect(todoList.add(true, null)).toBe('oops should be a string');
});

test('can change a todo', () => {
    // ARRANGE:
    const mockFnDisplay = jest.fn(() => {});

    // ACT:
    todoList.change(0, 'changed', mockFnDisplay);

    // ASSERT:
    expect(todoList.todos[0].text).toEqual('changed');
    expect(mockFnDisplay).toHaveBeenCalled();
});

test('can Delete a todo', () => {
    // ARRANGE:
    const mockRefreshDisplay = jest.fn(() => {});
    expect(todoList.todos.length).toEqual(1);
    todoList.delete(0, mockRefreshDisplay);
    expect(todoList.todos.length).toEqual(0);
});

test('cannot delete a non existent item', () => {
    // ARRANGE:
    const mockRefreshDisplay = jest.fn(() => {});
    expect(todoList.todos.length).toEqual(1);
    let success = todoList.delete(0, mockRefreshDisplay);
    expect(success).toEqual(1);
    expect(todoList.todos.length).toEqual(0);

    success = todoList.delete(0, mockRefreshDisplay);
    expect(success).toEqual(-1);
    expect(todoList.todos.length).toEqual(0);
});

test('all todos are not completed', () => {
    for (let index = 0; index < todoList.length; index += 1) {
        const todo = todoList[index];
        expect(todo.completed).toEqual(false);
    }
});

test('can toggle completed', () => {
    // ARRANGE:
    const mockFn = jest.fn(() => {});
    todoList.todos[0].completed = false;
    // ACT:
    todoList.toggleCompleted(0, true, mockFn);
    // ASSERT:
    expect(todoList.todos[0].completed).toBe(true);
    // ACT:
    todoList.toggleCompleted(0, null, mockFn);
    // ASSERT:
    expect(todoList.todos[0].completed).toBe(false);
});

test('toggle all as COMPLETE', () => {
    // ARRANGE:
    const mockFnDisplay = jest.fn();

    // ACT:
    todoList.toggleAllCompleted(true, mockFnDisplay);

    // ASSERT;
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toBe(true);
    }
    expect(mockFnDisplay).toHaveBeenCalled();
});

test('toggle all as NOT COMPLETE', () => {
    // ARRANGE:
    const mockFnDisplay = jest.fn(() => {});
    todoList.toggleAllCompleted(false, mockFnDisplay);
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toBe(false);
    }
    expect(mockFnDisplay).toHaveBeenCalled();
});


test('toggle if ALL are complete toggleAll sets ALL to INCOMPLETE', () => {
    // ARRANGE:
    const mockFnDisplay = jest.fn(() => {});

    // ACT:
    todoList.toggleAllCompleted(true, mockFnDisplay);
    // ASSERT:
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toEqual(true);
    }
    expect(mockFnDisplay).toHaveBeenCalledTimes(1);
    // ACT:
    todoList.toggleAll(mockFnDisplay);
    // ASSERT:Expect ALL to be false
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toEqual(false);
    }
    expect(mockFnDisplay).toHaveBeenCalledTimes(2);
});

test('Special Case: toggle all sets to FALSE if everything is true ', () => {
    // ARRANGE:
    const mockFnDisplay = jest.fn(() => {});
    todoList.toggleAllCompleted(true, mockFnDisplay); // Sets all true

    // ACT:
    todoList.toggleAll(mockFnDisplay);

    // ASSERT: Expect ALL to be true
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toEqual(false);
    }
    expect(mockFnDisplay).toHaveBeenCalledTimes(2);
    // if even one os false, all beecome true
    todoList.toggleAllCompleted(true, mockFnDisplay); // Sets all true again
    expect(mockFnDisplay).toHaveBeenCalledTimes(3);
    // Mark one as incmplete:
    todoList.todos[0].completed = false;

    // Toggle all shsoul go true.
    todoList.toggleAll(mockFnDisplay);
    expect(mockFnDisplay).toHaveBeenCalledTimes(4);
    // Expect ALL to be true
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toEqual(true);
    }
});
