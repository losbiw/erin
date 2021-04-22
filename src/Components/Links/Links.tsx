import React from 'react'
import './Links.scss'
const { shell } = window.require('electron');

// interface Props{
//     links:  
// }

export default function Links(props){
    const { links } = props;
    const keys = Object.keys(links);
    
    return(
        <div className="links">
            {
                keys.map(key => {
                    const { title, href, Content } = links[key];
                    
                    return(
                        <div className='link' key={ key } onClick={ () => shell.openExternal(href) }>
                            { Content && <Content /> }
                            { title && <p className='title'>{ title }</p> }
                        </div>
                    )
                })
            }
        </div>
    )
}