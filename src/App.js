import React, {Component} from 'react'
import User from './Components/User/User'
import './root.css'

export default class App extends Component{
    constructor(props){
        super();

        this.state = {
            isFirstLaunch: true
        }
    }

    render(){
        return(
            <User />
        )
    }
}