import React, {Component} from 'react'
import User from './Components/User/User'
import Setup from './Components/Setup/Setup'
import Controls from './Components/Controls/Controls'
import { Warning, CustomWarning } from './Components/Warning/Warning'
import Update from './Components/Update/Update'

import config from '@modules/config'
import OS from '@modules/OS'
import { fetchGeocoding } from '@modules/APIs'

import { Theme } from './types/Config.d'
import { Warning as WarningInterface } from './types/Warning.d'

import './App.css'
import './root.css'

const { ipcRenderer } = window.require('electron');

interface State{
    theme: Theme,
    isUpdateAvailable: boolean,
    isRequiredFilled: boolean,
    isCompleted: boolean | null,
    warning: string | WarningInterface,
}

export default class App extends Component<{}, State>{
    state: State = {
        theme: Theme.Dark,
        isUpdateAvailable: false,
        isRequiredFilled: false,
        isCompleted: null,
        warning: ''
    };

    async componentDidMount(){
        const { theme, isCompleted, isFirstTime } = config.get();
        const location = await fetchGeocoding(() => {});

        if(isFirstTime || typeof isFirstTime === 'undefined'){
            await fetch('https://erin-downloads.herokuapp.com/api/increase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: OS.define(),
                    location: location.toLowerCase()
                })
            });
            
            config.set({ isFirstTime: false });
        }

        ipcRenderer.send('component-did-mount');

        ipcRenderer.on('update-is-available', () => {
            this.setState({
                isUpdateAvailable: true
            });
        });

        this.setState({
            theme,
            isCompleted,
            isRequiredFilled: isCompleted
        });
    }

    switchTheme = (): void => {
        const current = this.state.theme;
        const value = current === Theme.Dark ? Theme.Light : Theme.Dark;

        const updated = {
            theme: value
        }

        config.set(updated);
        this.setState(updated as State);
    }

    rejectUpdate = (): void => {
        this.setState({
            isUpdateAvailable: false
        });
    }

    setWarning = (warning: string | WarningInterface): void => {
        this.setState({
            warning
        });
    }

    render(){
        const { state, switchTheme, setWarning, rejectUpdate } = this;
        const { theme, isCompleted, warning, isRequiredFilled, isUpdateAvailable } = state;

        const childProps = {
            theme,
            isCompleted,
            switchTheme,
            setWarning
        }

        return(
            <div id="theme" className={ theme }>
                <Controls />

                { isCompleted !== null
                    ? isCompleted && isRequiredFilled
                    ? <User theme={ theme } setWarning={ setWarning } switchTheme={ switchTheme }/> 
                    : <Setup { ...childProps }/>
                    : <></>  
                }

                { isUpdateAvailable && <Update rejectUpdate={ rejectUpdate } setWarning={ setWarning } /> }

                { (warning && typeof warning === 'string')
                    ? <Warning warning={ warning } removeWarning={ setWarning }/>
                    : warning && <CustomWarning warning={ warning as WarningInterface } removeWarning={ setWarning } />
                }
            </div>
        )
    }
}