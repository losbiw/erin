import React from 'react'
import { capitalizeFirstLetter } from '@modules/convert'
import './Quality.scss'
import { Quality as QualityInterface } from '@/interfaces/Config';

interface Props{
    changeQuality: (quality: QualityInterface) => void,
    initialQuality: QualityInterface
}

export default function Quality(props: Props){
    const { changeQuality, initialQuality } = props;

    const options = [
    {
        label: 'High',
        value: QualityInterface.High
    },
    {
        label: 'Medium',
        value: QualityInterface.Medium
    },
    {
        label: 'Low',
        value: QualityInterface.Low
    }];

    return(
        <select name="quality" 
                data-value="value"
                defaultValue={ initialQuality }>
            {
                options.map(option => {
                    const { value, label } = option;

                    return(
                        <option value={ value } 
                                onClick={ () => changeQuality(value) }
                                key={ value }>
                            { capitalizeFirstLetter(label) }
                        </option>
                    )
                })
            }
        </select>
    )
}