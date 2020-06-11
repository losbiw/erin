const mode = require('../scripts/mode')();
      config = require('../scripts/config');
      keys = require('../scripts/keys');

const nextButton = document.getElementById('next');

keys.set();

nextButton.addEventListener('click', ()=>{
    const values = keys.get();
    if(values.length != 0){ 
        config.update({keywords: values});
        nextButton.setAttribute('href', 'timer.html');
    }
});