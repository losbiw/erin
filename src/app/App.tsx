import React, {
  FC, useState, useEffect,
} from 'react';
import config from '@modules/config';
import OS from '@modules/OS';
import { fetchGeocoding } from '@modules/APIs';
import { Theme } from '@interfaces/Config';
import WarningInterface from '@interfaces/Warning.d';
import logo from '@logo/erin.png';
import Setup from '@pages/Setup/Setup';
import { connect } from 'react-redux';
import Controls from '@/Controls/Controls';
import Warning from '@/Warning/Warning';
import User from '@/User/User';
import Update from '@/Update/Update';
import { closeWarning as closeWarningAction } from '@/Warning/warningSlice';
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
  const [isSetupComplete, changeSetupCompleteness] = useState(cfg.isSetupComplete);

  const completeSetup = () => changeSetupCompleteness(true);

  const defineLocation = async () => {
    const { isFirstTime } = cfg;

    if (isFirstTime || typeof isFirstTime === 'undefined') {
      const location = await fetchGeocoding();

      // temporarily disable stats collection

      // await fetch('https://erin-downloads.herokuapp.com/api/increase', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: OS.define(),
      //     location: location.toLowerCase(),
      //   }),
      // });

      config.set({ isFirstTime: false });
    }
  };

  useEffect(() => {
    defineLocation();

    ipcRenderer.send('component-did-mount');

    ipcRenderer.on('update-is-available', () => {
      // eslint-disable-next-line no-new
      new Notification('Update available', {
        body: 'Click for more details',
        icon: logo,
      });

      setUpdate(true);
    });
  }, []);

  return (
    <div className={`theme ${theme}`}>
      <Controls />

      { isSetupComplete
        ? <User />
        : <Setup completeSetup={completeSetup} /> }

      { isUpdateAvailable && <Update closeUpdatePrompt={() => setUpdate(false)} />}

      { warning && <Warning warning={warning} closeWarning={closeWarning} /> }
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  warning: state.warning.value,
  theme: state.theme,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeWarning: () => dispatch(closeWarningAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
