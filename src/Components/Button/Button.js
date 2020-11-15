import React from 'react'

export default function Button(props){
    const { className, Content, name, handleClick, id } = props;
    const ContentElement = typeof Content === 'string' ? Content :
                            Content ? <Content /> : ''

    return(
        <button className={ className }  
                data-name={ name }
                onClick={ handleClick }
                id={ id }>
            { ContentElement }
        </button>
    )
}