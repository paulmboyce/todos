import { DONE, NOT_DONE } from '../src/constants.mjs';

var model = {};

function initUI (dataModel) {
    model = dataModel;
    registerMainClickHandlers();
}

const todoElementReactors = {
    toggleButtonClickHandler (evt) {
        toggleUIElement(evt.target, model);
    },
    deleteTodoClickHandler (evt) {
        model.deleteUITodo(evt.target);
    },
    editTodoClickHandler (evt) {
        model.editUITodo(evt.target);
    },
    saveTodoClickHandler (evt) {
        if (evt.key === 'Enter') {
            saveEditedTodo(evt.target);
        }
    }
};

const todoElementActionHandlers = [
    {
        selector: 'button.toggle',
        action: 'click',
        handler: todoElementReactors.toggleButtonClickHandler
    },
    {
        selector: 'button.delete',
        action: 'click',
        handler: todoElementReactors.deleteTodoClickHandler
    },
    {
        selector: 'input.todo',
        action: 'click',
        handler: todoElementReactors.editTodoClickHandler
    },
    {
        selector: 'input.todo[item]',
        action: 'keypress',
        handler: todoElementReactors.saveTodoClickHandler
    }
];

const saveEditedTodo = function (todoElement) {
    model.change(todoElement.getAttribute('item'), todoElement.value);
};

function toggleUIElement (el, injectedTodoList) {
    const position = el.getAttribute('item');
    injectedTodoList.toggleCompleted(position);
    injectedTodoList.display();
}

function renderTodosWithEventHandling (model) {
    const elements = buildTodoRows(model.todos);
    if (document) {
        const target = document.querySelector('div#id-todos');
        if (target) {
            target.innerHTML = elements;
        }
    }
    registerTodoClickHandlers();
}

function buildTodoRows (todos) {
    const numTodos = todos.length;
    let html = '';
    for (let i = 0; i < numTodos; i += 1) {
        let element = `<div><button type="button" item="${i}" class="btn matrix-chalk-purple toggle">${getCompletedStatus(todos[i])}</button>`;
        element += `<input type="text" item="${i}" class="todo matrix-chalk-purple ${todos[i].completed ? 'complete' : ''}" size="50" value="${todos[i].text}"></input>`;
        element += `<button item="${i}" class="delete btn matrix-chalk-purple" >&nbsp;[X]&nbsp;</button>`;
        element += '</div>';
        html = element + html; // prepend
    }
    return html;
}

function getCompletedStatus (todo) {
    let done = NOT_DONE;
    if (todo.completed === true) {
        done = DONE;
    }
    return done;
}

function registerTodoClickHandlers () {
    todoElementActionHandlers.forEach((handler) => {
        addEventHandlerToAll(handler.selector, handler.action, handler.handler);
    });
}

function addEventHandlerToAll (elementSelector, action, fnClickHandler) {
    if (document) {
        document.querySelectorAll(elementSelector)
            .forEach((element) => {
                element.addEventListener(action, fnClickHandler);
            });
    }
}

const topSectionReactors = {
    addTodoClickHandler () {
        if (exists(document)) {
            const inputElement = document.querySelector('#inputTodo');
            if (exists(inputElement)) {
                model.add(inputElement.value);
                inputElement.value = '';
                inputElement.focus();
            }
        }
    },
    addTodoKeypressHandler (evt) {
        if (evt.key === 'Enter') {
            topSectionReactors.addTodoClickHandler();
        }
    },
    toggleAllClickHandler () {
        model.toggleAll();
    },
    toggleTodoClickHandler (evt) {
        toggleUIElement(evt.target, model);
    }
};

const topSectionActionHandlers = [
    {
        selector: 'button#btn-add-todo',
        action: 'click',
        handler: topSectionReactors.addTodoClickHandler
    },
    {
        selector: 'input#inputTodo',
        action: 'keypress',
        handler: topSectionReactors.addTodoKeypressHandler
    },
    {
        selector: 'button#btn-toggle-all',
        action: 'click',
        handler: topSectionReactors.toggleAllClickHandler
    },
    {
        selector: 'button.toggle',
        action: 'click',
        handler: topSectionReactors.toggleTodoClickHandler
    }
];

function exists (obj) {
    return (typeof obj !== 'undefined');
}

function registerMainClickHandlers () {
    topSectionActionHandlers.forEach((handler) => {
        addEventHandlerToAll(handler.selector, handler.action, handler.handler);
    });
}

export {
    initUI,
    renderTodosWithEventHandling,
    registerMainClickHandlers,
    topSectionReactors,
    getCompletedStatus,
    addEventHandlerToAll,
    toggleUIElement
};
