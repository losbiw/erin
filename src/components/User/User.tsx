import React, { Component } from 'react';
import cfg from '@modules/config';
import wallpaper from '@modules/wallpaper/wallpaper';
import time from '@modules/time';
import weatherCodes from '@modules/weather';
import { fetchPexels, fetchWeather } from '@modules/APIs';
import areEqual from '@helpers/areEqual';
import './User.scss';
import { Config, Mode } from '@interfaces/Config';
import {
  State, Picture, Pages, WallpaperState,
} from '@interfaces/UserState';
import Error from '@pages/Error/Error';
import Router from '@pages/Router/Router';
import Nav from '@/Nav/Nav';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '@app/store';
import { ErrorCodes } from '@pages/Error/Codes';
import switchWallpaper, { setNextWallpaper } from '@redux/helpers/switchWallpaper';
import resetErrorAndSetIndex from '@redux/helpers/resetErrorAndSetIndex';
import { setIndexByNumber, resetCollection as resetCollectionAction } from './slices/wallpaperSlice';

const { join } = window.require('path');
const { ipcRenderer } = window.require('electron');

interface Props extends WallpaperState {
  config: Config,
  error: ErrorCodes | null,
  setIndex: (index: number) => void,
  resetCollection: () => void
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

    const appPath = cfg.getAppPath();
    this.savePath = join(appPath, 'wallpaper.jpg');

    this.state = {
      current: Pages.Home,
      weather: undefined,
      isRequiredFilled: true,
    };
  }

  async componentDidMount() {
    const { handleReloadAfterSleep, getWallpaperCollection } = this;
    getWallpaperCollection();

    ipcRenderer.on('switch-wallpaper', (_e: Electron.IpcRendererEvent, args: boolean) => {
      switchWallpaper(args);
    });

    ipcRenderer.on('unlock-screen', () => {
      if (window.navigator.onLine) {
        handleReloadAfterSleep();
      }
    });
    window.addEventListener('online', handleReloadAfterSleep);
  }

  componentDidUpdate(prevProps: Props) {
    const { isRequiredFilled } = this.state;
    const {
      pictureIndex, collection, config, resetCollection,
    } = this.props;

    if (config !== prevProps.config && !isRequiredFilled) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        current: Pages.Settings,
      });
    } else if (config !== prevProps.config) {
      resetCollection();
      this.getWallpaperCollection();
    } else if (pictureIndex !== prevProps.pictureIndex) {
      this.setWallpaper(collection, pictureIndex);
    }
  }

  componentWillUnmount() {
    const { handleReloadAfterSleep } = this;
    window.removeEventListener('online', handleReloadAfterSleep);
  }

  handleReloadAfterSleep = () => {
    const { collection } = this.props;
    const randomIndex = Math.round(Math.random() * (collection.length - 1));

    resetErrorAndSetIndex(randomIndex);
  }

  getWallpaperCollection = async (): Promise<void> => {
    const { getSearchQuery, timers } = this;
    const { config } = this.props;
    const { keywords, quality, mode } = config;

    if (timers.weatherUpdate) {
      clearInterval(timers.weatherUpdate);
    }

    const queries = await getSearchQuery(mode, keywords);
    await fetchPexels(queries, quality);
  }

  getSearchQuery = async (mode: Mode, keywords: string[]): Promise<string[]> => {
    if (mode === Mode.Keywords) {
      return keywords;
    }

    const { getWallpaperCollection, state } = this;
    const req = await fetchWeather();

    this.timers.weatherUpdate = global.setInterval(async () => {
      const timerReq = await fetchWeather();
      const { weather } = state;

      if (!areEqual.objects(timerReq, weather, true)) {
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

    const { savePath, setTimer } = this;
    const url = collection[index].srcMain;

    wallpaper.download(url, savePath, {
      setTimer,
    });
  }

  setTimer = (): void => {
    const { config } = this.props;
    const { timer } = config;

    if (timer) {
      this.timers.wallpaper = global.setTimeout(
        () => setNextWallpaper(), timer,
      );
    }
  }

  changePage = (name: Pages): void => {
    this.setState({
      current: name,
    });
  }

  render() {
    const {
      changePage, state, props,
    } = this;
    const { error } = props;
    const { current } = state;

    return (
      <div className="user">
        <Nav
          current={current}
          changePage={changePage}
        />

        { error && (current === Pages.Home || current === Pages.Picker)
          ? <Error code={error} />
          : <Router current={current} /> }
      </div>
    );
  }
}

const mapStateToProps = ({ general, wallpaper: wallpaperState, settings }: RootState) => ({
  config: settings.config,
  error: general.error,
  collection: wallpaperState.collection,
  pictureIndex: wallpaperState.pictureIndex,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  resetCollection: () => dispatch(resetCollectionAction()),
  setIndex: (index: number) => dispatch(setIndexByNumber(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
