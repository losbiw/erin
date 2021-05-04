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

  ipcMain.on('is-app-packaged', (event) => {
    event.returnValue = app.isPackaged;
  });

  ipcMain.on('should-use-dark-mode', (event) => {
    event.returnValue = nativeTheme.shouldUseDarkColors;
  });

  ipcMain.on('close-window', (event) => {
    win.hide();
    event.returnValue = 'hidden';
  });

  ipcMain.on('minimize-window', (event) => {
    win.minimize();
    event.returnValue = 'minimized';
  });

  ipcMain.on('maximize-window', (event) => {
    const isMaximized = win.isMaximized();

    if (isMaximized) win.unmaximize();
    else win.maximize();

    event.returnValue = !isMaximized;
  });

  autoUpdater.on('update-available', () => {
    win.webContents.send('update-is-available');
  });
};

export default setListeners;
