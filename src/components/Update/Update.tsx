import React, { FC } from 'react';
import store from '@app/store';
import { General, Crosses } from '@icons/UI';
import { addWarning } from '@/Warning/warningSlice';
import { Keys as WarningIconsKeys } from '@/Warning/Icons';

import './Update.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  closeUpdatePrompt: () => void
}

interface InnerProps {
  buttons: Button[],
  handleClick: (shouldUpdate: boolean) => void,
}

interface Button {
  action: 'accept' | 'reject',
  Icon: React.FC<React.SVGProps<SVGSVGElement>>,
  value: boolean
}

const handleIPCevent = (shouldUpdate: boolean, closeUpdatePrompt: () => void): void => {
  if (shouldUpdate) {
    ipcRenderer.send('should-update');

    store.dispatch(addWarning({
      message: 'The app will restart once the update is downloaded',
      Icon: WarningIconsKeys.Download,
    }));
  }

  closeUpdatePrompt();
};

const InnerUpdate: FC<InnerProps> = ({ buttons, handleClick }: InnerProps) => (
  <div className="update container">
    <div className="content container">
      <div className="text container">
        <h1 className="title">Update available</h1>
        <p className="description">Do you want to download and install it?</p>
      </div>
      <div className="buttons container">
        {
          buttons.map(({ action, value, Icon }) => (
            <button
              type="button"
              className="action"
              onClick={() => handleClick(value)}
              key={action}
            >
              <Icon />
            </button>
          ))
        }
      </div>
    </div>
  </div>
);

const Update: FC<Props> = ({ closeUpdatePrompt }: Props) => {
  const buttons: Button[] = [
    {
      action: 'accept',
      Icon: General.Accept,
      value: true,
    },
    {
      action: 'reject',
      Icon: Crosses.Red,
      value: false,
    },
  ];

  return (
    <InnerUpdate
      buttons={buttons}
      handleClick={(shouldUpdate) => handleIPCevent(shouldUpdate, closeUpdatePrompt)}
    />
  );
};

export default Update;
