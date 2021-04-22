import React from 'react'
import { getCards } from './items'
import { Warning } from '@/interfaces/Warning';
import './Card.scss'

interface Props{
    setWarning: (warning: string | Warning) => void
}

export default function Card(props: Props){
    const cards = getCards(props.setWarning);
    
    return(
        <div className='cards'>
            {
                cards.map(card => {
                    const { title, description, Icon, special, handleClick } = card;

                    return(
                        <div className='card' key={ title } onClick={ handleClick }>
                            <Icon />

                            <h2 className='title'>{ title }</h2>
                            <p className='description'>{ description }</p>

                            <p className='special'>
                                { special || '' }
                            </p>
                        </div>
                    )
                })
        }
        </div>
    )
}