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

    const defaultValue = options.find(obj => obj.value === props.data);

    return(
        <select name="quality" 
                onChange={ props.handleChange } 
                data-value="value"
                defaultValue={ defaultValue }>
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