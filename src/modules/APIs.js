function fetchWeather(errHandler){ 
    return new Promise(res => {
        navigator.geolocation.getCurrentPosition(async(position) => {
            try{
                const key = window.process.env.WEATHER;
                const { latitude, longitude } = position.coords;
            
                const json = await this.fetchAPI(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`,
                    errHandler
                );
                
                const { weather, sys } = json;
                const formatted = {
                    main: weather[0].main,
                    time: sys
                }
                
                res(formatted);
            }
            catch{
                errHandler({
                    error: 503
                });
                return
            }
        })
    })
}

async function fetchPexels(keywords, errHandler){
    let collection = [];
    let canRequestMore = true;
    let page = 1;
    
    // while(canRequestMore && page < 3){
    while(canRequestMore && page < 2){
        for(let key of keywords){
            try{
                const res = await fetchAPI(
                    `https://api.pexels.com/v1/search?query=${key}&per_page=78&page=${page}`,
                    {
                        'Content-Type': 'application/json',
                        'Authorization': window.process.env.PEXELS
                    },
                    errHandler
                );

                const { photos } = await res;
                
                if(!res) return
                if(photos.length < 78) canRequestMore = false
    
                page++;
                collection.push(...photos);
            }
            catch{
                errHandler({
                    error: 429
                })
                return false
            }
        }
    }

    return collection
}

async function fetchAPI(url, headers, errHandler){
    try{
        const req = await fetch(url, {
            method: "GET",
            headers
        })
        const res = await req.json();
        return res
    }
    catch{
        errHandler({
            error: 502
        })
    }
}

export default { fetchPexels, fetchWeather }