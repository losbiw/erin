import React, { useState } from 'react'
import Slider from '../Slider/Slider'
import Privacy from '../Privacy/Privacy'
import Mode from '../Mode/Mode'
import Keywords from '../Keywords/Keywords'
import Timer from '../Timer/Timer'
import Startup from '../Switch/Switch'
import Quality from '../Quality/Quality'
import Save from '../Save/Save'
import Carousel from '../Carousel/Carousel'
import Arrows from '../Arrows/Arrows'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

import './Setup.css'

export default function Setup(props){
    const [slide, changeSlide] = useState(0);

    const items = [
        {
            name: 'privacy',
            title: 'Privacy Policy',
            description: 'Please, read our privacy policy before using the app',
            dark: 'https://images.pexels.com/photos/1557547/pexels-photo-1557547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            light: 'https://images.pexels.com/photos/1791684/pexels-photo-1791684.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Privacy
        },
        {
            name: 'mode',
            title: 'Wallpaper change mode',
            description: 'Choose depending on what you want your wallpaper to change',
            dark: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            light: 'https://images.pexels.com/photos/1482937/pexels-photo-1482937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Mode
        },
        {
            name: 'keywords',
            title: 'Keywords to search',
            description: 'Is only needed if you choose "Keywords" as your mode',
            dark: 'https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            light: 'https://images.pexels.com/photos/1770812/pexels-photo-1770812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Keywords
        },
        {
            name: 'timer',
            title: 'Timer',
            description: 'Set the interval you want your wallpaper to change within',
            dark: 'https://images.pexels.com/photos/91216/pexels-photo-91216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            light: 'https://images.pexels.com/photos/1428787/pexels-photo-1428787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Timer
        },
        {
            name: 'startup',
            title: 'Auto startup',
            description: 'Turn it on if you want Erin to launch with your system',
            dark: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            light: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Startup
        },
        {
            name: 'quality',
            title: 'Wallpaper resolution',
            description: 'Choose what quality you want your wallpaper to be downloaded in',
            light: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            dark: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Quality
        },
        {
            name: 'save',
            title: 'Save changes and continue',
            description: 'Click the button below to save your preferences and go to home page',
            dark: 'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            light: 'https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Save
        }
    ]

    const keys = Object.keys(items);

    const handleScroll = (isForward) => {
        let index = isForward ? slide + 1 : slide - 1;

        if(index >= keys.length) index = 0;
        else if(index < 0) index = keys.length - 1;

        changeSlide(index);
    } 

    const handleSlide = (name) => {
        const index = items.map(e => e.name).indexOf(name);
        changeSlide(index);
    }

    const { isCompleted, handleAppStateChange, theme } = props;

    return(
        <div id="setup">
            <ThemeToggle { ...props }/>
            <Arrows handleChange={[() => handleScroll(false), () => handleScroll(true)]}/>

            <Slider handleAppStateChange={ handleAppStateChange }
                    handleSlide = { handleSlide }
                    items={ items }
                    activeIndex={ slide }
                    active={ keys[slide] }
                    keys={ keys }
                    isCompleted={ isCompleted }
                    theme={ theme }/>
            
            <Carousel handleChange={ changeSlide }
                      activeIndex={ slide }
                      amount={ keys }
                      current={ slide }/>
        </div>
    )
}