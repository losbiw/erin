import React from 'react'

export default function Button(props){
    const { className, Content, name, handler } = props;

    return(
        <button className={ className}  
                data-name={ name }
                onClick={ handler }>
            { Content ? <Content /> : ''}
        </button>
    )
}