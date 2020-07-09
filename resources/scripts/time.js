function convertTime(weather){
    let events = {
        sunrise: weather.sunrise,
        sunset: weather.sunset
    };
    const regex = /^[0-9]{2}/;

    for(time in events){
        const convert = events[time].match(regex);
        events[time] = convert;
    }
    
    return events;
}

function get(weather, error){
    const date = new Date;
    const time = date.getHours();
    
    const events = convertTime(weather);

    if(time == events.sunrise)
        return 'sunrise';
    
    else if(time == events.sunset)
        return 'sunset';

    else if(time > events.sunset || time < events.sunrise)
        return 'night';
    
    else if(time > events.sunrise && time < 12)
        return 'morning';
    
    else if(time >= 12 && time < events.sunset)
        return 'sunshine';
    else error("The app won't determine time in your location");
}

module.exports.get = get;