
function addToStorage (id, obj, fields) {
    localStorage.setItem(id, JSON.stringify(obj, fields));
}

function editInStorage (todo) {
    localStorage.removeItem(todo.id);
    localStorage.setItem(todo.id, JSON.stringify(todo, ['text', 'completed']));
}

function loadTodosFromLocalStorage () {
    const storedTodos = [];
    for (var i = 0; i < localStorage.length; i = i + 1) {
        const key = localStorage.key(i);
        let todo = localStorage.getItem(key);
        todo = JSON.parse(todo);
        todo.id = key;
        storedTodos.push(todo);
    }
    storedTodos.sort(function descendingIDs (a, b) {
        return Number(a.id) - Number(b.id);
    });
    return storedTodos;
}

export {
    addToStorage,
    editInStorage,
    loadTodosFromLocalStorage
};
