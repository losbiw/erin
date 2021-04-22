import { Config } from '@interfaces/Config'
import Weather from '@interfaces/Weather'

export interface State{
    collection: Picture[],
    pictureIndex: number,
    config: Config,
    isLocked: boolean,
    progress: number,
    error: number | null,
    current: Pages,
    weather: Weather | undefined, //change
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