import React from 'react'
import Button from '../Button/Button'
import { General } from '../Icons/UI'
import './Carousel.css'

export default function Carousel(props){
    const { handleChange, current, amount } = props;
    
    return(
        <div id="carousel">
            {
                amount.map((_button, index) => {
                    return(
                        <button className={ index === current ? 'active' : 'non-active'} 
                                name={ index }
                                key={ `carousel-${index}` }
                                onClick={ () => { if(index !== current) handleChange(index) } }>
                            <General.Circle />
                        </button>
                    )
                })
            }
        </div>
    )
}