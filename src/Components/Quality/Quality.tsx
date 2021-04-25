import React, { FC } from 'react';
import capitalizeFirstLetter from '@modules/convert';
import './Quality.scss';
import { Quality as QualityInterface } from '@/interfaces/Config';
import options from './options';

interface Props{
    changeQuality: (quality: QualityInterface) => void,
    initialQuality: QualityInterface
}

const Quality: FC<Props> = (props: Props) => {
  const { changeQuality, initialQuality } = props;

  return (
    <select
      name="quality" // todo custom dropdown
      className="quality-select"
      data-value="value"
      defaultValue={initialQuality}
    >
      {
        options.map((option) => {
          const { value, label } = option;

          return (
            <option
              className="quality-option"
              value={value}
              onClick={() => changeQuality(value)}
              key={value}
            >
              { capitalizeFirstLetter(label) }
            </option>
          );
        })
      }
    </select>
  );
};

export default Quality;
