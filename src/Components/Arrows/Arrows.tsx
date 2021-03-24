import React from 'react'
import Button from '../Button/Button'
import { Arrows as Icons } from '../Icons/UI'
import './Arrows.css'

interface ArrowsProps{
    handleChange: () => void
}

interface ArrowProps{
    Icon: any, //change
    index: number,
    handleClick: () => void
}

const Arrows = (props: ArrowsProps) => {
    const keys = Object.keys(Icons);

    return(
        <div id='arrows'>
            {/* { keys.map((Icon, index: number) => 
                <Arrow Icon={ Icon } 
                       index={ index } 
                       handleClick={ props.handleChange[index] }
                       key={ index }/>)
            }   */}
        </div>
    )
}

const Arrow = (props: ArrowProps) => {
    const { Icon, index, handleClick } = props;

    return(
        <button className='arrow' 
                name='arrow'
                onClick={ handleClick }
                key={ `arrow-${index}` }>
            <Icon />
        </button>
    )
}

export { Arrows, Arrow }