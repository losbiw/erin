import React, { FC } from 'react';
import { General } from '../Icons/UI';
import './Loading.scss';

const Loading: FC = () => {
  const circles: JSX.Element[] = [];
  const amount = 3;

  for (let i = 0; i < amount; i += 1) {
    circles.push(<General.Circle key={`circle-${i}`} />);
  }

  return (
    <div className="loading page">
      {circles}
    </div>
  );
};

export default Loading;
