import React, { useState } from 'react'
import Slider from '../Slider/Slider'
import Carousel from '../Carousel/Carousel'
import { Arrows } from '../Arrows/Arrows'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { items, Slides } from './items'

import './Setup.scss'
import '../Settings/Settings.scss'
import { Theme } from '@/interfaces/Config'
import { Warning } from '@/interfaces/Warning'

interface Props{
    theme: Theme,
    isComplete: boolean,
    switchTheme: () => void,
    setWarning: (warning: string | Warning) => void,
    setIsComplete: (isComplete: boolean) => void,
    setIsRequiredFilled: (isFilled: boolean) => void,
}

export default function Setup(props: Props){
    const [slideIndex, changeSlide] = useState(0);
    const length = items.length;

    const handleScroll = (isForward: boolean): void => {
        let index = isForward ? slideIndex + 1 : slideIndex - 1;

        if(index >= length) index = 0;
        else if(index < 0) index = length - 1;

        changeSlide(index);
    } 

    const changeSlideByName = (name: Slides): void => {
        const index = items.map(i => i.name).indexOf(name);
        changeSlide(index);
    }

    const { isComplete, switchTheme, theme, setWarning, setIsComplete, setIsRequiredFilled } = props;

    return(
        <div className="setup">
            <ThemeToggle switchTheme={ switchTheme }
                        theme={ theme }/>

            <Arrows handleChange={[() => handleScroll(false), () => handleScroll(true)]}/>

            <Slider changeSlide={ changeSlideByName }
                    activeIndex={ slideIndex }
                    isComplete={ isComplete }
                    theme={ theme }
                    setWarning={ setWarning }
                    setIsComplete={ setIsComplete }
                    setIsRequiredFilled={ setIsRequiredFilled }/>
            
            <Carousel changeSlide={ changeSlide }
                      activeIndex={ slideIndex }
                      amount={ length }/>
        </div>
    )
}