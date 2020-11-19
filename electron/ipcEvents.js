const { app, ipcMain, Notification } = require('electron');
const { autoUpdater } = require('electron-updater')

function setListeners(win){
    ipcMain.on('get-app-path', event => {
        event.returnValue = app.getPath('userData');
    })

    ipcMain.on('is-app-packaged', event => {
        event.returnValue = app.isPackaged;
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

    autoUpdater.on('update-available', () => {
        const updateNotification = new Notification('Update available', {
            body: 'Click here to look for more details'
        })

        updateNotification.onclick = () => {
            win.show();
            win.focus();
        }

        win.webContents.send('update-is-available');
    });
}

module.exports = setListeners