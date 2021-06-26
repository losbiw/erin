import React, { FC } from 'react';
import Switch from '@/Switch/Switch';
import { AppDispatch } from '@app/store';
import { connect } from 'react-redux';
import { changeStartupPreference as changeStartupPreferenceAction } from '@/Form/settingsSlice';

interface Props {
  shouldStartup: boolean,
  changeStartupPreference: () => void
}

const Startup: FC<Props> = ({ shouldStartup, changeStartupPreference }: Props) => (
  <Switch
    id="startup"
    isChecked={shouldStartup}
    handleSwitch={changeStartupPreference}
  />
);

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changeStartupPreference: () => dispatch(changeStartupPreferenceAction()),
});

export default connect(null, mapDispatchToProps)(Startup);
