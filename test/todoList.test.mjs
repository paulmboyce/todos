import * as TODO from '../src/todoList.mjs';

const todoList = TODO.todoList;

beforeEach(() => {
    TODO.initApp();
    todoList.add('There is one Todo created.');
});

afterEach(() => {
    localStorage.clear();
});

test('can add a todo', () => {
    const numTodos = todoList.todos.length;
    const result = todoList.add('Buy Coffee at Starbucks');

    // validate list has grown by 1
    expect(todoList.todos.length).toBe(numTodos + 1);

    // validate new object props
    expect(result.text).toEqual('Buy Coffee at Starbucks');
    expect(result.completed).toEqual(false);

    // validate type is a stringContaining
    expect(todoList.add(99)).toBe('oops should be a string');
    expect(todoList.add({})).toBe('oops should be a string');
    expect(todoList.add(true)).toBe('oops should be a string');
});

test('can change a todo', () => {
    todoList.change(0, 'changed');
    expect(todoList.todos[0].text).toEqual('changed');
});

test('can Delete a todo', () => {
    expect(todoList.todos.length).toEqual(1);
    todoList.delete(0);
    expect(todoList.todos.length).toEqual(0);
});

test('cannot delete a non existent item', () => {
    expect(todoList.todos.length).toEqual(1);
    let success = todoList.delete(0);
    expect(success).toEqual(1);
    expect(todoList.todos.length).toEqual(0);

    success = todoList.delete(0);
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
    todoList.todos[0].completed = false;
    todoList.toggleCompleted(0);
    expect(todoList.todos[0].completed).toBe(true);
    todoList.toggleCompleted(0);
    expect(todoList.todos[0].completed).toBe(false);
});

test('toggle all as COMPLETE', () => {
    todoList.toggleAllCompleted(true);
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toBe(true);
    }
});

test('toggle all as NOT COMPLETE', () => {
    todoList.toggleAllCompleted(false);
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toBe(false);
    }
});

test('toggle if ALL are complete toggleAll sets ALL to INCOMPLETE', () => {
    todoList.toggleAllCompleted(true);
    // Expect ALL to be true
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toEqual(true);
    }

    todoList.toggleAll();

    // Expect ALL to be false
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toEqual(false);
    }
});

test('Special Case: toggle all sets to FALSE if everything is true ', () => {
    todoList.toggleAllCompleted(true); // Sets all true

    // Toggle all shsoul go true.
    todoList.toggleAll();

    // Expect ALL to be true
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toEqual(false);
    }

    // if even one os false, all beecome true

    todoList.toggleAllCompleted(true); // Sets all true again
    // Mark one as incmplete:
    todoList.todos[0].completed = false;

    // Toggle all shsoul go true.
    todoList.toggleAll();
    // Expect ALL to be true
    for (let i = 0; i < todoList.todos.length; i += 1) {
        expect(todoList.todos[i].completed).toEqual(true);
    }
});
