import React, { Component } from 'react'
import Form from '../Form/Form'
import config from '@modules/config'
import './Slider.css'
import './Items.css'

export default class Slider extends Component{
    constructor(props){
        super();

        this.state = config.get();
    }

    stateHandler = (name, value) => {
        const upd = {}
        upd[name] = value;

        this.setState(upd)
    }

    render(){ 
        const { state, props, stateHandler } = this;
        const { items, handler, active, activeIndex, keys, theme } = props;

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
                              handlers={{
                                  warningHandler: handler,
                                  stateHandler: stateHandler
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