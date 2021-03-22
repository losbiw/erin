import React from 'react'
import Template from './Template'

import Home from 'raw-loader!@nav/home.svg'
import Picker from 'raw-loader!@nav/picker.svg'
import Settings from 'raw-loader!@nav/settings.svg'
import Info from 'raw-loader!@nav/info.svg'

import Donation from 'raw-loader!@info/donation.svg'
import Development from 'raw-loader!@info/development.svg'
import Smile from 'raw-loader!@info/smile.svg'
import Reddit from 'raw-loader!@info/reddit.svg'
import Github from 'raw-loader!@info/github.svg'

import Arrow from 'raw-loader!@ui/arrow.svg'
import Warning from 'raw-loader!@ui/warning.svg'
import Cross from 'raw-loader!@ui/cross.svg'
import Circle from 'raw-loader!@ui/circle.svg'
import Accept from 'raw-loader!@ui/accept.svg'
import Download from 'raw-loader!@ui/download.svg'
import Clipboard from 'raw-loader!@ui/clipboard.svg'

import Moon from 'raw-loader!@themes/moon.svg'
import Sun from 'raw-loader!@themes/sun.svg'

import Minimize from 'raw-loader!@controls/minimize.svg'
import Maximize from 'raw-loader!@controls/maximize.svg'
import Restore from 'raw-loader!@controls/restore.svg'

import Mode from 'raw-loader!@settings/mode.svg'
import Keywords from 'raw-loader!@settings/keywords.svg'
import Privacy from 'raw-loader!@settings/privacy.svg'
import Timer from '@settings/timer.svg'
import Startup from '@settings/startup.svg'
import Quality from '@settings/quality.svg'
import Save from '@settings/save.svg'

import { Svg } from '../../types/Icon'

interface Icons {
    [name: string]: Svg | string 
}

interface Group {
    [name: string]: Icons | string[]
}

const group: Group = {
    NavIcons: {
        Home,
        Picker,
        Settings,
        Info
    },
    Arrows: [
        Arrow,
        Arrow
    ],
    InfoIcons: {
        Github,
        Reddit,
        Donation,
        Smile,
        Development
    },
    Crosses: {
        Green: {
            path: Cross
        },
        Yellow: {
            path: Cross,
            gradient: {
                from: '#fdfc47',
                to: '#fdc830'
            }
        },
        Red: {
            path: Cross,
            gradient: {
                from: '#D31027',
                to: '#EA384D'
            }
        }
    },
    UI: {
        Circle,
        Accept,
        Clipboard,
        Warning: {
            path: Warning,
            gradient: {
                from: '#fdfc47',
                to: '#fdc830'
            }
        },
        Download: {
            path: Download,
            gradient: {
                from: '#fdfc47',
                to: '#fdc830'
            }
        }
    },
    Control: {
        Minimize,
        Maximize,
        Restore
    },
    Themes: {
        Moon,
        Sun
    }
}

function iterateIcons(groups: Group){
    for(const icons in groups){
        groups[icons] = addGradients(groups[icons]);
    }
}

function addGradients(icons: Icons | string[]){ 
    for(const key in icons){
        const icon = icons[key];
        
        icons[key] = () => {
            if(typeof icon === 'string'){
                return <Template raw={ icon } id={ key }/>
            }
            else{
                return <Template svg={ icon } id={ key }/>
            }
        }
    }

    return icons
}

iterateIcons(group);

const { NavIcons, Arrows, InfoIcons, Crosses, Control, Themes, UI } = group;

const SettingsIcons = {
    Mode,
    Keywords,
    Timer,
    Startup,
    Quality,
    Privacy,
    Save
}

export { NavIcons, Arrows, InfoIcons, Crosses, SettingsIcons, Control, Themes, UI }