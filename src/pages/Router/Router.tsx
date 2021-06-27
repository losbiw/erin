import React, { FC } from 'react';
import { Pages, SharedState } from '@interfaces/UserState';
import Home from '../Home/Home';
import Picker from '../Picker/Picker';
import Settings from '../Settings/Settings';
import Info from '../Info/Info';
import './Router.scss';

const Router: FC<SharedState> = ({ current }: SharedState) => {
  if (current === Pages.Home) return <Home />;
  if (current === Pages.Picker) return <Picker />;
  if (current === Pages.Settings) return <Settings />;
  if (current === Pages.Info) return <Info />;

  return <></>;
};

export default Router;
