import React from 'react'

export default function Template(props){
    const { path, sizes, id, view, gradient } = props;
    const { width, height } = view || sizes || {width: 512, height: 512};
    
    const filled = addFill(path, id);

    return(
        <svg viewBox={ `0 0 ${width} ${height}` } 
             width={ view ? 512 : width } 
             height={ view ? 512 : height } 
             xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={ gradient?.from || "gradient" } x1="0%" y1="0%" x2="100%" y2="0%"> 
                    <stop offset="0%" stopColor={ gradient?.from || "#0dc39f" }/> 
                    <stop offset="100%" stopColor={ gradient?.to || "#38ef7d" }/>
                </linearGradient>
                <mask id={ id } maskUnits="userSpaceOnUse" x="0" y="0" width={ width } height={ height }
                      dangerouslySetInnerHTML={{__html: filled}}/>
            </defs>
            <g mask={ `url(#${id})` }>
                <rect className="original" x="0" y="0" width={ width } height={ height } fill="white" />
                <rect className="gradient" x="0" y="0" width={ width } height={ height } fill={ `url(#${ gradient?.from || 'gradient' })` } />
            </g>
        </svg>
    )
}

function addFill(path, id){
    const fill = ' fill="white"/'
    const rgx = /\//g;
    const result = path.replaceAll(rgx, fill);

    if(id === 'Restore'){
        console.log(result);
    }
    
    return result
}