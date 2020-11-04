import React from 'react'

export default function Button(props){
    const { className, Content, name, handler, id } = props;

    return(
        <button className={ className }  
                data-name={ name }
                onClick={ handler }
                id={ id }>
            { Content ? <Content /> : ''}
        </button>
    )
}