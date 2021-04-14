import React from 'react';
import Inline from './Inline'
import { Group } from '@interfaces/Icon';

import Arrow from '@ui/arrow.svg'
import Warning from '@ui/warning.svg'
import Red from '@ui/red.svg'
import Yellow from '@ui/yellow.svg'
import Green from '@ui/cross.svg'
import Circle from '@ui/circle.svg'
import Accept from '@ui/accept.svg'
import Download from '@ui/download.svg'
import Clipboard from '@ui/clipboard.svg'

const Arrows: Group = {
    Forward: () => <Inline raw={ Arrow }/>,
    Back: () => <Inline raw={ Arrow }/>, 
}

const Crosses: Group = {
    Green: () => <Inline raw={ Green }/>, 
    Yellow: () => <Inline raw={ Yellow }/>, 
    Red: () => <Inline raw={ Red }/>, 
}

const General: Group = {
    Circle: () => <Inline raw={ Circle }/>, 
    Accept: () => <Inline raw={ Accept }/>, 
    Clipboard: () => <Inline raw={ Clipboard }/>, 
    Warning: () => <Inline raw={ Warning }/>, 
    Download: () => <Inline raw={ Download }/>, 
}

export { Arrows, Crosses, General }