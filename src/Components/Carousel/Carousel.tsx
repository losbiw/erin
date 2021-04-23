import React from 'react';
import { General } from '../Icons/UI';
import './Carousel.scss';

interface Props{
    amount: number,
    activeIndex: number,
    changeSlide: (index: number) => void
}

export default function Carousel(props: Props) {
  const { changeSlide, activeIndex, amount } = props;
  const items: JSX.Element[] = [];

  for (let i = 0; i < amount; i += 1) {
    const className = `car-button ${i === activeIndex ? 'active' : 'non-active'}`;

    const clickHandler = () => {
      if (i !== activeIndex) {
        changeSlide(i);
      }
    };

    const item = (
      <button
        className={className}
        type="button"
        key={`carousel-${i}`}
        onClick={clickHandler}
      >
        <General.Circle />
      </button>
    );

    items.push(item);
  }

  return (
    <div className="carousel">
      { items.map((item) => item) }
    </div>
  );
}
