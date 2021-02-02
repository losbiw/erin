import React from 'react'
import './Switch.css'

export default function Switch(props){
    const { data, handleChange, name } = props;
    
    return(
        <label className="switch">
            <input type="checkbox" 
                   name={ name || "startup" }
                   defaultChecked={ data.length === 0 ? false : true }
                   onChange={ handleChange }
                   data-value="checked"
                />
            <span className="slider round">
                <span className="gradient"></span>
            </span>
        </label>
    )
}