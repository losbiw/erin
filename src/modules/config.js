import startup from './startup'

const { ipcRenderer } = window.require('electron');
const { join } = window.require('path');
const fs = window.require('fs');

function get(){
    const cfgPath = getConfigPath();
    
    if(fs.existsSync(cfgPath)){
        const cfg = fs.readFileSync(cfgPath, 'utf8');
        
        try{ return JSON.parse(cfg) }
        catch{ return getDefaultOptions() }
    }
    else{
        return setDefault()
    }
}

function set(options){
    const cfgPath = getConfigPath();
    const json = JSON.stringify(options);

    startup.set(options.startup);
    
    fs.writeFile(cfgPath, json, (err)=>{
        if(err) throw err;
    });
}

function setDefault(){
    const options = getDefaultOptions();
    set(options);
    return options
}

function getAppPath(){
    const appPath = ipcRenderer.sendSync('get-app-path');
    return appPath
}

function getConfigPath(){
    const appPath = getAppPath(); 
    const cfgPath = join(appPath, 'config.json');

    return cfgPath
}

const getDefaultOptions = () => ({
    mode: "keywords",
    keywords: [],
    timer: 0,
    quality: 'original',
    startup: true
})

export default { get, set, getAppPath }