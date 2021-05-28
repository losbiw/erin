import React, { FC } from 'react';
import Warning from '@interfaces/Warning.d';
import { General, Crosses } from '@icons/UI';
import './Update.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  rejectUpdate: () => void,
  setWarning: (warning: string | Warning) => void
}

interface Button {
  action: 'accept' | 'reject',
  Icon: React.FC<React.SVGProps<SVGSVGElement>>,
  value: boolean
}

const Update: FC<Props> = (props: Props) => {
  const handleIPCevent = (shouldUpdate: boolean): void => {
    const { rejectUpdate, setWarning } = props;

    if (shouldUpdate) {
      ipcRenderer.send('should-update');

      setWarning({
        message: 'The app will restart once the update is downloaded',
        Icon: General.Download,
      });
    }

    rejectUpdate();
  };

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
    <div className="update container">
      <div className="content container">
        <div className="text container">
          <h1 className="title">Update available</h1>
          <p className="description">Do you want to download and install it?</p>
        </div>
        <div className="buttons container">
          {
            buttons.map((button) => {
              const { action, value, Icon } = button;

              return (
                <button
                  type="button"
                  className="action"
                  onClick={() => handleIPCevent(value)}
                  key={action}
                >
                  <Icon />
                </button>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Update;
