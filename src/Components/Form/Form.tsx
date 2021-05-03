/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC } from 'react';
import capitalizeFirstLetter from '@modules/convert';
import warning from '@modules/warning';
import {
  Config, ConfigUpdate, Mode as ModeEnum, Quality as QualityInterface, Theme,
} from '@/interfaces/Config';
import { Warning } from '@/interfaces/Warning';
import Settings from '@/interfaces/Settings';
import Icons from '../Icons/Settings';
import Privacy from '../Privacy/Privacy';
import Mode from '../Mode/Mode';
import Keywords from '../Keywords/Keywords';
import Timer from '../Timer/Timer';
import Startup from '../Switch/Switch';
import Quality from '../Quality/Quality';
import Save from '../Save/Save';

interface Item{
    name: Settings,
    title?: string,
    description?: string,
    dark?: string,
    light?: string
}

interface Props{
    setWarning: (warningMsg: string | Warning) => void,
    updateSettingsState: (update: ConfigUpdate) => void,
    setIsComplete: (isComplete: boolean) => void,
    items: Item[],
    config: Config,
    isSetup: boolean,
    activeIndex?: number,
    theme?: Theme
}

const Form: FC<Props> = (props: Props) => {
  const {
    config, items, setWarning, theme, isSetup, activeIndex, setIsComplete, updateSettingsState,
  } = props;
  const {
    privacy, mode, timer, keywords, startup, quality,
  } = config;

  const updateState = (update: ConfigUpdate) => {
    const clone = { ...update };

    if (!update.mode) clone.mode = config.mode;
    const settingsWarning = warning.match(clone, false);

    setWarning(settingsWarning?.value || '');
    updateSettingsState(update);
  };

  const privacyHandler = () => updateState({ privacy: !privacy });
  const modeHandler = (mode: ModeEnum) => updateState({ mode });
  const keywordsHandler = (keywords: string[]) => updateState({ keywords });
  const timerHandler = (timer: number) => updateState({ timer });
  const startupHandler = () => updateState({ startup: !startup });
  const qualityHandler = (quality: QualityInterface) => updateState({ quality });

  const renderSettingsItem = (name: Settings, isActive: boolean) => {
    if (name === Settings.Privacy) {
      return (
        <Privacy
          isAccepted={privacy}
          acceptPolicy={privacyHandler}
        />
      );
    }
    if (name === Settings.Mode) {
      return (
        <Mode
          current={mode}
          changeMode={modeHandler}
        />
      );
    }
    if (name === Settings.Keywords) {
      return (
        <Keywords
          keywords={[...keywords]}
          isActive={isActive}
          isSetup={isSetup}
          changeKeywords={keywordsHandler}
          setWarning={setWarning}
        />
      );
    }
    if (name === Settings.Timer) {
      return (
        <Timer
          isActive={isActive}
          time={timer}
          setWarning={setWarning}
          updateTimeout={timerHandler}
        />
      );
    }
    if (name === Settings.Startup) {
      return (
        <Startup
          isChecked={startup}
          handleSwitch={startupHandler}
        />
      );
    }
    if (name === Settings.Quality) {
      return (
        <Quality
          initialQuality={quality}
          changeQuality={qualityHandler}
        />
      );
    }
    if (name === Settings.Save) {
      return (
        <Save
          configData={config}
          setIsComplete={setIsComplete}
        />
      );
    }

    return <div />;
  };

  return (
    <form className="settings">
      {
        items.map((setting, index) => {
          const { title, description, name: key } = setting;
          const isActive = index === activeIndex;
          const capitalized = capitalizeFirstLetter(key);
          const Icon = Icons[capitalized];

          const lastElement = items[items.length - 1];

          return (
            <div
              className={`item ${isActive ? 'active-item' : ''}`}
              style={theme && { backgroundImage: setting[theme] ? `url(${setting[theme]})` : 'none' }}
              key={key}
            >
              <div className="container">
                <div className={isSetup ? 'setup-title' : 'title'}>
                  { Icon && <Icon /> }
                  <h1 className="setting-title">{ title || capitalized }</h1>
                  <p className="setting-desc">{ description || undefined }</p>
                </div>

                <div className={`setting ${key}`}>
                  { renderSettingsItem(key, isActive) }
                </div>
              </div>

              { setting !== lastElement && !isSetup && <hr className="separator" /> }
            </div>
          );
        })
      }
    </form>
  );
};

Form.defaultProps = {
  activeIndex: 0,
} as Props;

export default Form;
