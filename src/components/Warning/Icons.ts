import { General } from '@icons/UI';

export enum Keys {
  Download = 'download',
  Clipboard = 'clipboard'
}

type Icons = {
  [key in Keys]: React.FC<React.SVGProps<SVGSVGElement>>
}

const WarningIcons: Icons = {
  [Keys.Download]: General.Download,
  [Keys.Clipboard]: General.Clipboard,
};

export default WarningIcons;
