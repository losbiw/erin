import Weather from '@interfaces/Weather';
import { ErrorCodes } from '@pages/Error/Codes';

export interface WallpaperState {
  collection: Picture[],
  pictureIndex: number,
}

export interface ReduxState {
  error: ErrorCodes | null,
  isDownloadAllowed: boolean,
  isNavbarLocked: boolean
}

export interface State {
  weather: Weather | undefined,
  page: Pages
}

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
