import React, { FC } from 'react';
import { Pages } from '@interfaces/UserState';
import Home from '../Home/Home';
import Picker from '../Picker/Picker';
import Settings from '../Settings/Settings';
import Info from '../Info/Info';
import './Router.scss';

interface Props {
  page: Pages
}

const Router: FC<Props> = ({ page }: Props) => {
  if (page === Pages.Home) return <Home />;
  if (page === Pages.Picker) return <Picker />;
  if (page === Pages.Settings) return <Settings />;
  if (page === Pages.Info) return <Info />;

  return <></>;
};

export default Router;
