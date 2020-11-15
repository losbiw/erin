import React from 'react'
import { InfoIcons } from '../Svg/Loader'

export default function Card(_props){
    const { Donation, Development, Smile } = InfoIcons;

    const cards = [
        {
            title: 'Donation',
            description: 'You can support the project by donating to the bitcoin wallet below',
            special: '19zfpPUYbbNbUyLGqKGU7HBuV5x4bQTWh9',
            Icon: Donation
        },
        {
            title: 'Development',
            description: 'The whole project is being run and supported by just a single person',
            Icon: Development
        },
        {
            title: 'Thank you',
            description: 'For using our app, it actually means a lot to the creator so stay awesome and have a nice day!',
            Icon: Smile
        }
    ]
    
    return(
        <div id="cards">
            {
                cards.map(card => {
                    const { title, description, Icon, special } = card;
                    return(
                        <div className="card" key={ title }>
                            <Icon />
                            <h2>{ title }</h2>
                            <p>{ description }</p>
                            <p className="special">
                                { special || '' }
                            </p>
                        </div>
                    )
                })
        }
        </div>
    )
}