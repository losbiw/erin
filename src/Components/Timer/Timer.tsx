import React, { FC, useState } from 'react';
import capitalizeFirstLetter from '@helpers/convert';
import * as milliseconds from '@/modules/milliseconds';
import './Timer.scss';
import { Warning } from '@interfaces/Warning';

interface Props{
  timeInMs: number,
  isActive: boolean,
  setWarning: (warning: Warning | string) => void,
  updateTimeout: (time: number) => void
}

const Timer: FC<Props> = (props: Props) => {
  const [focusIndex, setFocus] = useState(0);
  const { timeInMs } = props;

  const time = milliseconds.from(timeInMs);
  const keys = time ? Object.keys(time) : [];

  const updateCfgTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value } = e.target;

      if (value.length < 3) {
        const numberValue = parseInt(value, 10);
        time[name as keyof milliseconds.Time] = numberValue;
        const ms = milliseconds.to(time);

        props.updateTimeout(ms);
      } else {
        e.target.value = value.slice(0, 2);
      }
    } catch {
      props.setWarning('Invalid time format');
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
                defaultValue={time[unit as keyof milliseconds.Time]}
                id={unit}
                data-testid={unit}
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
