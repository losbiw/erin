import React, { FC } from 'react'
import Icons from '../Icons/Settings'
import Privacy from '../Privacy/Privacy'
import Mode from '../Mode/Mode'
import Keywords from '../Keywords/Keywords'
import Timer from '../Timer/Timer'
import Startup from '../Switch/Switch'
import Quality from '../Quality/Quality'
import Save from '../Save/Save'
import { capitalizeFirstLetter } from '@modules/convert'
import warning from '@modules/warning'

import { Config, ConfigUpdate, Mode as ModeEnum, Quality as QualityInterface, Theme } from '@/interfaces/Config'
import { Warning } from '@/interfaces/Warning'
import { Settings } from '@/interfaces/Settings'

interface Item{
    name: Settings,
    title?: string,
    description?: string
}

interface Props{
    setWarning: (warning: string | Warning) => void,
    updateSettingsState: (update: ConfigUpdate) => void,
    setIsComplete: (isComplete: boolean) => void,
    items: Item[],
    config: Config,
    isSetup: boolean,
    activeIndex?: number,
    theme?: Theme
}

const Form: FC<Props> = (props) => { 
    const updateState = (update: ConfigUpdate) => {
        const { setWarning, updateSettingsState, config } = props;

        if(!update.mode) update.mode = config.mode;
        const settingsWarning = warning.match(update, false);

        setWarning(settingsWarning?.value || '');
        updateSettingsState(update);
    }

    const { config, items, setWarning, theme, isSetup, activeIndex, setIsComplete } = props;

    const renderSettingsItem = (name: Settings, isActive: boolean, isSetup: boolean) => {
        const { privacy, mode, timer, keywords, startup, quality } = config;
    
        if(name === Settings.Privacy){
            return <Privacy isAccepted={ privacy } 
                            acceptPolicy={ () => updateState({ privacy: !privacy }) }/>
        }
        else if(name === Settings.Mode){
            return <Mode current={ mode } 
                        changeMode={ (mode: ModeEnum) => updateState({ mode }) }/>
        }
        else if(name === Settings.Keywords){
            return <Keywords keywords={ [...keywords] }
                            isActive={ isActive }
                            isSetup={ isSetup }
                            changeKeywords={ (keywords: string[]) => updateState({ keywords }) }
                            setWarning={ setWarning }/>
        }
        else if(name === Settings.Timer){
            return <Timer isActive={ isActive } 
                        time={ timer } 
                        updateTimeout={ (timer: number) => updateState({ timer }) }/>
        }
        else if(name === Settings.Startup){
            return <Startup isChecked={ startup }
                            handleSwitch={ () => updateState({ startup: !startup }) }/>
        }
        else if(name === Settings.Quality){
            return <Quality initialQuality={ quality }
                            changeQuality={ (quality: QualityInterface) => updateState({ quality }) }/>
        }
        else if(name === Settings.Save){
            return <Save configData={ config }
                        setIsComplete={ setIsComplete }/>
        }
        else{
            return <div />
        }
    }

    return(
        <form className="settings">
        {
            items.map((setting, index) => {
                const { title, description, name: key } = setting;
                const isActive = index === activeIndex;
                const capitalized = capitalizeFirstLetter(key);
                const Icon = Icons[capitalized];

                const lastElement = items[items.length - 1];

                return(
                    <div className={`item ${isActive ? 'active-item' : '' }`} 
                        style={ theme && { backgroundImage: setting[theme] ? `url(${setting[theme]})` : 'none'}}
                        key={ key }>
                        <div className="container">
                            <div className={ isSetup ? "setup-title" : "title" }>
                                { Icon && <Icon /> }
                                <h1 className='setting-title'>{ title || capitalized }</h1>
                                <p className='setting-desc'>{ description || undefined }</p>
                            </div>

                            <div className={`setting ${key}`}>
                                { renderSettingsItem(key, isActive, isSetup) }
                            </div>
                        </div>
                        
                        { setting !== lastElement && !isSetup && <hr className="separator" /> }
                    </div>
                )
            })
        }
        </form>
    )
}

export default Form