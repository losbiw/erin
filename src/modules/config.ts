import startup from './startup'

const { ipcRenderer } = window.require('electron');
const { join } = window.require('path');
const fs = window.require('fs');

interface Config{
    mode: string,
    keywords: Array<string>,
    timer: number,
    quality: string,
    startup: boolean,
    theme: string,
    privacy: boolean,
    isFirstTime: boolean,
    isCompleted: boolean
}

function get(){
    const cfgPath = getConfigPath();
    
    if(fs.existsSync(cfgPath)){
        const cfg = fs.readFileSync(cfgPath, 'utf8');
        
        try{ 
            const json = JSON.parse(cfg);
            return isMatchingSchema(json) ? json : getDefaultOptions()
        }
        catch{ return getDefaultOptions() }
    }
    else{
        return getDefaultOptions()
    }
}

function set(options: Config){
    const updated = get();
    const cfgPath = getConfigPath();

    for(const key in options){
        updated[key] = options[key];
    }
    
    const json = JSON.stringify(updated);
    startup.set(options.startup);
    
    fs.writeFileSync(cfgPath, json, (err: Error)=>{
        if(err) throw err;
    });
}

function getAppPath(){
    return ipcRenderer.sendSync('get-app-path');
}

function getConfigPath(){
    const appPath = getAppPath(); 
    const cfgPath = join(appPath, 'config.json');

    return cfgPath
}

function isMatchingSchema(cfg: Config){
    const defaultCfg = getDefaultOptions();
    
    for(let prop in defaultCfg){
        if(!cfg.hasOwnProperty(prop)) return false
    }

    return true
}

const getDefaultOptions = () => ({
    mode: 'weather',
    keywords: [],
    timer: 60000,
    quality: 'original',
    startup: true,
    theme: 'dark',
    privacy: false,
    isFirstTime: true,
    isCompleted: false
})

export default { get, set, getAppPath }