import React, { FC, memo } from 'react';
import { Theme } from '@interfaces/Config';
import { Pages } from '@interfaces/UserState';
import buttons from './items';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Nav.scss';

interface Props{
    changePage: (name: Pages) => void,
    current: string,
    theme: Theme,
    switchTheme: () => void
}

const Nav: FC<Props> = memo((props: Props) => {
  const { theme, switchTheme } = props;
  let isFirst = true;

  return (
    <nav className="nav">
      { buttons.map((group) => (
        <div className="btns" key={group[0].target + group[1].target}>
          {
            group.map((button) => {
              const { Icon, target } = button;
              const active = props.current === target && ' active';

              if (group === buttons[1]) isFirst = false;

              return (
                <button
                  className={`nav-btn${active}`}
                  type="button"
                  name={target}
                  key={target}
                  onClick={() => props.changePage(target)}
                >
                  <Icon />
                </button>
              );
            })
          }
          {
            isFirst && (
            <ThemeToggle
              theme={theme}
              switchTheme={switchTheme}
            />
            )
          }
        </div>
      )) }
    </nav>
  );
});

export default Nav;
