import React, { Component } from 'react'
import Mode from '../Mode/Mode'
import Keywords from '../Keywords/Keywords'
import Timer from '../Timer/Timer'
import Startup from '../Switch/Switch'
import Form from '../Form/Form'
import Quality from '../Quality/Quality'
import config from '@modules/config'
import areEqual from '@modules/areEqual'
import warning from '@modules/warning'
import './Settings.css'

export default class Settings extends Component{
    constructor(props){
        super(props);

        this.state = {
            ...this.props.data
        }
    }

    componentDidMount(){
        const keys = Object.keys(this.state);
        // this.props.handleUserStateChange({ isRequiredFilled: false });
        
        if(keys.length === 0){
            const cfg = config.get();
            this.setState(cfg);
        }
    }

    static getDerivedStateFromProps(props, state){
        if(!Object.keys(state).length){
            return {
                ...props.data
            }
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState){
        if(!areEqual.objects(this.state, nextProps.data) ||
           !areEqual.objects(this.state, nextState)){
            return true
        }
        return false
    }

    componentWillUnmount(){
        const cfg = this.state;
        const { handleUserStateChange, data, handleAppStateChange } = this.props;

        const settingsWarning = warning.match(cfg, true);
        const areConfigsEqual = areEqual.objects(cfg, data);

        if((!areConfigsEqual && !!settingsWarning) || !!settingsWarning){
            handleUserStateChange({ 
                config: cfg,
                isRequiredFilled: false
            });
            handleAppStateChange({ warning: settingsWarning.value });
        }
        else if(!areConfigsEqual){
            handleUserStateChange({ 
                config: cfg,
                isRequiredFilled: true
            });
        }
        config.set(cfg);
    }

    handleStateChange = (name, value) => {
        const upd = {}
        upd[name] = value;

        this.setState(upd)
    }

    render(){
        const items = [
            {
                name: 'mode',
                element: Mode
            },
            {
                name: 'keywords',
                element: Keywords
            },
            {
                name: 'timer',
                element: Timer
            },
            {
                name: 'startup',
                element: Startup
            },
            {
                name: 'quality',
                element: Quality
            }
        ]
        
        if(!!Object.keys(this.state).length){
            return (
                <div className="page">
                    <Form data={ items } 
                         config={ this.state }
                         handlers={{
                             handleWarningChange: this.props.handleAppStateChange,
                             handleStateChange: this.handleStateChange
                         }} />
                </div>
            )
        }
        else{
            return <form id="settings"></form>
        }
    }
}