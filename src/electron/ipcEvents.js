const { app, ipcMain } = require('electron');

function setListeners(win){
    ipcMain.on('get-app-path', (event, _args) => {
        event.returnValue = app.getPath('userData')
    })
    
    ipcMain.on('close-window', event => {
        win.hide();
        event.returnValue = 'hidden'
    });
    
    ipcMain.on('minimize-window', event => {
        win.minimize();
        event.returnValue = 'minimized'
    });
    
    ipcMain.on('maximize-window', event => {
        const isMaximized = win.isMaximized();
        
        if(isMaximized) win.restore();
        else win.maximize()
        
        event.returnValue = !isMaximized
    });
}

module.exports = setListeners