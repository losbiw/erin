const config = require('../scripts/config');
require('../scripts/mode')();

const hide = document.getElementById('hide-hint');
      hint = document.getElementById('hint');
      overlay = document.getElementById('overlay');

if(config.get().firstLaunch)
    config.update({firstLaunch: false});
else hideElements({hint, overlay});

hide.addEventListener('click', ()=>{
    hideElements({hint, overlay});
});

function hideElements(elements){
    for(i in elements){
        elements[i].setAttribute('style', 'display: none');
    }
}