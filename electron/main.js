const { app, BrowserWindow, screen, nativeImage } = require('electron');
const { join } = require('path');
const tray = require('./tray');
const initializeIPCEvents = require('./ipcEvents');

require('dotenv').config({path: join(__dirname, './.env')});
require('./updateEvents')();

let win, iconPath, winTray; 

requestLock();
findIconPath();

function loadFile(){
    const { height, width } = screen.getPrimaryDisplay().size;
    let url;
    
    win = new BrowserWindow({
        width: width * 0.8,
        height: height * 0.8,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        icon: nativeImage.createFromPath(iconPath)
    });

    if(app.isPackaged){
        url = `file://${__dirname}/../build/index.html`
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

function findIconPath(){
    const os = process.platform;
    const iconName = os === 'win32' ? 'assets/icon.ico' : 'assets/icons/512x512.png';
    
    iconPath = app.isPackaged ? join(process.resourcesPath, iconName) : join(__dirname, '../', iconName);
}

app.on('ready', () => {
    loadFile();
    winTray = tray.create(win, iconPath);
});