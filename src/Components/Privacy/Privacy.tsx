import React, { FC } from 'react';
import { Link } from '../Links/Links';
import Switch from '../Switch/Switch';
import './Privacy.scss';

interface Props {
  isAccepted: boolean,
  acceptPolicy: () => void
}

const Privacy: FC<Props> = (props: Props) => {
  const { isAccepted, acceptPolicy } = props;

  return (
    <div className="text">
      <p className="agreement">I agree to the </p>

      <Link
        href="https://erin-web.herokuapp.com/privacy"
        title="privacy policy"
      />

      <p className="agreement">: </p>
      <Switch isChecked={isAccepted} handleSwitch={acceptPolicy} />
    </div>
  );
};

export default Privacy;
