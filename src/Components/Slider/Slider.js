import React, { Component } from 'react'
import Form from '../Form/Form'
import config from '@modules/config'
import warning from '@modules/warning'
import './Slider.css'
import './Items.css'

export default class Slider extends Component{
    constructor(_props){
        super();

        this.state = config.get();
    }

    componentDidUpdate(){
        const { isCompleted, handleAppStateChange, handleSlide } = this.props;

        if(isCompleted){
            const settingsWarning = warning.match(this.state, true);
            let data;

            if(settingsWarning?.value){
                const { value, name } = settingsWarning;
                data = { 
                    isCompleted: false,
                    warning: value
                }

                config.set({ isCompleted: false });

                handleSlide(name);
            } 
            else{
                data = { 
                    isRequiredFilled: true, 
                    isCompleted: true
                }
            }

            handleAppStateChange(data);
        }
    }

    handleStateChange = (name, value) => {
        const upd = {}
        upd[name] = value;

        this.setState(upd);
    }

    render(){ 
        const { state, props, handleStateChange } = this;
        const { items, handleAppStateChange, active, activeIndex, keys, theme } = props;

        const middle = Math.round((keys.length - 1) / 2);
        const equalizer = keys.length % 2 === 0 ? 40 : 0;
        const multiplier = activeIndex === middle ? 0 : middle - activeIndex;

        const transform = multiplier * 80 - equalizer;

        if(!!Object.keys(state).length){
            return(
                <div id="slider-container">
                    <div id="translate" style={{ 
                        transform: `translateX(${ transform }vw)` 
                    }}>
                        <Form data={ items } 
                              config={ state }
                              active={ active }
                              isSetup={ true }
                              handlers={{
                                handleWarningChange: handleAppStateChange,
                                handleStateChange
                              }}
                              theme={ theme }/>
                    </div>
                </div>
            )
        }
        else{
            return <form id="settings"></form>
        }
    }
}