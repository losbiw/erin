import React from 'react'
import Button from '../Button/Button'
import { NavIcons, Themes } from '../Svg/Loader'
import './Switch.css'
import './Nav.css'

export default function Nav(props){
    const { theme, handler } = props.theme;
    const { Home, Picker, Settings, Info } = NavIcons;
    const { Moon, Sun } = Themes;
    
    const themeIcon = theme === 'dark' ? Sun : Moon;
    let isFirst = true;
    
    const buttons = [
    [{
        target: 'home',
        icon: Home
    }, 
    {
        target: 'picker',
        icon: Picker
    }],
    [{
        target: 'settings',
        icon: Settings
    },
    {
        target: 'info',
        icon: Info
    }]
    ]

    const handlePageChange = e => {
        const { name } = e.target.dataset;
        props.setState({ current: name });
    }

    return(
        <nav>
            { buttons.map(group => {
                return <div className="btns" key={ group[0].target + group[1].target }>
                    {
                        group.map(button => {
                            const { icon, target } = button;
                            const active = props.current === target ? ' active' : '';

                            if(group === buttons[1]) isFirst = false

                            return <Button className={ `nav-btn${active}` }
                                           Content={ icon } 
                                           name={ target }
                                           key={ target }
                                           handler={ handlePageChange }/>
                        })
                    }
                    { 
                        isFirst && 
                        <Button className='nav-btn'
                                handler={ handler }
                                Content={ themeIcon }
                                id="theme-switch"/>
                    }
                </div>
            }) }
        </nav>
    )
}