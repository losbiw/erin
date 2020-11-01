import React from 'react'
import './Error.css'

export default function Error(props){
    const { code } = props;
    const codes = {
        404: {
            fix: 'Change keywords in settings',
            description: 'We couldn’t find any wallpaper according to your request'
        },
        503: {
            fix: 'Change mode in settings',
            description: 'Weather services are currently unavailable'
        },
        502: {
            fix: 'Check on your internet connection',
            description: "We couldn't connect to our services"
        }
    }
    const codeSpread = [...code.toString(10)];
    let index = 0;
    
    return (
        <div id="error" className="page">
            <div id="err-code">
                {
                    codeSpread.map(char => {
                        index++;
                        return <h1 key={ `char${index}` }>{ char }</h1>
                    })
                }
            </div>
            
            <h2>{ codes[code].fix }</h2>
            <p>{ `Oopsie Woopsie! ${ codes[code].description }. 
                  The code monkeys at our office are sorry for this.` }</p>
        </div>
    )
}