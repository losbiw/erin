/* eslint-disable import/no-extraneous-dependencies */
import {
  app, BrowserWindow, screen, nativeImage, Tray,
} from 'electron';
import { join } from 'path';
import { promises as fs } from 'fs';
import defineOS from './os';
import tray from './tray';
import initIPCEvents from './ipcEvents';
import initPowerEvents from './powerEvents';
import initUpdateEvents from './updateEvents';

require('dotenv').config({ path: join(__dirname, './.env') }); // change

initUpdateEvents();

let win: BrowserWindow;
let winTray: Tray;

(() => {
  const lock = app.requestSingleInstanceLock();

  if (!lock) app.quit();
  else {
    app.on('second-instance', () => {
      if (win) {
        win.show();
        win.focus();
      }
    });
  }
})();

app.on('activate', () => {
  win.show();
});

const findIconPath = (size: number) => {
  const os = defineOS();
  const iconName = os === 'win32' ? 'assets/icon.ico' : `assets/icons/${size}x${size}.png`;

  return app.isPackaged ? join(process.resourcesPath, iconName) : join(__dirname, '../', iconName);
};

const hideWindow = () => {
  const startArgs = process.argv || [];

  if (startArgs.indexOf('--hidden') !== -1) win.hide();
};

const loadFile = async () => {
  const { height, width } = screen.getPrimaryDisplay().size;
  let url; let theme;

  const cfgPath = join(app.getPath('userData'), 'config.json');

  try {
    await fs.stat(cfgPath);
    const cfgFile = await fs.readFile(cfgPath, 'utf8');
    const config = JSON.parse(cfgFile);

    theme = config.theme;
  } catch {
    theme = 'dark';
  }

  win = new BrowserWindow({
    width: width * 0.8,
    height: height * 0.8,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
    icon: nativeImage.createFromPath(findIconPath(1024)),
    backgroundColor: theme === 'dark' ? '#121214' : '#f4f4f8',
  });

  if (app.isPackaged) {
    url = `file://${__dirname}/../react-build/index.html`;
  } else {
    // require('electron-debug')();

    // win.webContents.openDevTools();
    url = 'http://localhost:8080/';
  }

  win.removeMenu();
  win.loadURL(url);

  hideWindow();
  initIPCEvents(win);
  initPowerEvents(win);
};

app.on('ready', async () => {
  await loadFile();
  winTray = tray.create(win, findIconPath(24));
});
