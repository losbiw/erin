import React from 'react';
import { addWarning } from '@/Warning/warningSlice';
import { Keys as WarningIconKeys } from '@/Warning/Icons';
import Info from '@icons/Info';
import store from '@app/store';

const { clipboard } = window.require('electron');

interface CardInterface {
  title: string,
  description: string,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>,
  special?: string,
  handleClick?: () => void,
}

const getCards = (): CardInterface[] => {
  const { Donation, Development, Smile } = Info;
  const wallet = '19zfpPUYbbNbUyLGqKGU7HBuV5x4bQTWh9';

  const items: CardInterface[] = [
    {
      title: 'Donation',
      description: 'Click to copy the bitcoin wallet below if you want to support our project',
      special: wallet,
      handleClick: () => {
        clipboard.writeText(wallet);

        store.dispatch(addWarning({
          message: 'The wallet is copied to the clipboard',
          Icon: WarningIconKeys.Clipboard,
        }));
      },
      Icon: Donation,
    },
    {
      title: 'Development',
      description: 'The whole project is being run and supported by just a single person',
      Icon: Development,
    },
    {
      title: 'Thank you',
      description: 'For using our app, it actually means a lot to the creator so stay awesome and have a nice day!',
      Icon: Smile,
    },
  ];

  return items;
};

export default getCards;
