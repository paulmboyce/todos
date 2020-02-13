// const
const NOT_DONE = '&nbsp;.&nbsp;';
const DONE = '&#10003;';


// Context defence for testing outwith broswer.
if (typeof window === "undefined") { 
  var window = {};
}

window._app = {todoList: []};

var todoList = {
  todos: [{text:'todo 1', completed:false},{text:'todo 2', completed:false}],
  
  display: function() {
    var message = buildMessage(this.todos);
    printTo('output', 'My Todos:' + message); 
    // Do on mass because we create the elements on mass. 
    // When code changes to append individual elements, 
    // we would do this for that element only. 
    renderTodosWithEventHandling(this); 
  }, 
  add: function (todo) {
  
    if (typeof todo != 'string') {
      return ('oops should be a string');
    }
     var newTodo = {
      text:todo, 
      completed:false
    };

    this.todos.push (newTodo);
    this.display();
    return  newTodo;
  },
  change: function(position, newText) {
    this.todos[position].text = newText;
    this.display();
  },
  delete: function(position) {
    this.todos.splice(position,1);
    this.display();

  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.display();
  },
  toggleAllCompleted: function(done) {
    var numTodos = this.todos.length;
    for (var i = 0; i < numTodos; i++) {
      this.todos[i].completed = done;
    }
  },
  // Set ALL as COMPLETE (true), unless ALL are complete (so set as false)
  toggleAll: function() {

    var hasAnyIncomplete = false;  
    var numTodos = this.todos.length;

    // If there is even one thats completed, mark ALL as complete.
    for (var i = 0; i < numTodos; i++) {
      if (this.todos[i].completed === false) {
        hasAnyIncomplete = true;
        break;
      }
    }
    // Otherwise mark all incomplete
    if (hasAnyIncomplete === true) {
      this.toggleAllCompleted(true);
    } 
    else {
      this.toggleAllCompleted(false);
    }
    // Update UI.
    this.display();
  }

}
window._app.todoList = todoList;

function renderTodosWithEventHandling(todoList) {
  var elements = buildElements(todoList.todos);
  if (window && window.document) {
    window.document.querySelector('div#id-todos').innerHTML = elements;
  }
  addClickEventHandlersToToggleButtons(todoList);
}

function buildMessage (todos) {
  var message = '';
  var numTodos = todos.length;

  if (numTodos < 1) {
    return message = "You have no outstanding Todos!"
  }

  for (var i = 0; i < numTodos ; i++) {
    message = '\n'+checkCompleted(todos[i])+' '+todos[i].text+message;  
  }
  return message;
}

function buildElements (todos) {
  var numTodos = todos.length;
  var html = '';
  for (var i=0;i<numTodos; i++) {
    var element = '<button type="button" item="' +i+'" class="btn btn-small btn-info toggle">' + checkCompleted(todos[i]) + '</BUTTON>';
    element += '<span>'+ todos[i].text+'</span>';
    element += '<span item="' +i+'" class="delete" onclick=\'deleteUITodo(this);\'> X</span>';
    element += '<br/>';
    html = element + html; // prepend
  }
  return html;
}


function checkCompleted(todo) {
  var done = NOT_DONE;
  if (todo.completed === true) {
    done = DONE;
  }
  return done;
}

function toggleUIElement (el, todoList) {
  var position = el.getAttribute('item');
  todoList.toggleCompleted(position);
  todoList.display();
}

function deleteUITodo (el) {
  var position = el.getAttribute('item');
  todoList.delete(position);
}

function printTo(id, newText) {

  // Validate web context exists.Else default to console
  if (window.document) { 
    var target =  window.document.querySelector('#' + id);
    target.innerHTML= newText ;
  } 
}   

function addClickEventHandlersToToggleButtons(todoList){
  document.querySelectorAll('button.toggle')
  .forEach(function (element){ 
    element.addEventListener('click', function(){toggleUIElement(this, todoList);});
  });
}


window._app.todoList.display();   
window._app.todoList.add("buy milk");
window._app.todoList.add("buy veggies");


if (typeof module != "undefined") {
  module.exports = {
    todoList:       todoList,
    buildMessage:   buildMessage,
    checkCompleted: checkCompleted,
    constants:      {DONE, NOT_DONE},
    toggleUIElement:  toggleUIElement
  };
}