import React from 'react'
import { UI, Crosses } from '../Svg/Loader'
import Button from '../Button/Button'
import './Warning.css'

export default function Warning(props){
    const { message, Icon } = props.value;

    return(
        <div id="warning">
            { <Icon /> || <UI.Warning/>}
            <p>{ message || props.value }</p>

            <Button className="delete" 
                    Content={ Crosses.Yellow }
                    handleClick={ () => props.handleDelete({ warning: undefined }) }/>
        </div>
    )
}