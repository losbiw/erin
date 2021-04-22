import React from 'react'
import './Switch.scss'

interface Props{
    isChecked: boolean,
    handleSwitch: Function
}

export default function Switch(props: Props){
    const { isChecked, handleSwitch } = props;
    
    return(
        <label className="switch">
            <input type="checkbox" 
                   defaultChecked={ isChecked }
                   onChange={ _e => handleSwitch() } />
            <span className="switch-slider">
                <span className="gradient"></span>
            </span>
        </label>
    )
}