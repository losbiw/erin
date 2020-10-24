import React from 'react'
import Template from './Template'
import { home, picker, settings, info } from '../../assets/icons/nav'
import { github, reddit, donation, development, smile } from '../../assets/icons/info'
import { arrow1, arrow2 } from '../../assets/icons/arrows'
import { warning } from '../../assets/icons/warning'
import { cross } from '../../assets/icons/cross'
import { minimize, maximize, restore } from '../../assets/icons/controls'
import { ReactComponent as Mode } from '../../assets/icons/settings/mode.svg'
import { ReactComponent as Keywords } from '../../assets/icons/settings/keywords.svg'
import { ReactComponent as Timer } from '../../assets/icons/settings/timer.svg'
import { ReactComponent as Startup } from '../../assets/icons/settings/startup.svg'
import { ReactComponent as Quality } from '../../assets/icons/settings/quality.svg'

const group = {
    NavIcons: {
        Home: {
            path: home
        },
        Picker: {
            path: picker
        },
        Settings: {
            path: settings
        },
        Info: {
            path: info,
            sizes: {
                width: "330",
                height: "330"
            }
        }
    },
    Arrows: [
        {
            path: arrow1,
        },
        {
            path: arrow2,
        }
    ],
    InfoIcons: {
        Github: {
            path: github,
            sizes: {
                width: "16",
                height: "16"
            }
        },
        Reddit: {
            path: reddit
        },
        Donation: {
            path: donation
        },
        Smile: {
            path: smile,
            view: {
                height: "370",
                width: "370"
            }
        },
        Development: {
            path: development,
            view: {
                height: "24",
                width: "24"
            }
        }
    },
    Crosses: {
        Green: {
            path: cross
        },
        Yellow: {
            path: cross,
            gradient: {
                from: '#fdfc47',
                to: '#fdc830'
            }
        },
        Red: {
            path: cross,
            gradient: {
                from: '#D31027',
                to: '#EA384D'
            }
        }
    },
    Control: {
        Minimize: {
            path: minimize,
            view: {
                height: '1.7',
                width: '17.8'
            }
        },
        Maximize: {
            path: maximize,
            view: {
                height: '28.3',
                width: '28.3'
            }
        },
        Restore: {
            path: restore,
            view: {
                height: '28.3',
                width: '28.3'
            }
        }
    },
    WarningIcon: {
        Warning: {
            path: warning,
            gradient: {
                from: '#fdfc47',
                to: '#fdc830'
            }
        }
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
            return <Template { ...icon } id={ key }/>
        }
    }

    return icons
}

iterateIcons();
const { NavIcons, Arrows, InfoIcons, Crosses, WarningIcon, Control } = group;
const SettingsIcons = {
    Mode,
    Keywords,
    Timer,
    Startup,
    Quality
}

export { NavIcons, Arrows, InfoIcons, Crosses, SettingsIcons, WarningIcon, Control }