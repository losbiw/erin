// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, powerMonitor } from 'electron';

const setListeners = (win: BrowserWindow) => {
  powerMonitor.on('resume', () => {
    win.webContents.send('unlock-screen');
  });
};

export default setListeners;
