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
  setIsComplete: (isComplete: boolean) => void,
  // updateConfig: (config: Config, isRequiredFilled?: boolean) => void
}

const Router: FC<Props> = (props: Props) => {
  const {
    setIsComplete, current,
  } = props;

  if (current === Pages.Home) return <Home />;
  if (current === Pages.Picker) return <Picker />;
  // if (current === Pages.Settings) {
  //   const { updateConfig } = props;

  //   return (
  //     <Settings
  //       setIsComplete={setIsComplete}
  //       updateConfig={updateConfig}
  //     />
  //   );
  // }
  if (current === Pages.Info) return <Info />;

  return <></>;
};

export default Router;
