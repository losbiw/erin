import React from 'react'
import { capitalizeFirstLetter } from '@modules/convert'
import './Mode.css'

export default function Mode(props){
    const labels = ['keywords', 'weather', 'time'];

    return labels.map(label => {
        return(
            <div className="radio" key={ label }>
                <input type="radio" 
                        name="mode" 
                        value={ label } 
                        checked={ label === props.data }
                        onChange={ props.handleChange }
                        data-value="value"/>
                <div className="background">
                    <div className="transparent"></div>
                    <label forhtml={ label }>{ capitalizeFirstLetter(label) }</label>
                </div>
            </div>
        )
    })
}