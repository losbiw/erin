const { basename, join } = require('path');
const fs = require('fs');

const dirPath = join(__dirname, '../../../');
const cfgPath = join(dirPath, 'config.json');

function update(data){
    const config = get();
    const keys = Object.keys(data);
    
    for(key of keys){
        config[`${key}`] = data[key];
    }
    
    fs.writeFile(cfgPath, JSON.stringify(config), ()=>{
        console.log('The config has been updated');
    });
}

function get(){
    const data = {
        mode: 'light',
        auto: true,
        quality: "large2x"
    };

    if(fs.existsSync(dirPath) && fs.existsSync(cfgPath)){
        const readCfg = fs.readFileSync(cfgPath);
        const cfg = JSON.parse(readCfg);

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

function exists(){
    if(fs.existsSync(cfgPath)) return true;
    return false;
}

module.exports = {
    update: update,
    get: get,
    exists: exists,
};