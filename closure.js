function range(start, end) {
  const result = [];

  // Closure lets  remember 'start' in context
  function runRangeWIthEnd(end2) {
    return range(start, end2);
  }

  if (end === undefined) {
    return runRangeWIthEnd;
  }

  if (end >= start) {
    const steps = end - start;
    for (let i = 0; i <= steps; i += 1) {
      result.push(start + i);
    }
  }
  return result;
}

const range1 = range(3);
range1(3);

if (typeof module !== 'undefined') {
  module.exports = {
    range,
  };
}
