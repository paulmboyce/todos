const Closure = require('./closure');

test('returns [3] for range (3,3)', () => {
    // ARRANGE
    // ACT
    const result = Closure.range(3, 3);
    // ASSERT
    expect(result[0]).toBe(3);
});

test('returns [3,4,5,6,7,8] for range (3,8)', () => {
    // ARRANGE
    const expected = [3, 4, 5, 6, 7, 8];
    // ACT
    const result = Closure.range(3, 8);
    // ASSERT
    expect(result).toEqual(expect.arrayContaining(expected));
});


test('returns [] for range(3,0)', () => {
    // ARRANGE
    const expected = [];
    // ACT
    const result = Closure.range(3, 0);
    // ASSERT
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('returns [3] for range(3).range(3) ', () => {
    // ARRANGE
    const expected = [3];
    // ACT
    let result = Closure.range(3);
    result = result(3);
    // ASSERT
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('returns [3,4,5,6,7,8] for range(3) (8)', () => {
// ARRANGE
    const expected = [3, 4, 5, 6, 7, 8];
    // ACT
    let result = Closure.range(3);
    result = result(8);
    // ASSERT
    expect(result).toEqual(expect.arrayContaining(expected));
});


test('returns [] for range(3) (0)', () => {
    // ARRANGE
    const expected = [];
    // ACT
    let result = Closure.range(3);
    result = result(0);
    // ASSERT
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('returns [4,5,6] for range (4) (6)', () => {
    // ARRANGE
    const expected = [4, 5, 6];
    // ACT
    let result = Closure.range(4);
    result = result(6);
    // ASSERT
    expect(result).toEqual(expect.arrayContaining(expected));
});
