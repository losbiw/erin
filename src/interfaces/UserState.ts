import { Config } from '@interfaces/Config';
import Weather from '@interfaces/Weather';
import ErrorCodes from '@pages/Error/Codes';

export interface WallpaperState {
  collection: Picture[],
  pictureIndex: number,
}

export interface ReduxState {
  isDownloadAllowed: boolean,
  config: Config,
}

export interface SharedState extends ReduxState {
  current: Pages,
}

export interface State extends SharedState {
  error: keyof typeof ErrorCodes | null,
  weather: Weather | undefined,
  isRequiredFilled: boolean
}

// eslint-disable-next-line no-shadow
export enum Pages {
  Home = 'home',
  Picker = 'picker',
  Settings = 'settings',
  Info = 'info'
}

export interface Picture {
  srcPicker: string,
  srcMain: string,
  photographer: string,
  photographerUrl: string
}
