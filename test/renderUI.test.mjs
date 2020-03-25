import {
    toggleUIElement,
    deleteUITodo,
    addEventHandlerToAll,
    topSectionReactors,
    initUI,
    getCompletedStatus
} from '../src/renderUI.mjs';

import { DONE, NOT_DONE } from '../src/constants.mjs';
import { todoList } from '../src/todoList.mjs';

beforeEach(() => {
    todoList.todos = [
        { text: 'todo 1', completed: false },
        { text: 'todo 2', completed: true }
    ];
    initUI(todoList);
});

test('Check if completed', () => {
    expect(getCompletedStatus(todoList.todos[0])).toBe(NOT_DONE);
    expect(getCompletedStatus(todoList.todos[1])).toBe(DONE);
});

test('toggleUI component check use of API, for example ' +
      'that it calls getAttribute, for "item"' +
      'much of this is unneccessary because were are testing internal calls rather than funtion effects ' +
      'but it is an example of using injection of fake (aka MOCK) objects.', () => {
    const mockFnGetAttribute = jest.fn(() => 0);

    const fakeElement = { getAttribute: mockFnGetAttribute };
    const mockFnToggleCompleted = jest.fn();

    const fakeTodoList = {
        toggleCompleted: mockFnToggleCompleted
    };

    toggleUIElement(fakeElement, fakeTodoList);

    expect(mockFnGetAttribute).toBeCalled();
    expect(mockFnGetAttribute).toHaveBeenCalledWith('item');

    expect(mockFnToggleCompleted).toBeCalled();
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

test('Delete a todo from UI, delets from model.', () => {
    // ARRANGE:
    document.body.innerHTML =
    '<div>' +
        '<button item="0"></button>' +
    '</div>';
    const button = document.querySelector('button');
    const mockFnClickHandler = jest.fn((evt) => {
        deleteUITodo(evt.target, todoList);
    });
    button.addEventListener('click', mockFnClickHandler);

    // ACT:
    expect(todoList.todos.length).toBe(2);
    document.querySelector('button').click();

    // ASSERT:
    expect(mockFnClickHandler).toHaveBeenCalled();
    expect(todoList.todos.length).toBe(1);
});
