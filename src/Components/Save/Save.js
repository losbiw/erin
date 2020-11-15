import React from 'react'
import Button from '../Button/Button'
import config from "@modules/config"
import './Save.css'

export default function Save(props){
    const handleClick = e => {
        e.preventDefault();
        const { config: data, handleWarningChange } = props;

        data.isCompleted = true;
        
        config.set(data);
        
        handleWarningChange({
            isCompleted: true
        });
    }
    
    return(
        <div id="continue" onClick={ handleClick }>
            <div className="background">
                <div className="transparent" />
            </div>
            <Button Content={ () => <p>Continue</p> } />
        </div>
    )
}