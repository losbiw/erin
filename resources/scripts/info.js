const remote = require('electron').remote;
const links = document.getElementsByClassName('link');

for(const link of links)
    set(link);

function set(link){
    link.removeEventListener('click', click);
    link.addEventListener('click', click);
}

function click(){
    const currentSize = remote.getCurrentWindow().getSize();

    const child = new remote.BrowserWindow({
        width: currentSize[0],
        height: currentSize[1],
    });
    const url = this.getAttribute('src');
    
    child.removeMenu();
    child.loadURL(url);
}

module.exports.set = set;