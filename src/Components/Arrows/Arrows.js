import React from 'react'
import Button from '../Button/Button'
import { Arrows as Icons } from '../Svg/Loader'
import './Arrows.css'

export default function Arrows(props){
    return(
        <div id="arrows">
            {
                Icons.map((Icon, index) => {
                    return(
                        <Button className="arrow" 
                                Content={ Icon } 
                                name='arrow'
                                handler={ props.handlers[index] }
                                key={ `arrow-${index}` }/>
                    )
                })
            }
        </div>
    )
}