import React, { Component } from 'react';
import config from '@modules/config';
import wallpaper from '@/modules/wallpaper/wallpaper';
import time from '@modules/time';
import weatherCodes from '@modules/weather';
import { fetchPexels, fetchWeather } from '@modules/APIs';
import areEqual from '@modules/areEqual';
import './User.scss';
import {
  Config, Mode, Quality, Theme,
} from '@/interfaces/Config';
import { State, Picture, Pages } from '@/interfaces/UserState';
import { Warning } from '@/interfaces/Warning';
import Error from '../Error/Error';
import Page from '../Page/Page';
import Nav from '../Nav/Nav';

const { join } = window.require('path');
const { ipcRenderer } = window.require('electron');

interface Props{
    theme: Theme,
    setWarning: (warning: string | Warning) => void,
    setIsComplete: (isComplete: boolean) => void
    switchTheme: () => void
}

interface Timers{
    wallpaper: NodeJS.Timeout | undefined
    weatherUpdate: NodeJS.Timeout | undefined
}

export default class User extends Component<Props, State> {
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
        collection: [],
        pictureIndex: 0,
        config: config.get(),
        isLocked: true,
        progress: 0,
        error: null,
        current: Pages.Home,
        weather: undefined,
        isRequiredFilled: true,
      };
    }

    async componentDidMount() {
      const { handleReloadAfterSleep, switchWallpaper, getWallpaperCollection } = this;
      getWallpaperCollection();

      ipcRenderer.on('switch-wallpaper', (_e: Electron.IpcRendererEvent, args: boolean) => switchWallpaper(args, false));

      ipcRenderer.on('unlock-screen', handleReloadAfterSleep);
      window.addEventListener('online', handleReloadAfterSleep);
    }

    componentDidUpdate(_prevProps: Props, prevState: State) {
      const {
        config: cfg, pictureIndex, collection, isRequiredFilled,
      } = this.state;

      if (cfg !== prevState.config && isRequiredFilled) {
        this.getWallpaperCollection();
      } else if (cfg !== prevState.config) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          current: Pages.Settings,
        });
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
      const randomIndex = Math.round(Math.random() * collection.length);

      this.setState({
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
      const randomIndex = Math.round(Math.random() * sorted.length);

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
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const req = await fetchWeather(setError);
        const { weather } = state;

        if (!areEqual.objects(req, weather)) {
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
        savePath, switchWallpaper, setTimer, setError, updateProgress,
      } = this;
      const url = collection[index].srcMain;
      const { setWarning } = this.props;

      wallpaper.download(url, savePath, {
        setWarning,
        handleLargeFiles: switchWallpaper,
        setTimer,
        setError,
        updateProgress,
      });
    }

    setTimer = (): void => {
      const { config: cfg } = this.state;
      const { timer } = cfg;

      if (timer) {
        this.timers.wallpaper = global.setTimeout(() => this.switchWallpaper(true, false), timer);
      }
    }

    switchWallpaper = (index: number | boolean, isUnlocked: boolean): void => {
      const { collection, isLocked, pictureIndex } = this.state;
      const { setWarning } = this.props;

      if (isLocked && !isUnlocked) {
        setWarning('Please wait until the previous picture is downloaded');
      } else {
        let validated = pictureIndex;

        if (typeof index === 'number') validated = index;
        else if (typeof index === 'boolean') validated = index ? pictureIndex + 1 : pictureIndex - 1;

        if (validated >= collection.length) validated = 0;
        else if (validated < 0) validated = collection.length - 1;

        this.setState({
          pictureIndex: validated,
          isLocked: true,
        });
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

    changePage = (name: Pages): void => {
      this.setState({
        current: name,
      });
    }

    updateProgress = (progress: number): void => {
      const { isLocked } = this.state;

      this.setState({
        progress,
        isLocked: progress === 0 ? false : isLocked,
      });
    }

    updateConfig = (cfg: Config, isFilled?: boolean): void => {
      const { isRequiredFilled } = this.state;

      this.setState({
        config: cfg,
        isRequiredFilled: isFilled || isRequiredFilled,
      });
    }

    setError = (error: number): void => {
      this.setState({
        error,
      });
    }

    render() {
      const {
        changePage, switchWallpaper, updateConfig, state, props,
      } = this;
      const { setWarning, setIsComplete } = props;
      const {
        error, current, collection, pictureIndex, isLocked, progress, config: cfg,
      } = state;

      return (
        <div className="user">
          <Nav
            current={current}
            changePage={changePage}
            theme={props.theme}
            switchTheme={props.switchTheme}
          />

          { error && (current === Pages.Home || current === Pages.Picker)
            ? <Error code={error} />
            : (
              <Page
                setWarning={setWarning}
                setIsComplete={setIsComplete}
                switchWallpaper={switchWallpaper}
                updateConfig={updateConfig}
                current={current}
                collection={collection}
                pictureIndex={pictureIndex}
                isLocked={isLocked}
                progress={progress}
                config={cfg}
              />
            )}
        </div>
      );
    }
}
