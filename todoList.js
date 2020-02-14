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
  todos: [], // format: { text: 'todo 1', completed: false }, { text: 'todo 2', completed: false }]

  display() {
    const message = buildMessage(this.todos);
    printTo('output', `My Todos:${message}`);
    // Do on mass because we create the elements on mass.
    // When code changes to append individual elements,
    // we would do this for that element only.
    renderTodosWithEventHandling(this);
  },
  add(todo) {
    if (typeof todo !== 'string') {
      return 'oops should be a string';
    }
    const newTodo = {
      text: todo,
      completed: false,
    };

    this.todos.push(newTodo);
    this.display();
    return newTodo;
  },
  change(position, newText) {
    this.todos[position].text = newText;
    this.display();
  },
  delete(position) {
    this.todos.splice(position, 1);
    this.display();
  },
  toggleCompleted(position) {
    const todo = this.todos[position];
    todo.completed = !todo.completed;
    this.display();
  },
  toggleAllCompleted(done) {
    const numTodos = this.todos.length;
    for (let i = 0; i < numTodos; i += 1) {
      this.todos[i].completed = done;
    }
  },
  // Set ALL as COMPLETE (true), unless ALL are complete (so set as false)
  toggleAll() {
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

};

window.myTodoApp.todoList = todoList;

function renderTodosWithEventHandling(injectedTodoList) {
  const elements = buildElements(injectedTodoList.todos);
  if (window && window.document) {
    window.document.querySelector('div#id-todos').innerHTML = elements;
  }
  addClickEventHandlersToToggleButtons(injectedTodoList);
}

function buildMessage(todos) {
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

function buildElements(todos) {
  const numTodos = todos.length;
  let html = '';
  for (let i = 0; i < numTodos; i += 1) {
    let element = `<button type="button" item="${i}" class="btn btn-small btn-info toggle">${checkCompleted(todos[i])}</button>`;
    element += `<span>${todos[i].text}</span>`;
    element += `<span item="${i}" class="delete" onclick='deleteUITodo(this);'> X</span>`;
    element += '<br/>';
    html = element + html; // prepend
  }
  return html;
}

function checkCompleted(todo) {
  let done = NOT_DONE;
  if (todo.completed === true) {
    done = DONE;
  }
  return done;
}

function toggleUIElement(el, injectedTodoList) {
  const position = el.getAttribute('item');
  injectedTodoList.toggleCompleted(position);
  injectedTodoList.display();
}

// This is called from dynamically HTML code.
// eslint-disable-next-line no-unused-vars
function deleteUITodo(el) {
  const position = el.getAttribute('item');
  todoList.delete(position);
}

function printTo(id, newText) {
  // Validate web context exists.Else default to console
  if (window.document) {
    const target = window.document.querySelector(`#${id}`);
    target.innerHTML = newText;
  }
}

function addClickEventHandlersToToggleButtons(injectedTodoList) {
  if (document) {
    document.querySelectorAll('button.toggle')
      .forEach((element) => {
        element.addEventListener('click', function handleClickEvent() { toggleUIElement(this, injectedTodoList); });
      });
  }
}

// Three functions together to setup click handlug in a testable mnner.

function addClickEventHandler(elementSelector, fnClickHandler) {
  if (document) {
    const btnAddTodo = document.querySelector(elementSelector);
    if (btnAddTodo) {
      btnAddTodo.addEventListener('click', fnClickHandler);
    }
  }
}
function fnAddTodoClickHandler(injectedTodoList) {
  return () => {
    injectedTodoList.add(document.querySelector('#inputTodo').value);
  };
}
// Important: Function Passed including the arguments here.
addClickEventHandler('button#btn-add-todo', fnAddTodoClickHandler(window.myTodoApp.todoList));


if (typeof module !== 'undefined') {
  module.exports = {
    todoList,
    buildMessage,
    checkCompleted,
    constants: { DONE, NOT_DONE },
    toggleUIElement,
    renderTodosWithEventHandling,
    addClickEventHandler,
  };
}
