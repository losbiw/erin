function fetchWeather(errHandler){ 
    const callback = async(res, position) => {
        try{
            const key = window.process.env.WEATHER_API_KEY;
            const { latitude: lat, longitude: lng } = position.coords;
        
            const json = await fetchAPI(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`,
                errHandler
            );
            
            const { weather, sys } = json;
            const formatted = {
                main: weather[0].main,
                time: sys
            }
            
            res(formatted);
        }
        catch(err){
            errHandler({
                error: 503
            });
            return
        }
    }

    return fetchGeolocation(callback)
}

function fetchGeocoding(errHandler){
    const callback = async(res, position) => {
        try{
            const key = window.process.env.GOOGLE_API_KEY;
            const { latitude: lat, longitude: lng } = position.coords;

            const geocoding = await fetchAPI(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}&result_type=country`,
                errHandler
            );

            res(geocoding.results[0].formatted_address);
        }
        catch(err){
            errHandler({
                error: 503
            });
            return
        }
    }

    return fetchGeolocation(callback)
}

function fetchGeolocation(callback){
    return new Promise(res => {
        navigator.geolocation.getCurrentPosition(position => callback(res, position))
    })
}

async function fetchPexels(keywords, errHandler){
    let collection = [];
    let canRequestMore = true;
    
    for(let key of keywords){
        let page = 1;
        
        while(canRequestMore && page < 3){
            try{
                const res = await fetchAPI(
                    `https://api.pexels.com/v1/search?query=${key}&per_page=78&page=${page}`,
                    {
                        'Content-Type': 'application/json',
                        'Authorization': window.process.env.PEXELS_API_KEY
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

export { fetchPexels, fetchWeather, fetchGeolocation, fetchGeocoding }