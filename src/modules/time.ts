import { TimeInterface } from '../types/Time'

const convert = (time: TimeInterface): string => {
    const current = new Date().getHours();
    
    for(let point in time){
        const date = new Date(time[point as keyof TimeInterface] * 1000);
        time[point as keyof TimeInterface] = date.getHours();
    }

    //if else are used instead of switch cases for the sake of performance

    if(current >= 0 && current < time['sunrise']) return 'night'
    else if(current === time['sunrise']) return 'sunrise'
    else if(current > time['sunrise'] && current < 12) return 'morning'
    else if(current >= 12 && current < time['sunset']) return 'day'
    else if(current === time['sunset']) return 'sunset'
    else if(current > time['sunset'] && current < 24) return 'night'
    else return ''
}

export default { convert }