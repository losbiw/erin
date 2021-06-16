/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, useEffect } from 'react';
import capitalizeFirstLetter from '@helpers/convert';
import warning from '@modules/warning';
import {
  Config, ConfigUpdate, Mode as ModeEnum, Quality as QualityInterface, Theme,
} from '@interfaces/Config';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '@app/store';
import Warning from '@interfaces/Warning';
import Settings from '@interfaces/Settings';
import Icons from '@icons/Settings';
import Privacy from '../Privacy/Privacy';
import Mode from '../Mode/Mode';
import Keywords from '../Keywords/Keywords';
import Timer from '../Timer/Timer';
import Startup from '../Switch/Switch';
import Quality from '../Quality/Quality';
import Save from '../Save/Save';

interface Item {
  name: Settings,
  title?: string,
  description?: string,
  dark?: string,
  light?: string
}

interface Props {
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
    config, items, setWarning, theme, isSetup, activeIndex, setIsComplete,
  } = props;
  const {
    privacy, mode, timer, keywords, shouldStartup: startup, quality,
  } = config;

  useEffect(() => {
    if (!update.mode) clone.mode = config.mode;
    const settingsWarning = warning.match(clone, false);

    setWarning(settingsWarning?.value || '');
  });

  const renderSettingsItem = (name: Settings, isActive: boolean) => {
    if (name === Settings.Privacy) {
      return <Privacy isAccepted={privacy} />;
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
          isFocused={isActive}
        />
      );
    }
    if (name === Settings.Timer) {
      return (
        <Timer
          isActive={isActive}
          timeInMs={timer}
          setWarning={setWarning}
          updateTimeout={timerHandler}
        />
      );
    }
    if (name === Settings.Startup) {
      return (
        <Startup
          id="startup"
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
        items.map((item, index) => {
          const { title, description, name: key } = item;
          const isActive = index === activeIndex;
          const capitalized = capitalizeFirstLetter(key);
          const Icon = Icons[capitalized];

          const lastElement = items[items.length - 1];

          return (
            <div
              className={`item ${isActive && 'active-item'}`}
              style={theme && { backgroundImage: item[theme] ? `url(${item[theme]})` : 'none' }}
              key={key}
            >
              <div className="container">
                <div className={isSetup ? 'setup-title' : 'title'}>
                  {Icon && <Icon />}
                  <h1 className="setting-title">{title || capitalized}</h1>
                  <p className="setting-desc">{description || undefined}</p>
                </div>

                <div className={`setting ${key}`}>
                  {renderSettingsItem(key, isActive)}
                </div>
              </div>

              { item !== lastElement && !isSetup && <hr className="separator" />}
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

const mapStateToProps = (state: RootState) => ({
  theme: state.theme,
  config: state.settings.tempConfig,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
