const mode = require('../scripts/mode')();
const config = require('../scripts/config');

const input = document.getElementById('time');
const nextButton = document.getElementById('next');

nextButton.addEventListener('click', ()=>{
    const value = parseInt(input.value, 10);
    
    let data = {};
    
    if(!Number.isNaN(value))
        data.time = value * 60000;
    else data.time = 0;

    config.update(data);
});
