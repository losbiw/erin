import React, { useState } from 'react'
import Slider from '../Slider/Slider'
import Mode from '../Mode/Mode'
import Keywords from '../Keywords/Keywords'
import Timer from '../Timer/Timer'
import Startup from '../Switch/Switch'
import Quality from '../Quality/Quality'
import Carousel from '../Carousel/Carousel'
import Arrows from '../Arrows/Arrows'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import Links from '../Links/Links'
import './Setup.css'

export default function Setup(props){
    const [slide, changeSlide] = useState(0);

    const items = {
        privacy: {
            title: 'Privacy Policy',
            description: 'Please, read our privacy policy before using the app',
            background: 'https://images.pexels.com/photos/2706653/pexels-photo-2706653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: () => <Links links={{ 
                privacy: {
                    href: 'https://losbiw.github.io/erin-website/',
                    title: 'Open here'
                } 
            }}/>
        },
        mode: {
            title: 'Wallpaper change mode',
            description: 'Choose depending on what you want your wallpaper to change',
            background: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Mode
        },
        keywords: {
            title: 'Keywords to search',
            description: 'Only is needed if you choose "Keywords" as your mode',
            background: 'https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Keywords
        },
        timer: {
            title: 'Timer',
            description: 'Set the interval you want your wallpaper to change within',
            background: 'https://images.pexels.com/photos/1428787/pexels-photo-1428787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Timer
        },
        startup: {
            title: 'Auto startup',
            description: 'Turn it on if you want Erin to launch with your system',
            background: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Startup
        },
        quality: {
            title: 'Wallpaper resolution',
            description: 'Choose what quality you want your wallpaper to be downloaded in',
            background: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: Quality
        }
    }

    const keys = Object.keys(items);

    const handleScroll = (isForward) => {
        let index = isForward ? slide + 1 : slide - 1;

        if(index >= keys.length) index = 0;
        else if(index < 0) index = keys.length - 1;

        changeSlide(index);
    } 

    return(
        <div id="setup">
            <ThemeToggle { ...props }/>
            <Arrows handlers={[() => handleScroll(false), () => handleScroll(true)]}/>

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