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
import './Settings.scss'
import { Config } from '@/interfaces/Config'
import { Warning } from '@/interfaces/Warning'

interface Props{
    config: Config,
    updateConfig: (config: Config, isRequiredFilled: boolean) => void,
    setWarning: (warning: string | Warning) => void
}

interface State extends Config {}

export default class Settings extends Component<Props, State>{
    state: State = {
        ...this.props.config
    }

    componentDidMount(){
        const keys = Object.keys(this.state);
        
        if(keys.length === 0){
            const cfg = config.get();
            this.setState(cfg);
        }
    }

    static getDerivedStateFromProps(props: Props, state: State){
        if(!Object.keys(state).length){
            return {
                ...props.config
            }
        }
        return null
    }

    shouldComponentUpdate(nextProps: Props, nextState: State){
        if(!areEqual.objects(this.state, nextProps.config) ||
           !areEqual.objects(this.state, nextState)){
            return true
        }
        return false
    }

    componentWillUnmount(){
        const stateConfig = this.state;
        const { updateConfig, config: cfg, setWarning } = this.props;

        const settingsWarning = warning.match(stateConfig, true);
        const areConfigsEqual = areEqual.objects(stateConfig, cfg);

        setWarning('');

        if((!areConfigsEqual && !!settingsWarning) || !!settingsWarning){
            updateConfig(stateConfig, false);
            setWarning(settingsWarning.value);
        }
        else if(!areConfigsEqual){
            updateConfig(stateConfig, true);
        }

        config.set(stateConfig);
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
                    {/* <Form data={ items } 
                         config={ this.state }
                         setWarning={ this.props.setWarning }
                         handlers={{
                             handleStateChange: this.handleStateChange
                         }} /> */}
                </div>
            )
        }
        else{
            return <form id="settings"></form>
        }
    }
}