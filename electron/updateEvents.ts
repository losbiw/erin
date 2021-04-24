import { IpcMainEvent } from 'electron/main';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import defineOS from './os';

const setListeners = () => {
  const os = defineOS();

  if (os === 'win32' || os === 'darwin') {
    ipcMain.on('component-did-mount', () => {
      try {
        autoUpdater.autoDownload = false;
        autoUpdater.checkForUpdates();
      } catch (err) {
        throw Error('There are no updates available');
      }
    });

    ipcMain.on('should-update', (event: IpcMainEvent) => {
      autoUpdater.downloadUpdate();

      // eslint-disable-next-line no-param-reassign
      event.returnValue = 'update is being downloaded';
    });

    autoUpdater.on('update-downloaded', () => {
      autoUpdater.quitAndInstall();
    });
  }
};

export default setListeners;
