import React from 'react'

interface Props{
    className?: string,
    name?: string,
    id?: string,
    Content: any,
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button(props: Props){
    const { className, Content, name, handleClick, id } = props;
    const ContentElement = typeof Content === 'string' ? Content : Content ? <Content /> : <></>

    return(
        <button className={ className }  
                data-name={ name }
                onClick={ handleClick }
                id={ id }>
            { ContentElement }
        </button>
    )
}