import React from 'react'
import { Svg, Gradient } from '@interfaces/Icon'

interface Size{
    width: number,
    height: number
}

interface Props{
    id: string,
    svg?: Svg | (() => JSX.Element),
    raw?: string
}

export default (props: Props) => {
    const { id, raw } = props;
    const svg = props.svg as Svg;
    const path = svg.path || raw as string;
    
    const gradient: Gradient = svg.gradient || {
        from: "#0dc39f",
        to: "#38ef7d"
    }
    
    const { width, height }: Size = extractSize(path);
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

function extractPath(path: string): string{
    const regex = /<(path|circle)\b([\s\S]*?)\/>/g;
    const matches = path.match(regex) || [];
    
    if(matches.length !== 0){
        path = '';
        path += matches.map(match => match)
    }

    return path
}

function extractSize(svg: string): Size{
    const width = svg.match(/width="([^"]+)"/);
    const height = svg.match(/height="([^"]+)"/);

    if(width?.[1] && height?.[1]){
        const size: Size = {
            width: parseInt(width[1]),
            height: parseInt(height[1])
        }

        return size
    }
    else{
        return {
            width: 512,
            height: 512
        } as Size
    }
}

function extractViewBox(svg: string): string | undefined{
    const viewBox = svg.match(/viewBox="([^"]+)"/);

    if(viewBox?.[1]) return viewBox[1];
    else return undefined
}

function addFill(path: string): string{
    const fill = ' fill="white"/'
    const rgx = /\//g;
    const result = path.replaceAll(rgx, fill);
    
    return result
}