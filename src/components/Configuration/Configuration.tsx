/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, useEffect, useRef } from 'react';
import capitalizeFirstLetter from '@helpers/convert';
import warning from '@modules/warning';
import { Config, Theme } from '@interfaces/Config';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '@app/store';
import Warning from '@interfaces/Warning';
import Settings from '@interfaces/Settings';
import Icons from '@icons/Settings';
import areEqual from '@helpers/areEqual';
import { addWarning } from '@/Warning/warningSlice';
import Privacy from '../Privacy/Privacy';
import Mode from '../Mode/Mode';
import Keywords from '../Keywords/Keywords';
import Timer from '../Timer/Timer';
import Startup from '../Startup/Startup';
import Quality from '../Quality/Quality';
import Save from '../Save/Save';

interface Item {
  name: Settings,
  title?: string,
  description?: string,
  dark?: string,
  light?: string
}

interface DispatchProps {
  addWarning: (warningMsg: string | Warning) => void,
}

interface Props extends DispatchProps {
  saveConfig?: () => void,
  items: Item[],
  config: Config,
  isSetup: boolean,
  activeIndex?: number,
  theme?: Theme
}

const Form: FC<Props> = ({
  config, items, addWarning, theme, isSetup, activeIndex, saveConfig,
}: Props) => {
  const {
    privacy, mode, timer, keywords, shouldStartup: startup, quality,
  } = config;

  const prevPropsConfig = useRef<Config>();

  useEffect(() => {
    if (prevPropsConfig.current) {
      const difference = areEqual.objects(config, prevPropsConfig.current) as keyof Config;

      const comparisonConfig = {
        [difference]: config[difference],
        mode: config.mode,
      };

      const settingsWarning = warning.match(comparisonConfig, false);

      addWarning(settingsWarning?.value || '');
    }

    prevPropsConfig.current = config;
  }, [config]);

  const renderSettingsItem = (name: Settings, isActive: boolean) => {
    if (name === Settings.Privacy) {
      return <Privacy isAccepted={privacy} />;
    }
    if (name === Settings.Mode) {
      return <Mode current={mode} />;
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
        />
      );
    }
    if (name === Settings.Startup) {
      return <Startup shouldStartup={startup} />;
    }
    if (name === Settings.Quality) {
      return <Quality initialQuality={quality} />;
    }
    if (name === Settings.Save) {
      return <Save saveConfig={saveConfig} />;
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
  addWarning: (warning: string | Warning) => dispatch(addWarning(warning)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
