import {
  Config, ConfigUpdate, Mode, Quality, Theme,
} from '@/interfaces/Config';
import startup from './startup';

const { ipcRenderer } = window.require('electron');
const { join } = window.require('path');
const fs = window.require('fs');

const getDefaultOptions = (): Config => ({
  mode: Mode.Keywords,
  keywords: ['mountains'],
  timer: 60000,
  quality: Quality.High,
  startup: true,
  theme: Theme.Dark,
  privacy: false,
  isFirstTime: true,
  isComplete: false,
});

const getAppPath = (): string => ipcRenderer.sendSync('get-app-path') as string;

const getConfigPath = (): string => {
  const appPath = getAppPath();
  const cfgPath: string = join(appPath, 'config.json');

  return cfgPath;
};

const isMatchingSchema = (cfg: Config): boolean => {
  const configKeys = Object.keys(getDefaultOptions());
  let isMatching = true;

  configKeys.forEach((prop) => {
    if (!Object.prototype.hasOwnProperty.call(cfg, prop)) isMatching = false;
  });

  return isMatching;
};

const get = (): Config => {
  const cfgPath = getConfigPath();

  if (fs.existsSync(cfgPath)) {
    const cfg = fs.readFileSync(cfgPath, 'utf8');

    try {
      const json = JSON.parse(cfg);
      return isMatchingSchema(json) ? json : getDefaultOptions();
    } catch { return getDefaultOptions(); }
  } else {
    return getDefaultOptions();
  }
};

const set = (options: ConfigUpdate): void => {
  const updated: Config = get();
  const cfgPath = getConfigPath();

  Object.keys(options).forEach((key) => {
    const configKey = key as keyof Config;
    (updated as any)[configKey] = options[configKey];
  });

  const json = JSON.stringify(updated);
  startup.set(options.startup as boolean);

  fs.writeFileSync(cfgPath, json, (err: Error) => {
    if (err) throw err;
  });
};

export default {
  get, set, getAppPath, getDefaultOptions,
};
