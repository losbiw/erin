import React, { FC, memo } from 'react';
import { Pages } from '@interfaces/UserState';
import { AppDispatch } from '@app/store';
import { changePage as changePageAction } from '@/User/slices/generalSlice';
import { connect } from 'react-redux';
import { buttons, NavButton as NavButtonInterface } from './items';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Nav.scss';

interface Props {
  changePage: (name: Pages) => void,
  page: Pages,
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
  children, group, page, changePage,
}: GroupProps) => (
  <div className="btns" key={group[0].target}>
    {
      group.map(({ Icon, target }) => {
        const active = page === target && 'active';
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
  page, changePage,
}: Props) => (
  <nav className="nav">
    { buttons.map((group, index) => (
      <NavGroup
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

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changePage: (page: Pages) => dispatch(changePageAction(page)),
});

export default connect(null, mapDispatchToProps)(Nav);
