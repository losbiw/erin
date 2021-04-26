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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    changeQuality(value as QualityInterface);
  };

  return (
    <select
      name="quality" // todo custom dropdown
      className="quality-select"
      data-value="value"
      defaultValue={initialQuality}
      onChange={handleChange}
    >
      {
        options.map((option) => {
          const { value, label } = option;

          return (
            <option
              className="quality-option"
              value={value}
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
