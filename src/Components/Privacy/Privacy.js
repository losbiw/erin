import React from 'react'
import Links from '../Links/Links'
import Switch from '../Switch/Switch'
import './Privacy.css'

export default function Privacy(props){
    const { data, handleChange } = props;

    return(
        <div id="text">
            <p>I agree to the </p>
            <Links links={{ 
                privacy: {
                    href: 'https://losbiw.github.io/erin-website/',
                    title: 'privacy policy'
                } 
            }}/>
            <p>: </p>
            <Switch data={ data } handleChange={ handleChange } name='privacy'/>
        </div>
    )
}