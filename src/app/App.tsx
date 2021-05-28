import React, {
  FC, useState, useEffect,
} from 'react';
import config from '@modules/config';
import OS from '@modules/OS';
import { fetchGeocoding } from '@modules/APIs';
import { Theme } from '@interfaces/Config';
import WarningInterface from '@interfaces/Warning.d';
import logo from '@app/erin.png';
import Controls from '@/Controls/Controls';
import Warning from '@/Warning/Warning';
import User from '@/User/User';
import Setup from '@/Setup/Setup';
import Update from '@/Update/Update';

import './App.scss';
import '../style/global.scss';

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

    if (isFirstTime || typeof isFirstTime === 'undefined') {
      const location = await fetchGeocoding(() => { });

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
      const notification = new Notification('Update available', {
        body: 'Click here for more details',
        icon: logo,
      });

      setUpdate(true);
    });
  }, []);

  const switchTheme = () => {
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

      { isUpdateAvailable && <Update rejectUpdate={rejectUpdate} setWarning={setWarning} />}

      {warning && (
        <Warning
          message={typeof warning === 'string' ? warning : warning.message}
          Icon={typeof warning !== 'string' ? warning.Icon : undefined}
          removeWarning={removeWarning}
        />
      )}
    </div>
  );
};

export default App;
