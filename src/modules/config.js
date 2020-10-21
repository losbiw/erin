const { ipcRenderer } = window.require('electron');
const { join } = window.require('path');
const fs = window.require('fs');

function get(){
    const cfgPath = getConfigPath();
    
    if(fs.existsSync(cfgPath)){
        const cfg = fs.readFileSync(cfgPath, 'utf8');
        
        try{
            return JSON.parse(cfg);
        }
        catch{
            return getDefaultOptions();
        }
    }
    else{
        return setDefault()
    }
}

function set(options){
    const cfgPath = getConfigPath();
    const json = JSON.stringify(options);
    
    fs.writeFile(cfgPath, json, (err)=>{
        if(err) throw err;
    });
}

function setDefault(){
    const options = getDefaultOptions();
    set(options);
    return options
}

function getConfigPath(){
    const userData = ipcRenderer.sendSync('get-app-path');
    const cfgPath = join(userData, 'config.json');

    return cfgPath
}

const getDefaultOptions = () => ({
    mode: "keywords",
    keywords: [],
    timer: 0,
    quality: 'original',
    startup: true
})

export default { get, set }