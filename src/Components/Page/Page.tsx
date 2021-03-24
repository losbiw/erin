import React from 'react'
import Home from '../Home/Home'
import Picker from '../Picker/Picker'
import Settings from '../Settings/Settings'
import Info from '../Info/Info'
import './Page.css'

import { Pages, State as UserState } from '@interfaces/UserState.d'

interface Props extends UserState{
    switchWallpaper: (index: number | boolean, isUnlocked: boolean) => void, //maybe replace the whole thing with destructured props
}

export default function Page(props: Props){
    const components = {
        home: Home,
        picker: Picker,
        settings: Settings,
        info: Info
    }

    const { current, collection, pictureIndex, isLocked, progress, handleUserStateChange, switchWallpaper, handleAppStateChange, isRequiredFilled } = props;
    const Current = components[current];
    let data;

    if(current === Pages.Home){
        data = { 
            picture: { ...collection[pictureIndex] },
            isLocked,
            progress,
            pictureIndex,
            collection,
            switchWallpaper
        }
    }
    else if(current === Pages.Picker){
        data = {
            pictureIndex,
            collection,
            isLocked,
            progress,
            switchWallpaper
        }
    }
    else if(current === Pages.Settings){
        data = {
            data: { ...props.config },
            handleAppStateChange,
            isLocked,
            isRequiredFilled
        }
    }
    else if(current === Pages.Info){
        data = {
            handleAppStateChange
        }
    }

    return(
        <div id="page">
            <Current { ...data } handleUserStateChange={ handleUserStateChange }/>
        </div>
    )
}