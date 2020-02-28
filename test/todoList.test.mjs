import * as TODO from '../src/todoList.mjs';

const TODO_LIST = TODO.todoList;

test('can add a todo', () => {
    const numTodos = TODO_LIST.todos.length;
    const result = TODO_LIST.add('Buy Coffee at Starbucks');

    // validate list has grown by 1
    expect(TODO_LIST.todos.length).toBe(numTodos + 1);

    // validate new object props
    expect(result).toEqual({ text: 'Buy Coffee at Starbucks', completed: false });

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

test('build message works', () => {
    // Lets test for empty
    TODO_LIST.todos = [];
    expect(TODO.buildMessage(TODO_LIST.todos)).toBe('You have no outstanding Todos!');

    TODO_LIST.add('todo 1');
    expect(TODO_LIST.todos.length).toBe(1);

    expect(TODO.buildMessage(TODO_LIST.todos)).toContain('todo 1');
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(expect.stringContaining(`${TODO.NOT_DONE} todo 1`));
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(`\n${TODO.NOT_DONE} todo 1`);

    TODO_LIST.toggleCompleted(0);
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(`\n${TODO.DONE} todo 1`);
    TODO_LIST.toggleCompleted(0);

    TODO_LIST.add('todo 2');
    expect(TODO_LIST.todos.length).toBe(2);

    expect(TODO.buildMessage(TODO_LIST.todos)).toContain(`${TODO.NOT_DONE} todo 2`);
    expect(TODO.buildMessage(TODO_LIST.todos)).toMatch(`${TODO.NOT_DONE} todo 2`);
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(expect.stringContaining(`${TODO.NOT_DONE} todo 2`));

    TODO_LIST.toggleCompleted(1);
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(expect.stringContaining(`\n${TODO.DONE} todo 2`));
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(expect.stringContaining(`\n${TODO.NOT_DONE} todo 1`));

    // Check that new items are PRE-Pended
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(`\n&#10003; todo 2\n${TODO.NOT_DONE} todo 1`);

    // Toggl both items
    TODO_LIST.toggleCompleted(0);
    TODO_LIST.toggleCompleted(1);
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(expect.stringContaining('\n&#10003; todo 1'));
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(expect.stringContaining(`\n${TODO.NOT_DONE} todo 2`));

    // crrect order
    expect(TODO.buildMessage(TODO_LIST.todos)).toEqual(`\n${TODO.NOT_DONE} todo 2\n&#10003; todo 1`);

    // Ok lets delete 2 items and verfy for empty
    TODO_LIST.delete(0);
    expect(TODO_LIST.todos.length).toBe(1);
    TODO_LIST.delete(0);
    expect(TODO_LIST.todos.length).toBe(0);
    expect(TODO.buildMessage(TODO_LIST.todos)).toBe('You have no outstanding Todos!');
});

test('Check competed', () => {
    // Lets test for empty
    TODO_LIST.todos = [
        { text: 'todo 1', completed: false },
        { text: 'todo 2', completed: true }
    ];

    expect(TODO.checkCompleted(TODO_LIST.todos[0])).toBe(TODO.NOT_DONE);
    expect(TODO.checkCompleted(TODO_LIST.todos[1])).toBe(TODO.DONE);
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
        TODO.addTodoClickHandler();
    });
    TODO.addClickEventHandlerToAll('button#btn-add-todo', mockFnClickHandler);

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
    TODO.addClickEventHandlerToAll('button#btn-toggle-all', mockFnClickHandler);

    // ACT
    document.getElementById('btn-toggle-all').click();

    // ASSERT
    expect(mockFnClickHandler).toHaveBeenCalled();
});
