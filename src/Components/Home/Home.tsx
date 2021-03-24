import React from 'react'
import AspectRatio from '../AspectRatio/AspectRatio'
import ProgressBar from '../ProgressBar/ProgressBar'
import { Arrows } from '../Arrows/Arrows'
import Links from '../Links/Links'
import './Home.css'

import { State as UserState } from '@interfaces/UserState' 

interface Props extends UserState{
    
}

export default function Home(props: Props){
    const { picture, progress, isLocked, switchWallpaper, pictureIndex } = props;
    const { photographer, srcMain, photographerURL } = picture;
    
    const handleSlideForward = () => switchWallpaper(pictureIndex + 1);
    const handleSlideBack = () => switchWallpaper(pictureIndex - 1) ;

    const link = () => (
        <div id="link">
            <p>Photo by </p>
            <span className="medium" id="name"> {photographer} </span>
            <p> on </p>
            <span className="medium">Pexels</span>
        </div>)


    return(
        <div id="home" className="page">
            <Arrows handleChange={[ handleSlideBack, handleSlideForward ]}/>
            <AspectRatio id="pic" src={ srcMain }/>
            
            <div className="wrapper">
                { isLocked && <ProgressBar width={ progress }/> }
                <Links links={[{
                    href: photographerURL,
                    Content: link
                }]}/>
            </div>
        </div>
    )
}