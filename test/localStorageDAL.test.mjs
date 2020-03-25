import {
    loadTodosFromLocalStorage
} from '../src/localStorageDAL.mjs';

beforeEach(() => {
    const todo = {
        id: 1,
        text: 'buy milk',
        completed: false
    };
    const todo2 = {
        id: 2,
        text: 'call home',
        completed: true
    };
    window.localStorage.setItem(todo.id, JSON.stringify(todo));
    window.localStorage.setItem(todo2.id, JSON.stringify(todo2));
});

afterEach(() => {
    window.localStorage.clear();
});

test('Load todos from LocalStorage', () => {
    const savedTodos = loadTodosFromLocalStorage();
    expect(typeof savedTodos).toBe('object');
    expect(savedTodos.length).toBe(2);
});

test('Todos are loaded in ascending order', () => {
    const savedTodos = loadTodosFromLocalStorage();
    expect(savedTodos[0].id).toEqual('1');
    expect(savedTodos[1].id).toEqual('2');
    expect(+savedTodos[0].id).toBeLessThan(+savedTodos[1].id);
});
