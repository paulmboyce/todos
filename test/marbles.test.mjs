// const Marbles = require('../src/marbles.js');
import { getName } from '../src/marbles.mjs';

test('it loads OK', () => {
    expect(getName()).toBe('Paul');
});
