import React, { FC } from 'react';
import WarningInterface from '@interfaces/Warning.d';
import { General, Crosses } from '@icons/UI';
import Icons from './Icons';

import './Warning.scss';

interface Props {
  warning: WarningInterface | string,
  closeWarning: () => void
}

const Warning: FC<Props> = ({ warning, closeWarning }: Props) => {
  const IconFC = typeof warning !== 'string' ? Icons[warning.Icon] : General.Warning;

  return (
    <div className="warning">
      <IconFC />
      <p className="message">{typeof warning === 'string' ? warning : warning.message}</p>

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
};

export default Warning;
