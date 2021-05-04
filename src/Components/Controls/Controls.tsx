import React, { FC, useState } from 'react';
import Control from '../Icons/Control';
import { Crosses } from '../Icons/UI';
import './Controls.scss';

const { ipcRenderer } = window.require('electron');

interface ButtonsIcons{
    minimize: React.FC<React.SVGProps<SVGSVGElement>>,
    maximize: React.FC<React.SVGProps<SVGSVGElement>>,
    close: React.FC<React.SVGProps<SVGSVGElement>>
}

const Controls: FC = () => {
  const [MaximizeIcon, setIcon] = useState(() => Control.Maximize);

  const buttons: ButtonsIcons = {
    minimize: Control.Minimize,
    maximize: MaximizeIcon,
    close: Crosses.Red,
  };

  const handleClick = async (name: keyof ButtonsIcons) => {
    const res = await ipcRenderer.invoke(`${name}-window`);

    if (name === 'maximize') {
      const isMaximized = res;

      if (isMaximized) {
        setIcon(() => Control.Restore);
      } else {
        setIcon(() => Control.Maximize);
      }
    }
  };

  const keys = Object.keys(buttons);

  return (
    <div className="control">
      <div className="draggable" />

      <div className="control-container">
        {
          keys.map((key) => {
            const Icon = buttons[key as keyof ButtonsIcons];

            return (
              <button
                className="control-btn"
                type="button"
                onClick={() => handleClick(key as keyof ButtonsIcons)}
                name={key}
                key={key}
              >
                <Icon />
              </button>
            );
          })
        }
      </div>
    </div>
  );
};

export default Controls;
