import {
  Config, ConfigUpdate, Mode, Quality, Theme,
} from '@interfaces/Config';
import startup from './startup';

const { ipcRenderer } = window.require('electron');
const { join } = window.require('path');
const { readFileSync, writeFileSync, statSync } = window.require('fs');

const isDarkMode = (): boolean => ipcRenderer.sendSync('should-use-dark-mode') as boolean;

const getDefaultOptions = (): Config => ({
  mode: Mode.Keywords,
  keywords: ['mountains'],
  timer: 60000,
  quality: Quality.High,
  shouldStartup: true,
  theme: isDarkMode() ? Theme.Dark : Theme.Light,
  privacy: false,
  isFirstTime: true,
  isSetupComplete: false,
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
  const defaultConfig = getDefaultOptions();

  try {
    const configPath = getConfigPath();
    statSync(configPath);
    const cfg = readFileSync(configPath, 'utf8');
    const json = JSON.parse(cfg);

    return isMatchingSchema(json) ? json : defaultConfig;
  } catch {
    return defaultConfig;
  }
};

const set = (options: ConfigUpdate) => {
  const cfg: Config = get();
  const cfgPath = getConfigPath();

  const updated = { ...cfg, ...options };

  const json = JSON.stringify(updated);
  startup.set(options.shouldStartup as boolean);

  writeFileSync(cfgPath, json, 'utf8');
};

export default {
  get, set, getAppPath, getDefaultOptions,
};
