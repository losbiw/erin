import React, {
  FC, useEffect, useState, memo,
} from 'react';
import config from '@modules/config';
import areEqual from '@modules/areEqual';
import warning from '@modules/warning';
import './Settings.scss';
import { Config, ConfigUpdate } from '@/interfaces/Config';
import { Warning } from '@/interfaces/Warning';
import Form from '../Form/Form';
import items from './items';

interface Props{
    config: Config,
    updateConfig: (cfg: Config, isRequiredFilled: boolean) => void,
    setIsComplete: (isComplete: boolean) => void,
    setWarning: (warningMsg: string | Warning) => void
}

const Settings: FC<Props> = memo((props: Props) => {
  const {
    updateConfig, config: propsConfig, setWarning, setIsComplete,
  } = props;
  const [stateConfig, updateStateConfig] = useState(propsConfig);

  const unmountHook = () => {
    const settingsWarning = warning.match(stateConfig, true);
    const areConfigsEqual = areEqual.objects(stateConfig, propsConfig);

    setWarning('');

    if ((!areConfigsEqual && !!settingsWarning) || !!settingsWarning) {
      updateConfig(stateConfig, false);
      setWarning(settingsWarning.value);
    } else if (!areConfigsEqual) {
      updateConfig(stateConfig, true);
    }

    config.set(stateConfig);
  };

  useEffect(() => {
    const keys = Object.keys(stateConfig);

    const setConfig = async () => {
      const initConfig = await config.get();
      updateStateConfig(initConfig);
    };

    if (keys.length === 0) {
      setConfig();
    }

    return unmountHook;
  }, []);

  const handleStateChange = (update: ConfigUpdate) => {
    const updatedConfig: Config = { ...stateConfig, ...update };
    updateStateConfig(updatedConfig);
  };

  if (stateConfig) {
    return (
      <div className="page">
        <Form
          items={items}
          config={stateConfig}
          isSetup={false}
          setIsComplete={setIsComplete}
          setWarning={setWarning}
          updateSettingsState={handleStateChange}
        />
      </div>
    );
  }

  return <form className="settings" />;
});

export default Settings;
