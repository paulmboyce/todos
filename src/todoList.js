'use strict';

/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
// const
const NOT_DONE = '&nbsp;.&nbsp;';
const DONE = '&#10003;';

// Context defence for testing outwith broswer.
// eslint-disable-next-line no-use-before-define
// eslint-disable-next-line block-scoped-var
// eslint-disable-next-line no-use-before-define
// eslint-disable-next-line block-scoped-var
if (typeof window === 'undefined') {
    // eslint-disable-next-line vars-on-top
    var window = {};
}

// eslint-disable-next-line block-scoped-var
window.myTodoApp = { todoList: [] };

const todoList = {
    // format: { text: 'todo 1', completed: false }, { text: 'todo 2', completed: false }]
    todos: [],
    display () {
        const message = buildMessage(this.todos);
        printTo('output', `My Todos:${message}`);
        // Do on mass because we create the elements on mass.
        // When code changes to append individual elements,
        // we would do this for that element only.
        renderTodosWithEventHandling(this);
    },
    add (todo) {
        if (typeof todo !== 'string') {
            return 'oops should be a string';
        }
        const newTodo = {
            text: todo,
            completed: false
        };

        this.todos.push(newTodo);
        this.display();
        return newTodo;
    },
    change (position, newText) {
        this.todos[position].text = newText;
        this.display();
    },
    delete (position) {
        this.todos.splice(position, 1);
        this.display();
    },
    toggleCompleted (position) {
        const todo = this.todos[position];
        todo.completed = !todo.completed;
        this.display();
    },
    toggleAllCompleted (done) {
        const numTodos = this.todos.length;
        for (let i = 0; i < numTodos; i += 1) {
            this.todos[i].completed = done;
        }
    },
    // Set ALL as COMPLETE (true), unless ALL are complete (so set as false)
    toggleAll () {
        let hasAnyIncomplete = false;
        const numTodos = this.todos.length;

        // If there is even one thats completed, mark ALL as complete.
        for (let i = 0; i < numTodos; i += 1) {
            if (this.todos[i].completed === false) {
                hasAnyIncomplete = true;
                break;
            }
        }
        // Otherwise mark all incomplete
        if (hasAnyIncomplete === true) {
            this.toggleAllCompleted(true);
        } else {
            this.toggleAllCompleted(false);
        }
        // Update UI.
        this.display();
    }

};

window.myTodoApp.todoList = todoList;

function renderTodosWithEventHandling (injectedTodoList) {
    const elements = buildElements(injectedTodoList.todos);
    if (window && window.document) {
        window.document.querySelector('div#id-todos').innerHTML = elements;
    }
    addClickEventHandlersToToggleButtons(injectedTodoList);
}

function buildMessage (todos) {
    let message = '';
    const numTodos = todos.length;

    if (numTodos < 1) {
        message = 'You have no outstanding Todos!';
        return message;
    }

    for (let i = 0; i < numTodos; i += 1) {
        message = `\n${checkCompleted(todos[i])} ${todos[i].text}${message}`;
    }
    return message;
}

function buildElements (todos) {
    const numTodos = todos.length;
    let html = '';
    for (let i = 0; i < numTodos; i += 1) {
        let element = `<div class='todo-container'><button type="button" item="${i}" class="btn btn-small btn-info toggle">${checkCompleted(todos[i])}</button>`;
        element += `<textarea class="todo" rows='1' cols='50' disabled readonly>${todos[i].text}</textarea>`;
        element += `<button item="${i}" class="delete btn btn-small btn-info" onclick='deleteUITodo(this);'> Delete [X]</button>`;
        element += '</div>';
        html = element + html; // prepend
    }
    return html;
}

function checkCompleted (todo) {
    let done = NOT_DONE;
    if (todo.completed === true) {
        done = DONE;
    }
    return done;
}

function toggleUIElement (el, injectedTodoList) {
    const position = el.getAttribute('item');
    injectedTodoList.toggleCompleted(position);
    injectedTodoList.display();
}

// This is called from dynamically HTML code.
// eslint-disable-next-line no-unused-vars
function deleteUITodo (el) {
    const position = el.getAttribute('item');
    todoList.delete(position);
}

function printTo (id, newText) {
    // Validate web context exists.
    if (window.document) {
        const target = window.document.querySelector(`#${id}`);
        target.innerHTML = newText;
    }
}

function addClickEventHandlersToToggleButtons () {
    if (document) {
        document.querySelectorAll('button.toggle')
            .forEach((element) => {
                element.addEventListener('click', function handleClickEvent () { toggleUIElement(this, window.myTodoApp.todoList); });
            });
    }
}

function addClickEventHandlerToAll (elementSelector, fnClickHandler) {
    if (document) {
        document.querySelectorAll(elementSelector)
            .forEach((element) => {
                element.addEventListener('click', fnClickHandler);
            });
    }
}

const addTodoClickHandler = function () {
    if (document) {
        const inputElement = document.querySelector('#inputTodo');
        if (inputElement) {
            window.myTodoApp.todoList.add(inputElement.value);
            inputElement.value = '';
            inputElement.focus();
        }
    }
};

var clickHandlers = [
    {
        selector: 'button#btn-add-todo',
        handler: addTodoClickHandler
    },
    {
        selector: 'button#btn-toggle-all',
        handler: () => { window.myTodoApp.todoList.toggleAll(); }
    },
    {
        selector: 'button.toggle',
        handler: () => { toggleUIElement(this, window.myTodoApp.todoList); }
    }
];

function registerClickHandlers () {
    clickHandlers.forEach((handler) => {
        addClickEventHandlerToAll(handler.selector, handler.handler);
    });
}

registerClickHandlers();

if (typeof module !== 'undefined') {
    module.exports = {
        todoList,
        buildMessage,
        checkCompleted,
        constants: { DONE, NOT_DONE },
        toggleUIElement,
        renderTodosWithEventHandling,
        fnAddTodoClickHandler: addTodoClickHandler,
        addClickEventHandlerToAll
    };
}