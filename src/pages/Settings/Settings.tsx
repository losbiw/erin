import React, { FC, useEffect } from 'react';
import config from '@modules/config';
import areEqual from '@helpers/areEqual';
import warning from '@modules/warning';
import './Settings.scss';
import { Config } from '@interfaces/Config';
import Warning from '@interfaces/Warning';
import Form from '@/Form/Form';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '@app/store';
import { saveTempConfig as saveTempConfigAction } from '@/Form/settingsSlice';
import { addWarning as addWarningAction } from '@/Warning/warningSlice';
import items from './items';

interface DispatchProps {
  saveTempConfig: () => void,
  addWarning: (warningMsg: string | Warning) => void
}

interface Props extends DispatchProps {
  tempConfig: Config,
  initConfig: Config
}

const Settings: FC<Props> = ({
  saveTempConfig, tempConfig, initConfig, addWarning,
}: Props) => {
  useEffect(() => () => {
    const settingsWarning = warning.match(tempConfig, true);
    const areConfigsEqual = areEqual.objects(tempConfig, initConfig);

    if (settingsWarning) {
      // set page to settings here
      addWarning(settingsWarning.value);
    } else if (!areConfigsEqual) {
      addWarning('');
      saveTempConfig();
    }
  }, []);

  return (
    <div className="page">
      <Form
        items={items}
        isSetup={false}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  tempConfig: state.settings.tempConfig,
  initConfig: state.settings.config,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addWarning: (_warning: string | Warning) => dispatch(addWarningAction(_warning)),
  saveTempConfig: () => dispatch(saveTempConfigAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
