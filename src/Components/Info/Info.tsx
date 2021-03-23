import React from 'react'
import Cards from '../Cards/Cards'
import Links from '../Links/Links'
import Icons from '../Icons/Info'
import './Info.css'

export default function Info(props){
    const { Github, Reddit } = Icons;
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
        <div id="info" className="page">
            <div id="contact">
                <p>Contact us:</p>
                <Links links={ linksData.author }/>
            </div>
            
            <Cards handleAppStateChange={ props.handleAppStateChange }/>

            <div id="reference">
                <p id="resources">The app is using APIs and icons from the following resources:</p>
                <Links links={ linksData.credits }/>
            </div>
        </div>
    )
}