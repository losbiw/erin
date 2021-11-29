import React, { FC, useEffect } from 'react';
import areEqual from '@helpers/areEqual';
import warning from '@modules/warning';
import './Settings.scss';
import { Config } from '@interfaces/Config';
import Warning from '@interfaces/Warning';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '@app/store';
import Configuration from '@/Configuration/Configuration';
import { saveTempConfig as saveTempConfigAction } from '@/Configuration/settingsSlice';
import { addWarning as addWarningAction } from '@/Warning/warningSlice';
import { changeNavbarLock as changeNavbarLockAction } from '@/User/slices/generalSlice';
import items from './items';

interface DispatchProps {
  saveTempConfig: () => void,
  addWarning: (warningMsg: string | Warning) => void,
  changeNavbarLock: (isLocked: boolean) => void
}

interface Props extends DispatchProps {
  tempConfig: Config,
  initConfig: Config
}

const Settings: FC<Props> = ({
  saveTempConfig, tempConfig, initConfig, addWarning, changeNavbarLock,
}: Props) => {
  useEffect(() => {
    const settingsWarning = warning.match(tempConfig, true);
    changeNavbarLock(!!settingsWarning);

    return () => {
      const areConfigsEqual = areEqual.objects(tempConfig, initConfig, true);

      if (!areConfigsEqual) {
        addWarning('');
        saveTempConfig();
      }
    };
  }, [tempConfig]);

  return (
    <div className="page">
      <Configuration
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
  changeNavbarLock: (isLocked: boolean) => dispatch(changeNavbarLockAction(isLocked)),
  saveTempConfig: () => dispatch(saveTempConfigAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
