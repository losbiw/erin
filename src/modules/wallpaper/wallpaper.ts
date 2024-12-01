import { LinuxCommands, Distros } from '@interfaces/Linux.d';
import * as https from 'https';
import { IncomingMessage } from 'http';
import store from '@app/store';
import Warning from '@interfaces/Warning';
import resetProgressAndAllowDownload from '@redux/helpers/resetProgressAndAllowDownload';
import handleError from '@redux/helpers/handleError';
import { incrementIndex } from '@/User/slices/wallpaperSlice';
import { addWarning } from '@/Warning/warningSlice';
import { setProgress } from '@/ProgressBar/progressSlice';
import OS from '../OS';
import isBlacklisted from './blacklist';
import * as scripts from './scripts';

const { writeFile, unlink, readdir } = window.require('fs').promises;

const path = window.require('path');
const { ipcRenderer } = window.require('electron');
const { promisify } = window.require('util');
const { execFile: _execFile, exec: _exec } = window.require('child_process');
const Stream = require('stream').Transform;

const exec = promisify(_exec);
const execFile = promisify(_execFile);

interface Handlers {
  setTimer: () => void,
}

const getFallbackPath = (initialPath: string): string => {
  const { dir, name, ext } = path.parse(initialPath);
  const random = Math.round(Math.random() * 1000);

  const result = path.join(dir, name + random + ext);
  return result;
};

const cleanupImages = async (initPath: string) => {
  const dirName = path.dirname(initPath);

  const filesList = await readdir(dirName);
  const images = filesList.filter((file: string) => /.jpg|.jpeg/.test(file));

  // eslint-disable-next-line no-restricted-syntax
  for (const image of images) {
    const imgPath = path.join(dirName, image);

    if (imgPath !== initPath) {
    // eslint-disable-next-line no-await-in-loop
      await unlink(imgPath);
    }
  }
};

const set = async (imgPath: string) => {
  const resolvedImgPath = path.resolve(imgPath);
  const os = OS.define();

  if (os === 'win32') {
    const isPackaged = await ipcRenderer.invoke('is-app-packaged');

    const resourcePath = isPackaged ? path.join(window.process.resourcesPath, 'build') : path.join(__dirname, '../../../electron');
    const execPath = path.join(resourcePath, 'Wallpaper.exe');

    await execFile(execPath, [resolvedImgPath]);
  } else if (os === 'linux') {
    await cleanupImages(resolvedImgPath);

    const desktopEnv = await OS.defineDesktopEnvironment(os);
    const options = scripts.linux(resolvedImgPath);
    const commands = options[desktopEnv as keyof Distros] || options.other;

    Object.keys(commands).forEach(async (command) => {
      await exec(commands[command as keyof LinuxCommands]);
    });
  } else if (os === 'darwin') {
    const macScript = scripts.macos(resolvedImgPath);
    await exec(macScript);

    // Arbitrary timeout value as it appears impossible to fully await MacOS setting the wallpaper which results in premature deletion
    setTimeout(() => unlink(resolvedImgPath), 5000);
  }
};

const setWarning = (warning: string | Warning) => store.dispatch(addWarning(warning));
const skipLargeFile = () => store.dispatch(incrementIndex());

const download = (url: string, initialPath: string, handlers: Handlers): void => {
  const os = OS.define();

  const { setTimer } = handlers;

  if (isBlacklisted(url, os)) {
    setWarning("The image might crash your desktop. It's been switched to the next one automatically");
    skipLargeFile();
    return;
  }

  const callback = (res: IncomingMessage) => {
    const { dispatch } = store;
    const size = parseInt(res.headers['content-length'] as string, 10);

    if (os === 'win32' && (size / 1024 / 1024) >= 27) {
      setWarning("The file is too big. It's been switched to the next one automatically");
      skipLargeFile();
    } else {
      const data = new Stream();
      const contentLength = Math.floor(size / 100);
      let downloaded = 0;

      const progressInterval = setInterval(() => {
        dispatch(setProgress(downloaded / contentLength));
      }, 100);

      res.on('data', (chunk: any) => { // change
        data.push(chunk);
        downloaded += chunk.length;
      });

      res.on('end', async () => {
        clearInterval(progressInterval);
        const pic = data.read();
        const fallbackPath = getFallbackPath(initialPath);

        const imgPath = os === 'darwin' || os === 'linux' ? fallbackPath : initialPath;

        await writeFile(imgPath, pic);
        await set(imgPath);

        setTimer();

        resetProgressAndAllowDownload();
      });
    }
  };

  https.get(url, callback)
    .on('error', () => {
      handleError(502);
    });
};

export default { download, set };
