import React from 'react'
import Button from '../Button/Button'
import { Arrows as Icons } from '../Svg/Loader'
import './Arrows.css'

function Arrows(props){
    return(
        <div id="arrows">
            { Icons.map((Icon, index) => 
                <Arrow Icon={ Icon } 
                       index={ index } 
                       handleClick={ props.handleChange[index] }
                       key={ index }/>)
            }  
        </div>
    )
}

function Arrow(props){
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