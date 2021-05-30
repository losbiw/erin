import React, { FC, memo } from 'react';
import { Theme } from '@interfaces/Config';
import { Pages } from '@interfaces/UserState';
import { buttons, NavButton as NavButtonInterface } from './items';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Nav.scss';

interface Props {
  changePage: (name: Pages) => void,
  current: Pages,
}

interface ButtonProps {
  active: false | 'active',
  target: Pages,
  handleClick: () => void,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

interface GroupProps extends Props {
  children: React.ReactNode,
  group: NavButtonInterface[]
}

const NavButton: FC<ButtonProps> = ({
  active, target, handleClick, Icon,
}: ButtonProps) => (
  <button
    className={`nav-btn ${active}`}
    type="button"
    name={target}
    key={target}
    onClick={handleClick}
  >
    <Icon />
  </button>
);

const NavGroup: FC<GroupProps> = ({
  children, group, current, changePage,
}: GroupProps) => (
  <div className="btns" key={group[0].target}>
    {
      group.map(({ Icon, target }) => {
        const active = current === target && 'active';
        const handleClick = () => changePage(target);

        return (
          <NavButton
            active={active}
            handleClick={handleClick}
            target={target}
            Icon={Icon}
            key={target}
          />
        );
      })
    }
    { children }
  </div>
);

const Nav: FC<Props> = memo(({
  current, changePage,
}: Props) => (
  <nav className="nav">
    { buttons.map((group, index) => (
      <NavGroup
        group={group}
        current={current}
        changePage={changePage}
        key={group[0].target + group[1].target}
      >
        { index === 0 && <ThemeToggle /> }
      </NavGroup>
    )) }
  </nav>
));

export default Nav;
