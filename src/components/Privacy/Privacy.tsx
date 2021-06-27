import { changePrivacyAcceptance as changePrivacyAction } from '@/Form/settingsSlice';
import { AppDispatch } from '@app/store';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link } from '../Links/Links';
import Switch from '../Switch/Switch';
import './Privacy.scss';

interface Props {
  isAccepted: boolean,
  changePrivacyAcceptance: () => void
}

const Privacy: FC<Props> = ({
  isAccepted, changePrivacyAcceptance,
}: Props) => (
  <div className="text">
    <p className="agreement">I agree to the </p>

    <Link
      href="https://erin-web.herokuapp.com/privacy"
      title="privacy policy"
    />

    <p className="agreement">: </p>
    <Switch
      id="privacy-switch"
      isChecked={isAccepted}
      handleSwitch={changePrivacyAcceptance}
    />
  </div>
);

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changePrivacyAcceptance: () => dispatch(changePrivacyAction()),
});

export default connect(null, mapDispatchToProps)(Privacy);
