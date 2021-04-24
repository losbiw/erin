/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { app, ipcMain, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';

const { Notification } = require('electron');

function setListeners(win: BrowserWindow) {
  ipcMain.on('get-app-path', (event) => {
    event.returnValue = app.getPath('userData');
  });

  ipcMain.on('is-app-packaged', (event) => {
    event.returnValue = app.isPackaged;
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

    if (isMaximized) win.restore();
    else win.maximize();

    event.returnValue = !isMaximized;
  });

  autoUpdater.on('update-available', () => {
    const updateNotification = new Notification('Update available', {
      body: 'Click here for more details',
    });

    updateNotification.onclick = () => {
      win.show();
      win.focus();
    };

    win.webContents.send('update-is-available');
  });
}

module.exports = setListeners;
