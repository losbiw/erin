import React, {Component} from 'react'
import User from './Components/User/User'
import Controls from './Components/Controls/Controls'
import './root.css'

export default class App extends Component{
    constructor(props){
        super();

        this.state = {
            theme: 'dark'
        }
    }

    handleThemeSwitch = () => {
        const current = this.state.theme;
        const value = current === 'dark' ? 'light' : 'dark';

        this.setState({
            theme: value
        });
    }

    render(){
        const { state, handleThemeSwitch } = this;
        const { theme } = state;

        return(
            <div className={ theme }>
                <Controls />
                <User theme={ theme } 
                      handler={ handleThemeSwitch }/>
            </div>
        )
    }
}