import { Theme } from '@/interfaces/Config';
import React, { FC } from 'react';
import Themes from '../Icons/Themes';
import './ThemeToggle.scss';

interface Props{
    theme: Theme,
    switchTheme: () => void
}

const ThemeToggle: FC<Props> = (props: Props) => {
  const { theme, switchTheme } = props;
  const { Moon, Sun } = Themes;

  const ThemeIcon = theme === Theme.Dark ? Sun : Moon;

  return (
    <button
      type="button"
      className="nav-btn theme-switch"
      onClick={switchTheme}
    >
      <ThemeIcon />
    </button>
  );
};

export default ThemeToggle;
