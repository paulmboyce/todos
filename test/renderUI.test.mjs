import {
    toggleUIElement,
    addEventHandlerToAll,
    topSectionReactors,
    initUI
} from '../src/renderUI.mjs';

import { todoList } from '../src/todoList.mjs';

beforeEach(() => {
    initUI(todoList);
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

    toggleUIElement(fakeElement, fakeTodoList);

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
        topSectionReactors.addTodoClickHandler();
    });
    addEventHandlerToAll('button#btn-add-todo', 'click', mockFnClickHandler);

    // ACT
    document.getElementById('inputTodo').value = 'XYZ';
    document.getElementById('btn-add-todo').click();

    // ASSERT
    expect(mockFnClickHandler).toHaveBeenCalled();
// >>>    expect(TODO_LIST.todos[TODO_LIST.todos.length - 1].text).toBe('XYZ');
});

test('toggle ALL ', () => {
    // ARRANGE
    const mockFnClickHandler = jest.fn(() => {
    });
    document.body.innerHTML = '<button type="button" id="btn-toggle-all"</button>';
    addEventHandlerToAll('button#btn-toggle-all', 'click', mockFnClickHandler);

    // ACT
    document.getElementById('btn-toggle-all').click();

    // ASSERT
    expect(mockFnClickHandler).toHaveBeenCalled();
});
