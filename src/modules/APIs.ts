//change all error handlers

import { TimeInterface } from "@/types/Time";

//add types to fetchAPI, fetchPexels
interface Weather{
    main: string,
    time: TimeInterface
}

const fetchAPI = async(url: string, errHandler: Function, headers?: HeadersInit) => {
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

const fetchWeather = (errHandler: Function): Promise<Weather | undefined> => { 
    const callback = async(res: Function, position: any): Promise<Weather | undefined> => { //change mb pridumat chto-to
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

const fetchGeocoding = (errHandler: Function): Promise<string> => {
    const callback = async(res: Function, position: any): Promise<string> => { //change mb pridumat chto-to
        try{
            const key = window.process.env.GOOGLE_API_KEY;
            const { latitude: lat, longitude: lng } = position.coords;

            const geocoding = await fetchAPI(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}&result_type=country&language=en`,
                errHandler
            );

            return res(geocoding.results[0].formatted_address);
        }
        catch(err){
            errHandler({
                error: 503
            });

            return res('')
        }
    }

    return fetchGeolocation(callback)
}

const fetchGeolocation = (callback: Function): Promise<any> => {
    return new Promise(res => {
        navigator.geolocation.getCurrentPosition(position => callback(res, position))
    })
}

const fetchPexels = async(keywords: string[], errHandler: Function) => {
    let collection: any[] = []; //change mb pridumat chto-to
    let canRequestMore = true;
    
    for(let key of keywords){
        let page = 1;
        const headers: HeadersInit = new Headers();
        headers.set('Content-type', 'application/json');
        headers.set('Authorization', window.process.env.PEXELS_API_KEY || '');
        
        while(canRequestMore && page < 3){
            try{
                const res = await fetchAPI(
                    `https://api.pexels.com/v1/search?query=${key}&per_page=78&page=${page}`,  
                    errHandler,
                    headers,
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

export { fetchPexels, fetchWeather, fetchGeolocation, fetchGeocoding }