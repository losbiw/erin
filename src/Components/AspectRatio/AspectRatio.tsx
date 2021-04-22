import React from 'react'
import './AspectRatio.scss'

export default function AspectRatio(props){
    const { src, id, isActive, name, handleClick } = props;
    const addActiveClass = isActive ? 'active' : '';
    
    return(
        <div className={ `aspect-ratio ${ addActiveClass }` } 
             data-name={ name }
             onClick={ handleClick }>
            <div className='transparent'/>
            <div className='container'>
                <img id={ id } src={ src } alt='wallpaper'/>
            </div>
        </div>
    )
}