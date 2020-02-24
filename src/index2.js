(function component () {
    const element = document.createElement('div');
    console.log('runnign component...');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = 'Hello webpack2';
    return element;
})();
