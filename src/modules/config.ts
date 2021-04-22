import startup from './startup'
import { Config, ConfigUpdate, Mode, Quality, Theme } from '@/interfaces/Config'

const { ipcRenderer } = window.require('electron');
const { join } = window.require('path');
const fs = window.require('fs');

const get = (): Config => {
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

const set = (options: ConfigUpdate): void => {
    const updated = get();
    const cfgPath = getConfigPath();

    for(const key in options){
        updated[key] = options[key as keyof Config];
    }
    
    const json = JSON.stringify(updated);
    startup.set(options.startup as boolean);
    
    fs.writeFileSync(cfgPath, json, (err: Error)=>{
        if(err) throw err;
    });
}

const getAppPath = (): string => ipcRenderer.sendSync('get-app-path') as string;

const getConfigPath = (): string => {
    const appPath = getAppPath(); 
    const cfgPath: string = join(appPath, 'config.json');

    return cfgPath
}

const isMatchingSchema = (cfg: Config): boolean => {
    const defaultCfg = getDefaultOptions();
    
    for(let prop in defaultCfg){
        if(!cfg.hasOwnProperty(prop)) return false
    }

    return true
}

const getDefaultOptions = (): Config => ({
    mode: Mode.Keywords,
    keywords: ['mountains'],
    timer: 60000,
    quality: Quality.High,
    startup: true,
    theme: Theme.Dark,
    privacy: false,
    isFirstTime: true,
    isComplete: false
})

export default { get, set, getAppPath }