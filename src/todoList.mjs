
import { DONE, NOT_DONE } from '../src/constants.mjs';
import { addToStorage, editInStorage, loadTodosFromLocalStorage } from '../src/localStorageDAL.mjs';

const todoList = {
    // format: { id: '<timestamp>', text: 'todo 1', completed: false }, { id: '<timestamp>', text: 'todo 2', completed: false }]
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
            id: Date.now(),
            text: todo,
            completed: false
        };

        this.todos.push(newTodo);
        addToStorage(newTodo.id, newTodo, ['text', 'completed']);
        this.display();
        return newTodo;
    },
    change (position, newText) {
        const todo = this.todos[position];
        todo.text = newText;
        editInStorage(todo);
        this.todos[position].text = newText;
        this.display();
    },
    delete (position) {
        const todo = this.todos[position];
        localStorage.removeItem(todo.id);
        this.todos.splice(position, 1);
        this.display();
    },
    toggleCompleted (position, done = undefined) {
        const todo = this.todos[position];
        if (typeof done !== 'undefined') {
            todo.completed = done;
        } else {
            todo.completed = !todo.completed;
        }
        editInStorage(todo);
        this.display();
    },
    toggleAllCompleted (done) {
        const numTodos = this.todos.length;
        for (let i = 0; i < numTodos; i += 1) {
            this.toggleCompleted(i, done);
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
    },
    editUITodo (el) {
        const position = el.getAttribute('item');
        console.log(`clicked ${el} ${position}`);

        const inputEdit = document.querySelector(`input.todo[item="${position}"]`);
        inputEdit.focus();
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
    registerTodoClickHandlers();
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
        element += `<input type="text" item="${i}" class="todo matrix-chalk-purple ${todos[i].completed ? 'complete' : ''}" size="50" value="${todos[i].text}"></input>`;
        element += `<button item="${i}" class="delete btn matrix-chalk-purple" >&nbsp;[X]&nbsp;</button>`;
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

const todoElementReactors = {
    toggleButtonClickHandler (evt) {
        toggleUIElement(evt.target, todoList);
    },
    deleteTodoClickHandler (evt) {
        todoList.deleteUITodo(evt.target);
    },
    editTodoClickHandler (evt) {
        todoList.editUITodo(evt.target);
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
    todoList.change(todoElement.getAttribute('item'), todoElement.value);
};

function exists (obj) {
    return (typeof obj !== 'undefined');
}

const topSectionReactors = {
    addTodoClickHandler () {
        if (exists(document)) {
            const inputElement = document.querySelector('#inputTodo');
            if (exists(inputElement)) {
                todoList.add(inputElement.value);
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
        todoList.toggleAll();
    },
    toggleTodoClickHandler (evt) {
        toggleUIElement(evt.target, todoList);
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

function addEventHandlerToAll (elementSelector, action, fnClickHandler) {
    if (document) {
        document.querySelectorAll(elementSelector)
            .forEach((element) => {
                element.addEventListener(action, fnClickHandler);
            });
    }
}

function registerMainClickHandlers () {
    topSectionActionHandlers.forEach((handler) => {
        addEventHandlerToAll(handler.selector, handler.action, handler.handler);
    });
}

function registerTodoClickHandlers () {
    todoElementActionHandlers.forEach((handler) => {
        addEventHandlerToAll(handler.selector, handler.action, handler.handler);
    });
}

if (document !== undefined) {
    document.addEventListener('DOMContentLoaded', (event) => {
        registerMainClickHandlers();
        initTodoList();
    });
}

function initTodoList () {
    todoList.todos = loadTodosFromLocalStorage();
    todoList.display();
}

export {
    todoList,
    buildMessage,
    checkCompleted,
    toggleUIElement,
    renderTodosWithEventHandling,
    topSectionReactors as uiReactors,
    addEventHandlerToAll
};

export { DONE, NOT_DONE } from '../src/constants.mjs';
