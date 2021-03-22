import React, {Component} from 'react'
import User from './Components/User/User'
import Setup from './Components/Setup/Setup'
import Controls from './Components/Controls/Controls'
import { Warning, CustomWarning } from './Components/Warning/Warning'
import Update from './Components/Update/Update'

import config from '@modules/config'
import OS from '@modules/OS'
import { fetchGeocoding } from '@modules/APIs'

import { Theme } from './types/ConfigInterface'
import { Warning as WarningInterface } from './types/WarningInterface'

import './App.css'
import './root.css'

const { ipcRenderer } = window.require('electron');

interface State{
    theme: keyof Theme,
    isUpdateAvailable: boolean,
    isRequiredFilled: boolean,
    isCompleted: boolean | null,
    warning: string | WarningInterface
}

export default class App extends Component<{}, State>{
    state: State = {
        theme: 'dark',
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

    handleThemeSwitch = (): void => {
        const current = this.state.theme;
        const value: keyof Theme = current === 'dark' ? 'light' : 'dark';

        const updated = {
            theme: value
        }

        config.set(updated);
        this.setState(updated as State);
    }

    updateWarning = (warning: string): void => {
        this.setState({
            warning
        });
    }

    handleAppStateChange = (upd: StateUpdate): void => {
        this.setState(upd);
    }

    render(){
        const { state, handleThemeSwitch, handleAppStateChange, updateWarning } = this;
        const { theme, isCompleted, warning, isRequiredFilled, isUpdateAvailable } = state;

        const childProps = {
            theme,
            isCompleted,
            handleAppStateChange,
            handleThemeSwitch
        }

        return(
            <div id="theme" className={ theme }>
                <Controls />

                { isCompleted !== null
                    ? isCompleted && isRequiredFilled
                    ? <User { ...childProps }/> 
                    : <Setup { ...childProps }/>
                    : <div />  
                }

                { isUpdateAvailable && <Update handleReject={ handleAppStateChange }/> }

                { (warning && typeof warning === 'string')
                    ? <Warning warning={ warning } removeWarning={ updateWarning }/>
                    : warning && <CustomWarning warning={ warning as WarningInterface } removeWarning={ updateWarning } />
                }
            </div>
        )
    }
}