export interface Config{
    mode: keyof Mode,
    keywords: string[],
    timer: number,
    quality: string,
    startup: boolean,
    theme: keyof Theme,
    privacy: boolean,
    isFirstTime: boolean,
    isCompleted: boolean
}

export interface ConfigUpdate{
    mode?: string,
    keywords?: string[],
    timer?: number,
    quality?: string,
    startup?: boolean,
    theme?: keyof Theme,
    privacy?: boolean,
    isFirstTime?: boolean,
    isCompleted?: boolean
}

export interface Mode{
    keywords: 'keywords',
    time: 'time',
    weather: 'weather'
}

export interface Theme{
    light: 'light',
    dark: 'dark'
}