import React from 'react'

export default function Template(props){
    const { svg, id } = props;
    const path = svg.path || svg;
    const gradient = svg.gradient || {
        from: "#0dc39f",
        to: "#38ef7d"
    }
    
    const { width, height } = extractSize(path);
    const view = extractViewBox(path);
    const filled = addFill(extractPath(path))

    return(
        <svg viewBox={ view || `0 0 ${width} ${height}` } 
                width={ width } 
                height={ height } 
                xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={ gradient?.from || "gradient" } x1="0%" y1="0%" x2="100%" y2="0%"> 
                    <stop offset="0%" stopColor={ gradient.from }/> 
                    <stop offset="100%" stopColor={ gradient.to }/>
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

function extractPath(path){
    const regex = /<(path|circle)\b([\s\S]*?)\/>/g;
    const matches = path.match(regex);
    
    if(regex.length !== 0){
        path = '';
        path += matches.map(match => match)
    }

    return path
}

function extractSize(svg){
    try{
        const width = svg.match(/width="([^"]+)"/)[1]; // eslint-disable-line no-useless-escape
        const height = svg.match(/height="([^"]+)"/)[1]; // eslint-disable-line no-useless-escape

        return {
            height,
            width
        }
    }
    catch{
        return {
            width: 512,
            height: 512
        }
    }
}

function extractViewBox(svg){
    try{
        return svg.match(/viewBox="([^"]+)"/)[1];
    }
    catch{
        return undefined
    }
}

function addFill(path){
    const fill = ' fill="white"/'
    const rgx = /\//g;
    const result = path.replaceAll(rgx, fill);
    
    return result
}