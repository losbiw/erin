import React from 'react';
import Links from '../Links/Links';
import Switch from '../Switch/Switch';
import './Privacy.scss';

interface Props{
    isAccepted: boolean,
    acceptPolicy: () => void
}

export default function Privacy(props: Props) {
  const { isAccepted, acceptPolicy } = props;

  return (
    <div className="text">
      <p className="agreement">I agree to the </p>

      <Links links={{
        privacy: {
          href: 'https://erin-web.herokuapp.com/privacy',
          title: 'privacy policy',
        },
      }}
      />

      <p className="agreement">: </p>
      <Switch isChecked={isAccepted} handleSwitch={acceptPolicy} />
    </div>
  );
}
