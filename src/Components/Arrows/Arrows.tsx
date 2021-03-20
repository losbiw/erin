import React from 'react'
import Button from '../Button/Button'
import { Arrows as Icons } from '../Svg/Loader'
import './Arrows.css'

interface ArrowsProps{
    handleChange: () => void
}

interface ArrowProps{
    Icon: any,
    index: number,
    handleClick: () => void
}

const Arrows = (props: ArrowsProps) => {
    return(
        <div id="arrows">
            { Icons.map((Icon, index: number) => 
                <Arrow Icon={ Icon } 
                       index={ index } 
                       handleClick={ props.handleChange[index] }
                       key={ index }/>)
            }  
        </div>
    )
}

function Arrow(props: ArrowProps){
    const { Icon, index, handleClick } = props;

    return(
        <Button className="arrow" 
                Content={ Icon || Icons[index] } 
                name='arrow'
                handleClick={ handleClick }
                key={ `arrow-${index}` }/>
    )
}

export { Arrows, Arrow }