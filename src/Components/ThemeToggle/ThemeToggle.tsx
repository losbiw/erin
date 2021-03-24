import { Theme } from '@interfaces/Config';
import React from 'react'
import Button from '../Button/Button'
import Themes from '../Icons/Themes'
import './ThemeToggle.css'

interface Props{
    theme: Theme,
    switchTheme: () => void 
}

export default function ThemeToggle(props: Props){
    const { theme, switchTheme } = props;
    const { Moon, Sun } = Themes;

    const themeIcon = theme === 'dark' ? Sun : Moon;

    return <Button className='nav-btn'
                    handleClick={ switchTheme }
                    Content={ themeIcon }
                    id="theme-switch"/>
}