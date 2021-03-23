import { JsxGroup } from '@/types/Icon';
import Icons from '../Svg/Loader'

import Donation from 'raw-loader!@info/donation.svg';
import Development from 'raw-loader!@info/development.svg';
import Smile from 'raw-loader!@info/smile.svg';
import Reddit from 'raw-loader!@info/reddit.svg';
import Github from 'raw-loader!@info/github.svg';

const icons: JsxGroup = Icons.load({ Donation, Development, Smile, Reddit, Github })
export = icons