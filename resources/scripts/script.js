const { remote, ipcRenderer } = require('electron');
const { privateEncrypt } = require('crypto');
      request = require('request');
      fs = require('fs');
      path = require('path');
      wallpaper = require('../scripts/wallpaper');
      link = require('../scripts/link');
      mode = require('../scripts/mode');
      config = require('../scripts/config').get();

require('dotenv').config({path: path.join(__dirname, '../.env')});
require('../scripts/control')();
mode();

const img = document.getElementById('pic');
      next = document.querySelector('.arrow:nth-of-type(2)');
      prev = document.querySelector('.arrow:nth-of-type(1)');
      settings = document.getElementById('settings');
      info = document.getElementById('info');

let current = "";
let pictures = [];
let i = 0;
let interval;
let lat;
let lon;

class Picture{
    constructor(src, author, url){
        this.src = src;
        this.author = author;
        this.url = url;
    }
}

link.set([settings, info], false, false);

if(config.theme == 'keywords'){
    const promise = new Promise(async res=>{
        for(keyword of config.keywords){
            const URLs = await findWallpapers(keyword);
            pictures.push(...URLs);
        }

        res();
    });

    promise.then(areWallpapers);
}

else if(config.theme === 'weather' || config.theme === 'time'){
    updatePosition();
    setInterval(updatePosition, config.time);
}

prev.addEventListener('click', ()=>orderButtons('prev'));
next.addEventListener('click', ()=>orderButtons('next'));

function getPosition(position, callback){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    callback();
}

function updatePosition(){
    try{
        navigator.geolocation.getCurrentPosition(position=>{
            getPosition(position, callback);

            async function callback(){
                const res = await getWeather();
                let value;
                
                if(config.theme === 'weather'){
                    const code = require('../scripts/code');
                    value = code.get(res.weather.code, sendError);
                }
                else if(config.theme === 'time'){
                    const time = require('../scripts/time');
                    value = time.get(res, sendError);
                }
                else{
                    throw 'Invalid value';
                }

                if(current === value){
                    return;
                }
                else{
                    i = 0;
                    current = value;
                    pictures = await findWallpapers(value);
                    areWallpapers();
                }
            }
        }, getError);
    } catch{
        sendError('Weather services are currently unavailable');
    }
}

async function getWeather(){
    const req = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${window.process.env.WEATHER}`);
    const res = await req.json();
    
    return res.data[0]; 
}

async function findWallpapers(key){
    try{
        const req = await fetch(`https://api.pexels.com/v1/search?query=${key}&per_page=80`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: window.process.env.WALLPAPER
            }
        });
        const res = await req.json();

        let URLs = [];

        for(pic of res.photos){
            const { src, photographer, photographer_url } = pic;

            const newPic = new Picture(
                src[config.quality],
                photographer,
                photographer_url
            );
            URLs.push(newPic);
        }
        
        return URLs;
    }
    catch{
        sendError('Check on your internet connection');
    }
}

function downloadWallpaper(data){
    const folderPath = path.join(__dirname, '../../../');
    const imgPath = path.join(folderPath, 'wallpaper.jpg');
    const htmlImg = document.querySelector('img');
    const random = Math.random() * 100;

    const stream = request(data.src).pipe(fs.createWriteStream(imgPath));

    stream.on('finish', ()=>{
        img.removeAttribute('src');
        img.setAttribute('src', `${imgPath}?path=${random}`);
        wallpaper.set(imgPath);

        next.disabled = false;
        prev.disabled = false;
    });
          
    authorCredits(data);
}

function areWallpapers(){
    if(pictures.length !== 0){
        i = Math.round(Math.random() * pictures.length);
        downloadWallpaper(pictures[i]);
        addInterval();
    }
    else sendError('Try changing your settings');
}

function addInterval(){
    if(config.time){
        if(typeof interval !== 'undefined')
            clearInterval(interval);
        interval = setInterval(()=>{
            i++;
            if(i >= pictures.length) i = 0;
            downloadWallpaper(pictures[i]);
        }, config.time);
    }
    else{
        return;
    }
}

function authorCredits(data){
    const authorUrl = document.getElementById('author');
          parent = authorUrl.parentNode;
          copy = authorUrl.cloneNode(true);
    
    parent.replaceChild(copy, authorUrl);
    copy.setAttribute('src', data.url);
    link.set([copy], true, true);

    const authorName = document.getElementById('name');
    authorName.textContent = data.author;
}

function orderButtons(button){
    if(button === 'next'){
        i++;
        if(i >= pictures.length) i = 0;
    }
    else if(button === 'prev'){
        i--;
        if(i < 0) i = pictures.length - 1;
    }
    downloadWallpaper(pictures[i]);
    addInterval();
}

function sendError(query){
    const dirPath = path.dirname(window.location.href);
    const filePath = path.join(dirPath, `error.html?query=${query}`);
    const currentWindow = remote.getCurrentWindow();

    currentWindow.loadURL(filePath);
};

function getError(err){
    if(err) throw err;
}

ipcRenderer.on('reload-theme', event=>{
    mode();
    event.returnValue = 'The theme is reloaded';
});