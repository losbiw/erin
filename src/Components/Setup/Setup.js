import React, { useState } from 'react'
import Slider from '../Slider/Slider'
import Mode from '../Mode/Mode'
import Keywords from '../Keywords/Keywords'
import Timer from '../Timer/Timer'
import Startup from '../Switch/Switch'
import Quality from '../Quality/Quality'
import Carousel from '../Carousel/Carousel'
import './Setup.css'

export default function Setup(props){
    const [slide, changeSlide] = useState(0);

    const items = {
        mode: {
            title: 'Wallpaper change mode',
            description: 'Choose depending on what you want your wallpaper to change',
            element: Mode
        },
        keywords: {
            title: 'Keywords to search',
            description: 'Only is needed if you choose "Keywords" as your mode',
            element: Keywords
        },
        timer: {
            title: 'Timer',
            description: 'Set the interval you want your wallpaper to change within',
            element: Timer
        },
        startup: {
            title: 'Auto startup',
            description: 'Turn it on if you want Erin to launch with your system',
            element: Startup
        },
        quality: {
            title: 'Wallpaper resolution',
            description: 'Choose what quality you want your wallpaper to be downloaded in',
            element: Quality
        },
        // privacy: {
        //     title: 'Privacy Policy',
        //     description: 'Please, read our privacy policy before using the app',
        //     element: () => <a/>
        // }
    }

    const keys = Object.keys(items);

    return(
        <div id="setup">
            <Slider handler={ props.handler }
                    items={ items }
                    activeIndex={ slide }
                    active={ keys[slide] }
                    keys={ keys }/>
            
            <Carousel handler={ changeSlide }
                      amount={ keys }
                      current={ slide }/>
        </div>
    )
}