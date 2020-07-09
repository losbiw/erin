const mode = require('../scripts/mode')();
const config = require('../scripts/config');

const input = document.getElementById('time');
const nextButton = document.getElementById('next');

nextButton.addEventListener('click', ()=>{
    const value = parseInt(input.value, 10);
    
    let data = {};
    data.time = !Number.isNaN(value) && value >= 1 ? value * 60000 : 0;

    config.update(data);
});
