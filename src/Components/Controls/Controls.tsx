import React, { useState } from 'react'
import Control from '../Icons/Control'
import { Crosses } from '../Icons/UI'
import './Controls.scss'

const { ipcRenderer } = window.require('electron');

interface ButtonsIcons{
    minimize: React.FC<React.SVGProps<SVGSVGElement>>,
    maximize: React.FC<React.SVGProps<SVGSVGElement>>,
    close: React.FC<React.SVGProps<SVGSVGElement>>
}

export default function Controls(_props: {}){
    const [MaximizeIcon, setIcon] = useState(() => Control.Maximize);

    const buttons: ButtonsIcons = {
        minimize: Control.Minimize,
        maximize: MaximizeIcon,
        close: Crosses.Red
    }

    const handleClick = (name: keyof ButtonsIcons) => {
        const res = ipcRenderer.sendSync(`${name}-window`);

        if(name === 'maximize'){
            const isMaximized = res;
            isMaximized ? setIcon(() => Control.Restore) : setIcon(() => Control.Maximize);
        }
    }

    const keys = Object.keys(buttons);

    return(
        <div className="control">
            <div className="draggable"></div>

            <div className="control-container">
                {
                    keys.map(key => {
                        const Icon = buttons[key as keyof ButtonsIcons];
                        
                        return (
                            <button className='control-btn' 
                                    onClick={ () => handleClick(key as keyof ButtonsIcons) }
                                    name={ key }
                                    key={ key }>
                                <Icon />
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}