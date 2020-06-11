const wallpaper = require('wallpaper');
      request = require('request');
      fs = require('fs');
      path = require('path');
      mode = require('../scripts/mode')();
      config = require('../scripts/config').get();

require('dotenv').config({path: path.join(__dirname, '../.env')});
require('../scripts/control')();

const img = document.getElementById('pic');
      next = document.querySelector('.arrow:nth-of-type(2)');
      previous = document.querySelector('.arrow:nth-of-type(1)');

let lat;
let lon;
let pictures = [];
let i = 0;

if(config.theme == 'weather'){
    const code = require('../scripts/code');
    navigator.geolocation.getCurrentPosition(position=>{
        getPosition(position, callback);

        async function callback(){
            const res = await getWeather();
            const value = code.get(res.weather.code, sendError);
            findWallpapers(value);
        }
    }, getError);
    
    addInterval();
}

else if(config.theme == 'keywords'){
    for(keyword of config.keywords){
        (async()=>{
            const wallpaperReq = await fetch(`https://pixabay.com/api/?key=${window.process.env.WALLPAPER}&q=${keyword}&image_type=photo&editors_choice=true&safesearch=true`);
            const wallpaperRes = await wallpaperReq.json();

            await pictures.push(...wallpaperRes.hits); 
            
            if(pictures.length !== 0)
                downloadWallpaper(pictures[i].largeImageURL);
            else sendError();
        })();
    }
    
    addInterval();
}

else if(config.theme == 'time'){
    const time = require('../scripts/time');
    navigator.geolocation.getCurrentPosition(position=>{
        getPosition(position, async()=>{
            const weather = await getWeather();
            const currentTime = time.get(weather, sendError);

            findWallpapers(currentTime);
        });
    }, getError);

    addInterval();
}

previous.addEventListener('click', ()=>{
    i--;
    if(i < 0) i = pictures.length - 1;
    downloadWallpaper(pictures[i].largeImageURL);
});

next.addEventListener('click', ()=>{
    i++;
    if(i >= pictures.length) i = 0;
    downloadWallpaper(pictures[i].largeImageURL);
});

function getPosition(position, callback){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    callback();
}

async function getWeather(){
    const weatherReq = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${window.process.env.WEATHER}`);
    const weatherRes = await weatherReq.json();
    
    return weatherRes.data[0]; 
}

async function findWallpapers(key){
    const wallpaperReq = await fetch(`https://pixabay.com/api/?key=${window.process.env.WALLPAPER}&q=${key}&image_type=photo&editors_choice=true&safesearch=true`);
    const wallpaperRes = await wallpaperReq.json();

    pictures = wallpaperRes.hits; 
    
    areWallpapers(pictures[i].largeImageURL);
}

function downloadWallpaper(url){
    const folderPath = path.join(__dirname, '../../../');
    const imgPath = path.join(folderPath, 'wallpaper.jpg');
    const htmlImg = document.querySelector('img');
    const random = Math.random() * 100;

    const stream = request(url).pipe(fs.createWriteStream(imgPath));
    stream.on('finish', async()=>{
        await wallpaper.set(imgPath);
        img.removeAttribute('src');
        img.setAttribute('src', `${imgPath}?path=${random}`);
    });
}

function areWallpapers(key){
    if(pictures.length !== 0)
        downloadWallpaper(key);
    else sendError();
}

function addInterval(){
    if(config.time){
        setInterval(()=>{
            i++;
            if(i >= pictures.length) i = 0;
            downloadWallpaper(pictures[i].largeImageURL);
        }, config.time);
    }
    else{
        return;
    }
}

function sendError(){
    const dirPath = path.dirname(window.location.href);
    const filePath = path.join(dirPath, 'error.html');

    window.location.href = filePath;
};

function getError(err){
    if(err) throw err;
}