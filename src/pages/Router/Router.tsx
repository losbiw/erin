import React, { FC } from 'react';
import { Pages, SharedState } from '@interfaces/UserState';
import Warning from '@interfaces/Warning';
import { Config } from '@interfaces/Config';
import Home from '../Home/Home';
import Picker from '../Picker/Picker';
import Settings from '../Settings/Settings';
import Info from '../Info/Info';
import './Router.scss';

interface Props extends SharedState {
  switchWallpaper: (index: number | boolean, shouldForceSwitch: boolean) => void,
  setWarning: (warning: string | Warning) => void,
  setIsComplete: (isComplete: boolean) => void,
  updateConfig: (config: Config, isRequiredFilled?: boolean) => void
}

const Router: FC<Props> = (props: Props) => {
  const {
    switchWallpaper, setIsComplete, current, collection, pictureIndex, isLocked, progress, config,
  } = props;

  if (current === Pages.Home && collection.length > 0) {
    return (
      <Home
        picture={collection[pictureIndex]}
        isLocked={isLocked}
        progress={progress}
        pictureIndex={pictureIndex}
        switchWallpaper={switchWallpaper}
      />
    );
  }
  if (current === Pages.Picker) {
    return (
      <Picker
        pictureIndex={pictureIndex}
        collection={collection}
        isLocked={isLocked}
        progress={progress}
        switchWallpaper={switchWallpaper}
      />
    );
  }
  if (current === Pages.Settings) {
    const { setWarning, updateConfig } = props;

    return (
      <Settings
        config={config}
        setWarning={setWarning}
        setIsComplete={setIsComplete}
        updateConfig={updateConfig}
      />
    );
  }
  if (current === Pages.Info) {
    const { setWarning } = props;

    return (
      <Info setWarning={setWarning} />
    );
  }

  return <></>;
};

export default Router;
