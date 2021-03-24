import { Config } from './Config.d'

export interface State{
    collection: Picture[],
    pictureIndex: number,
    config: Config, //change
    isLocked: boolean,
    progress: number,
    error: number | undefined,
    current: Pages,
    position: any, //change
    weather: any, //change
    isRequiredFilled: boolean
}

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