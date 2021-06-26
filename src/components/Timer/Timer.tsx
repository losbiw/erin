import React, { FC, useState } from 'react';
import Warning from '@interfaces/Warning';
import capitalizeFirstLetter from '@helpers/convert';
import * as milliseconds from '@modules/milliseconds';
import './Timer.scss';
import { AppDispatch } from '@app/store';
import { connect } from 'react-redux';
import { addWarning as addWarningAction } from '@/Warning/warningSlice';
import { setTimeoutDelay as setTimeoutDelayAction } from '@/Form/settingsSlice';

interface Props {
  timeInMs: number,
  isActive: boolean,
  setTimeoutDelay: (time: number) => void,
  addWarning: (warningMsg: string | Warning) => void,
}

const Timer: FC<Props> = ({
  timeInMs, setTimeoutDelay, isActive, addWarning,
}: Props) => {
  const [focusIndex, setFocus] = useState(0);

  const time = milliseconds.from(timeInMs);
  const keys = time ? Object.keys(time) : [];

  const updateCfgTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!/^\d+$/.test(value)) addWarning('Only numbers are allowed');

    if (value.length < 3) {
      const numberValue = parseInt(value, 10);

      time[name as keyof milliseconds.Time] = numberValue || 0;
      const ms = milliseconds.to(time);

      setTimeoutDelay(ms);
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
                defaultValue={time[unit as keyof milliseconds.Time]}
                id={unit}
                data-testid={unit}
                className="time-input"
                ref={(ref) => {
                  if (ref && isActive && index === focusIndex) {
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

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setTimeoutDelay: (delay: number) => dispatch(setTimeoutDelayAction(delay)),
  addWarning: (warning: string | Warning) => dispatch(addWarningAction(warning)),
});

export default connect(null, mapDispatchToProps)(Timer);
