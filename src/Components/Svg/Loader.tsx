import React from 'react'
import Template from './Template'

import Home from '@nav/home.svg'
import Picker from '@nav/picker.svg'
import Settings from '@nav/settings.svg'
import Info from '@nav/info.svg'

import Donation from '@info/donation.svg'
import Development from '@info/development.svg'
import Smile from '@info/smile.svg'
import Reddit from '@info/reddit.svg'
import Github from '@info/github.svg'

import Arrow from '@ui/arrow.svg'
import Warning from '@ui/warning.svg'
import Cross from '@ui/cross.svg'
import Circle from '@ui/circle.svg'
import Accept from '@ui/accept.svg'
import Download from '@ui/download.svg'
import Clipboard from '@ui/clipboard.svg'

import Moon from '@themes/moon.svg'
import Sun from '@themes/sun.svg'

import Minimize from '@controls/minimize.svg'
import Maximize from '@controls/maximize.svg'
import Restore from '@controls/restore.svg'

import { ReactComponent as Mode } from '@settings/mode.svg'
import { ReactComponent as Keywords } from '@settings/keywords.svg'
import { ReactComponent as Privacy } from '@settings/privacy.svg'
import { ReactComponent as Timer } from '@settings/timer.svg'
import { ReactComponent as Startup } from '@settings/startup.svg'
import { ReactComponent as Quality } from '@settings/quality.svg'
import { ReactComponent as Save } from '@settings/save.svg'

import { Svg } from '../../types/Icon'

interface Icons {
    [name: string]: Svg | string 
}

interface Group {
    [name: string]: Icons | Array<Svg>
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

function addGradients(icons: Icons | Array<Svg>){ 
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