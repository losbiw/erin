import React, { Component } from 'react'
import Form from '../Form/Form'
import config from '@modules/config'
import warning from '@modules/warning'
import './Slider.scss'
import './Items.scss'
import { Config, ConfigUpdate, Theme } from '@/interfaces/Config'
import { Slides, items } from '../Setup/items'
import { Warning } from '@/interfaces/Warning'

interface Props{
    changeSlide: (name: Slides) => void,
    setWarning: (warning: string | Warning) => void,
    setIsComplete: (isComplete: boolean) => void,
    setIsRequiredFilled: (isFilled: boolean) => void,
    activeIndex: number,
    isComplete: boolean,
    theme: Theme
}

export default class Slider extends Component<Props, Config>{
    constructor(props: Props){
        super(props);

        this.state = config.get();
    }
    
    componentDidUpdate(){
        const { isComplete, setWarning, setIsComplete, setIsRequiredFilled, changeSlide } = this.props;

        if(isComplete){
            const settingsWarning = warning.match(this.state as Config, true);

            if(settingsWarning?.value){
                const { value, name } = settingsWarning;
                config.set({ isComplete: false });

                changeSlide(name as Slides);

                setIsComplete(false);
                setWarning(value);
            } 
            else{
                setIsRequiredFilled(true);
                setIsComplete(true);
            }
        }
    }

    updateSlideState = (update: ConfigUpdate) => {
        const config: Config = { ...this.state, ...update };
        this.setState(config);
    }

    calcSlidePosition = (amount: number, activeIndex: number) => {
        const middle = Math.round((amount - 1) / 2);
        const equalizer = amount % 2 === 0 ? 40 : 0;
        const multiplier = activeIndex === middle ? 0 : middle - activeIndex;

        return multiplier * 80 - equalizer;
    }

    render(){ 
        const { state, props, updateSlideState, calcSlidePosition } = this;
        const { setWarning, activeIndex, theme, setIsComplete } = props;
        const keys = Object.keys(items);

        const transform = calcSlidePosition(keys.length, activeIndex);

        if(Object.keys(state).length){
            return(
                <div className="slider-container">
                    <div className="translate" style={{ transform: `translateX(${ transform }vw)` }}>
                        <Form config={ state }
                              isSetup={ true }
                              activeIndex={ activeIndex }
                              setWarning={ setWarning }
                              setIsComplete={ setIsComplete }
                              updateSlideState={ updateSlideState }
                              theme={ theme }/>
                    </div>
                </div>
            )
        }
        else{
            return <form className="settings"></form>
        }
    }
}