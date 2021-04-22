import React from 'react'
import config from "@modules/config"
import './Save.scss'
import { Config } from '@/interfaces/Config';

interface Props{
    configData: Config,
    setIsComplete: (isComplete: boolean) => void
}

export default function Save(props: Props){
    const handleClick = () => {
        const { configData, setIsComplete } = props;

        configData.isComplete = true;
        config.set(configData);
        
        setIsComplete(true);
    }
    
    return(
        <div className="continue" onClick={ handleClick }>
            <div className="background">
                <div className="transparent" />
            </div>

            <button>
                <p>Continue</p>
            </button>
        </div>
    )
}