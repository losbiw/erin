import { JsxGroup } from '@interfaces/Icon';
import Icons from '../Svg/Loader'

import Home from 'raw-loader!@nav/home.svg';
import Picker from 'raw-loader!@nav/picker.svg';
import Settings from 'raw-loader!@nav/settings.svg';
import Info from 'raw-loader!@nav/info.svg';

const icons: JsxGroup = Icons.load({ Home, Picker, Settings, Info })
export = icons