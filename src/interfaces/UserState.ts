import { Config } from '@interfaces/Config';
import Weather from '@interfaces/Weather';

export interface SharedState{
    collection: Picture[],
    pictureIndex: number,
    config: Config,
    isLocked: boolean,
    progress: number,
    current: Pages,
}

export interface State extends SharedState{
    error: number | null,
    weather: Weather | undefined,
    isRequiredFilled: boolean
}

// eslint-disable-next-line no-shadow
export enum Pages{
    Home = 'home',
    Picker = 'picker',
    Settings = 'settings',
    Info = 'info'
}

export interface Picture{
    srcPicker: string,
    srcMain: string,
    photographer: string,
    photographerUrl: string
}
