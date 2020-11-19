const { autoUpdater } = require('electron-updater');
const { ipcMain } = require('electron');

function setListeners(){
    ipcMain.on('component-did-mount', () => {
        try{
            autoUpdater.autoDownload = false;
            autoUpdater.checkForUpdates();
        }
        catch(err){
            throw err
        }
    });

    ipcMain.on('should-update', event => {
        autoUpdater.downloadUpdate();
    
        event.returnValue = 'update is being downloaded'
    });

    autoUpdater.on('update-downloaded', () => {
        autoUpdater.quitAndInstall();
    });
}

module.exports = setListeners