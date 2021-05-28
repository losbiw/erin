import React, { FC } from 'react';
import getCards from './items';
import './Cards.scss';

interface InnerProps {
  title: string,
  description: string,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>,
  special: string | undefined,
  handleClick: (() => void) | undefined
}

const InnerCard: FC<InnerProps> = ({
  title, description, handleClick, Icon, special,
}: InnerProps) => (
  <div className="card" role="presentation" key={title} onClick={handleClick}>
    <Icon />

    <h2 className="title">{title}</h2>
    <p className="description">{description}</p>

    <p className="special">
      {special}
    </p>
  </div>
);

const Cards: FC = () => {
  const cards = getCards();

  return (
    <div className="cards">
      {
        cards.map(({
          title, description, Icon, special, handleClick,
        }) => (
          <InnerCard
            title={title}
            description={description}
            Icon={Icon}
            special={special}
            handleClick={handleClick}
            key={title}
          />
        ))
      }
    </div>
  );
};

export default Cards;
