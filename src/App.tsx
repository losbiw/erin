import React, {Component} from 'react'
import User from './Components/User/User'
import Setup from './Components/Setup/Setup'
import Controls from './Components/Controls/Controls'
import { Warning, CustomWarning } from './Components/Warning/Warning'
import Update from './Components/Update/Update'

import config from '@modules/config'
import OS from '@modules/OS'
import { fetchGeocoding } from '@modules/APIs'

import { Theme } from '@/interfaces/Config'
import { Warning as WarningInterface } from '@interfaces/Warning.d'

import './App.scss'
import './style/global.scss'

const { ipcRenderer } = window.require('electron');

interface State{
    theme: Theme,
    isUpdateAvailable: boolean,
    isRequiredFilled: boolean,
    isComplete: boolean | null,
    warning: string | WarningInterface,
}

export default class App extends Component<{}, State>{
    state: State = {
        theme: Theme.Dark,
        isUpdateAvailable: false,
        isRequiredFilled: false,
        isComplete: null,
        warning: ''
    };

    async componentDidMount(){
        const { theme, isComplete, isFirstTime } = config.get();
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
            isComplete,
            isRequiredFilled: isComplete
        });
    }

    switchTheme = (): void => {
        const current = this.state.theme;
        const value = current === Theme.Dark ? Theme.Light : Theme.Dark;

        const updated = {
            theme: value
        }

        config.set(updated);
        this.setState(updated);
    }

    rejectUpdate = (): void => {
        this.setState({
            isUpdateAvailable: false
        });
    }

    setIsRequiredFilled = (isRequiredFilled: boolean): void => {
        this.setState({
            isRequiredFilled
        });
    }

    setIsComplete = (isComplete: boolean): void => {
        this.setState({
            isComplete
        });
    }

    setWarning = (warning: string | WarningInterface): void => {
        this.setState({
            warning
        });
    }

    render(){
        const { switchTheme, setWarning, rejectUpdate, setIsComplete, setIsRequiredFilled } = this;
        const { theme, isComplete, warning, isRequiredFilled, isUpdateAvailable } = this.state;

        return(
            <div className={ `theme ${theme}` }>
                <Controls />

                { isComplete !== null
                    ? isComplete && isRequiredFilled
                    ? <User theme={ theme } 
                            setWarning={ setWarning } 
                            switchTheme={ switchTheme }/> 
                    : <Setup theme={ theme }
                            isComplete={ isComplete }
                            switchTheme={ switchTheme }
                            setWarning={ setWarning }
                            setIsComplete={ setIsComplete }
                            setIsRequiredFilled={ setIsRequiredFilled }/>
                    : <></>  
                }

                { isUpdateAvailable && <Update rejectUpdate={ rejectUpdate } setWarning={ setWarning } /> }

                { (warning && typeof warning === 'string')
                    ? <Warning warning={ warning } removeWarning={ () => setWarning('') }/>
                    : warning && <CustomWarning warning={ warning as WarningInterface } removeWarning={ () => setWarning('') } />
                }
            </div>
        )
    }
}