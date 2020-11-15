import React from 'react'
import Button from '../Button/Button'
import { CircleIcon } from '../Svg/Loader'
import './Carousel.css'

export default function Carousel(props){
    const { handleChange, current, amount } = props;

    const changeSlide = (e) => {
        const { name } = e.target.dataset;
        const parsed = parseInt(name, 10);

        if(parsed !== current){
            handleChange(parsed);
        }
    }
    
    return(
        <div id="carousel">
            {
                amount.map((_button, index) => {
                    return <Button className={ index === current ? 'active' : 'non-active' }
                                    handleClick={ changeSlide }
                                    name={ index }
                                    key={ `carousel-${index}` }
                                    Content={ CircleIcon.Circle }/>
                })
            }
        </div>
    )
}