import { Theme } from '@/interfaces/Config';
import React from 'react'
import Themes from '../Icons/Themes'
import './ThemeToggle.scss'

interface Props{
    theme: Theme,
    switchTheme: () => void 
}

export default function ThemeToggle(props: Props){
    const { theme, switchTheme } = props;
    const { Moon, Sun } = Themes;

    const ThemeIcon = theme === Theme.Dark ? Sun : Moon;

    return(
        <button className='nav-btn theme-switch'
                onClick={ switchTheme }>
            <ThemeIcon />
        </button>
    )
}