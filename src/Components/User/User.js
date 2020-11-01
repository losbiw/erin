import React, {Component} from 'react'
import Error from '../Error/Error'
import Nav from '../Nav/Nav'
import Page from '../Page/Page'
import config from '@modules/config'
import wallpaper from '@modules/Wallpaper/wallpaper'
import time from '@modules/time'
import weather from '@modules/weather'
import { fetchPexels, fetchWeather } from '@modules/APIs'
import areEqual from '@modules/areEqual'
import './User.css'

const { join } = window.require('path');

class Picture{
    constructor(srcMain, srcPicker, photographer, photographerURL){
        this.srcPicker = srcPicker;
        this.srcMain = srcMain;
        this.photographer = photographer;
        this.photographerURL = photographerURL;
    }
}

export default class User extends Component{
    constructor(props){
        super();

        const appPath = config.getAppPath();
        this.savePath = join(appPath, 'wallpaper.jpg');

        this.state = {
            collection: [],
            pictureIndex: undefined,
            config: {},
            isLocked: true,
            progress: 0,
            error: '',
            current: 'home',
            position: {},
            weather: {}
        }
    }

    timers = {
        wallpaper: undefined,
        weatherUpdate: undefined
    }

    async componentDidMount(){
        const cfg = await config.get();
    
        this.setState({
            config: cfg
        });
    }

    getWallpaperCollection = async(cfg) => {
        clearInterval(this.timers.weatherUpdate);
        
        const { sortPictures, getSearchQuery, setStateByName } = this;
        const { keywords, quality, mode } = cfg;
        
        const query = await getSearchQuery(mode, keywords);
        const fetchRes = await fetchPexels(query, setStateByName);

        if(!fetchRes) return;
        if(fetchRes.length === 0){
            this.setState({
                error: 404,
                isLocked: false,
                config: cfg
            });
            return;
        }

        const sorted = sortPictures(fetchRes, quality);
        const randomIndex = Math.round(Math.random() * sorted.length);
        
        this.setState({
            collection: sorted,
            pictureIndex: randomIndex,
            error: '',
            isLocked: true
        });
    }

    getSearchQuery = async(mode, keywords) => {
        if(mode === 'keywords'){
            return keywords
        }
        else{
            const { setStateByName, getWallpaperCollection, state } = this;
            const req = await fetchWeather(setStateByName);
            
            this.timers.weatherUpdate = setInterval(async() => {
                const req = await fetchWeather(setStateByName);
                const { weather, config } = state;
                
                if(!areEqual.objects(req, weather)){
                    getWallpaperCollection(config);
                }
            }, 1000 * 3600);

            this.setState({
                weather: req
            });

            if(mode === 'weather'){
                const converted = weather.convertMain(req.main)
                return [converted];
            }
            else if(mode === 'time'){
                const { sunrise, sunset } = req.time;
                const keyword = time.convert({ sunrise, sunset });
                
                return [keyword]
            }
        }
    }

    componentDidUpdate(_prevProps, prevState){
        const { config, pictureIndex, collection } = this.state;
        
        if(config !== prevState.config){
            this.getWallpaperCollection(config);
        }
        else if(pictureIndex !== prevState.pictureIndex){
            this.setWallpaper(collection, pictureIndex);
        }
    }
    
    setWallpaper = (collection, index) => {
        clearTimeout(this.timers.wallpaper);

        const { savePath, setStateByName, switchWallpaper, setTimer } = this;
        const url = collection[index].srcMain;
        
        wallpaper.download(url, savePath, {
            setState: setStateByName,
            largeFileHandler: switchWallpaper,
            setTimer
        });
    }

    setTimer = () => {
        if(this.state.config.timer){
            this.timers.wallpaper = setTimeout(() => this.switchWallpaper(true), this.state.config.timer);
        }
    }

    switchWallpaper = (index, isUnclocked) => {
        const { collection, isLocked, pictureIndex } = this.state;
        
        if(isLocked && !isUnclocked){
            this.props.state({
                warning: 'Please wait until the previous picture is downloaded'
            })
        }
        else{
            if(typeof index !== 'number') index = pictureIndex + 1;
            
            if(index >= collection.length) index = 0;
            else if(index < 0) index = collection.length - 1;

            this.setState({ 
                pictureIndex: index,
                isLocked: true
            });
        }
    }

    sortPictures(pictures, quality){
        return pictures.map(picture => {
            const { src, photographer, photographer_url } = picture;
            return new Picture(src[quality], src.large, photographer, photographer_url);
        });
    }

    setStateByName = (updated) => {
        this.setState(updated)
    }

    render(){
        const { setStateByName, switchWallpaper, state, props } = this;
        const { error, current } = state;

        return(
            <div id="user" className="">
                <Nav current={ current } 
                     setState={ setStateByName }
                     theme={ props }/>
               
                { error && (current === 'home' || current === 'picker')
                    ? <Error code={ error }/>
                    : <Page { ...state } 
                            setUserState={ setStateByName }
                            setWarning={ props.state }
                            switchWallpaper = { switchWallpaper }/>
                }
            </div>
        )
    }
}