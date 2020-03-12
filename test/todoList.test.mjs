import * as TODO from '../src/todoList.mjs';
import { DONE, NOT_DONE } from '../src/constants.mjs';

const TODO_LIST = TODO.todoList;

beforeEach(() => {
    TODO.initTodoList();
    TODO_LIST.add('There is one Todo created.');
});

afterEach(() => {
    localStorage.clear();
});

test('can add a todo', () => {
    const numTodos = TODO_LIST.todos.length;
    const result = TODO_LIST.add('Buy Coffee at Starbucks');

    // validate list has grown by 1
    expect(TODO_LIST.todos.length).toBe(numTodos + 1);

    // validate new object props
    expect(result.text).toEqual('Buy Coffee at Starbucks');
    expect(result.completed).toEqual(false);

    // validate type is a stringContaining
    expect(TODO_LIST.add(99)).toBe('oops should be a string');
    expect(TODO_LIST.add({})).toBe('oops should be a string');
    expect(TODO_LIST.add(true)).toBe('oops should be a string');
});

test('can change a todo', () => {
    TODO_LIST.change(0, 'changed');
    expect(TODO_LIST.todos[0].text).toEqual('changed');
});

test('all todos are not completed', () => {
    for (let index = 0; index < TODO_LIST.length; index += 1) {
        const todo = TODO_LIST[index];
        expect(todo.completed).toEqual(false);
    }
});

test('can toggle completed', () => {
    TODO_LIST.todos[0].completed = false;
    TODO_LIST.toggleCompleted(0);
    expect(TODO_LIST.todos[0].completed).toBe(true);
    TODO_LIST.toggleCompleted(0);
    expect(TODO_LIST.todos[0].completed).toBe(false);
});

test('Check competed', () => {
    // Lets test for empty
    TODO_LIST.todos = [
        { text: 'todo 1', completed: false },
        { text: 'todo 2', completed: true }
    ];

    expect(TODO.checkCompleted(TODO_LIST.todos[0])).toBe(NOT_DONE);
    expect(TODO.checkCompleted(TODO_LIST.todos[1])).toBe(DONE);
});

test('toggle all as COMPLETE', () => {
    TODO_LIST.toggleAllCompleted(true);
    for (let i = 0; i < TODO_LIST.todos.length; i += 1) {
        expect(TODO_LIST.todos[i].completed).toBe(true);
    }
});

test('toggle all as NOT COMPLETE', () => {
    TODO_LIST.toggleAllCompleted(false);
    for (let i = 0; i < TODO_LIST.todos.length; i += 1) {
        expect(TODO_LIST.todos[i].completed).toBe(false);
    }
});

test('toggle if ALL are complete toggleAll sets ALL to INCOMPLETE', () => {
    TODO_LIST.toggleAllCompleted(true);
    // Expect ALL to be true
    for (let i = 0; i < TODO_LIST.todos.length; i += 1) {
        expect(TODO_LIST.todos[i].completed).toEqual(true);
    }

    TODO_LIST.toggleAll();

    // Expect ALL to be false
    for (let i = 0; i < TODO_LIST.todos.length; i += 1) {
        expect(TODO_LIST.todos[i].completed).toEqual(false);
    }
});

test('Special Case: toggle all sets to FALSE if everything is true ', () => {
    TODO_LIST.toggleAllCompleted(true); // Sets all true

    // Toggle all shsoul go true.
    TODO_LIST.toggleAll();

    // Expect ALL to be true
    for (let i = 0; i < TODO_LIST.todos.length; i += 1) {
        expect(TODO_LIST.todos[i].completed).toEqual(false);
    }

    // if even one os false, all beecome true

    TODO_LIST.toggleAllCompleted(true); // Sets all true again
    // Mark one as incmplete:
    TODO_LIST.todos[0].completed = false;

    // Toggle all shsoul go true.
    TODO_LIST.toggleAll();
    // Expect ALL to be true
    for (let i = 0; i < TODO_LIST.todos.length; i += 1) {
        expect(TODO_LIST.todos[i].completed).toEqual(true);
    }
});

test(' >>>NEXT: It should remember the list on refresh ..!!', () => {
    console.log(' >>>\n----> NEXT: It should remember the list on refresh ..!!\n<<<');
});
