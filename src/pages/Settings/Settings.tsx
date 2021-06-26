import React, {
  FC, useEffect, useState, useRef, memo,
} from 'react';
import config from '@modules/config';
import areEqual from '@helpers/areEqual';
import warning from '@modules/warning';
import './Settings.scss';
import { Config, ConfigUpdate } from '@interfaces/Config';
import Warning from '@interfaces/Warning';
import Form from '@/Form/Form';
import items from './items';

interface Props {
  config: Config,
  updateConfig: (cfg: Config, isRequiredFilled: boolean) => void,
  setIsComplete: (isComplete: boolean) => void,
  setWarning: (warningMsg: string | Warning) => void
}

const Settings: FC<Props> = memo(({
  updateConfig, config: propsConfig, setWarning, setIsComplete,
}: Props) => {
  const [stateConfig, updateStateConfig] = useState(propsConfig);
  const configRef = useRef<Config>(propsConfig);

  useEffect(() => {
    configRef.current = stateConfig;
  }, [stateConfig]);

  useEffect(() => {
    const keys = Object.keys(stateConfig);

    if (keys.length === 0) {
      const initConfig = config.get();
      updateStateConfig(initConfig);
    }

    return () => {
      const { current } = configRef;
      const settingsWarning = warning.match(current, true);
      const areConfigsEqual = areEqual.objects(current, propsConfig);

      setWarning('');

      if ((!areConfigsEqual && !!settingsWarning) || !!settingsWarning) {
        updateConfig(current, false);
        setWarning(settingsWarning.value);
      } else if (!areConfigsEqual) {
        updateConfig(current, true);
      }

      config.set(current);
    };
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
