export interface Config {
  mode: Mode,
  keywords: string[],
  timer: number,
  quality: Quality,
  theme: Theme,
  privacy: boolean,
  shouldStartup: boolean,
  isFirstTime: boolean,
  isSetupComplete: boolean
}

export interface ConfigUpdate extends Partial<Config> {}

export enum Quality {
  High = 'original',
  Medium = 'large2x',
  Low = 'large'
}

export enum Mode {
  Keywords = 'keywords',
  Time = 'time',
  Weather = 'weather'
}

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}
