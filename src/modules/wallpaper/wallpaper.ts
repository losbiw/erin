import { LinuxCommands, Distros } from '@interfaces/Linux.d';
import * as https from 'https';
import OS from '../OS';
import isBlacklisted from './blacklist';
import * as scripts from './scripts';

const { writeFile, unlink } = window.require('fs').promises;

const path = window.require('path');
const { ipcRenderer } = window.require('electron');
const { promisify } = window.require('util');
const { execFile: _execFile, exec: _exec } = window.require('child_process');
const Stream = require('stream').Transform;

const exec = promisify(_exec);
const execFile = promisify(_execFile);

interface Handlers{
  handleLargeFiles: (index: number | boolean, shouldForceSwitch: boolean) => void,
  setTimer: () => void,
  setWarning: (warning: string) => void,
  setError: (error: number) => void,
  updateProgress: (progress: number) => void
}

const getFallbackPath = (initialPath: string): string => {
  const { dir, name, ext } = path.parse(initialPath);
  const random = Math.round(Math.random() * 1000);

  const result = path.join(dir, name + random + ext);
  return result;
};

const set = async (img: string, macPath: string) => {
  const imgPath = path.resolve(img);

  if (typeof imgPath !== 'string') throw new TypeError('Expected a string');
  const os = OS.define();

  if (os === 'win32') {
    const isPackaged = await ipcRenderer.invoke('is-app-packaged');

    const resourcePath = isPackaged ? window.process.resourcesPath : path.join(__dirname, '../../');
    const execPath = path.join(resourcePath, 'build/Wallpaper/Wallpaper.exe');

    await execFile(execPath, [imgPath, 'True']);
  } else if (os === 'linux') {
    const desktopEnv = await OS.defineDesktopEnvironment(os);
    const options = scripts.linux(imgPath);
    const commands = options[desktopEnv as keyof Distros] || options.other;

    Object.keys(commands).forEach(async (command) => {
      await exec(commands[command as keyof LinuxCommands]);
    });
  } else if (os === 'darwin') {
    const macos = scripts.macos(macPath);
    await exec(macos);
    await unlink(macPath);
  }
};

const download = (url: string, initialPath: string, handlers: Handlers): void => {
  const os = OS.define();

  const {
    handleLargeFiles, setTimer, setWarning, setError, updateProgress,
  } = handlers;

  if (isBlacklisted(url, os)) {
    setWarning("The image might crash your desktop. It's been switched to the next one automatically");
    handleLargeFiles(true, true);
    return;
  }

  const callback = (res: any) => { // change
    const size = res.headers['content-length'];

    if (os === 'win32' && (size / 1024 / 1024) >= 27) {
      setWarning("The file is too big. It's been switched to the next one automatically");
      handleLargeFiles(true, true);
    } else {
      const data = new Stream();
      const contentLength = Math.floor(size / 100);
      let downloaded = 0;

      const progressInterval = setInterval(() => {
        updateProgress(downloaded / contentLength);
      }, 100);

      res.on('data', (chunk: any) => { // change
        data.push(chunk);
        downloaded += chunk.length;
      });

      res.on('end', async () => {
        clearInterval(progressInterval);
        const pic = data.read();
        const fallbackPath = getFallbackPath(initialPath);

        await writeFile(os === 'darwin' ? fallbackPath : initialPath, pic);

        await set(initialPath, fallbackPath);
        setTimer();

        updateProgress(0);
      });
    }
  };

  const req = https.get(url, callback);

  req.on('error', () => {
    setError(502);
  });
};

export default { download, set };
