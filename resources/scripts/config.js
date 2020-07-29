const electron = require('electron');
const { basename, join } = require('path');
const fs = require('fs');

const dirPath = (electron.app || electron.remote.app).getPath('userData');
const cfgPath = join(dirPath, 'config.json');

function update(data){
    const config = get();
    const keys = Object.keys(data);
    
    for(key of keys){
        config[key] = data[key];
    }
    
    fs.writeFileSync(cfgPath, JSON.stringify(config));
}

function get(){
    const data = {
        mode: 'light',
        auto: true,
        quality: "large2x",
        firstLaunch: true
    };

    if(fs.existsSync(dirPath) && fs.existsSync(cfgPath)){
        const readCfg = fs.readFileSync(cfgPath);
        const cfg = JSON.parse(readCfg) || data;

        return cfg;
    }
    else if(fs.existsSync(dirPath)) {
        fs.writeFile(cfgPath, JSON.stringify(data), ()=>{
            console.log('The config has been created');
        });
        
        return data;
    }
    
    fs.mkdirSync(dirPath);
    fs.writeFile(cfgPath, JSON.stringify(data), ()=>{
        console.log('The config has been created');
    });
    return data;
}

module.exports = {
    update: update,
    get: get
};