const remote = require('electron').remote;
const links = document.getElementsByClassName('link');
require('../scripts/mode')();
require('../scripts/control')();

for(const link of links){
    link.addEventListener('click', ()=>{
        const currentSize = remote.getCurrentWindow().getSize();

        const child = new remote.BrowserWindow({
            width: currentSize[1],
            height: currentSize[2],
        });
        const url = link.getAttribute('src');
        
        child.removeMenu();
        child.loadURL(url);
    });
}