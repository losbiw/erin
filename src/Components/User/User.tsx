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
import { Config, Mode, Theme, ConfigUpdate } from '@interfaces/Config.d'
import { State, Picture, Pages } from '@interfaces/UserState.d'

const { join } = window.require('path');
const { ipcRenderer } = window.require('electron');

interface Props{
    theme: Theme,
    setWarning: (warning: string) => void,
    switchTheme: () => void
}

interface Timers{
    wallpaper: NodeJS.Timeout | undefined
    weatherUpdate: NodeJS.Timeout | undefined
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
            config: config.get(),
            isLocked: true,
            progress: 0,
            error: undefined,
            current: Pages.Home,
            position: {},
            weather: {},
            isRequiredFilled: true
        }
    }

    timers: Timers = {
        wallpaper: undefined,
        weatherUpdate: undefined
    }

    async componentDidMount(){
        ipcRenderer.on('switch-wallpaper', (_e: Electron.IpcRendererEvent, args: boolean) => this.switchWallpaper(args, false));
    }

    componentDidUpdate(_prevProps: Props, prevState: State){
        const { config, pictureIndex, collection, isRequiredFilled } = this.state;
        
        if(config !== prevState.config && isRequiredFilled){
            this.getWallpaperCollection(config);
        }
        else if(config !== prevState.config){
            this.setState({
                current: Pages.Settings
            });
        }
        else if(pictureIndex !== prevState.pictureIndex){
            this.setWallpaper(collection, pictureIndex);
        }
    }

    getWallpaperCollection = async(cfg: Config) => { //change to config type
        if(this.timers.weatherUpdate){
            clearInterval(this.timers.weatherUpdate);
        }
        
        const { sortPictures, getSearchQuery, setError } = this;
        const { keywords, quality, mode } = cfg;
        
        const query = await getSearchQuery(mode, keywords);
        const fetchRes = await fetchPexels(query, setError);

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

    getSearchQuery = async(mode: Mode, keywords: string[]): Promise<string[]> => { //change type string to possible modes
        if(mode === Mode.Keywords){
            return keywords
        }
        else{
            const { getWallpaperCollection, setError, state } = this;
            const req = await fetchWeather(setError);
            
            this.timers.weatherUpdate = global.setInterval(async() => {
                const req = await fetchWeather(setError);
                const { weather, config } = state;
                
                if(!areEqual.objects(req, weather)){
                    getWallpaperCollection(config);
                }
            }, 1000 * 3600);

            this.setState({
                weather: req
            });

            if(mode === Mode.Weather && req){
                const converted = weather.convertMain(req.main)
                return [converted];
            }
            else if(mode === Mode.Time && req){
                const { sunrise, sunset } = req.time;
                const keyword = time.convert({ sunrise, sunset });
                
                return [keyword]
            }
            else return []
        }
    }
    
    setWallpaper = (collection: Picture[], index: number) => {
        if(this.timers.wallpaper){
            clearTimeout(this.timers.wallpaper);
        }

        const { savePath, switchWallpaper, setTimer, setError, updateProgress } = this;
        const url = collection[index].srcMain;
        
        wallpaper.download(url, savePath, {
            setWarning: this.props.setWarning,
            handleLargeFiles: switchWallpaper,
            setTimer,
            setError,
            updateProgress
        });
    }

    setTimer = () => {
        if(this.state.config.timer){
            this.timers.wallpaper = global.setTimeout(() => this.switchWallpaper(true, false), this.state.config.timer);
        }
    }

    switchWallpaper = (index: number | boolean, isUnlocked: boolean) => {
        const { collection, isLocked, pictureIndex } = this.state;
        
        if(isLocked && !isUnlocked){
            this.props.setWarning('Please wait until the previous picture is downloaded');
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

    changePage = (name: Pages) => {
        this.setState({
            current: name
        });
    }

    updateProgress = (progress: number) => {
        const { isLocked } = this.state;

        this.setState({
            progress,
            isLocked: progress === 0 ? false : isLocked
        });
    }

    setError = (error: number) => {
        this.setState({
            error
        })
    }

    render(){
        const { changePage, switchWallpaper, state, props } = this;
        const { error, current } = state;

        return(
            <div id="user">
                <Nav current={ current } 
                     changePage={ changePage }
                     theme={ props.theme }
                     switchTheme={ props.switchTheme }/>
               
                { error && (current === 'home' || current === 'picker')
                    ? <Error code={ error }/>
                    : <Page { ...state } 
                            // handleUserStateChange={ setStateByName }
                            // handleAppStateChange={ props.handleAppStateChange }
                            switchWallpaper = { switchWallpaper }/>
                }
            </div>
        )
    }
}