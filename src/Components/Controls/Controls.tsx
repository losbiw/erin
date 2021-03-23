import React, { useState } from 'react'
import Control from '../Icons/Control'
import { Crosses } from '../Icons/UI'
import Button from '../Button/Button'
import './Controls.css'

const { ipcRenderer } = window.require('electron');

interface ButtonsIcons{ //remove this later potomu chto eto pizdec
    minimize: any,
    maximize: any,
    close: any
}

export default function Controls(_props: {}){
    const [MaximizeIcon, setIcon] = useState(() => Control.Maximize);

    const buttons: ButtonsIcons = {
        minimize: Control.Minimize,
        maximize: MaximizeIcon,
        close: Crosses.Red
    }

    const handleClick = e => {
        const { name } = e.target.dataset;
        const res = ipcRenderer.sendSync(`${name}-window`);

        if(name === 'maximize'){
            const isMaximized = res;
            isMaximized ? setIcon(() => Control.Restore) : setIcon(() => Control.Maximize);
        }
    }

    const keys = Object.keys(buttons);

    return(
        <div id="controls">
            <div id="draggable"></div>
            <div id="control-btns">
                {
                    keys.map(key => {
                        const Icon = buttons[key as keyof ButtonsIcons];
                        
                        return(
                            <Button name={ key } 
                                    key={ key }
                                    handleClick={ handleClick }
                                    Content={ Icon }/>
                        )
                    })
                }
            </div>
        </div>
    )
}