import React, { Component } from 'react'
import Home from '../Home/Home'
import Picker from '../Picker/Picker'
import Settings from '../Settings/Settings'
import Info from '../Info/Info'
import Warning from '../Warning/Warning'
import './Page.css'

export default class Page extends Component{
    constructor(props){
        super();

        this.components = {
            home: Home,
            picker: Picker,
            settings: Settings,
            info: Info
        }

        this.state = {
            warning: ''
        }
    }

    render(){
        const { current, collection, config, pictureIndex, isLocked, progress, warning, setUserState, switchSingleWallpaper } = this.props;
        const Current = this.components[current];
        let data;

        if(current === 'home'){
            data = { 
                ...collection[pictureIndex],
                isLocked,
                progress,
                pictureIndex,
                collection,
                switchSingleWallpaper
            }
        }
        else if(current === 'picker'){
            data = {
                pictureIndex,
                collection,
                isLocked,
                progress
            }
        }
        else if(current === 'settings'){
            data = {
                data: { ...config },
                isLocked
            }
        }

        return(
            <div id="page">
                { warning && <Warning value={ warning } handler={ setUserState }/> }
                <Current { ...data } handler={ setUserState }/>
            </div>
        )
    }
}