const { app } = require('electron').remote;
      config = require('../scripts/config');
      startup = require('../scripts/startup');
      keys = require('../scripts/keys');
      mode = require('../scripts/mode')();

require('../scripts/control')();

const theme = document.getElementById('theme');
      saveBut = document.getElementById('save');
      minutes = document.getElementById('minutes');
      checkbox = document.getElementById('startup');

const cfg = config.get();

set();

saveBut.addEventListener('click', save);

function set(){
    theme.value = cfg.theme;
    if(cfg.keywords !== undefined){
        for(key of cfg.keywords)
            keys.add(key);
    }
    if(cfg.time)
        minutes.value = cfg.time / 60000;
}

function save(){
    const data = {
        theme: theme.value,
        keywords: keys.get(),
        auto: checkbox.checked
    }
    
    const value = parseInt(minutes.value, 10);
    if(!Number.isNaN(value))
        data.time = value * 60000;
    else data.time = 0;

    if((data.theme === "keywords" && data.keywords.length !== 0) || data.theme !== "keywords"){
        startup.set(checkbox.checked);
        config.update(data);
        saveBut.setAttribute('href', 'main.html');
    }
}

keys.set();