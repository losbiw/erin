const { autoUpdater } = require('electron-updater');

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
})