import React from 'react'
import Button from '../Button/Button'
import { UI, Crosses } from '../Svg/Loader'
import './Update.css'

const { ipcRenderer } = window.require('electron');

export default function Update(props){
    const handleIPCevent = e => {
        const { name: shouldUpdate } = e.target.dataset;
        const { handleReject } = props;

        if(shouldUpdate === 'true'){
            const handleWarningChange = handleReject;
            
            ipcRenderer.send('should-update');
            handleWarningChange({ 
                warning: {
                    message: 'The app will restart once the update is downloaded',
                    Icon: UI.Download
                }
            })
        }
        
        handleReject({ isUpdateAvailable: false })
    }

    const buttons = [
        {
            id: 'accept',
            content: UI.Accept,
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