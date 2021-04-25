import React, {
  FC, useState, useEffect, lazy, Suspense,
} from 'react';
import config from '@modules/config';
import OS from '@modules/OS';
import { fetchGeocoding } from '@modules/APIs';
import { Theme } from '@/interfaces/Config';
import { Warning as WarningInterface } from '@interfaces/Warning.d';
import Controls from './Components/Controls/Controls';
import { Warning, CustomWarning } from './Components/Warning/Warning';
import Update from './Components/Update/Update';
import Loading from './Components/Loading/Loading';

import './App.scss';
import './style/global.scss';

const User = lazy(() => import('./Components/User/User'));
const Setup = lazy(() => import('./Components/Setup/Setup'));

const { ipcRenderer } = window.require('electron');

const App: FC = () => {
  const cfg = config.get();

  const [theme, setTheme] = useState(cfg.theme);
  const [isUpdateAvailable, setUpdate] = useState(false);
  const [isRequiredFilled, setIsRequiredFilled] = useState(cfg.isComplete);
  const [isComplete, setIsComplete] = useState(cfg.isComplete);
  const [warning, setWarning] = useState<string | WarningInterface>('');

  const defineLocation = async () => {
    const { isFirstTime } = cfg;
    const location = await fetchGeocoding(() => {});

    if (isFirstTime || typeof isFirstTime === 'undefined') {
      await fetch('https://erin-downloads.herokuapp.com/api/increase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: OS.define(),
          location: location.toLowerCase(),
        }),
      });

      config.set({ isFirstTime: false });
    }
  };

  useEffect(() => {
    defineLocation();

    ipcRenderer.send('component-did-mount');

    ipcRenderer.on('update-is-available', () => {
      setUpdate(true);
    });
  });

  const switchTheme = (): void => {
    const value = theme === Theme.Dark ? Theme.Light : Theme.Dark;

    config.set({
      theme: value,
    });

    setTheme(value);
  };

  const rejectUpdate = () => setUpdate(false);
  const removeWarning = () => setWarning('');

  return (
    <div className={`theme ${theme}`}>
      <Controls />

      <Suspense fallback={<Loading />}>
        { isComplete && isRequiredFilled
          ? (
            <User
              theme={theme}
              setWarning={setWarning}
              switchTheme={switchTheme}
              setIsComplete={setIsComplete}
            />
          )
          : (
            <Setup
              theme={theme}
              isComplete={isComplete}
              switchTheme={switchTheme}
              setWarning={setWarning}
              setIsComplete={setIsComplete}
              setIsRequiredFilled={setIsRequiredFilled}
            />
          )}
      </Suspense>

      { isUpdateAvailable && <Update rejectUpdate={rejectUpdate} setWarning={setWarning} /> }

      { (warning && typeof warning === 'string')
        ? <Warning warning={warning} removeWarning={removeWarning} />
        : warning
        && <CustomWarning warning={warning as WarningInterface} removeWarning={removeWarning} />}
    </div>
  );
};

export default App;
