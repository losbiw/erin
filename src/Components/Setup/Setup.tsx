import React, { FC, useState } from 'react';
import { Theme } from '@interfaces/Config';
import { Warning } from '@interfaces/Warning';
import Settings from '@interfaces/Settings';
import Slider from '../Slider/Slider';
import Carousel from '../Carousel/Carousel';
import { Arrows } from '../Arrows/Arrows';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { items } from '../Slider/items';

import './Setup.scss';
import '../Settings/Settings.scss';

interface Props {
  theme: Theme,
  isComplete: boolean,
  switchTheme: () => void,
  setWarning: (warning: string | Warning) => void,
  setIsComplete: (isComplete: boolean) => void,
  setIsRequiredFilled: (isFilled: boolean) => void,
}

const Setup: FC<Props> = (props: Props) => {
  const [slideIndex, changeSlide] = useState(0);
  const { length } = items;

  const handleScroll = (isForward: boolean): void => {
    let index = isForward ? slideIndex + 1 : slideIndex - 1;

    if (index >= length) index = 0;
    else if (index < 0) index = length - 1;

    changeSlide(index);
  };

  const changeSlideByName = (name: Settings): void => {
    const index = items.map((i) => i.name).indexOf(name);
    changeSlide(index);
  };

  const handlePrevSlide = () => handleScroll(false);
  const handleNextSlide = () => handleScroll(true);

  const {
    isComplete, switchTheme, theme, setWarning, setIsComplete, setIsRequiredFilled,
  } = props;

  return (
    <div className="setup">
      <ThemeToggle
        switchTheme={switchTheme}
        theme={theme}
      />

      <Arrows
        handleBackClick={handlePrevSlide}
        handleForwardClick={handleNextSlide}
      />

      <Slider
        changeSlide={changeSlideByName}
        activeIndex={slideIndex}
        isComplete={isComplete}
        theme={theme}
        setWarning={setWarning}
        setIsComplete={setIsComplete}
        setIsRequiredFilled={setIsRequiredFilled}
      />

      <Carousel
        changeSlide={changeSlide}
        activeIndex={slideIndex}
        amount={length}
      />
    </div>
  );
};

export default Setup;
