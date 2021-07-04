import React, { FC, memo } from 'react';
import { Pages } from '@interfaces/UserState';
import { RootState } from '@app/store';
import { connect } from 'react-redux';
import { buttons, NavButton as NavButtonInterface } from './items';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Nav.scss';

interface Props {
  changePage: (name: Pages) => void,
  isNavbarLocked: boolean,
  page: Pages,
}

interface GroupProps extends Props {
  children: React.ReactNode,
  group: NavButtonInterface[]
}

interface ButtonProps {
  isNavbarLocked: boolean,
  active: false | 'active',
  target: Pages,
  handleClick: () => void,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const NavButton: FC<ButtonProps> = ({
  active, target, handleClick, Icon, isNavbarLocked,
}: ButtonProps) => (
  <button
    className={`nav-btn ${active} ${isNavbarLocked ? 'locked' : ''}`}
    type="button"
    name={target}
    key={target}
    onClick={handleClick}
  >
    <Icon />
  </button>
);

const NavGroup: FC<GroupProps> = ({
  children, group, page, changePage, isNavbarLocked,
}: GroupProps) => (
  <div className="btns" key={group[0].target}>
    {
      group.map(({ Icon, target }) => {
        const active = page === target && 'active';
        const handleClick = () => changePage(target);

        return (
          <NavButton
            active={active}
            handleClick={isNavbarLocked ? () => {} : handleClick}
            isNavbarLocked={isNavbarLocked}
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
  page, changePage, isNavbarLocked,
}: Props) => (
  <nav className="nav">
    { buttons.map((group, index) => (
      <NavGroup
        isNavbarLocked={isNavbarLocked}
        group={group}
        page={page}
        changePage={changePage}
        key={group[0].target + group[1].target}
      >
        { index === 0 && <ThemeToggle /> }
      </NavGroup>
    )) }
  </nav>
));

const mapStateToProps = (state: RootState) => ({
  isNavbarLocked: state.general.isNavbarLocked,
});

export default connect(mapStateToProps)(Nav);
