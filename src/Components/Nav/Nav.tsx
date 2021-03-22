import React from 'react'
import Button from '../Button/Button'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { NavIcons } from '../Svg/Loader'
import './Nav.css'

interface Props{
    changePage: (name: string) => void,
    current: string
}

export default function Nav(props: Props){
    const { Home, Picker, Settings, Info } = NavIcons;
    
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

    const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { dataset } = e.target as HTMLButtonElement;
        const { name } = dataset;
        props.changePage(name as string);
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
                                           handleClick={ handlePageChange }/>
                        })
                    }
                    { 
                        isFirst && <ThemeToggle { ...props.theme }/>
                    }
                </div>
            }) }
        </nav>
    )
}