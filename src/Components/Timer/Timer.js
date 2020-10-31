import React, { useState, useEffect } from 'react'
import capitalize from '@modules/capitalizeFirstLetter'
import './Timer.css'

export default function Timer(props){
    const [time, setTime] = useState(null);

    const convertation = {
        hours: 1000 * 3600,
        minutes: 1000 * 60,
        seconds: 1000
    }

    useEffect(() => {
        let value = {};
        const convertation = {
            hours: 1000 * 3600,
            minutes: 1000 * 60,
            seconds: 1000
        }
        
        if(typeof props.data === 'number'){
            const { hours, minutes, seconds } = convertation;
            const ms = props.data;
            
            const h = Math.floor(ms / hours);
            const m = Math.floor((ms % hours) / minutes);
            const s = Math.floor((ms % hours % minutes)/ seconds);

            value = {
                hours: h,
                minutes: m,
                seconds: s
            }
        }
        else{
            value = {
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }

        setTime(value);
    }, [props.data]);

    const updateCfgTime = (e) => {
        const { name, value } = e.target;
        let milliseconds = value * convertation[name] || 0;
        
        for(const unit in time){
            if(unit !== name){
                milliseconds += time[unit] * convertation[unit]
            }
        }

        props.handler('timer', milliseconds);
    }

    const keys = time ? Object.keys(time) : [];
    
    return keys.map(unit => {
                return(
                    <div className="time" key={ unit }>
                        <div className="wrapper">
                            <input type="number" 
                                   defaultValue={ time[unit] }
                                   name={ unit } 
                                   id={ unit }
                                   onChange={ updateCfgTime }/>
                            { 
                                unit !== 'seconds' && 
                                <span className="colon">:</span> 
                            }
                        </div>
                        
                        <label>{ capitalize(unit) }</label>
                    </div>
                )
            })
}