import React, {Component} from 'react'
import Error from '../Error/Error'
import Nav from '../Nav/Nav'
import Page from '../Page/Page'
import config from '../../modules/config'
import wallpaper from '../../modules/Wallpaper/wallpaper'
import fetch from 'node-fetch'
import time from '../../modules/time'
import areEqual from '../../modules/areEqual'
import './user.css'

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
        
        const { fetchPexels, sortPictures, setWallpaper, getSearchQuery } = this;
        const { keywords, quality, mode } = cfg;
        
        const query = await getSearchQuery(mode, keywords);
        const fetchRes = await fetchPexels(query);

        if(fetchRes.length === 0){
            this.setState({
                error: "We couldn't find any wallpaper matching your keywords",
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
        }, 
        () => setWallpaper(sorted, randomIndex));
    }

    getSearchQuery = async(mode, keywords) => {
        if(mode === 'keywords'){
            return keywords
        }
        else{
            const { getWallpaperCollection, state } = this;
            const req = await this.fetchWeather();
            
            this.timers.weatherUpdate = setInterval(async() => {
                const req = await this.fetchWeather();
                const { weather, config } = state;
                
                if(!areEqual.objects(req, weather)){
                    getWallpaperCollection(config);
                }
            }, 1000 * 3600);

            this.setState({
                weather: req
            });

            if(mode === 'weather') return [req.main]
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

        const { savePath, setStateByName, switchSingleWallpaper, setTimer } = this;
        const url = collection[index].srcMain;
        
        wallpaper.download(url, savePath, {
            setState: setStateByName,
            largeFileHandler: switchSingleWallpaper,
            setTimer
        });
    }

    setTimer = () => {
        if(this.state.config.timer){
            this.timers.wallpaper = setTimeout(() => this.switchSingleWallpaper(true), this.state.config.timer);
        }
    }

    switchSingleWallpaper = isNext => {
        const { pictureIndex, collection } = this.state;
        let updated = isNext ? pictureIndex + 1 : pictureIndex - 1;
        
        if(updated >= collection.length) updated = 0;
        else if(updated < 0) updated = collection.length - 1;

        this.setState({ 
            pictureIndex: updated,
            isLocked: true
        });
    }

    fetchWeather = () => { 
        return new Promise(res => {
            navigator.geolocation.getCurrentPosition(async(position) => {
                const key = window.process.env.WEATHER;
                const { latitude, longitude } = position.coords;
               
                const json = await this.fetchAPI(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
                );
                
                const { weather, sys } = json;
                const formatted = {
                    main: weather[0].main,
                    time: sys
                }
                
                res(formatted);
            });
        })
    }

    fetchPexels = async(keywords) =>{
        let photos = [];
        
        for(let key of keywords){
            const res = await this.fetchAPI(
                `https://api.pexels.com/v1/search?query=${key}&per_page=78`,
                {
                    'Content-Type': 'application/json',
                    'Authorization': window.process.env.PEXELS
                }
            );
            photos.push(...res.photos);
        }

        return photos
    }
    
    fetchAPI = async(url, headers) => {
        const req = await fetch(url, {
            method: "GET",
            headers
        })
        const res = await req.json();
        return res
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
        const { state, setStateByName, switchSingleWallpaper } = this;
        const { error, current } = state;

        return(
            <div id="user" className="">
                <Nav current={ current } handler={ setStateByName }/>
               
                { error && (current === 'home' || current === 'picker')
                    ? <Error msg={ error }/>
                    : <Page { ...state } 
                            setUserState={ setStateByName }
                            switchSingleWallpaper = { switchSingleWallpaper }/>
                }
            </div>
        )
    }
}