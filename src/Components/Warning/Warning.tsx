import React from 'react'
import { General, Crosses } from '../Icons/UI'
import { Warning as WarningInterface } from '@interfaces/Warning.d'

import './Warning.scss'

interface Props{
    warning: string,
    removeWarning: () => void
}

interface CustomProps{
    warning: WarningInterface,
    removeWarning: () => void
}

interface Warning{
    warning: string | undefined
}

export const CustomWarning = (props: CustomProps) => {
    const { message, Icon } = props.warning;

    return(
        <div className='warning'>
            <Icon />
            <p className='message'>{ message }</p>

            <button className='delete'
                    onClick={ props.removeWarning }>
                <Crosses.Yellow />
            </button>
        </div>
    )
}

export const Warning = (props: Props) => {
    return(
        <div className='warning'>
            <General.Warning />
            <p className='message'>{ props.warning }</p>

            <button className='delete'
                    onClick={ props.removeWarning }>
                <Crosses.Yellow />
            </button>
        </div>
    )
}