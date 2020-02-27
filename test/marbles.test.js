// const Marbles = require('../src/marbles.js');
import { getName } from '../src/marbles.js';

describe(' basic tests', () => {
    beforeEach(() => {
        console.log('Before Each....');
    });

    test('it loads OK', () => {
        console.log(getName());
    });
});
