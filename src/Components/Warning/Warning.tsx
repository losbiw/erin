import React, { FC } from 'react';
import { Warning as WarningInterface } from '@interfaces/Warning.d';
import { General, Crosses } from '../Icons/UI';

import './Warning.scss';

interface Props{
    warning: string,
    removeWarning: () => void
}

interface CustomProps{
    warning: WarningInterface,
    removeWarning: () => void
}

const CustomWarning: FC<CustomProps> = (props: CustomProps) => {
  const { warning, removeWarning } = props;
  const { message, Icon } = warning;

  return (
    <div className="warning">
      <Icon />
      <p className="message">{ message }</p>

      <button
        type="button"
        className="delete"
        onClick={removeWarning}
      >
        <Crosses.Yellow />
      </button>
    </div>
  );
};

const Warning: FC<Props> = (props: Props) => {
  const { warning, removeWarning } = props;

  return (
    <div className="warning">
      <General.Warning />
      <p className="message">{ warning }</p>

      <button
        type="button"
        className="delete"
        onClick={removeWarning}
      >
        <Crosses.Yellow />
      </button>
    </div>
  );
};

export { Warning, CustomWarning };
