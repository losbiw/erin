import React from 'react'
import { UI, Crosses } from '../Svg/Loader'
import Button from '../Button/Button'

import { Warning as WarningInterface } from '../../types/WarningInterface'

import './Warning.css'

interface Props{
    warning: string,
    removeWarning: (value: string) => void
}

interface CustomProps{
    warning: WarningInterface,
    removeWarning: (value: string) => void
}

interface Warning{
    warning: string | undefined
}

export const CustomWarning = (props: CustomProps) => {
    const { message, Icon } = props.warning;

    return(
        <div id="warning">
            <Icon />
            <p>{ message }</p>

            <Button className="delete" 
                    Content={ Crosses.Yellow }
                    handleClick={ () => props.removeWarning('') }/>
        </div>
    )
}

export const Warning = (props: Props) => {
    return(
        <div id="warning">
            <UI.Warning />
            <p>{ props.warning }</p>

            <Button className="delete" 
                    Content={ Crosses.Yellow }
                    handleClick={ () => props.removeWarning('') }/>
        </div>
    )
}