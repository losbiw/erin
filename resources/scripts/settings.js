const { ipcRenderer, remote } = require('electron');
const config = require('../scripts/config');
      startup = require('../scripts/startup');
      keys = require('../scripts/keys');
      link = require('../scripts/link');

require('../scripts/mode')();
require('../scripts/control')();

const theme = document.getElementById('theme');
      quality = document.getElementById('quality');
      saveBut = document.getElementById('save');
      minutes = document.getElementById('minutes');
      checkbox = document.getElementById('startup');

const cfg = config.get();

set();

saveBut.addEventListener('click', save);

function set(){
    theme.value = cfg.theme;
    quality.value = cfg.quality;
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
        auto: checkbox.checked,
        quality: quality.value
    }

    const timeValue = parseInt(minutes.value, 10);
    data.time = !Number.isNaN(minutes.value) && minutes.value >= 1 ? minutes.value * 60000 : 0;

    let isSaveable = false;
    
    for(let value in data){
        currentValue = data[value];
        cfgValue = cfg[value];

        if(currentValue !== cfgValue && 
           typeof currentValue !== 'object')
        {
            isSaveable = true;
        }
        else if(currentValue !== cfgValue && 
                typeof currentValue === 'object' && 
                typeof cfgValue === 'object' &&
                !compare(currentValue, cfgValue))
        {
            isSaveable = true;
        } 
    }

    if(isSaveable){
        config.update(data);
        if(data.keywords.length !== 0 || data.theme !== "keywords"){
            startup.set(checkbox.checked);
            config.update(data);
            
            ipcRenderer.send('load-main');
            remote.getCurrentWindow().close();
        }
        else{
            const error = document.getElementById('error');
            error.setAttribute('style', 'visibility: visible');
        }
    }
    else link.back();
}

function compare(arr1, arr2){
    if(arr1.length === arr2.length){
        for(i in arr1){
            if(arr1[i] !== arr2[i]){
                return false;
            } 
        }
    }
    else{
        return false;
    }

    return true;
}

keys.set();