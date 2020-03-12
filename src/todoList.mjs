import { addToStorage, editInStorage, loadTodosFromLocalStorage } from '../src/localStorageDAL.mjs';
import {
    renderTodosWithEventHandling,
    initUI,
    registerMainClickHandlers,
    checkCompleted
} from '../src/renderUI.mjs';

const todoList = {
    // format: { id: '<timestamp>', text: 'todo 1', completed: false }, { id: '<timestamp>', text: 'todo 2', completed: false }]
    todos: [],
    display () {
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

if (document !== undefined) {
    document.addEventListener('DOMContentLoaded', (event) => {
        registerMainClickHandlers();
        initTodoList();
    });
}

function initTodoList () {
    todoList.todos = loadTodosFromLocalStorage();
    initUI(todoList);
    todoList.display();
}

export {
    initTodoList,
    todoList,
    checkCompleted,
    renderTodosWithEventHandling
};
