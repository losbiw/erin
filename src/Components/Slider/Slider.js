import React, { Component } from 'react'
import Form from '../Form/Form'
import config from '@modules/config'
import './Slider.css'
import './Items.css'

export default class Slider extends Component{
    constructor(props){
        super();

        this.state = {
        }
    }

    componentDidMount(){
        const cfg = config.get();
        this.setState({ ...cfg })
    }

    stateHandler = (name, value) => {
        const upd = {}
        upd[name] = value;

        this.setState(upd)
    }

    render(){ 
        const { state, props, stateHandler } = this;
        const { items, handler, active, activeIndex, keys } = props;

        // const isEven = activeIndex % 2 === 0;
        const middle = Math.round((keys.length - 1) / 2);
        const multiplier = activeIndex === middle 
                            ? 0
                            : middle - activeIndex;

        if(!!Object.keys(state).length){
            return(
                <div id="slider-container">
                    <div id="translate" style={{ 
                        transform: `translateX(${ multiplier * 80 }vw)` 
                    }}>
                    {/* <div id="translate"> */}
                        <Form data={ items } 
                              config={ state }
                              active={ active }
                              handlers={{
                                  warningHandler: handler,
                                  stateHandler: stateHandler
                              }}/>
                    </div>
                </div>
            )
        }
        else{
            return <form id="settings"></form>
        }
    }
}