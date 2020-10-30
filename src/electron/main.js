const { app, BrowserWindow, screen, nativeImage } = require('electron');
const { join } = require('path');
const tray = require('./tray');
const ipcEvents = require('./ipcEvents');

require('electron-debug')();
require('dotenv').config({path: join(__dirname, '../config/.env')});

let win, iconPath, winTray; 

requestLock();
findIconPath();

function loadFile(){
    const { height, width } = screen.getPrimaryDisplay().size;
    
    win = new BrowserWindow({
        width: width * 0.8,
        height: height * 0.8,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        icon: nativeImage.createFromPath(iconPath)
    });

    win.webContents.openDevTools();

    win.removeMenu();
    win.loadURL('http://localhost:3000/');
    
    hideWindow();
    ipcEvents(win);
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
    const iconName = os === 'win32' ? 'build/icon.ico' : 'build/icons/512x512.png';
    iconPath = app.isPackaged ? join(process.resourcesPath, iconName) : `../${iconName}`;
}

app.on('ready', () => {
    loadFile();
    winTray = tray.create(win, iconPath);
});