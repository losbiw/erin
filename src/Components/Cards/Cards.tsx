import React from 'react'
import { InfoIcons, UI } from '../Svg/Loader'

export default function Card(props){
    const { clipboard } = window.require('electron');
    const { Donation, Development, Smile } = InfoIcons;

    const wallet = '19zfpPUYbbNbUyLGqKGU7HBuV5x4bQTWh9';

    const cards = [
        {
            title: 'Donation',
            description: 'Click to copy the bitcoin wallet below if you want to support our project',
            special: wallet,
            handleClick: () => {
                clipboard.writeText(wallet);

                props.handleAppStateChange({
                    warning: {
                        message: 'The wallet is copied to the clipboard',
                        Icon: UI.Clipboard
                    }
                })
            },
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
                    const { title, description, Icon, special, handleClick } = card;
                    return(
                        <div className="card" key={ title } onClick={ handleClick }>
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