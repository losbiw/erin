import React, { FC } from 'react';
import './ProgressBar.scss';

interface Props { width: number }

const ProgressBar: FC<Props> = ({ width }: Props) => (
  <div className="progress-bar">
    <div className="fill" style={{ width: `${width}%` }} />
  </div>
);

export default ProgressBar;
