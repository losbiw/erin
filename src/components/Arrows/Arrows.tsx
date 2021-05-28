import React, { FC, memo } from 'react';
import { Arrows as Icons } from '@icons/UI';
import './Arrows.scss';

interface ArrowsProps {
  handleForwardClick: () => void,
  handleBackClick: () => void
}

interface ArrowProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>,
  index: number,
  handleClick: () => void
}

const Arrow: FC<ArrowProps> = memo(({
  Icon, index, handleClick,
}: ArrowProps) => (
  <button
    className="arrow"
    type="button"
    name="arrow"
    onClick={handleClick}
    key={`arrow-${index}`}
  >
    <Icon />
  </button>
));

const Arrows: FC<ArrowsProps> = memo(({
  handleBackClick, handleForwardClick,
}: ArrowsProps) => (
  <div className="arrows">
    { Object.keys(Icons).map((Icon, index: number) => (
      <Arrow
        Icon={Icons[Icon]}
        index={index}
        handleClick={index === 0 ? handleBackClick : handleForwardClick}
        key={Icon}
      />
    ))}
  </div>
));

export { Arrows, Arrow };
