import * as TODO from '../src/todoList.mjs';
import { DONE, NOT_DONE } from '../src/constants.mjs';

const TODO_LIST = TODO.todoList;
// const TODO_REACTORS = TODO.uiReactors;

beforeEach(() => {
    localStorage.clear();
    TODO.initTodoList();
    TODO_LIST.add('There is one Todo created.');
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
/*
test('toggleUI component check use of API, for example ' +
      'that it calls getAttribute, for "item"' +
      'much of this is unneccessary because were are testing internal calls rather than funtion effects ' +
      'but it is an example of using injection of fake (aka MOCK) objects.', () => {
    const mockFnGetAttribute = jest.fn(() => 0);

    const fakeElement = { getAttribute: mockFnGetAttribute };
    const mockFnToggleCompleted = jest.fn();

    const mockFnDisplay = jest.fn();
    const fakeTodoList = {
        toggleCompleted: mockFnToggleCompleted,
        display: mockFnDisplay
    };

Should remove this test??
Or should we pass thru to rendrUI?

    TODO.toggleUIElement(fakeElement, fakeTodoList);

    expect(mockFnGetAttribute).toBeCalled();
    expect(mockFnGetAttribute).toHaveBeenCalledWith('item');

    expect(mockFnToggleCompleted).toBeCalled();
    expect(mockFnToggleCompleted).toHaveBeenCalledWith(0);

    expect(mockFnDisplay).toBeCalled();
});

test('Check click event for ADD TODO button', () => {
    // ARRANGE
    window.document.body.innerHTML = '<button type="button" class="btn btn-warning" id="btn-add-todo">ADD</button>' +
   '<input type="text" id="inputTodo"/>';

    const mockFnClickHandler = jest.fn(() => {
        TODO_REACTORS.addTodoClickHandler();
    });
    TODO.addEventHandlerToAll('button#btn-add-todo', 'click', mockFnClickHandler);

    // ACT
    document.getElementById('inputTodo').value = 'XYZ';
    document.getElementById('btn-add-todo').click();

    // ASSERT
    expect(mockFnClickHandler).toHaveBeenCalled();
    expect(TODO_LIST.todos[TODO_LIST.todos.length - 1].text).toBe('XYZ');
});

test('toggle ALL ', () => {
    // ARRANGE
    const mockFnClickHandler = jest.fn(() => {
        TODO_LIST.toggleAll();
    });
    document.body.innerHTML = '<button type="button" id="btn-toggle-all"</button>';
    TODO.addEventHandlerToAll('button#btn-toggle-all', 'click', mockFnClickHandler);

    // ACT
    document.getElementById('btn-toggle-all').click();

    // ASSERT
    expect(mockFnClickHandler).toHaveBeenCalled();
});
*/
test(' >>>NEXT: It should remember the list on refresh ..!!', () => {
    console.log(' >>>\n----> NEXT: It should remember the list on refresh ..!!\n<<<');
});
