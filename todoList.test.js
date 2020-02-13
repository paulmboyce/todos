const TODO = require('./todoList');

const { todoList } = TODO;

test('can add a todo', () => {
  const numTodos = todoList.todos.length;

  const result = todoList.add('Buy Coffee at Starbucks');

  // validate list has grown by 1
  expect(todoList.todos.length).toBe(numTodos + 1);

  // validate new object props
  expect(result).toEqual({ text: 'Buy Coffee at Starbucks', completed: false });
});

test('all todos are not completed', () => {
  for (let index = 0; index < todoList.length; index += 1) {
    const todo = todoList[index];
    expect(todo.completed).toEqual(false);
  }
});

test('can toggle completed', () => {
  todoList.todos[0].completed = false;
  todoList.toggleCompleted(0);
  expect(todoList.todos[0].completed).toBe(true);
  todoList.toggleCompleted(0);
  expect(todoList.todos[0].completed).toBe(false);
});

test('build message works', () => {
  // Lets test for empty
  todoList.todos = [];
  expect(TODO.buildMessage(todoList.todos)).toBe('You have no outstanding Todos!');

  todoList.add('todo 1');
  expect(todoList.todos.length).toBe(1);

  expect(TODO.buildMessage(todoList.todos)).toContain('todo 1');
  expect(TODO.buildMessage(todoList.todos)).toEqual(expect.stringContaining(`${TODO.constants.NOT_DONE} todo 1`));
  expect(TODO.buildMessage(todoList.todos)).toEqual(`\n${TODO.constants.NOT_DONE} todo 1`);

  todoList.toggleCompleted(0);
  expect(TODO.buildMessage(todoList.todos)).toEqual(`\n${TODO.constants.DONE} todo 1`);
  todoList.toggleCompleted(0);

  todoList.add('todo 2');
  expect(todoList.todos.length).toBe(2);

  expect(TODO.buildMessage(todoList.todos)).toContain(`${TODO.constants.NOT_DONE} todo 2`);
  expect(TODO.buildMessage(todoList.todos)).toMatch(`${TODO.constants.NOT_DONE} todo 2`);
  expect(TODO.buildMessage(todoList.todos)).toEqual(expect.stringContaining(`${TODO.constants.NOT_DONE} todo 2`));

  todoList.toggleCompleted(1);
  expect(TODO.buildMessage(todoList.todos)).toEqual(expect.stringContaining(`\n${TODO.constants.DONE} todo 2`));
  expect(TODO.buildMessage(todoList.todos)).toEqual(expect.stringContaining(`\n${TODO.constants.NOT_DONE} todo 1`));

  // Check that new items are PRE-Pended
  expect(TODO.buildMessage(todoList.todos)).toEqual(`\n&#10003; todo 2\n${TODO.constants.NOT_DONE} todo 1`);

  // Toggl both items
  todoList.toggleCompleted(0);
  todoList.toggleCompleted(1);
  expect(TODO.buildMessage(todoList.todos)).toEqual(expect.stringContaining('\n&#10003; todo 1'));
  expect(TODO.buildMessage(todoList.todos)).toEqual(expect.stringContaining(`\n${TODO.constants.NOT_DONE} todo 2`));

  // crrect order
  expect(TODO.buildMessage(todoList.todos)).toEqual(`\n${TODO.constants.NOT_DONE} todo 2\n&#10003; todo 1`);

  // Ok lets delete 2 items and verfy for empty
  todoList.delete(0);
  expect(todoList.todos.length).toBe(1);
  todoList.delete(0);
  expect(todoList.todos.length).toBe(0);
  expect(TODO.buildMessage(todoList.todos)).toBe('You have no outstanding Todos!');
});

test('Check competed', () => {
  // Lets test for empty
  todoList.todos = [
    { text: 'todo 1', completed: false },
    { text: 'todo 2', completed: true },
  ];

  expect(TODO.checkCompleted(todoList.todos[0])).toBe(TODO.constants.NOT_DONE);
  expect(TODO.checkCompleted(todoList.todos[1])).toBe(TODO.constants.DONE);
});

test('toggle all as COMPLETE', () => {
  todoList.toggleAllCompleted(true);
  for (let i = 0; i < todoList.todos.length; i += 1) {
    expect(todoList.todos[i].completed).toBe(true);
  }
});

test('toggle all as NOT COMPLETE', () => {
  todoList.toggleAllCompleted(false);
  for (let i = 0; i < todoList.todos.length; i += 1) {
    expect(todoList.todos[i].completed).toBe(false);
  }
});

test('toggle if ALL are complete toggleAll sets ALL to INCOPLETE', () => {
  todoList.toggleAllCompleted(true);
  // Expect ALL to be true
  for (let i = 0; i < todoList.todos.length; i += 1) {
    expect(todoList.todos[i].completed).toEqual(true);
  }

  todoList.toggleAll();

  // Expect ALL to be false
  for (let i = 0; i < todoList.todos.length; i += 1) {
    expect(todoList.todos[i].completed).toEqual(false);
  }
});

test('Special Case: toggle all sets to FALSE if everything is true ', () => {
  todoList.toggleAllCompleted(true); // Sets all true

  // Toggle all shsoul go true.
  todoList.toggleAll();

  // Expect ALL to be true
  for (let i = 0; i < todoList.todos.length; i += 1) {
    expect(todoList.todos[i].completed).toEqual(false);
  }

  // if even one os false, all beecome true

  todoList.toggleAllCompleted(true); // Sets all true again
  // Mark one as incmplete:
  todoList.todos[0].completed = false;

  // Toggle all shsoul go true.
  todoList.toggleAll();
  // Expect ALL to be true
  for (let i = 0; i < todoList.todos.length; i += 1) {
    expect(todoList.todos[i].completed).toEqual(true);
  }
});

test('toggleUI component check use of API, for example '
      + 'that it calls getAttribute, for "item"'
      + 'much of this is unneccessary because were are testing internal calls rather than funtion effects '
      + 'but it is an example of using injection of fake (aka MOCK) objects.', () => {
  const mockFnGetAttribute = jest.fn(() => 0);

  const fakeElement = { getAttribute: mockFnGetAttribute };
  const mockFnToggleCompleted = jest.fn();

  const mockFnDisplay = jest.fn();
  const fakeTodoList = {
    toggleCompleted: mockFnToggleCompleted,
    display: mockFnDisplay,
  };

  TODO.toggleUIElement(fakeElement, fakeTodoList);

  expect(mockFnGetAttribute).toBeCalled();
  expect(mockFnGetAttribute).toHaveBeenCalledWith('item');

  expect(mockFnToggleCompleted).toBeCalled();
  expect(mockFnToggleCompleted).toHaveBeenCalledWith(0);

  expect(mockFnDisplay).toBeCalled();
});
