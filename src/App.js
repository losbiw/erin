import React, {Component} from 'react'
import User from './Components/User/User'
import Setup from './Components/Setup/Setup'
import Controls from './Components/Controls/Controls'
import Warning from './Components/Warning/Warning'
import config from '@modules/config'
import './App.css'
import './root.css'

export default class App extends Component{
    constructor(_props){
        super();

        this.state = {
            theme: 'dark',
            isCompleted: false,
            isRequiredFilled: false,
            warning: ''
        }
    }

    componentDidMount(){
        const { theme, isCompleted } = config.get();

        this.setState({
            theme,
            isCompleted,
            isRequiredFilled: isCompleted
        })
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
        this.setState(upd)
    }

    render(){
        const { state, handleThemeSwitch, handleAppStateChange } = this;
        const { theme, isCompleted, warning, isRequiredFilled } = state;

        const childProps = {
            theme,
            isCompleted,
            handleAppStateChange,
            handleThemeSwitch
        }

        return(
            <div id="theme" className={ theme }>
                <Controls />
                
                { isCompleted && isRequiredFilled
                    ? <User { ...childProps }/>
                    : <Setup { ...childProps }/>
                }

                { warning && <Warning value={ warning } 
                                      handleDelete={ handleAppStateChange }/> }
            </div>
        )
    }
}