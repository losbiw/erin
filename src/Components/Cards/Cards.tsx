import React, { FC } from 'react';
import { Warning } from '@interfaces/Warning';
import getCards from './items';
import './Cards.scss';

interface Props{
  setWarning: (warning: string | Warning) => void
}

const Cards: FC<Props> = ({ setWarning }: Props) => {
  const cards = getCards(setWarning);

  return (
    <div className="cards">
      {
        cards.map((card) => {
          const {
            title, description, Icon, special, handleClick,
          } = card;

          return (
            <div className="card" role="presentation" key={title} onClick={handleClick}>
              <Icon />

              <h2 className="title">{ title }</h2>
              <p className="description">{ description }</p>

              <p className="special">
                { special || '' }
              </p>
            </div>
          );
        })
      }
    </div>
  );
};

export default Cards;
