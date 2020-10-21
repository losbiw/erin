import React from 'react'
import { WarningIcon, Cross } from '../Svg/Loader'
import Button from '../Button/Button'
import './Warning.css'

export default function Warning(props){
    return(
        <div id="warning">
            <WarningIcon.Warning/>
            <p>{ props.value }</p>

            <Button className="delete" 
                    Content={ Cross.Cross }
                    handler={ () => props.handler({ warning: undefined }) }/>
        </div>
    )
}