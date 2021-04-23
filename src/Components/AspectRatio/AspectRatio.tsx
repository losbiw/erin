import React, { FC } from 'react';
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

const AspectRatio: FC<Props> = (props: Props) => {
  const {
    src, isActive, handleClick,
  } = props;
  const addActiveClass = isActive ? 'active' : '';

  return (
    <div
      className={`aspect-ratio ${addActiveClass}`}
      role="presentation"
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <div className="transparent" />
      <div className="container">
        <img className="aspect-image" src={src} alt="wallpaper" />
      </div>
    </div>
  );
};

AspectRatio.defaultProps = defaultProps;

export default AspectRatio;
