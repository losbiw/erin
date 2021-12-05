/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import {
  app, ipcMain, BrowserWindow, nativeTheme,
} from 'electron';
import { autoUpdater } from 'electron-updater';

type WindowAction = 'close' | 'minimize' | 'maximize';

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

  ipcMain.handle('window-action', (_event, ...args) => {
    const action: WindowAction = args[0];

    if (action === 'close') {
      win.hide();
      return 'hidden';
    } if (action === 'minimize') {
      win.minimize();
      return 'minimized';
    } if (action === 'maximize') {
      const isMaximized = win.isMaximized();

      if (isMaximized) win.unmaximize();
      else win.maximize();

      return !isMaximized;
    }

    return 'unknown event';
  });
};

export default setListeners;
