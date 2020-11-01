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
            isCompleted: true,
            warning: ''
        }
    }

    componentDidMount(){
        const { theme, isCompleted } = config.get();
        this.setState({
            theme,
            // isCompleted
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

    stateHandler = (upd) => {
        this.setState(upd)
    }

    render(){
        const { state, handleThemeSwitch, stateHandler } = this;
        const { theme, isCompleted, warning } = state;

        return(
            <div id="theme" className={ theme }>
                <Controls />
                
                { isCompleted
                    ? <User theme={ theme } 
                            handler={ handleThemeSwitch }
                            state={ stateHandler }/>
                    : <Setup />
                }

                { warning && <Warning value={ warning } 
                                      handler={ stateHandler }/> }
            </div>
        )
    }
}