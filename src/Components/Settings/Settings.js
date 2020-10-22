import React, { Component } from 'react'
import capitalizeFirstLetter from '../../modules/capitalizeFirstLetter'
import config from '../../modules/config'
import Mode from '../Mode/Mode'
import Keywords from '../Keywords/Keywords'
import Timer from '../Timer/Timer'
import Startup from '../Switch/Switch'
import Quality from '../Quality/Quality'
import { SettingsIcons } from '../Svg/Loader'
import './settings.css'

export default class Settings extends Component{
    constructor(props){
        super(props);

        this.state = {
            ...this.props.data
        }
    }

    warnings = [
        {
            condition: (name, value) => (name === 'quality' && value === 'original'),
            value: "Choosing the best quality might slow down the download speed",
            isImportant: false
        },
        {
            condition: (name, value) => (name === 'keywords'  && value.length === 0 && this.state.mode === 'keywords'),
            value: "You have to input keywords or change mode",
            isImportant: true
        },
        {
            condition: (name, value) => (name === 'timer' && value < 30 * 1000),
            value: "Timer can't be set to a value less than 30 seconds",
            isImportant: true
        },
        {
            condition: (name, value) => (name === 'timer' && value > 1000 * 60 * 60 * 24 * 7),
            value: "Timer can't be set to a value more than a week",
            isImportant: true
        }
    ]

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

    changeState = (name, value) => {
        let updated = {};
        let warning;
        updated[name] = value;
        
        for(let key in this.warnings){
            const current = this.warnings[key];
           
            if(current.condition(name, value))
                warning = current.value;
        }

        this.props.handler({ warning: warning });
        this.setState(updated);
    }

    componentWillUnmount(){
        const cfg = this.state;
        const { handler, data } = this.props;

        if(!this.areObjectsEqual(cfg, data)){
            handler({ config: cfg });
            config.set(cfg);
        }
    }

    areObjectsEqual(obj1, obj2){
        for(let key in obj1){
            const current = obj1[key];

            if(current !== obj2[key] &&
               ((Array.isArray(current) && 
               !this.areArraysEqual(current, obj2[key])) ||
               !Array.isArray(current)))
            {
                    return false
            }
        }
        
        return true
    }

    areArraysEqual(arr1, arr2){
        if(arr1.length !== arr2.length){
            return false
        }
        else{
            const longer = arr1.length > arr2.length ? arr1 : arr2
            const shorter = arr1.length < arr2.length ? arr1 : arr2
            
            for(let value of longer){
                const valueExists = shorter.some(el => el === value);
                if(!valueExists) return false
            }
        }
        return true
    }

    changeStateOnEvent = e => {
        const { target } = e;
        const { value } = target.dataset;
        
        this.changeState(target.name, target[value]);
    }

    render(){
        const items = {
            mode: Mode,
            keywords: Keywords,
            timer: Timer,
            startup: Startup,
            quality: Quality
        }
        const keys = Object.keys(items);
        
        if(!!Object.keys(this.state).length){
            return( 
                <form id="settings">
                {
                    keys.map(key => {
                        const capitalized = capitalizeFirstLetter(key);
                        const Element = items[key];
                        const Icon = SettingsIcons[capitalized];
                        
                        const handler = key === 'keywords' || key === 'timer' 
                                        ? this.changeState
                                        : this.changeStateOnEvent;

                        const lastElement = items[keys[keys.length - 1]];
                        
                        return(
                            <div className="item" key={ key }>
                                <div className="wrapper">
                                    <div className="title">
                                        <Icon />
                                        <h1>{ capitalized }</h1>
                                    </div>
                                    <div className="setting" id={ key }>
                                        <Element data={ this.state[key] || [] } handler={ handler } warning={ this.props.handler }/>
                                    </div>
                                </div>
                                { items[key] !== lastElement && <hr /> }
                            </div>
                        )
                    })
                }
                </form>
            )
        }
        else{
            return <form id="settings"></form>
        }
    }
}