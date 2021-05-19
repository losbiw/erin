import React, { FC, memo } from 'react';
import './AspectRatio.scss';

interface Props{
  src: string,
  isActive?: boolean,
  handleClick?: () => void
}

const defaultProps = {
  isActive: false,
  handleClick: undefined,
};

const AspectRatio: FC<Props> = memo(({
  src, isActive, handleClick,
}: Props) => (
  <div
    className={`aspect-ratio ${isActive && 'active'}`}
    role="presentation"
    onClick={handleClick}
    onKeyDown={handleClick}
  >
    <div className="transparent" />
    <div className="container">
      <img className="aspect-image" src={src} alt="wallpaper" />
    </div>
  </div>
));

AspectRatio.defaultProps = defaultProps;

export default AspectRatio;
