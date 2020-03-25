import {
    addToStorage,
    editInStorage,
    loadTodosFromLocalStorage
} from '../src/localStorageDAL.mjs';

import {
    initUI
} from '../src/renderUI.mjs';

const SUCCESS = 1;
const FAIL = -1;

const todoList = {
    // format: { id: '<timestamp>', text: 'todo 1', completed: false }, { id: '<timestamp>', text: 'todo 2', completed: false }]
    todos: [],
    add (todo, callback) {
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
        callback();
        return newTodo;
    },
    change (position, newText, callback) {
        const todo = this.todos[position];
        todo.text = newText;
        editInStorage(todo);
        this.todos[position].text = newText;
        callback();
    },
    delete (position, callback) {
        if (typeof this.todos[position] === 'undefined') {
            return FAIL;
        }
        const todo = this.todos[position];
        localStorage.removeItem(todo.id);
        this.todos.splice(position, 1);
        callback();
        return SUCCESS;
    },
    toggleCompleted (position, done = undefined, callback = () => {}) {
        const todo = this.todos[position];
        if (done != null) {
            todo.completed = !!done; // force to boolean, in case a number s passed
        } else {
            todo.completed = !todo.completed;
        }
        editInStorage(todo);
        callback();
    },
    toggleAllCompleted (done, callback = () => {}) {
        const numTodos = this.todos.length;
        for (let i = 0; i < numTodos; i += 1) {
            this.toggleCompleted(i, done);
        }
        callback();
    },
    // Set ALL as COMPLETE (true), unless ALL are complete (so set as false)
    toggleAll (callback) {
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
        callback();
    }
};

if (document !== undefined) {
    document.addEventListener('DOMContentLoaded', (event) => {
        initApp();
    });
}

function initApp () {
    todoList.todos = loadTodosFromLocalStorage();
    initUI(todoList);
}

export {
    initApp,
    todoList
};
