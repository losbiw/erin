import React from 'react'
import Button from '../Button/Button'
import { General, Crosses } from '../Icons/UI'
import './Update.css'

import { Warning } from '@interfaces/Warning.d'

const { ipcRenderer } = window.require('electron');

interface Props{
    rejectUpdate: () => void,
    setWarning: (warning: string | Warning) => void
}

export default function Update(props: Props){
    const handleIPCevent = e => {
        const { name: shouldUpdate } = e.target.dataset;
        const { rejectUpdate, setWarning } = props;

        if(shouldUpdate === 'true'){
            ipcRenderer.send('should-update');

            setWarning({
                message: 'The app will restart once the update is downloaded',
                Icon: General.Download
            })
        }
        
        rejectUpdate();
    }

    const buttons = [
        {
            id: 'accept',
            content: General.Accept,
            value: true,
            handleClick: handleIPCevent
        },
        {
            id: 'reject',
            content: Crosses.Red,
            value: false,
            handleClick: handleIPCevent
        }
    ]

    return(
        <div id="update">
            <div id="content" className="container">
                <div id="title" className="container">
                    <h1>Update available</h1>
                    <p>Do you want to download and install it?</p>
                </div>
                <div id="buttons" className="container">
                    {
                        buttons.map(button => {
                            const { id, value, handleClick, content } = button;
                            
                            return(
                                <Button id={ id }
                                        name={ value }
                                        handleClick={ handleClick }
                                        Content={ content } 
                                        key={ id }/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}