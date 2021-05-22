import React, {
  FC, useState, useEffect, useRef,
} from 'react';
import config from '@modules/config';
import wallpaper from '@modules/wallpaper/wallpaper';
import time from '@modules/time';
import weatherCodes from '@modules/weather';
import { fetchPexels, fetchWeather } from '@modules/APIs';
import areEqual from '@helpers/areEqual';
import './User.scss';
import {
  Config, Mode, Quality, Theme,
} from '@interfaces/Config';
import { Picture, Pages } from '@interfaces/UserState';
import Weather from '@interfaces/Weather';
import Warning from '@interfaces/Warning';
import Error from '@pages/Error/Error';
import Router from '@pages/Router/Router';
import Nav from '@/Nav/Nav';
import wallpaperPath from '@constants/wallpaperPath';
import timers from './timers';

const { ipcRenderer } = window.require('electron');

interface Props {
  theme: Theme,
  setWarning: (warning: string | Warning) => void,
  setIsComplete: (isComplete: boolean) => void
  switchTheme: () => void
}

const User: FC<Props> = ({
  theme, setWarning, setIsComplete, switchTheme,
}: Props) => {
  const isMounted = useRef(false);

  const [collection, setCollection] = useState<Picture[]>([]);
  const [stateConfig, setConfig] = useState(config.get());
  const [page, setPage] = useState(Pages.Home);
  const [error, setError] = useState<number | null>(null);
  const [currentIndex, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLocked, setLock] = useState(true);
  const [isRequiredComplete, setRequiredComplete] = useState(true);
  const [weather, setWeather] = useState<Weather | undefined>(undefined);

  const getSearchQuery = async (mode: Mode): Promise<string[]> => {
    const req = await fetchWeather(setError);

    timers.weatherUpdate = global.setInterval(async () => {
      const awaitReq = await fetchWeather(setError);

      if (!areEqual.objects(awaitReq, weather)) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        getWallpaperCollection();
      }
    }, 3600000);

    setWeather(req);

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
  };

  const sortPictures = (pictures: any[], quality: Quality): Picture[] => pictures.map((picture) => {
    const { src, photographer, photographer_url: photographerUrl } = picture;

    const result: Picture = {
      srcMain: src[quality],
      srcPicker: src.large,
      photographer,
      photographerUrl,
    };

    return result;
  });

  const getWallpaperCollection = async (): Promise<void> => {
    const { keywords, quality, mode } = stateConfig;

    if (timers.weatherUpdate) {
      clearInterval(timers.weatherUpdate);
    }

    const query = mode === Mode.Keywords ? keywords : await getSearchQuery(mode);
    const fetchRes = await fetchPexels(query, setError);

    if (!fetchRes) return;

    if (fetchRes.length === 0) {
      setError(404);
      setLock(false);

      return;
    }

    const sorted = sortPictures(fetchRes, quality);
    const randomIndex = Math.round(Math.random() * (sorted.length - 1));

    setCollection(sorted);
    setIndex(randomIndex);
    setError(null);
    setLock(true);
  };

  const handleReloadAfterSleep = () => {
    const randomIndex = Math.round(Math.random() * (collection.length - 1));

    setError(null);
    setIndex(randomIndex);
  };

  const switchWallpaper = (index: number | boolean, shouldForceSwitch: boolean): void => {
    if (isLocked && !shouldForceSwitch) {
      setWarning('Please wait until the previous picture is downloaded');
    } else {
      let validated = currentIndex;

      if (typeof index === 'number') validated = index;
      else if (typeof index === 'boolean') validated = index ? currentIndex + 1 : currentIndex - 1;

      if (validated >= collection.length) validated = 0;
      else if (validated < 0) validated = collection.length - 1;

      setIndex(validated);
      setLock(true);
    }
  };

  const setTimer = (): void => {
    const { timer } = stateConfig;

    if (timer) {
      timers.wallpaper = global.setTimeout(() => switchWallpaper(true, false), timer);
    }
  };

  const updateProgress = (progressUpd: number): void => {
    const rounded = Math.floor(progressUpd);

    if (rounded === 0) setLock(false);
    setProgress(rounded);
  };

  const setWallpaper = (url: string): void => {
    if (timers.wallpaper) {
      clearTimeout(timers.wallpaper);
    }

    wallpaper.download(url, wallpaperPath, {
      setWarning,
      handleLargeFiles: switchWallpaper,
      setTimer,
      setError,
      updateProgress,
    });
  };

  useEffect(() => {
    getWallpaperCollection();

    ipcRenderer.on('switch-wallpaper', (_e: Electron.IpcRendererEvent, args: boolean) => switchWallpaper(args, false));

    ipcRenderer.on('unlock-screen', () => {
      if (window.navigator.onLine) {
        handleReloadAfterSleep();
      }
    });

    window.addEventListener('online', handleReloadAfterSleep);

    return () => {
      window.removeEventListener('online', handleReloadAfterSleep);
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) setWallpaper(collection[currentIndex].srcMain);
    else isMounted.current = true;
  }, [currentIndex]);

  useEffect(() => {
    // if (isMounted.current && isRequiredComplete) {
    //   getWallpaperCollection('config');
    // } else if (isMounted.current) {
    //   setPage(Pages.Settings);
    // }
  }, [stateConfig]);

  const updateConfig = (cfg: Config, isFilled?: boolean): void => {
    setConfig(cfg);
    setRequiredComplete(isFilled || isRequiredComplete);
  };

  return (
    <div className="user">
      <Nav
        current={page}
        changePage={setPage}
        theme={theme}
        switchTheme={switchTheme}
      />

      { error && (page === Pages.Home || page === Pages.Picker)
        ? <Error code={error} />
        : (
          <Router
            setWarning={setWarning}
            setIsComplete={setIsComplete}
            switchWallpaper={switchWallpaper}
            updateConfig={updateConfig}
            current={page}
            collection={collection}
            pictureIndex={currentIndex}
            isLocked={isLocked}
            progress={progress}
            config={stateConfig}
          />
        )}
    </div>
  );
};

export default User;
