const { remote, ipcRenderer } = require('electron');
const { join, basename } = require('path');

function set(links, isAbsolute, loadInCurrent){
    for(const link of links){
        link.addEventListener('click', _listener);

        function _listener(){
            click(link, isAbsolute, loadInCurrent);
        }
    };
}

function click(button, isAbsolute, loadInCurrent){
    const currentWindow = remote.getCurrentWindow();
    const src = button.getAttribute('src');
    const url = isAbsolute ? src : join(__dirname, `../pages/${src}`);

    if(isAbsolute || (!isAbsolute && !loadInCurrent)){
        const currentSize = currentWindow.getSize();

        const child = new remote.BrowserWindow({
            width: currentSize[0],
            height: currentSize[1],
            webPreferences: {
                nodeIntegration: !isAbsolute
            },
            frame: isAbsolute
        });
        
        child.removeMenu();
        child.loadURL(url);

        if(!loadInCurrent) currentWindow.hide();
    }
    else if(loadInCurrent)
        currentWindow.loadURL(url);
}

function back(){
    const currentWindow = remote.getCurrentWindow();
    
    const mainWindowLocation = ipcRenderer.sendSync('get-window-location');
    const fileName = basename(mainWindowLocation, '.html');

    console.log(fileName);
    if(fileName === 'main'){
        ipcRenderer.sendSync('show-main-window');
        currentWindow.close();
    }
    else{
        ipcRenderer.sendSync('load-main');
        currentWindow.close();
    }
}

module.exports = {
    set: set,
    back: back
};