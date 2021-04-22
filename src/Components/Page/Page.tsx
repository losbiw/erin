import React from 'react'
import Home from '../Home/Home'
import Picker from '../Picker/Picker'
import Settings from '../Settings/Settings'
import Info from '../Info/Info'
import './Page.scss'

import { Pages, State as UserState } from '@/interfaces/UserState'
import { Config } from '@/interfaces/Config'
import { Warning } from '@/interfaces/Warning'

interface Props extends UserState{
    switchWallpaper: (index: number | boolean, isUnlocked: boolean) => void,
    setWarning: (warning: string | Warning) => void,
    updateConfig: (config: Config, isRequiredFilled?: boolean) => void
}

export default function Page(props: Props){
    const { switchWallpaper, current, collection, pictureIndex, isLocked, progress, config } = props;

    if(current === Pages.Home && collection.length > 0){
        return(
            <Home picture={ collection[pictureIndex] }
                    isLocked={ isLocked }
                    progress={ progress }
                    pictureIndex={ pictureIndex }
                    switchWallpaper={ switchWallpaper }/>
        )
        return <></>
    }
    else if(current === Pages.Picker){
        return(
            <Picker pictureIndex={ pictureIndex }
                    collection={ collection }
                    isLocked={ isLocked }
                    progress={ progress }
                    switchWallpaper={ switchWallpaper }/>
        )
    }
    else if(current === Pages.Settings){
        const { setWarning, updateConfig } = props;

        return(
            <Settings config={ config }
                    setWarning={ setWarning }
                    updateConfig={ updateConfig }/>
        )
    }
    else if(current === Pages.Info){
        return(
            <Info setWarning={ props.setWarning }/>
        )
    }
    else{
        return <></>
    }
}