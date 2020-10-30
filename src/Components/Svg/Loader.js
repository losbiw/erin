import React from 'react'
import Template from './Template'

import Home from '!raw-loader!../../assets/icons/nav/home.svg'
import Picker from '!raw-loader!../../assets/icons/nav/picker.svg'
import Settings from '!raw-loader!../../assets/icons/nav/settings.svg'
import Info from '!raw-loader!../../assets/icons/nav/info.svg'

import Donation from '!raw-loader!../../assets/icons/info/donation.svg'
import Development from '!raw-loader!../../assets/icons/info/development.svg'
import Smile from '!raw-loader!../../assets/icons/info/smile.svg'
import Reddit from '!raw-loader!../../assets/icons/info/reddit.svg'
import Github from '!raw-loader!../../assets/icons/info/github.svg'

import Arrow from '!raw-loader!../../assets/icons/ui/arrow.svg'
import Warning from '!raw-loader!../../assets/icons/ui/warning.svg'
import Cross from '!raw-loader!../../assets/icons/ui/cross.svg'

import Moon from '!raw-loader!../../assets/icons/themes/moon.svg'
import Sun from '!raw-loader!../../assets/icons/themes/sun.svg'

import Minimize from '!raw-loader!../../assets/icons/controls/minimize.svg'
import Maximize from '!raw-loader!../../assets/icons/controls/maximize.svg'
import Restore from '!raw-loader!../../assets/icons/controls/restore.svg'

import { ReactComponent as Mode } from '../../assets/icons/settings/mode.svg'
import { ReactComponent as Keywords } from '../../assets/icons/settings/keywords.svg'
import { ReactComponent as Timer } from '../../assets/icons/settings/timer.svg'
import { ReactComponent as Startup } from '../../assets/icons/settings/startup.svg'
import { ReactComponent as Quality } from '../../assets/icons/settings/quality.svg'

const group = {
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
    Control: {
        Minimize,
        Maximize,
        Restore
    },
    WarningIcon: {
        Warning: {
            path: Warning,
            gradient: {
                from: '#fdfc47',
                to: '#fdc830'
            }
        }
    },
    Themes: {
        Moon,
        Sun
    }
}

function iterateIcons(){
    for(let icons in group){
        group[icons] = addGradients(group[icons]);
    }
}

function addGradients(icons){ 
    for(let key in icons){
        const icon = icons[key];
        
        icons[key] = () => {
            return <Template svg={ icon } id={ key }/>
        }
    }

    return icons
}

iterateIcons();
const { NavIcons, Arrows, InfoIcons, Crosses, WarningIcon, Control, Themes } = group;
const SettingsIcons = {
    Mode,
    Keywords,
    Timer,
    Startup,
    Quality
}

export { NavIcons, Arrows, InfoIcons, Crosses, SettingsIcons, WarningIcon, Control, Themes }