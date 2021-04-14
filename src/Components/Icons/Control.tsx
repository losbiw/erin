import React from 'react';
import Inline from './Inline'
import { Group } from '@interfaces/Icon';

import Minimize from '@controls/minimize.svg';
import Maximize from '@controls/maximize.svg';
import Restore from '@controls/restore.svg';

const icons: Group = {
    Minimize: () => <Inline raw={ Minimize }/>,
    Maximize: () => <Inline raw={ Maximize }/>,
    Restore: () => <Inline raw={ Restore }/>
}

export = icons