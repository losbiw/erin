import React from 'react'
import './switch.css'

export default function Switch(props){
    return(
        <label className="switch">
            <input type="checkbox" 
                   name="startup" 
                   defaultChecked={ props.data.length === 0 ? false : true }
                   onChange={ props.handler }
                   data-value="checked"
                />
            <span className="slider round">
                <span className="gradient"></span>
            </span>
        </label>
    )
}