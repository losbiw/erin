import React, { FC } from 'react';
import { General } from '@icons/UI';
import './Carousel.scss';

interface Props {
  amount: number,
  activeIndex: number,
  changeSlide: (index: number) => void
}

interface ButtonProps {
  activeClass: string,
  handleClick: () => void,
}

const CarouselButton: FC<ButtonProps> = ({ activeClass, handleClick }: ButtonProps) => (
  <button
    className={`car-button ${activeClass}`}
    onClick={handleClick}
    type="button"
  >
    <General.Circle />
  </button>
);

const Carousel: FC<Props> = ({
  changeSlide, activeIndex, amount,
}: Props) => {
  const items: JSX.Element[] = [];

  const renderButtons = () => {
    for (let i = 0; i < amount; i += 1) {
      const activeClass = i === activeIndex ? 'active' : 'non-active';

      const handleClick = () => {
        if (i !== activeIndex) {
          changeSlide(i);
        }
      };

      items.push(
        <CarouselButton
          activeClass={activeClass}
          handleClick={handleClick}
          key={`carousel-${i}`}
        />,
      );
    }
  };

  renderButtons();

  return (
    <div className="carousel">
      { items }
    </div>
  );
};

export default Carousel;
