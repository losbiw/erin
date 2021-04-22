import React from 'react'
import './ProgressBar.scss'

export default function ProgressBar(props: { width: number }){
    return(
        <div className="progress-bar">
            <div className="fill" style={{ width: props.width + '%' }}></div>
        </div>
    )
}