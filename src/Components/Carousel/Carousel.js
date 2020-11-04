import React from 'react'
import Button from '../Button/Button'
import { CircleIcon } from '../Svg/Loader'
import './Carousel.css'

export default function Carousel(props){
    const { handler, current, amount } = props;

    const changeSlide = (e) => {
        const { name } = e.target.dataset;
        const parsed = parseInt(name, 10);

        if(parsed !== current){
            handler(parsed);
        }
    }
    
    return(
        <div id="carousel">
            {
                amount.map((_button, index) => {
                    return <Button className={ index === current ? 'active' : 'non-active' }
                                    handler={ changeSlide }
                                    name={ index }
                                    key={ `carousel-${index}` }
                                    Content={ CircleIcon.Circle }/>
                })
            }
        </div>
    )
}