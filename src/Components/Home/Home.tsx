import React from 'react'
import AspectRatio from '../AspectRatio/AspectRatio'
import ProgressBar from '../ProgressBar/ProgressBar'
import { Arrows } from '../Arrows/Arrows'
import Links from '../Links/Links'
import './Home.scss'

import { Picture } from '@interfaces/UserState' 

interface Props{
    picture: Picture,
    progress: number,
    isLocked: boolean,
    pictureIndex: number,
    switchWallpaper: (index: number | boolean, isUnlocked: boolean) => void
}

export default function Home(props: Props){
    const { picture, progress, isLocked, switchWallpaper, pictureIndex } = props;
    const { photographer, srcMain, photographerUrl } = picture;
    
    const handleSlideForward = () => switchWallpaper(pictureIndex + 1, true);
    const handleSlideBack = () => switchWallpaper(pictureIndex - 1, true);

    const author = () => (
        <div className='author'>
            <p className='text'>Photo by </p>
            <span className='medium'> {photographer} </span>
            <p className='text'> on </p>
            <span className='medium'>Pexels</span>
        </div>)


    return(
        <div className='page home'>
            <Arrows handleChange={[ handleSlideBack, handleSlideForward ]}/> 
            <AspectRatio src={ srcMain }/>
            
            <div className='wrapper'>
                { isLocked && <ProgressBar width={ progress }/> }
                <Links links={{
                    author: {
                        href: photographerUrl,
                        Content: author
                    }
                }}/>
            </div>
        </div>
    )
}