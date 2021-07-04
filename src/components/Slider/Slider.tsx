import React, { FC } from 'react';
import config from '@modules/config';
import warning from '@modules/warning';
import { AppDispatch, RootState } from '@app/store';
import { addWarning as addWarningAction } from '@/Warning/warningSlice';
import { connect } from 'react-redux';
import Warning from '@interfaces/Warning';
import Settings from '@interfaces/Settings';
import { Config } from '@interfaces/Config';
import { saveTempConfig as saveTempConfigAction } from '@/Configuration/settingsSlice';
import Configuration from '@/Configuration/Configuration';
import { items } from './items';

import './Slider.scss';

interface Props {
  changeSlide: (name: Settings) => void,
  addWarning: (warningMsg: string | Warning) => void,
  completeSetup: () => void,
  saveTempConfig: () => void,
  tempConfig: Config,
  activeIndex: number,
}

const Slider: FC<Props> = ({
  addWarning, completeSetup, changeSlide, activeIndex, tempConfig, saveTempConfig,
}: Props) => {
  const saveConfig = () => {
    const settingsWarning = warning.match(tempConfig, true);

    if (settingsWarning) {
      const { value, name } = settingsWarning;
      config.set({ isSetupComplete: false });

      changeSlide(name as Settings);
      addWarning(value);
    } else {
      addWarning('');
      saveTempConfig();
      completeSetup();
    }
  };

  const calcSlideOffset = (amount: number, index: number) => {
    const middle = Math.round((amount - 1) / 2);
    const equalizer = amount % 2 === 0 ? 40 : 0;
    const multiplier = index === middle ? 0 : middle - index;

    return multiplier * 80 - equalizer;
  };

  const keys = Object.keys(items);

  const transform = calcSlideOffset(keys.length, activeIndex);

  return (
    <div className="slider-container">
      <div className="translate" style={{ transform: `translateX(${transform}vw)` }}>
        <Configuration
          items={items}
          isSetup
          activeIndex={activeIndex}
          saveConfig={saveConfig}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  tempConfig: state.settings.tempConfig,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addWarning: (warningValue: string | Warning) => dispatch(addWarningAction(warningValue)),
  saveTempConfig: () => dispatch(saveTempConfigAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
