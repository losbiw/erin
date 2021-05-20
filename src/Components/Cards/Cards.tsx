import React, { FC } from 'react';
import { Warning } from '@interfaces/Warning';
import getCards from './items';
import './Cards.scss';

interface Props {
  setWarning: (warning: string | Warning) => void
}

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

    <h2 className="title">{ title }</h2>
    <p className="description">{ description }</p>

    <p className="special">
      { special }
    </p>
  </div>
);

const Cards: FC<Props> = ({ setWarning }: Props) => {
  const cards = getCards(setWarning);

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
          />
        ))
      }
    </div>
  );
};

export default Cards;
