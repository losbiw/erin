import React, { Component } from 'react';
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

class Settings extends Component<Props, Config> {
  constructor(props: Props) {
    super(props);

    this.state = {
      ...props.config,
    };
  }

  componentDidMount() {
    const keys = Object.keys(this.state);

    if (keys.length === 0) {
      const cfg = config.get();
      this.setState(cfg);
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: Config) {
    if (!areEqual.objects(this.state, nextProps.config)
           || !areEqual.objects(this.state, nextState)) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    const stateConfig = this.state;
    const { updateConfig, config: cfg, setWarning } = this.props;

    const settingsWarning = warning.match(stateConfig, true);
    const areConfigsEqual = areEqual.objects(stateConfig, cfg);

    setWarning('');

    if ((!areConfigsEqual && !!settingsWarning) || !!settingsWarning) {
      updateConfig(stateConfig, false);
      setWarning(settingsWarning.value);
    } else if (!areConfigsEqual) {
      updateConfig(stateConfig, true);
    }

    config.set(stateConfig);
  }

    handleStateChange = (update: ConfigUpdate) => {
      const cfg: Config = { ...this.state, ...update };
      this.setState(cfg);
    }

    render() {
      if (this.state) {
        const { setIsComplete, setWarning } = this.props;

        return (
          <div className="page">
            <Form
              items={items}
              config={this.state}
              isSetup={false}
              setIsComplete={setIsComplete}
              setWarning={setWarning}
              updateSettingsState={this.handleStateChange}
            />
          </div>
        );
      }

      return <form className="settings" />;
    }
}

export default Settings;
