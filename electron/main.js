const { app, BrowserWindow, screen, nativeImage } = require('electron');
const { join } = require('path');
const { readFileSync, existsSync } = require('fs');
const tray = require('./tray');
const initializeIPCEvents = require('./ipcEvents');

require('dotenv').config({path: join(__dirname, './.env')});
if(defineOS() === 'win32' || defineOS() === 'darwin') require('./updateEvents')();

let win, winTray; 

requestLock();

function loadFile(){
    const { height, width } = screen.getPrimaryDisplay().size;
    let url, theme;

    const cfgPath = join(app.getPath('userData'), 'config.json');

    if(existsSync(cfgPath)){
        const config = JSON.parse(readFileSync(cfgPath, 'utf8'));
        theme = config.theme;
    }
    else theme = 'dark';

    win = new BrowserWindow({
        width: width * 0.8,
        height: height * 0.8,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        icon: nativeImage.createFromPath(findIconPath(1024)),
        backgroundColor: theme === 'dark' ? '#121214' : '#f4f4f8'
    });

    if(app.isPackaged){
        url = `file://${__dirname}/../build/index.html`;
    }
    else{
        require('electron-debug')();

        win.webContents.openDevTools();
        url = 'http://localhost:3000/';
    }

    win.removeMenu();
    win.loadURL(url);
    
    hideWindow();
    initializeIPCEvents(win);
}

function hideWindow(){
    const startArgs = process.argv || [];
    
    if(startArgs.indexOf('--hidden') !== -1) 
        win.hide();
}

function requestLock(){
    const lock = app.requestSingleInstanceLock();
    
    if(!lock) app.quit();
    else{
        app.on('second-instance', () => {
            if(win){
                win.show();
                win.focus();
            }
        })
    }
}

function findIconPath(size){
    const os = defineOS();
    const iconName = os === 'win32' ? 'assets/icon.ico' : `assets/icons/${size}x${size}.png`;
    
    return app.isPackaged ? join(process.resourcesPath, iconName) : join(__dirname, '../', iconName);
}

function defineOS(){
    return process.platform
}

app.on('ready', () => {
    loadFile();
    winTray = tray.create(win, findIconPath(24));
});