const { join, resolve } = require('path');
const exec = require('child_process').execFile;
const execPath = join(__dirname, '../app/wallpaper.exe');

async function set(imgPath){
    if(typeof imgPath !== 'string')
        throw new TypeError('Expected a string');
    
    await exec(execPath, [resolve(imgPath)]);
}

module.exports.set = set;