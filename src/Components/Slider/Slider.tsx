import React, { FC, useEffect, useState } from 'react';
import config from '@modules/config';
import warning from '@modules/warning';
import './Slider.scss';
import { Config, ConfigUpdate, Theme } from '@interfaces/Config';
import { Warning } from '@interfaces/Warning';
import Settings from '@interfaces/Settings';
import Form from '../Form/Form';
import { items } from './items';

interface Props{
    changeSlide: (name: Settings) => void,
    setWarning: (warningMsg: string | Warning) => void,
    setIsComplete: (isComplete: boolean) => void,
    setIsRequiredFilled: (isFilled: boolean) => void,
    activeIndex: number,
    isComplete: boolean,
    theme: Theme
}

const Slider: FC<Props> = (props: Props) => {
  const [stateConfig, updateConfig] = useState(config.getDefaultOptions());

  useEffect(() => {
    const setConfig = async () => {
      const cfg = await config.get();
      updateConfig(cfg);
    };

    setConfig();
  }, []);

  useEffect(() => {
    const {
      isComplete, setWarning, setIsComplete, setIsRequiredFilled, changeSlide,
    } = props;

    if (isComplete) {
      const settingsWarning = warning.match(stateConfig, true);

      if (settingsWarning?.value) {
        const { value, name } = settingsWarning;
        config.set({ isComplete: false });

        changeSlide(name as Settings);

        setIsComplete(false);
        setWarning(value);
      } else {
        setIsRequiredFilled(true);
        setIsComplete(true);
      }
    }
  });

  const updateSlideState = (update: ConfigUpdate) => {
    const cfg: Config = { ...stateConfig, ...update };
    updateConfig(cfg);
  };

  const calcSlidePosition = (amount: number, activeIndex: number) => {
    const middle = Math.round((amount - 1) / 2);
    const equalizer = amount % 2 === 0 ? 40 : 0;
    const multiplier = activeIndex === middle ? 0 : middle - activeIndex;

    return multiplier * 80 - equalizer;
  };

  const {
    setWarning, activeIndex, theme, setIsComplete,
  } = props;
  const keys = Object.keys(items);

  const transform = calcSlidePosition(keys.length, activeIndex);

  if (Object.keys(stateConfig).length) {
    return (
      <div className="slider-container">
        <div className="translate" style={{ transform: `translateX(${transform}vw)` }}>
          <Form
            config={stateConfig}
            items={items}
            isSetup
            activeIndex={activeIndex}
            setWarning={setWarning}
            setIsComplete={setIsComplete}
            updateSettingsState={updateSlideState}
            theme={theme}
          />
        </div>
      </div>
    );
  }

  return <form className="settings" />;
};

export default Slider;
