import React from 'react';
import config from '@modules/config';
import './Save.scss';
import { Config } from '@/interfaces/Config';

interface Props{
    configData: Config,
    setIsComplete: (isComplete: boolean) => void
}

export default function Save(props: Props) {
  const handleClick = () => {
    const { configData, setIsComplete } = props;

    configData.isComplete = true;
    config.set(configData);

    setIsComplete(true);
  };

  return (
    <div className="continue" role="presentation" onClick={handleClick}>
      <div className="background">
        <div className="transparent" />
      </div>

      <button className="save-button" type="button">
        <p className="title">Continue</p>
      </button>
    </div>
  );
}
