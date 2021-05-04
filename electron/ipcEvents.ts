/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import {
  app, ipcMain, BrowserWindow, nativeTheme,
} from 'electron';
import { autoUpdater } from 'electron-updater';

const setListeners = (win: BrowserWindow) => {
  ipcMain.on('get-app-path', (event) => {
    event.returnValue = app.getPath('userData');
  });

  ipcMain.handle('is-app-packaged', () => app.isPackaged);

  ipcMain.on('should-use-dark-mode', (event) => {
    event.returnValue = nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('close-window', () => {
    win.hide();
    return 'hidden';
  });

  ipcMain.handle('minimize-window', () => {
    win.minimize();
    return 'minimized';
  });

  ipcMain.handle('maximize-window', () => {
    const isMaximized = win.isMaximized();

    if (isMaximized) win.unmaximize();
    else win.maximize();

    return !isMaximized;
  });

  autoUpdater.on('update-available', () => {
    win.webContents.send('update-is-available');
  });
};

export default setListeners;
