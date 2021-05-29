import React, {
  FC, useState, useEffect,
} from 'react';
import config from '@modules/config';
import OS from '@modules/OS';
import { fetchGeocoding } from '@modules/APIs';
import { Theme } from '@interfaces/Config';
import WarningInterface from '@interfaces/Warning.d';
import logo from '@logo/erin.png';
import Controls from '@/Controls/Controls';
import Warning from '@/Warning/Warning';
import User from '@/User/User';
import Setup from '@/Setup/Setup';
import Update from '@/Update/Update';
import { connect } from 'react-redux';
import { closeWarning as closeWarningAction } from '@slices/warningSlice';
import { AppDispatch, RootState } from './store';

import './App.scss';
import '../style/global.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  warning: string | WarningInterface,
  theme: Theme,
  closeWarning: () => void,
}

const App: FC<Props> = ({ warning, theme, closeWarning }: Props) => {
  const cfg = config.get();

  const [isUpdateAvailable, setUpdate] = useState(false);
  const [isRequiredFilled, setIsRequiredFilled] = useState(cfg.isComplete);
  const [isComplete, setIsComplete] = useState(cfg.isComplete);

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
            setIsComplete={setIsComplete}
            setIsRequiredFilled={setIsRequiredFilled}
          />
        )}

      { isUpdateAvailable && <Update /> }

      {warning && (
        <Warning
          message={typeof warning === 'string' ? warning : warning.message}
          Icon={typeof warning !== 'string' ? warning.Icon : undefined}
          closeWarning={closeWarning}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  warning: state.warning.value,
  theme: state.theme.value,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeWarning: () => dispatch(closeWarningAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
