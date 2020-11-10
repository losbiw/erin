import React from 'react'

export default function Button(props){
    const { className, Content, name, handler, id } = props;
    const ContentElement = typeof Content === 'string' ? Content :
                            Content ? <Content /> : ''

    return(
        <button className={ className }  
                data-name={ name }
                onClick={ handler }
                id={ id }>
            { ContentElement }
        </button>
    )
}