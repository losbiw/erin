import React from 'react'
import './aspect_ratio.css'

export default function AspectRatio(props){
    const { src, id, isActive, name, handler } = props;
    const addActiveClass = isActive ? 'active' : '';
    
    return(
        <div className={ `aspect-ratio ${ addActiveClass }` } 
             data-name={ name }
             onClick={ handler }>
            <div className="transparent"></div>
            <div className="container">
                <img id={ id } src={ src } alt="wallpaper"/>
            </div>
        </div>
    )
}