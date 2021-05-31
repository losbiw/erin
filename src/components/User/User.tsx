import React, { Component } from 'react';
import config from '@modules/config';
import wallpaper from '@modules/wallpaper/wallpaper';
import time from '@modules/time';
import weatherCodes from '@modules/weather';
import { fetchPexels, fetchWeather } from '@modules/APIs';
import areEqual from '@helpers/areEqual';
import './User.scss';
import {
  Config, Mode, Quality,
} from '@interfaces/Config';
import { State, Picture, Pages } from '@interfaces/UserState';
import Error from '@pages/Error/Error';
import Router from '@pages/Router/Router';
import Nav from '@/Nav/Nav';
import switchWallpaper from './redux-helpers/switchWallpaper';

const { join } = window.require('path');
const { ipcRenderer } = window.require('electron');

interface Props {
  setIsComplete: (isComplete: boolean) => void,

}

interface Timers {
  wallpaper: NodeJS.Timeout | undefined
  weatherUpdate: NodeJS.Timeout | undefined
}

class User extends Component<Props, State> {
  private savePath: string;

  private timers: Timers = {
    wallpaper: undefined,
    weatherUpdate: undefined,
  }

  constructor(props: Props) {
    super(props);

    const appPath = config.getAppPath();
    this.savePath = join(appPath, 'wallpaper.jpg');

    this.state = {
      config: config.get(),
      error: null,
      current: Pages.Home,
      weather: undefined,
      isRequiredFilled: true,
    };
  }

  async componentDidMount() {
    const { handleReloadAfterSleep, getWallpaperCollection } = this;
    getWallpaperCollection();

    ipcRenderer.on('switch-wallpaper', (_e: Electron.IpcRendererEvent, args: boolean) => {
      // switchWallpaper(args, false);
      switchWallpaper(args);
    });

    ipcRenderer.on('unlock-screen', () => {
      if (window.navigator.onLine) {
        handleReloadAfterSleep();
      }
    });
    window.addEventListener('online', handleReloadAfterSleep);
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    const {
      config: stateConfig, pictureIndex, collection, isRequiredFilled,
    } = this.state;

    if (stateConfig !== prevState.config && !isRequiredFilled) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        current: Pages.Settings,
      });
    } else if (stateConfig !== prevState.config) {
      this.getWallpaperCollection();
    } else if (pictureIndex !== prevState.pictureIndex) {
      this.setWallpaper(collection, pictureIndex);
    }
  }

  componentWillUnmount() {
    const { handleReloadAfterSleep } = this;
    window.removeEventListener('online', handleReloadAfterSleep);
  }

  handleReloadAfterSleep = () => {
    const { collection } = this.state;
    const randomIndex = Math.round(Math.random() * (collection.length - 1));

    this.setState({
      error: null,
      pictureIndex: randomIndex,
    });
  }

  getWallpaperCollection = async (): Promise<void> => {
    const {
      sortPictures, getSearchQuery, setError, timers,
    } = this;
    const { config: cfg } = this.state;
    const { keywords, quality, mode } = cfg;

    if (timers.weatherUpdate) {
      clearInterval(timers.weatherUpdate);
    }

    const query = await getSearchQuery(mode, keywords);
    const fetchRes = await fetchPexels(query, setError);

    if (!fetchRes) return;

    if (fetchRes.length === 0) {
      this.setState({
        error: 404,
        isLocked: false,
      });

      return;
    }

    const sorted = sortPictures(fetchRes, quality);
    const randomIndex = Math.round(Math.random() * (sorted.length - 1));

    this.setState({
      collection: sorted,
      pictureIndex: randomIndex,
      error: null,
      isLocked: true,
    });
  }

  getSearchQuery = async (mode: Mode, keywords: string[]): Promise<string[]> => {
    if (mode === Mode.Keywords) {
      return keywords;
    }

    const { getWallpaperCollection, setError, state } = this;
    const req = await fetchWeather(setError);

    this.timers.weatherUpdate = global.setInterval(async () => {
      const timerReq = await fetchWeather(setError);
      const { weather } = state;

      if (!areEqual.objects(timerReq, weather)) {
        getWallpaperCollection();
      }
    }, 1000 * 3600);

    this.setState({
      weather: req,
    });

    if (mode === Mode.Weather && req) {
      const converted = weatherCodes.convertMain(req.main);
      return [converted];
    }
    if (mode === Mode.Time && req) {
      const { sunrise, sunset } = req.time;
      const keyword = time.convert({ sunrise, sunset });

      return [keyword];
    }
    return [];
  }

  setWallpaper = (collection: Picture[], index: number): void => {
    if (this.timers.wallpaper) {
      clearTimeout(this.timers.wallpaper);
    }

    const {
      savePath, setTimer, setError,
    } = this;
    const url = collection[index].srcMain;

    wallpaper.download(url, savePath, {
      setTimer,
      setError,
    });
  }

  setTimer = (): void => {
    const { config: cfg } = this.state;
    const { timer } = cfg;

    if (timer) {
      this.timers.wallpaper = global.setTimeout(
        () => switchWallpaper(true), timer,
      );
    }
  }

  sortPictures = (pictures: any[], quality: Quality): Picture[] => pictures.map((picture) => {
    const { src, photographer, photographer_url: photographerUrl } = picture;

    const result: Picture = {
      srcMain: src[quality],
      srcPicker: src.large,
      photographer,
      photographerUrl,
    };

    return result;
  });

  updateConfig = (cfg: Config, isFilled?: boolean): void => {
    const { isRequiredFilled } = this.state;

    this.setState({
      config: cfg,
      isRequiredFilled: isFilled || isRequiredFilled,
    });
  }

  // default state managers

  changePage = (name: Pages): void => {
    this.setState({
      current: name,
    });
  }

  setError = (error: number): void => {
    this.setState({
      error,
    });
  }

  render() {
    const {
      changePage, updateConfig, state, props,
    } = this;
    const { setIsComplete } = props;
    const {
      error, current, collection, pictureIndex, isLocked, config: stateConfig,
    } = state;

    return (
      <div className="user">
        <Nav
          current={current}
          changePage={changePage}
        />

        { error && (current === Pages.Home || current === Pages.Picker)
          ? <Error code={error} />
          : (
            <Router
              setIsComplete={setIsComplete}
              updateConfig={updateConfig}
              current={current}
              config={stateConfig}
            />
          )}
      </div>
    );
  }
}

export default User;
