import React, { FC, useState } from 'react';
import Control from '@icons/Control';
import { Crosses } from '@icons/UI';
import './Controls.scss';

const { ipcRenderer } = window.require('electron');

interface Icons {
  minimize: React.FC<React.SVGProps<SVGSVGElement>>,
  maximize: React.FC<React.SVGProps<SVGSVGElement>>,
  close: React.FC<React.SVGProps<SVGSVGElement>>
}

interface WrapperProps {
  children: React.ReactNode
}

const renderButtons = (icons: Icons, handleClick: (name: keyof Icons) => void) => {
  const result: JSX.Element[] = [];

  Object.keys(icons).forEach((key) => {
    const Icon = icons[key as keyof Icons];

    result.push(
      <button
        className="control-btn"
        type="button"
        onClick={() => handleClick(key as keyof Icons)}
        name={key}
        key={key}
      >
        <Icon />
      </button>,
    );
  });

  return result;
};

const InnerControl: FC<WrapperProps> = ({ children }: WrapperProps) => (
  <div className="control">
    <div className="draggable" />
    <div className="control-container">
      { children }
    </div>
  </div>
);

const Controls: FC = () => {
  const [isMaximized, setMaximize] = useState(false);

  const icons: Icons = {
    minimize: Control.Minimize,
    maximize: isMaximized ? Control.Restore : Control.Maximize,
    close: Crosses.Red,
  };

  const handleClick = async (name: keyof Icons) => {
    await ipcRenderer.invoke(`${name}-window`);
    if (name === 'maximize') setMaximize(!isMaximized);
  };

  return (
    <InnerControl>
      { renderButtons(icons, handleClick) }
    </InnerControl>
  );
};

export default Controls;
