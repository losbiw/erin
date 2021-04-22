import React from 'react'
import './Error.scss'

interface Error{
    fix: string,
    description: string
}

interface Codes{
    [name: string]: Error
}

interface Props{
    code: number
}

export default function Error(props: Props){
    const { code } = props;

    const codes: Codes = {
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
        <div className='error page'>
            <div className='err-code'>
                {
                    codeSpread.map(char => {
                        index++;
                        return <h1 className='code-key' key={ `char${index}` }>{ char }</h1>
                    })
                }
            </div>
            
            <h2 className='fix'>{ codes[code]?.fix }</h2>
            <p className='description'>
                { `Oopsie Woopsie! ${ codes[code]?.description }. 
                  The code monkeys at our office are sorry.` }
            </p>
        </div>
    )
}