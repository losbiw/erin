/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import {
  app, ipcMain, BrowserWindow, nativeTheme,
} from 'electron';
import { autoUpdater } from 'electron-updater';

const setListeners = (win: BrowserWindow) => {
  autoUpdater.on('update-available', () => {
    win.webContents.send('update-is-available');
  });

  ipcMain.on('get-app-path', (event) => {
    event.returnValue = app.getPath('userData');
  });

  ipcMain.on('should-use-dark-mode', (event) => {
    event.returnValue = nativeTheme.shouldUseDarkColors;
  });

  ipcMain.on('set-autolaunch', (_event, ...args) => {
    app.setLoginItemSettings({
      openAtLogin: args[0],
      openAsHidden: true,
      name: 'Erin',
    });
  });

  ipcMain.handle('is-app-packaged', () => app.isPackaged);

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
};

export default setListeners;
