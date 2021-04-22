import React from 'react'
import './AspectRatio.scss'

interface Props{
    src: string,
    id?: string,
    isActive?: boolean,
    name?: string,
    handleClick?: () => void
}

export default function AspectRatio(props: Props){
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