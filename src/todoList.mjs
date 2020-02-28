
import { DONE, NOT_DONE } from '../src/constants.mjs';

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
    },
    deleteUITodo (el) {
        const position = el.getAttribute('item');
        todoList.delete(position);
    }

};

function renderTodosWithEventHandling (injectedTodoList) {
    const elements = buildTodoRows(injectedTodoList.todos);
    if (document) {
        const target = document.querySelector('div#id-todos');
        if (target) {
            target.innerHTML = elements;
        }
    }
    addClickEventHandlersToToggleButtons(injectedTodoList);
    addClickEventHandlersToDeleteButtons(injectedTodoList);
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

function buildTodoRows (todos) {
    const numTodos = todos.length;
    let html = '';
    for (let i = 0; i < numTodos; i += 1) {
        let element = `<div><button type="button" item="${i}" class="btn matrix-chalk-purple toggle">${checkCompleted(todos[i])}</button>`;
        element += `<span class="todo matrix-chalk-purple" rows='1' cols='50' disabled readonly>${todos[i].text}</span>`;
        element += `<button item="${i}" class="delete btn matrix-chalk-purple" > Delete [X]</button>`;
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

function printTo (id, newText) {
    // Validate web context exists.
    if (document) {
        const target = document.querySelector(`#${id}`);
        if (target) {
            target.innerHTML = newText;
        }
    }
}

function addClickEventHandlersToToggleButtons () {
    if (document) {
        document.querySelectorAll('button.toggle')
            .forEach((element) => {
                element.addEventListener('click', function handleClickEvent () { toggleUIElement(this, todoList); });
            });
    }
}

function addClickEventHandlersToDeleteButtons () {
    if (document) {
        document.querySelectorAll('button.delete')
            .forEach((element) => {
                element.addEventListener('click', function handleClickEvent () { todoList.deleteUITodo(this); });
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
            todoList.add(inputElement.value);
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
        handler: () => { todoList.toggleAll(); }
    },
    {
        selector: 'button.toggle',
        handler: () => { toggleUIElement(this, todoList); }
    }
];

function registerClickHandlers () {
    clickHandlers.forEach((handler) => {
        addClickEventHandlerToAll(handler.selector, handler.handler);
    });
}

if (document !== undefined) {
    document.addEventListener('DOMContentLoaded', (event) => {
        registerClickHandlers();
    });
}

export {
    todoList,
    buildMessage,
    checkCompleted,
    toggleUIElement,
    renderTodosWithEventHandling,
    addTodoClickHandler,
    addClickEventHandlerToAll
};

export { DONE, NOT_DONE } from '../src/constants.mjs';
