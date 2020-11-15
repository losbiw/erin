import React from 'react'
import Button from '../Button/Button'
import { Themes } from '../Svg/Loader'
import './ThemeToggle.css'

export default function ThemeToggle(props){
    const { theme, handleThemeSwitch } = props;
    const { Moon, Sun } = Themes;

    const themeIcon = theme === 'dark' ? Sun : Moon;

    return <Button className='nav-btn'
                    handleClick={ handleThemeSwitch }
                    Content={ themeIcon }
                    id="theme-switch"/>
}