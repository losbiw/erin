export interface Config{
    mode: Mode,
    keywords: string[],
    timer: number,
    quality: string,
    startup: boolean,
    theme: Theme,
    privacy: boolean,
    isFirstTime: boolean,
    isCompleted: boolean
}

export interface ConfigUpdate extends Partial<Config> {}

export enum Mode{
    Keywords = 'keywords',
    Time = 'time',
    Weather = 'weather'
}

export enum Theme{
    Light = 'light',
    Dark = 'dark'
}