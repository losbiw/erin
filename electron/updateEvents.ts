import { IpcMainEvent } from 'electron/main';
import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

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

    ipcMain.on('should-update', (event: IpcMainEvent) => {
        autoUpdater.downloadUpdate();
    
        event.returnValue = 'update is being downloaded'
    });

    autoUpdater.on('update-downloaded', () => {
        autoUpdater.quitAndInstall();
    });
}

module.exports = setListeners