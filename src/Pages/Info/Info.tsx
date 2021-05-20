import React, { FC } from 'react';
import { Warning } from '@interfaces/Warning';
import Cards from '@/Cards/Cards';
import { Links } from '@/Links/Links';
import { links } from './links';
import './Info.scss';

interface Props {
  setWarning: (warning: string | Warning) => void
}

const Info: FC<Props> = ({ setWarning }: Props) => (
  <div className="page info">
    <div className="contact">
      <p className="link-title">Contact us:</p>
      <Links links={links.author} />
    </div>

    <Cards setWarning={setWarning} />

    <div className="reference">
      <p className="resources">The app is using APIs and icons from the following resources:</p>
      <Links links={links.credits} />
    </div>
  </div>
);

export default Info;
