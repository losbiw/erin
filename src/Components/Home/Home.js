import React from 'react'
import Button from '../Button/Button'
import AspectRatio from '../AspectRatio/AspectRatio'
import ProgressBar from '../ProgressBar/ProgressBar'
import Links from '../Links/Links'
import { Arrows } from '../Svg/Loader'
import './Home.css'

export default function Home(props){
    const { photo, progress, isLocked, switchWallpaper, pictureIndex } = props;
    const { photographer, srcMain, photographerURL } = photo;
    
    const handlerForward = () => switchWallpaper(pictureIndex + 1);
    const handlerBack = () => switchWallpaper(pictureIndex - 1) ;

    const link = () => (
        <div id="link">
            <p>Photo by </p>
            <span className="medium" id="name"> {photographer} </span>
            <p> on </p>
            <span className="medium">Pexels</span>
        </div>)


    return(
        <div id="home" className="page">
            <Button className="arrow" 
                    Content={ Arrows[0] } 
                    name='arrow'
                    handler={ handlerBack }/>
            
            <AspectRatio id="pic" src={ srcMain }/>
            
            <div className="wrapper">
                { isLocked && <ProgressBar width={ progress }/> }
                <Links links={[{
                    href: photographerURL,
                    Content: link
                }]}/>
            </div>

            <Button className="arrow" 
                    Content={ Arrows[1] } 
                    name='arrow'
                    handler={ handlerForward }/>
        </div>
    )
}