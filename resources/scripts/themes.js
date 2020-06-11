const fs = require('fs');
const path = require('path');

const mode = require('../scripts/mode')();
const config = require('../scripts/config');

const select = document.querySelector('select');
const button = document.getElementById('next');

select.addEventListener('focus', ()=>{
    this.size=3;
    button.classList.add('hidden');
});

select.addEventListener('focusout', ()=>{
    button.classList.remove('hidden');
});

button.addEventListener('click', ()=>{
    let filePath;
    const value = select.value;
    const data = {
        theme: value
    };

    config.update(data);
    
    if(value === 'keywords') button.setAttribute('href', 'keywords.html');
    else button.setAttribute('href', 'timer.html');
})