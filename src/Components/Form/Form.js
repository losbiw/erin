import React from 'react'
import { SettingsIcons } from '../Svg/Loader'
import { capitalizeFirstLetter } from '@modules/convert'
import warning from '@modules/warning'

export default function Form(props){ 
    const changeStateOnEvent = e => {
        const { target } = e;
        const { value } = target.dataset;
        
        updateState(target.name, target[value])
    }

    const updateState = (name, value) => {
        const { handleWarningChange, handleStateChange } = props.handlers;

        const matchWarning = {
            mode: props.config.mode
        }
        
        matchWarning[name] = value;
        const settingsWarning = warning.match(matchWarning);

        handleWarningChange({ warning: settingsWarning?.value });
        handleStateChange(name, value);
    }

    const { data, config, handlers, active, theme, isSetup } = props;

    return(
        <form id="settings">
        {
            data.map(setting => {
                const key = setting.name;
                const { element, title, description } = setting;

                const capitalized = capitalizeFirstLetter(key);
                const settingTitle = title || capitalized;
                const Element = element || setting;
                const Icon = SettingsIcons[capitalized] || (() => <div />);
                const activeClass = key === active ? 'active-item' : '';
                
                const handleChange = key === 'keywords' || key === 'timer' 
                                ? updateState
                                : changeStateOnEvent;

                const lastElement = data[data.length - 1];

                return(
                    <div className={ `item ${ activeClass }` } key={ key } style={{ 
                        backgroundImage: setting[theme] ? `url(${setting[theme]})` : 'none'
                    }}>
                        <div className="container">
                            <div className="title">
                                <Icon />
                                <h1>{ settingTitle }</h1>
                                <p>{ description || undefined }</p>
                            </div>

                            <div className="setting" id={ key }>
                                <Element data={ config[key] || [] } 
                                         handleChange={ handleChange } 
                                         handleWarningChange={ handlers.handleWarningChange }
                                         isSetup={ isSetup }
                                         config={ key === 'save' && config }/>
                            </div>
                        </div>
                        
                        { setting !== lastElement && <hr /> }
                    </div>
                )
            })
        }
        </form>
    )
}