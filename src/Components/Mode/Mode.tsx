import React from 'react';
import capitalizeFirstLetter from '@modules/convert';
import { Mode as ModeEnum } from '@/interfaces/Config';
import enumKeys from '@helpers/enum';
import './Mode.scss';

interface Props{
    current: ModeEnum,
    changeMode: (mode: ModeEnum) => void
}

export default function Mode(props: Props) {
  const { current, changeMode } = props;

  return (
    <div className="mode-container">
      {
        enumKeys(ModeEnum).map((label) => {
          const modeName = ModeEnum[label];

          return (
            <div className="radio" key={modeName}>
              <input
                type="radio"
                name="mode"
                className="mode-input"
                checked={modeName === current}
                onChange={() => changeMode(modeName)}
              />
              <div className="background">
                <div className="transparent" />
                <label className="mode-label" htmlFor={label}>{ capitalizeFirstLetter(label) }</label>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
