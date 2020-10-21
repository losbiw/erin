import React, { Component } from 'react'
import Button from '../Button/Button'
import AspectRatio from '../AspectRatio/AspectRatio'
import ProgressBar from '../ProgressBar/ProgressBar'
import { Arrows } from '../Svg/Loader'
import './picker.css'

export default class Picker extends Component{
    constructor(props){
        super();

        this.state = {
            startIndex: 0,
            collection: undefined
        }
    }

    componentDidMount(){
        const { findClosestDividible, sortCollection, props } = this;
        const { pictureIndex, collection } = props;
        const closest = findClosestDividible(pictureIndex, 6);
        
        sortCollection(collection, closest);
    }

    componentDidUpdate(prevProps){
        if((prevProps.collection !== this.props.collection)){
            this.componentDidMount();
        }
    }

    sortCollection = (collection, startIndex) => {
        let sorted = [];
        
        for(let i = startIndex; i < startIndex + 6; i++){
            if(collection[i]){
                const { srcPicker, photographer } = collection[i];
                sorted.push({
                    src: srcPicker,
                    index: i,
                    key: photographer + i
                });
            }
        }

        this.setState({
            startIndex: startIndex,
            collection: sorted
        })
    }

    switchWallpaperBlock = (isNext) => {
        const { findClosestDividible, sortCollection, props } = this;
        const { startIndex } = this.state;
        const { collection } = props;
        let updated = isNext ? startIndex + 6 : startIndex - 6;

        if(updated + 6 > collection.length)
            updated = 0;
        else if(updated < 0)
            updated = collection.length - 6;

        const closest = findClosestDividible(updated, 6);
        
        sortCollection(collection, closest);
    }

    findClosestDividible(number, divider){
        if(number) return number - (number % divider);
        else return 0
    }

    switchWallpaperByIndex = e => {
        const { name } = e.target.dataset;
        const index = parseInt(name, 10);

        this.props.handler({ 
            pictureIndex: index,
            isLocked: true
        });
    }

    showWarning = () => {
        this.props.handler({ warning: 'Please wait until the previous picture is downloaded' });
    }

    render(){
        const { switchWallpaperBlock, showWarning, switchWallpaperByIndex, state, props } = this;
        const { collection } = state;
        const { isLocked, progress } = props;

        const handler = isLocked ? showWarning : switchWallpaperByIndex

        return(
            <div id="picker">
                <div className="wrapper">
                    <Button className="arrow" 
                        Content={ Arrows[0] } 
                        name='arrow'
                        handler={() => switchWallpaperBlock(false)}/>
                </div>

                <div id="slider">
                    {   collection &&
                        collection.map(pic => {
                            const { src, key, index } = pic;
                            const isActive = this.props.pictureIndex === pic.index;

                            return <AspectRatio src={ src } 
                                                key={ key } 
                                                name={ index }
                                                isActive={ isActive }
                                                handler={ isActive ? undefined : handler }/>
                        })
                    }
                </div>

                <div className="wrapper">
                    { isLocked && <ProgressBar width={ progress }/> }

                    <Button className="arrow" 
                        Content={ Arrows[1] } 
                        name='arrow'
                        handler={() => switchWallpaperBlock(true)}/>
                </div>
            </div>
        )
    }
}