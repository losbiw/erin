import React from 'react'
import Home from '../Home/Home'
import Picker from '../Picker/Picker'
import Settings from '../Settings/Settings'
import Info from '../Info/Info'
import './Page.css'

export default function Page(props){
    const components = {
        home: Home,
        picker: Picker,
        settings: Settings,
        info: Info
    }

    const { current, collection, pictureIndex, isLocked, progress, handleUserStateChange, switchWallpaper, handleAppStateChange, isRequiredFilled } = props;
    const Current = components[current];
    let data;

    if(current === 'home'){
        data = { 
            photo: { ...collection[pictureIndex] },
            isLocked,
            progress,
            pictureIndex,
            collection,
            switchWallpaper
        }
    }
    else if(current === 'picker'){
        data = {
            pictureIndex,
            collection,
            isLocked,
            progress,
            switchWallpaper
        }
    }
    else if(current === 'settings'){
        data = {
            data: { ...props.config },
            handleAppStateChange,
            isLocked,
            isRequiredFilled
        }
    }

    return(
        <div id="page">
            <Current { ...data } handleUserStateChange={ handleUserStateChange }/>
        </div>
    )
}