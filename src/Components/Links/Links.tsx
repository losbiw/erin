import React from 'react'
const { shell } = window.require('electron');

export default function Links(props){
    const { links } = props;
    const keys = Object.keys(links);

    const openLink = e => {
        e.preventDefault();
        shell.openExternal(e.target.href);
    }
    
    return(
        <div className="links">
            {
                keys.map(key => {
                    const { title, href, Content } = links[key];
                    
                    return(
                        <a key={ key } href={ href } onClick={ openLink }>
                            { Content && <Content /> }
                            { title && <p>{ title }</p> }
                        </a>
                    )
                })
            }
        </div>
    )
}