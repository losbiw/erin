import React from 'react'
import Template from './Template'

import { Group, JsxGroup } from '@interfaces/Icon'

const load = (icons: Group): JsxGroup => { 
    let result: JsxGroup = {};

    for(const key in icons){
        const icon = icons[key];
        
        result[key] = () => {
            if(typeof icon === 'string'){
                return <Template raw={ icon } id={ key }/>
            }
            else{
                return <Template svg={ icon } id={ key }/>
            }
        }
    }

    return result
}

export default { load }