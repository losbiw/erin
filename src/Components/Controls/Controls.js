import React, { useState } from 'react'
import { Crosses, Control } from '../Svg/Loader'
import Button from '../Button/Button'
import './Controls.css'

const { ipcRenderer } = window.require('electron');

export default function Controls(_props){
    const [MaximizeIcon, setIcon] = useState(() => Control.Maximize);

    const buttons = {
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
                        const Icon = buttons[key]
                        
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