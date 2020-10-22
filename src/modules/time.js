function convert(time){
    const current = new Date().getHours();
    for(let point in time){
        const date = new Date(time[point] * 1000);
        time[point] = date.getHours();
    }

    if(current >= 0 && current < time['sunrise']) return 'night'
    else if(current === time['sunrise']) return 'sunrise'
    else if(current > time['sunrise'] && current < 12) return 'morning'
    else if(current >= 12 && current < time['sunset']) return 'day'
    else if(current === time['sunset']) return 'sunset'
    else if(current > time['sunset'] && current < 24) return 'night'
}

export default { convert }