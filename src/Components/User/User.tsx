import React, {Component} from 'react'
import Error from '../Error/Error'
import Nav from '../Nav/Nav'
import Page from '../Page/Page'
import config from '@modules/config'
import wallpaper from '@modules/wallpaper'
import time from '@modules/time'
import weather from '@modules/weather'
import { fetchPexels, fetchWeather } from '@modules/APIs'
import areEqual from '@modules/areEqual'
import './User.css'
import { Config, Mode } from '@/types/ConfigInterface'

const { join } = window.require('path');
const { ipcRenderer } = window.require('electron');

interface Props{
    handleAppStateChange: (data: { warning: string }) => void
}

interface State{
    collection: Picture[],
    pictureIndex: number,
    config: any, //change
    isLocked: boolean,
    progress: number,
    error: number | undefined,
    current: string,
    position: any, //change
    weather: any, //change
    isRequiredFilled: boolean
}

interface Timers{
    wallpaper: NodeJS.Timeout
    weatherUpdate: NodeJS.Timeout
}

interface Picture{
    srcPicker: string,
    srcMain: string,
    photographer: string,
    photographerUrl: string
}

export default class User extends Component<Props, State>{
    private savePath: string;

    constructor(props: Props){
        super(props);

        const appPath = config.getAppPath();
        this.savePath = join(appPath, 'wallpaper.jpg');

        this.state = {
            collection: [],
            pictureIndex: 0,
            config: {},
            isLocked: true,
            progress: 0,
            error: undefined,
            current: 'home',
            position: {},
            weather: {},
            isRequiredFilled: true
        }
    }

    timers: Timers = {
        wallpaper: setInterval(() => {}),
        weatherUpdate: setInterval(() => {})
    }

    async componentDidMount(){
        const cfg = config.get();

        ipcRenderer.on('switch-wallpaper', (_e: Electron.IpcRendererEvent, args: boolean) => this.switchWallpaper(args, false));
    
        this.setState({
            config: cfg
        });
    }

    componentDidUpdate(_prevProps: Props, prevState: State){
        const { config, pictureIndex, collection, isRequiredFilled } = this.state;
        
        if(config !== prevState.config && isRequiredFilled){
            this.getWallpaperCollection(config);
        }
        else if(config !== prevState.config){
            this.setState({
                current: 'settings'
            });
        }
        else if(pictureIndex !== prevState.pictureIndex){
            this.setWallpaper(collection, pictureIndex);
        }
    }

    getWallpaperCollection = async(cfg: Config) => { //change to config type
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
            error: undefined,
            isLocked: true
        });
    }

    getSearchQuery = async(mode: keyof Mode, keywords: string[]): Promise<string[]> => { //change type string to possible modes
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

            if(mode === 'weather' && req){
                const converted = weather.convertMain(req.main)
                return [converted];
            }
            else if(mode === 'time' && req){
                const { sunrise, sunset } = req.time;
                const keyword = time.convert({ sunrise, sunset });
                
                return [keyword]
            }
            else return []
        }
    }
    
    setWallpaper = (collection: Picture[], index: number) => {
        clearTimeout(this.timers.wallpaper);

        const { savePath, setStateByName, switchWallpaper, setTimer } = this;
        const url = collection[index].srcMain;
        
        wallpaper.download(url, savePath, {
            setState: setStateByName,
            setWarning: this.props.handleAppStateChange,
            handleLargeFiles: switchWallpaper,
            setTimer
        });
    }

    setTimer = () => {
        if(this.state.config.timer){
            this.timers.wallpaper = setTimeout(() => this.switchWallpaper(true, false), this.state.config.timer);
        }
    }

    switchWallpaper = (index: number | boolean, isUnclocked: boolean) => {
        const { collection, isLocked, pictureIndex } = this.state;
        
        if(isLocked && !isUnclocked){
            this.props.handleAppStateChange({
                warning: 'Please wait until the previous picture is downloaded'
            })
        }
        else{
            let updatedIndex = index as number;

            if(typeof index !== 'number' && typeof index === 'boolean' && pictureIndex)
                updatedIndex = index ? pictureIndex + 1 : pictureIndex - 1;
            
            if(updatedIndex >= collection.length) updatedIndex = 0;
            else if(updatedIndex < 0) updatedIndex = collection.length - 1;

            this.setState({ 
                pictureIndex: updatedIndex,
                isLocked: true
            });
        }
    }

    sortPictures = (pictures: any[], quality: string): Picture[] => { //probably change
        return pictures.map(picture => {
            const { src, photographer, photographer_url } = picture;
            
            const result: Picture = {
                srcMain: src[quality],
                srcPicker: src.large,
                photographer,
                photographerUrl: photographer_url
            }

            return result
        });
    }

    changePage = (name: string) => {
        this.setState({
            current: name
        });
    }

    setStateByName = (updated) => { //change to pridumat' something
        this.setState(updated)
    }

    render(){
        const { setStateByName, changePage, switchWallpaper, state, props } = this;
        const { error, current, isRequiredFilled } = state;

        return(
            <div id="user">
                <Nav current={ current } 
                     changePage={ changePage }
                     theme={ props }
                     isLocked={ !isRequiredFilled }/>
               
                { error && (current === 'home' || current === 'picker')
                    ? <Error code={ error }/>
                    : <Page { ...state } 
                            handleUserStateChange={ setStateByName }
                            handleAppStateChange={ props.handleAppStateChange }
                            switchWallpaper = { switchWallpaper }/>
                }
            </div>
        )
    }
}