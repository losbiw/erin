import React from 'react'
import './AspectRatio.scss'

interface Props{
    src: string,
    isActive?: boolean,
    name?: string,
    handleClick?: () => void
}

export default function AspectRatio(props: Props){
    const { src, isActive, name, handleClick } = props;
    const addActiveClass = isActive ? 'active' : '';
    
    return(
        <div className={ `aspect-ratio ${ addActiveClass }` } 
             data-name={ name }
             onClick={ handleClick }>
            <div className='transparent'/>
            <div className='container'>
                <img className='aspect-image' src={ src } alt='wallpaper'/>
            </div>
        </div>
    )
}