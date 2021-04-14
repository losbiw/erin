import React from 'react';
import Inline from './Inline'
import { Group } from '@interfaces/Icon';

import Moon from '@themes/moon.svg';
import Sun from '@themes/sun.svg';

const icons: Group = { 
    Moon: () => <Inline raw={ Moon }/>,
    Sun: () => <Inline raw={ Sun }/>, 
}

export = icons