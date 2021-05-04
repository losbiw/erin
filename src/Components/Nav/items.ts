import { Pages } from '@/interfaces/UserState';
import NavIcons from '../Icons/Nav';

interface NavButton{
    target: Pages,
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const {
  Home, Picker, Settings, Info,
} = NavIcons;

const buttons: Array<Array<NavButton>> = [
  [{
    target: Pages.Home,
    Icon: Home,
  },
  {
    target: Pages.Picker,
    Icon: Picker,
  }],
  [{
    target: Pages.Settings,
    Icon: Settings,
  },
  {
    target: Pages.Info,
    Icon: Info,
  }],
];

export default buttons;
