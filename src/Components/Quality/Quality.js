import React from 'react'
import { capitalizeFirstLetter } from '@modules/convert'
import './Quality.css'

export default function Quality(props){
    const options = [
    {
        label: 'high',
        value: 'original'
    },
    {
        label: 'medium',
        value: 'large2x'
    },
    {
        label: 'low',
        value: 'large'
    }];

    return(
        <select name="quality" 
                onChange={ props.handler } 
                data-value="value"
                defaultValue={ props.data }>
            {
                options.map(option => {
                    return(
                        <option value={ option.value } key={ option.value }>
                            { capitalizeFirstLetter(option.label) }
                        </option>
                    )
                })
            }
        </select>
    )
}