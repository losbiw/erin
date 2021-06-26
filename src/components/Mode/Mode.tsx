import React, { FC } from 'react';
import capitalizeFirstLetter from '@helpers/convert';
import { Mode as ModeEnum } from '@interfaces/Config';
import { enumKeys } from '@helpers/enum';
import './Mode.scss';
import { connect } from 'react-redux';
import { AppDispatch } from '@app/store';
import { setSearchMode as setSearchModeAction } from '@/Form/settingsSlice';

interface Props {
  current: ModeEnum,
  setSearchMode: (mode: ModeEnum) => void
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

const Mode: FC<Props> = ({ current, setSearchMode }: Props) => (
  <div className="mode-container">
    {
      enumKeys(ModeEnum).map((label) => {
        const modeName = ModeEnum[label];
        const handleChange = () => setSearchMode(modeName);

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

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setSearchMode: (mode: ModeEnum) => dispatch(setSearchModeAction(mode)),
});

export default connect(null, mapDispatchToProps)(Mode);
