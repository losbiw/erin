import React, { FC, useState } from 'react'
import { capitalizeFirstLetter } from '@modules/convert'
import './Timer.scss'

interface Time{
    hours: number,
    minutes: number,
    seconds: number
}

interface Props{
    time: number,
    isActive: boolean,
    updateTimeout: (time: number) => void
}

const convertTime = (ms: number, convertation: Time): Time =>{
    const { hours, minutes, seconds } = convertation;

    return {
        hours: Math.floor(ms / hours),
        minutes: Math.floor((ms % hours) / minutes),
        seconds: Math.floor((ms % hours % minutes)/ seconds)
    }
}

const Timer: FC<Props> = (props) => {
    const [focusIndex, setFocus] = useState(0);

    const convertation = {
        hours: 3600000,
        minutes: 60000,
        seconds: 1000
    }

    const time = convertTime(props.time, convertation);
    const keys = time ? Object.keys(time) : [];

    const updateCfgTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        try{
            const numberValue = parseInt(value);

            if(value.length < 3){
                let milliseconds = numberValue * convertation[name] || 0;
    
                for(const unit in time){
                    if(unit !== name){
                        milliseconds += time[unit] * convertation[unit];
                    }
                }
                
                props.updateTimeout(milliseconds);
            }
            else{
                e.target.value = value.slice(0, 2);
            }
        }
        catch(e){
            throw e;
        }
    }

    return(
        <div className="time-container">{
            keys.map((unit, index) => {
                return(
                    <div className="time" key={ unit }>
                        <div className="wrapper">
                            <input type="number"
                                    defaultValue={ time[unit] }
                                   ref={ ref => {
                                       if(ref && props.isActive && index === focusIndex){
                                           ref.focus({ preventScroll: true });
                                       }
                                   } }
                                    onChange={ updateCfgTime }
                                    onFocus={ () => setFocus(index) }
                                    name={ unit } 
                                    id={ unit }
                                    key={ unit + index }/>
                            { 
                                unit !== 'seconds' && 
                                <span className="colon">:</span> 
                            }
                        </div>
                        
                        <label>{ capitalizeFirstLetter(unit) }</label>
                    </div>
                )
            })
        }</div>
    )
}

export default Timer