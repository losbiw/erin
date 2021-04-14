import React from 'react';
import Inline from './Inline'
import { Group } from '@interfaces/Icon';

import Home from '@nav/home.svg';
import Picker from '@nav/picker.svg';
import Settings from '@nav/settings.svg';
import Info from '@nav/info.svg';

const icons: Group = { 
    Home: () => <Inline raw={ Home }/>, 
    Picker: () => <Inline raw={ Picker }/>, 
    Settings: () => <Inline raw={ Settings }/>, 
    Info: () => <Inline raw={ Info }/>
}

export = icons