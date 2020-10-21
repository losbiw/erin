import React from 'react'
import Button from '../Button/Button'
import { NavIcons } from '../Svg/Loader'
import './nav.css'

export default function Nav(props){
    const { Home, Picker, Settings, Info } = NavIcons;
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
        props.handler({ current: name });
    }

    return(
        <nav>
            { buttons.map(group => {
                return <div className="btns" key={ group[0].target + group[1].target }>
                    {
                        group.map(button => {
                            const { icon, target } = button;
                            const active = props.current === target ? ' active' : '';

                            return <Button className={ `nav-btn${active}` }
                                           Content={ icon } 
                                           name={ target }
                                           key={ target }
                                           handler={ handlePageChange }/>
                        })
                    }
                </div>
            }) }
        </nav>
    )
}