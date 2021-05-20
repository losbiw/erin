import React from 'react';
import { Group } from '@interfaces/Icon';

import Home from '@nav/home.svg';
import Picker from '@nav/picker.svg';
import Settings from '@nav/settings.svg';
import Info from '@nav/info.svg';
import Inline from './Inline';

const icons: Group = {
  Home: () => <Inline raw={Home} />,
  Picker: () => <Inline raw={Picker} />,
  Settings: () => <Inline raw={Settings} />,
  Info: () => <Inline raw={Info} />,
};

export = icons
