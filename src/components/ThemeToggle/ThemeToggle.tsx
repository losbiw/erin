import { Theme } from '@interfaces/Config';
import React, { FC } from 'react';
import Themes from '@icons/Themes';
import './ThemeToggle.scss';
import { AppDispatch, RootState } from '@app/store';
import { connect } from 'react-redux';
import { setOpposite } from '@slices/themeSlice';

interface Props {
  theme: Theme,
  switchTheme: () => void
}

const ThemeToggle: FC<Props> = ({ theme, switchTheme }: Props) => {
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

const mapStateToProps = (state: RootState) => ({ theme: state.theme.value });
const mapDispatchToProps = (dispatch: AppDispatch) => (
  { switchTheme: () => dispatch(setOpposite()) });

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);
