import React, { useState } from 'react'
import { Crosses, Control } from '../Svg/Loader'
import './Controls.css'

const { ipcRenderer } = window.require('electron');

export default function Controls(props){
    const [MaximizeIcon, setIcon] = useState(() => Control.Maximize);

    const buttons = {
        minimize: Control.Minimize,
        maximize: MaximizeIcon,
        close: Crosses.Red
    }

    const handler = e => {
        const { action } = e.target.dataset;
        const res = ipcRenderer.sendSync(`${action}-window`);

        if(action === 'maximize'){
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
                            <button data-action={ key } key={ key } onClick={ handler }>
                                <Icon />
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}