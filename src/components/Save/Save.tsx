import React, { FC } from 'react';
import config from '@modules/config';
import './Save.scss';
import { Config } from '@interfaces/Config';

interface Props {
  configData: Config,
  setIsComplete: (isComplete: boolean) => void
}

interface ButtonProps {
  handleClick: () => void
}

const SaveButton: FC<ButtonProps> = ({ handleClick }: ButtonProps) => (
  <div className="continue" role="presentation" onClick={handleClick}>
    <div className="background">
      <div className="transparent" />
    </div>

    <button className="save-button" type="button">
      <p className="title">Continue</p>
    </button>
  </div>
);

const Save: FC<Props> = (props: Props) => {
  const handleClick = () => {
    const { configData, setIsComplete } = props;

    configData.isSetupComplete = true;
    config.set(configData);

    setIsComplete(true);
  };

  return <SaveButton handleClick={handleClick} />;
};

export default Save;
