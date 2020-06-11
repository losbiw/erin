function get(code, error){
    code = parseInt(code, 10);

    if(isNaN(code)) error();

    switch(code){
        case 200:
        case 201:
        case 202:
        case 230:
        case 231:
        case 232:
        case 233:
            code = 'thunderstorm';
            break;
        case 300:
        case 301:
        case 302:
            code = 'drizzle';
            break;
        case 500:
        case 501:
        case 502:
        case 511:
        case 520:
        case 521:
        case 522:
            code = 'rain';
            break;
        case 600:
        case 601:
        case 602:
        case 610:
        case 621:
        case 622:
            code = 'snow';
            break;
        case 611:
        case 612:
            code = 'sleet';
            break;
        case 623:
            code = 'flurries';
            break;
        case 700:
            code = 'mist';
            break;
        case 711: 
            code = 'smoke';
            break;
        case 721: 
            code = 'haze';
            break;
        case 731:
            code = 'sand';
            break;
        case 741:
        case 751:
            code = 'fog';
            break;
        case 800:
            code = 'clear sky';
            break;
        case 801:
        case 802:
        case 803:
        case 804:
            code = 'cloud';
            break;
        case 900:
            code = 'unknown';
    }

    return code;
}

module.exports.get = get;