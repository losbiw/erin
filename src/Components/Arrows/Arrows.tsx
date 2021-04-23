import React from 'react';
import { Arrows as Icons } from '../Icons/UI';
import './Arrows.scss';

interface ArrowsProps{
    handleChange: (() => void)[]
}

interface ArrowProps{
    Icon: React.FC<React.SVGProps<SVGSVGElement>>,
    index: number,
    handleClick: () => void
}

const Arrow = (props: ArrowProps) => {
  const { Icon, index, handleClick } = props;

  return (
    <button
      className="arrow"
      type="button"
      name="arrow"
      onClick={handleClick}
      key={`arrow-${index}`}
    >
      <Icon />
    </button>
  );
};

const Arrows = (props: ArrowsProps) => {
  const keys = Object.keys(Icons);

  return (
    <div className="arrows">
      { keys.map((Icon, index: number) => (
        <Arrow
          Icon={Icons[Icon]}
          index={index}
          handleClick={props.handleChange[index]}
          key={Icon}
        />
      ))}
    </div>
  );
};

export { Arrows, Arrow };
