import React from 'react'
import Button from '../Button/Button'
import config from "@modules/config"
import './Save.css'

export default function Save(props){
    const handler = e => {
        e.preventDefault();
        const { config: data, warning: appHandler } = props;

        data.isCompleted = true;
        
        config.set(data);
        appHandler({
            isCompleted: true
        });
    }
    
    return(
        <div id="continue" onClick={ handler }>
            <div className="background">
                <div className="transparent" />
            </div>
            <Button Content={ () => <p>Continue</p> } />
        </div>
    )
}