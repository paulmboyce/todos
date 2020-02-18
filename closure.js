function range(start, end) {
  const result = [];
  if (end) {
    if (end >= start) {
      const steps = end - start;
      for (let i = 0; i <= steps; i += 1) {
        result.push(start + i);
      }
    }
    return result;
  }
  // Closure lets  remember 'start' in context
  return (end2) => range(start, end2);
}

if (typeof module !== 'undefined') {
  module.exports = {
    range,
  };
}
