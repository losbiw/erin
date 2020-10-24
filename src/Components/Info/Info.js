import React from 'react'
import Cards from '../Cards/Cards'
import Links from '../Links/Links'
import { InfoIcons } from '../Svg/Loader'
import './info.css'

export default function Info(props){
    const { Github, Reddit } = InfoIcons;
    const linksData = {
        author: {
            github: {
                href: "https://github.com/losbiw/erin",
                Content: Github
            },
            reddit: {
                href: "https://www.reddit.com/user/losbiw",
                Content: Reddit
            }
        },
        credits: {
            pexels: {
                title: "Pexels",
                href: "https://www.pexels.com/",
            },
            openweathermap: {
                title: "OpenWeatherMap",
                href: "https://openweathermap.org/",
            },
            flaticon: {
                title: "FlatIcon",
                href: "https://www.flaticon.com/",
            }
        }
    }

    return(
        <div id="info">
            <div id="contact">
                <p>Contact us:</p>
                <Links links={ linksData.author }/>
            </div>
            
            <Cards />

            <div id="reference">
                <p id="resources">The app is using APIs and icons from the following resources:</p>
                <Links links={ linksData.credits }/>
            </div>
        </div>
    )
}