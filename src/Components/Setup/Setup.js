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
        privacy: {
            title: 'Privacy Policy',
            description: 'Please, read our privacy policy before using the app',
            background: 'https://images.pexels.com/photos/951408/pexels-photo-951408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            element: () => <a/>
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
            background: 'https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
            element: Quality
        }
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