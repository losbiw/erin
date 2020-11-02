import React from 'react'
import { SettingsIcons } from '../Svg/Loader'
import { capitalizeFirstLetter } from '@modules/convert'

export default function Form(props){ 
    const warnings = [
        {
            condition: (name, value) => (name === 'quality' && value === 'original'),
            value: "Choosing the best quality might slow down the download speed"
        },
        {
            condition: (name, value) => (name === 'keywords'  && value.length === 0 && props.config.mode === 'keywords'),
            value: "You have to input keywords or change mode"
        },
        {
            condition: (name, value) => (name === 'timer' && value > 1000 * 60 * 60 * 24 * 7),
            value: "Timer can't be set to a value more than a week"
        }
    ]

    const changeStateOnEvent = e => {
        const { target } = e;
        const { value } = target.dataset;
        
        updateState(target.name, target[value])
    }

    const updateState = (name, value) => {
        const { warningHandler, stateHandler } = props.handlers;
        let warning;
        
        for(let key in warnings){
            const current = warnings[key];
           
            if(current.condition(name, value))
                warning = current.value;
        }

        warningHandler({ warning: warning });
        stateHandler(name, value)
    }

    const { data, config, handlers } = props;
    const keys = Object.keys(data);

    return(
        <form id="settings">
        {
            keys.map(key => {
                const current = data[key];
                const { element, title, description } = current;

                const capitalized = capitalizeFirstLetter(key);
                const settingTitle = title || capitalized;
                const Element = element || current;
                const Icon = SettingsIcons[capitalized];
                
                const handler = key === 'keywords' || key === 'timer' 
                                ? updateState
                                : changeStateOnEvent;

                const lastElement = data[keys[keys.length - 1]];

                return(
                    <div className="item" key={ key }>
                        <div className="container">
                            <div className="title">
                                <Icon />
                                <h1>{ settingTitle }</h1>
                                <p>{ description || undefined }</p>
                            </div>

                            <div className="setting" id={ key }>
                                <Element data={ config[key] || [] } handler={ handler } warning={ handlers.warningHandler }/>
                            </div>
                        </div>
                        
                        { data[key] !== lastElement && <hr /> }
                    </div>
                )
            })
        }
        </form>
    )
}