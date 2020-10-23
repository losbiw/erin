function convertMain(value){
    switch(value){
        case 'Drizzle': return 'rain';
        case 'Smoke': return 'fog';
        case 'Squall': return 'storm';
        case 'Clear': return 'clear sky';
        default: return value
    }
}

export default { convertMain }