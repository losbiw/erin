import { JsxGroup } from '@/types/Icon';
import Icons from '../Svg/Loader'

import Moon from 'raw-loader!@themes/moon.svg';
import Sun from 'raw-loader!@themes/sun.svg';

const icons: JsxGroup = Icons.load({ Moon, Sun })
export = icons