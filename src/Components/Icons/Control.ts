import { JsxGroup } from '@interfaces/Icon';
import Icons from '../Svg/Loader'

import Minimize from 'raw-loader!@controls/minimize.svg';
import Maximize from 'raw-loader!@controls/maximize.svg';
import Restore from 'raw-loader!@controls/restore.svg';

const icons: JsxGroup = Icons.load({ Minimize, Maximize, Restore })
export = icons