// const Marbles = require('../src/marbles.js');
import { getName } from '../src/marbles.mjs';

test('it loads OK', () => {
    console.log(getName());
    expect(getName()).toBe('Paul');
});
