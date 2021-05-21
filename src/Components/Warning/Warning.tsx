import React, { FC } from 'react';
import WarningInterface from '@interfaces/Warning.d';
import { General, Crosses } from '@icons/UI';

import './Warning.scss';

interface Props extends Partial<WarningInterface> {
  message: string,
  removeWarning: () => void
}

const Warning: FC<Props> = (props: Props) => {
  const { message, Icon, removeWarning } = props;

  return (
    <div className="warning">
      {Icon ? <Icon /> : <General.Warning />}
      <p className="message">{ message }</p>

      <button
        type="button"
        className="close"
        data-testid="close"
        onClick={removeWarning}
      >
        <Crosses.Yellow />
      </button>
    </div>
  );
};

export default Warning;
