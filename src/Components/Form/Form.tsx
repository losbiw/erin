import React, { FC } from 'react'
import Icons from '../Icons/Settings'
import Privacy from '../Privacy/Privacy'
import Mode from '../Mode/Mode'
import Keywords from '../Keywords/Keywords'
import Timer from '../Timer/Timer'
import Startup from '../Switch/Switch'
import Quality from '../Quality/Quality'
import Save from '../Save/Save'
import { items, Slides } from '../Setup/items'
import { capitalizeFirstLetter } from '@modules/convert'
import warning from '@modules/warning'

import { Config, ConfigUpdate, Mode as ModeEnum, Quality as QualityInterface, Theme } from '@/interfaces/Config'
import { Warning } from '@/interfaces/Warning'

interface Props{
    setWarning: (warning: string | Warning) => void,
    updateSlideState: (update: ConfigUpdate) => void,
    setIsComplete: (isComplete: boolean) => void,
    config: Config,
    isSetup: boolean,
    activeIndex: number,
    theme: Theme
}

const Form: FC<Props> = (props) => { 
    const updateState = (update: ConfigUpdate) => {
        const { setWarning, updateSlideState } = props;
        const settingsWarning = warning.match(update, false);

        setWarning(settingsWarning?.value || '');
        updateSlideState(update);
    }

    const { config, setWarning, theme, isSetup, activeIndex, setIsComplete } = props;

    const renderSettingsItem = (name: Slides, isActive: boolean) => {
        const { privacy, mode, timer, keywords, startup, quality } = config;
    
        if(name === Slides.Privacy){
            return <Privacy isAccepted={ privacy } 
                            acceptPolicy={ () => updateState({ privacy: !privacy }) }/>
        }
        else if(name === Slides.Mode){
            return <Mode current={ mode } 
                        changeMode={ (mode: ModeEnum) => updateState({ mode }) }/>
        }
        else if(name === Slides.Keywords){
            return <Keywords keywords={ [...keywords] }
                            isActive={ isActive }
                            isSetup={ isSetup }
                            changeKeywords={ (keywords: string[]) => updateState({ keywords }) }
                            setWarning={ setWarning }/>
        }
        else if(name === Slides.Timer){
            return <Timer isActive={ isActive } 
                        time={ timer } 
                        updateTimeout={ (timer: number) => updateState({ timer }) }/>
        }
        else if(name === Slides.Startup){
            return <Startup isChecked={ startup }
                            handleSwitch={ () => updateState({ startup: !startup }) }/>
        }
        else if(name === Slides.Quality){
            return <Quality initialQuality={ quality }
                            changeQuality={ (quality: QualityInterface) => updateState({ quality }) }/>
        }
        else if(name === Slides.Save){
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
                        style={{ backgroundImage: setting[theme] ? `url(${setting[theme]})` : 'none'}}
                        key={ key }>
                        <div className="container">
                            <div className={ isSetup ? "setup-title" : "title" }>
                                { Icon && <Icon /> }
                                <h1>{ title || capitalized }</h1>
                                <p>{ description || undefined }</p>
                            </div>

                            <div className={`setting ${key}`}>
                                { renderSettingsItem(key, isActive) }
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