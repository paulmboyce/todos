/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/todoList.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/todoList.js":
/*!*************************!*\
  !*** ./src/todoList.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n\n/* eslint-disable block-scoped-var */\n/* eslint-disable no-var */\n/* eslint-disable no-use-before-define */\n// const\nconst NOT_DONE = '&nbsp;.&nbsp;';\nconst DONE = '&#10003;';\n\nvar myTodoApp;\n\n// Context defence for testing outwith broswer.\n// eslint-disable-next-line no-use-before-define\n// eslint-disable-next-line block-scoped-var\n// eslint-disable-next-line no-use-before-define\n// eslint-disable-next-line block-scoped-var\nif (typeof window === 'undefined') {\n    console.log('typeof window === \"undefined\"');\n    // eslint-disable-next-line vars-on-top\n    var window = {};\n    myTodoApp = { todoList: [] };\n}\n\nconst todoList = {\n    // format: { text: 'todo 1', completed: false }, { text: 'todo 2', completed: false }]\n    todos: [],\n    display () {\n        const message = buildMessage(this.todos);\n        printTo('output', `My Todos:${message}`);\n        // Do on mass because we create the elements on mass.\n        // When code changes to append individual elements,\n        // we would do this for that element only.\n        renderTodosWithEventHandling(this);\n    },\n    add (todo) {\n        if (typeof todo !== 'string') {\n            return 'oops should be a string';\n        }\n        const newTodo = {\n            text: todo,\n            completed: false\n        };\n\n        this.todos.push(newTodo);\n        this.display();\n        return newTodo;\n    },\n    change (position, newText) {\n        this.todos[position].text = newText;\n        this.display();\n    },\n    delete (position) {\n        this.todos.splice(position, 1);\n        this.display();\n    },\n    toggleCompleted (position) {\n        const todo = this.todos[position];\n        todo.completed = !todo.completed;\n        this.display();\n    },\n    toggleAllCompleted (done) {\n        const numTodos = this.todos.length;\n        for (let i = 0; i < numTodos; i += 1) {\n            this.todos[i].completed = done;\n        }\n    },\n    // Set ALL as COMPLETE (true), unless ALL are complete (so set as false)\n    toggleAll () {\n        let hasAnyIncomplete = false;\n        const numTodos = this.todos.length;\n\n        // If there is even one thats completed, mark ALL as complete.\n        for (let i = 0; i < numTodos; i += 1) {\n            if (this.todos[i].completed === false) {\n                hasAnyIncomplete = true;\n                break;\n            }\n        }\n        // Otherwise mark all incomplete\n        if (hasAnyIncomplete === true) {\n            this.toggleAllCompleted(true);\n        } else {\n            this.toggleAllCompleted(false);\n        }\n        // Update UI.\n        this.display();\n    },\n    deleteUITodo (el) {\n        const position = el.getAttribute('item');\n        todoList.delete(position);\n    }\n\n};\n\nfunction renderTodosWithEventHandling (injectedTodoList) {\n    const elements = buildElements(injectedTodoList.todos);\n    if (document) {\n        document.querySelector('div#id-todos').innerHTML = elements;\n    }\n    addClickEventHandlersToToggleButtons(injectedTodoList);\n}\n\nfunction buildMessage (todos) {\n    let message = '';\n    const numTodos = todos.length;\n\n    if (numTodos < 1) {\n        message = 'You have no outstanding Todos!';\n        return message;\n    }\n\n    for (let i = 0; i < numTodos; i += 1) {\n        message = `\\n${checkCompleted(todos[i])} ${todos[i].text}${message}`;\n    }\n    return message;\n}\n\nfunction buildElements (todos) {\n    const numTodos = todos.length;\n    let html = '';\n    for (let i = 0; i < numTodos; i += 1) {\n        let element = `<div class='todo-container'><button type=\"button\" item=\"${i}\" class=\"btn btn-small btn-info toggle\">${checkCompleted(todos[i])}</button>`;\n        element += `<textarea class=\"todo\" rows='1' cols='50' disabled readonly>${todos[i].text}</textarea>`;\n        element += `<button item=\"${i}\" class=\"delete btn btn-small btn-info\" onclick='myTodoApp.todoList.deleteUITodo(this);'> Delete [X]</button>`;\n        element += '</div>';\n        html = element + html; // prepend\n    }\n    return html;\n}\n\nfunction checkCompleted (todo) {\n    let done = NOT_DONE;\n    if (todo.completed === true) {\n        done = DONE;\n    }\n    return done;\n}\n\nfunction toggleUIElement (el, injectedTodoList) {\n    const position = el.getAttribute('item');\n    injectedTodoList.toggleCompleted(position);\n    injectedTodoList.display();\n}\n\n// This is called from dynamically HTML code.\n// eslint-disable-next-line no-unused-vars\nconst deleteUITodo = function deleteUITodo (el) {\n    const position = el.getAttribute('item');\n    todoList.delete(position);\n};\n\nfunction printTo (id, newText) {\n    // Validate web context exists.\n    if (document) {\n        const target = document.querySelector(`#${id}`);\n        target.innerHTML = newText;\n    }\n}\n\nfunction addClickEventHandlersToToggleButtons () {\n    if (document) {\n        document.querySelectorAll('button.toggle')\n            .forEach((element) => {\n                element.addEventListener('click', function handleClickEvent () { toggleUIElement(this, myTodoApp.todoList); });\n            });\n    }\n}\n\nfunction addClickEventHandlerToAll (elementSelector, fnClickHandler) {\n    if (document) {\n        console.log(`addClickEventHandlerToAll() --> ${elementSelector} `);\n        document.querySelectorAll(elementSelector)\n            .forEach((element) => {\n                element.addEventListener('click', fnClickHandler);\n            });\n    }\n}\n\nconst addTodoClickHandler = function () {\n    if (document) {\n        console.log('addTodoClickHandler() - FIRED');\n        console.log('TODOS:' + myTodoApp.todoList.todos.length);\n        const inputElement = document.querySelector('#inputTodo');\n        if (inputElement) {\n            console.log(`addTodoClickHandler() - inputElement found... ${inputElement}`);\n            myTodoApp.todoList.add(inputElement.value);\n            inputElement.value = '';\n            inputElement.focus();\n        }\n    }\n};\n\nvar clickHandlers = [\n    {\n        selector: 'button#btn-add-todo',\n        handler: addTodoClickHandler\n    },\n    {\n        selector: 'button#btn-toggle-all',\n        handler: () => { myTodoApp.todoList.toggleAll(); }\n    },\n    {\n        selector: 'button.toggle',\n        handler: () => { toggleUIElement(this, myTodoApp.todoList); }\n    }\n];\n\nfunction registerClickHandlers () {\n    clickHandlers.forEach((handler) => {\n        addClickEventHandlerToAll(handler.selector, handler.handler);\n    });\n}\n\nmyTodoApp = { todoList: todoList };\n\ndocument.addEventListener('DOMContentLoaded', (event) => {\n    'use strict';\n    console.log('DOM fully loaded and parsed. Running Click handlers');\n    // eslint-disable-next-line block-scoped-var\n    global.HELLO = 'hey';\n    global.myTodoApp = myTodoApp;\n  //  global.myTodoApp.deleteUITodo = deleteUITodo;\n    registerClickHandlers();\n    console.log('loaded OK');\n\n});\n\nif (true) {\n    module.exports = {\n        todoList,\n        buildMessage,\n        checkCompleted,\n        constants: { DONE, NOT_DONE },\n        toggleUIElement,\n        renderTodosWithEventHandling,\n        fnAddTodoClickHandler: addTodoClickHandler,\n        addClickEventHandlerToAll\n    };\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/todoList.js?");

/***/ })

/******/ });