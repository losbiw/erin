import React from 'react'
import Button from '../Button/Button'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import NavIcons from '../Icons/Nav'
import './Nav.css'
import { Theme } from '@interfaces/Config'
import { Pages } from '@/interfaces/UserState'

interface Props{
    changePage: (name: Pages) => void,
    current: string,
    theme: Theme,
    switchTheme: () => void
}

interface NavButton{
    target: Pages,
    Icon: (() => JSX.Element)
}

export default function Nav(props: Props){
    const { theme, switchTheme } = props;
    const { Home, Picker, Settings, Info } = NavIcons;
    
    let isFirst = true;
    
    const buttons: Array<Array<NavButton>> = [
    [{
        target: Pages.Home,
        Icon: Home
    }, 
    {
        target: Pages.Home,
        Icon: Picker
    }],
    [{
        target: Pages.Settings,
        Icon: Settings
    },
    {
        target: Pages.Info,
        Icon: Info
    }]
    ]

    return(
        <nav>
            { buttons.map(group => {
                return <div className="btns" key={ group[0].target + group[1].target }>
                    {
                        group.map(button => {
                            const { Icon, target } = button;
                            const active = props.current === target ? ' active' : '';

                            if(group === buttons[1]) isFirst = false

                            return(
                                <button className={ `nav-btn${active}` }
                                        name={ target }
                                        key={ target }
                                        onClick={ () => props.changePage(target) }>
                                    <Icon />
                                </button>
                            )
                        })
                    }
                    { 
                        isFirst && <ThemeToggle theme={ theme }
                                                switchTheme={ switchTheme }/>
                    }
                </div>
            }) }
        </nav>
    )
}