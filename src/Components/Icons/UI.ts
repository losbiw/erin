import { JsxGroup } from '@/types/Icon';
import Icons from '../Svg/Loader'

import Arrow from 'raw-loader!@ui/arrow.svg'
import Warning from 'raw-loader!@ui/warning.svg'
import Cross from 'raw-loader!@ui/cross.svg'
import Circle from 'raw-loader!@ui/circle.svg'
import Accept from 'raw-loader!@ui/accept.svg'
import Download from 'raw-loader!@ui/download.svg'
import Clipboard from 'raw-loader!@ui/clipboard.svg'

const Arrows: JsxGroup = Icons.load({
    Forward: Arrow,
    Back: Arrow
})

const Crosses: JsxGroup = Icons.load({
    Green: {
        path: Cross
    },
    Yellow: {
        path: Cross,
        gradient: {
            from: '#fdfc47',
            to: '#fdc830'
        }
    },
    Red: {
        path: Cross,
        gradient: {
            from: '#D31027',
            to: '#EA384D'
        }
    }
})

const General: JsxGroup = Icons.load({
    Circle,
    Accept,
    Clipboard,
    Warning: {
        path: Warning,
        gradient: {
            from: '#fdfc47',
            to: '#fdc830'
        }
    },
    Download: {
        path: Download,
        gradient: {
            from: '#fdfc47',
            to: '#fdc830'
        }
    }
})

export { Arrows, Crosses, General }