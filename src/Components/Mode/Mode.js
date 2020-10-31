import React from 'react'
import capitalize from '@modules/capitalizeFirstLetter'
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
                               onChange={ props.handler }
                               data-value="value"/>
                        <div className="background">
                            <div className="transparent"></div>
                            <label forhtml={ label }>{ capitalize(label) }</label>
                        </div>
                    </div>
                )
            })
}