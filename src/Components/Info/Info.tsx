import React from 'react'
import Card from '../Card/Card'
import Links from '../Links/Links'
import { links } from './links'
import { Warning } from '@/interfaces/Warning'
import './Info.scss'

interface Props{
    setWarning: (warning: string | Warning) => void
}

export default function Info(props: Props){
    return(
        <div className='page info'>
            <div className='contact'>
                <p className='link-title'>Contact us:</p>
                <Links links={ links.author }/>
            </div>
            
            <Card setWarning={ props.setWarning }/>

            <div className='reference'>
                <p className='resources'>The app is using APIs and icons from the following resources:</p>
                <Links links={ links.credits }/>
            </div>
        </div>
    )
}