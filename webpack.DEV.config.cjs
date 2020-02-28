const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/todoList.mjs',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
