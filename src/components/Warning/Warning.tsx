import React, { FC } from 'react';
import WarningInterface from '@interfaces/Warning.d';
import { General, Crosses } from '@icons/UI';

import './Warning.scss';

interface Props extends Partial<WarningInterface> {
  message: string,
  closeWarning: () => void
}

const Warning: FC<Props> = ({ message, Icon, closeWarning }: Props) => (
  <div className="warning">
    {Icon ? <Icon /> : <General.Warning />}
    <p className="message">{message}</p>

    <button
      type="button"
      className="close"
      data-testid="close"
      onClick={closeWarning}
    >
      <Crosses.Yellow />
    </button>
  </div>
);

export default Warning;
