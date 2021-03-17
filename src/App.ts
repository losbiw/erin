import React, {Component} from 'react'
import User from './Components/User/User'
import Setup from './Components/Setup/Setup'
import Controls from './Components/Controls/Controls'
import Warning from './Components/Warning/Warning'
import Update from './Components/Update/Update'
import config from '@modules/config'
import OS from '@modules/OS'
import { fetchGeocoding } from '@modules/APIs'
import './App.css'
import './root.css'

const { ipcRenderer } = window.require('electron');

interface IState{
    theme: Theme,

}

interface Theme{
    light: 'light',
    dark: 'dark'
}

export default class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            theme: 'dark',
            isCompleted: null,
            isRequiredFilled: false,
            warning: '',
            isUpdateAvailable: false
        }
    }

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

    handleThemeSwitch = () => {
        const current = this.state.theme;
        const value = current === 'dark' ? 'light' : 'dark';

        const updated = {
            theme: value
        }

        config.set(updated);
        this.setState(updated);
    }

    handleAppStateChange = (upd) => {
        this.setState(upd);
    }

    render(){
        const { state, handleThemeSwitch, handleAppStateChange } = this;
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

                { warning && <Warning value={ warning } 
                                      handleDelete={ handleAppStateChange }/> }
            </div>
        )
    }
}