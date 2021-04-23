import React, { FC, useState } from 'react';
import capitalizeFirstLetter from '@modules/convert';
import './Timer.scss';

interface Time{
    hours: number,
    minutes: number,
    seconds: number
}

interface Props{
    time: number,
    isActive: boolean,
    updateTimeout: (time: number) => void
}

const convertTime = (ms: number, convertation: Time): Time => {
  const { hours, minutes, seconds } = convertation;

  return {
    hours: Math.floor(ms / hours),
    minutes: Math.floor((ms % hours) / minutes),
    seconds: Math.floor((ms % hours % minutes) / seconds),
  };
};

const Timer: FC<Props> = (props: Props) => {
  const [focusIndex, setFocus] = useState(0);
  const { time: propTime } = props;

  const convertation = {
    hours: 3600000,
    minutes: 60000,
    seconds: 1000,
  };

  const time = convertTime(propTime, convertation);
  const keys = time ? Object.keys(time) : [];

  const updateCfgTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseInt(value, 10);

    if (value.length < 3) {
      let milliseconds = numberValue * convertation[name as keyof Time] || 0;

      Object.keys(time).forEach((unit) => {
        if (unit !== name) {
          const unitKey = unit as keyof Time;
          milliseconds += time[unitKey] * convertation[unitKey];
        }
      });

      props.updateTimeout(milliseconds);
    } else {
      e.target.value = value.slice(0, 2);
    }
  };

  return (
    <div className="time-container">
      {
        keys.map((unit, index) => (
          <div className="time" key={unit}>
            <div className="wrapper">
              <input
                type="number"
                defaultValue={time[unit as keyof Time]}
                id={unit}
                className="time-input"
                ref={(ref) => {
                  if (ref && props.isActive && index === focusIndex) {
                    ref.focus({ preventScroll: true });
                  }
                }}
                onChange={updateCfgTime}
                onFocus={() => setFocus(index)}
                name={unit}
                key={unit}
              />
              {
                unit !== 'seconds'
                && <span className="colon">:</span>
              }
            </div>

            <label className="time-label" htmlFor={unit}>{ capitalizeFirstLetter(unit) }</label>
          </div>
        ))
      }
    </div>
  );
};

export default Timer;
