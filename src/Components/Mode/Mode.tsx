import React, { FC } from 'react';
import capitalizeFirstLetter from '@helpers/convert';
import { Mode as ModeEnum } from '@interfaces/Config';
import { enumKeys } from '@helpers/enum';
import './Mode.scss';

interface Props {
  current: ModeEnum,
  changeMode: (mode: ModeEnum) => void
}

interface ButtonProps {
  name: ModeEnum,
  label: string,
  isChecked: boolean,
  handleChange: () => void
}

const ModeButton: FC<ButtonProps> = ({
  name, label, isChecked, handleChange,
}: ButtonProps) => (
  <div className="radio" key={name}>
    <input
      type="radio"
      name="mode"
      className="mode-input"
      checked={isChecked}
      onChange={handleChange}
    />
    <div className="background">
      <div className="transparent" />
      <label className="mode-label" htmlFor={label}>{ capitalizeFirstLetter(label) }</label>
    </div>
  </div>
);

const Mode: FC<Props> = ({ current, changeMode }: Props) => (
  <div className="mode-container">
    {
      enumKeys(ModeEnum).map((label) => {
        const modeName = ModeEnum[label];
        const handleChange = () => changeMode(modeName);

        return (
          <ModeButton
            name={modeName}
            label={label}
            isChecked={current === modeName}
            handleChange={handleChange}
            key={modeName}
          />
        );
      })
    }
  </div>
);

export default Mode;
