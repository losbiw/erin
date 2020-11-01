import React, { Component } from 'react'
import Mode from '../Mode/Mode'
import Keywords from '../Keywords/Keywords'
import Timer from '../Timer/Timer'
import Startup from '../Switch/Switch'
import Form from '../Form/Form'
import Quality from '../Quality/Quality'
import config from '@modules/config'
import areEqual from '@modules/areEqual'
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
        
        if(keys.length === 0){
            const cfg = config.get();
            this.setState(cfg)
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

    shouldComponentUpdate(nextProps, _nextState){
        if(!areEqual.objects(this.state, nextProps.data)){
            return true
        }
        return false
    }

    componentWillUnmount(){
        const cfg = this.state;
        const { handler, data } = this.props;

        if(!areEqual.objects(cfg, data)){
            handler({ config: cfg });
            config.set(cfg);
        }
    }

    stateHandler = (name, value) => {
        const upd = {}
        upd[name] = value;

        this.setState(upd)
    }

    render(){
        const items = {
            mode: Mode,
            keywords: Keywords,
            timer: Timer,
            startup: Startup,
            quality: Quality
        }
        
        if(!!Object.keys(this.state).length){
            return <Form data={ items } 
                         config={ this.state }
                         handlers={{
                             warningHandler: this.props.setWarning,
                             stateHandler: this.stateHandler
                         }} />
        }
        else{
            return <form id="settings"></form>
        }
    }
}