import React, { FC } from 'react';
import './Save.scss';

interface Props {
  saveConfig: (() => void) | undefined
}

const Save: FC<Props> = ({ saveConfig }: Props) => (
  <div className="continue" role="presentation" onClick={saveConfig}>
    <div className="background">
      <div className="transparent" />
    </div>

    <button className="save-button" type="button">
      <p className="title">Continue</p>
    </button>
  </div>
);

export default Save;
