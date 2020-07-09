const { app, BrowserWindow, Tray, Menu, ipcMain, screen } = require('electron');
const { join } = require('path');
const startup = require('./resources/scripts/startup');
const config = require('./resources/scripts/config').get();
const startArgs = process.argv || [];

let win; 
let tray;

require('dotenv').config({path: join(__dirname, 'resources/.env')});

const lock = app.requestSingleInstanceLock();

if(!lock){
    app.quit();
}
else{
    app.on('second-instance', (event, args, dir)=>{
        if(win){
            win.show();
            win.focus();
        }
    })
}

function loadFile(){
    const { height, width } = screen.getPrimaryDisplay().bounds;
    let pagePath = join(__dirname, 'resources/pages/main.html');
    
    win = new BrowserWindow({
        width: width * 0.8,
        height: height * 0.8,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false
    });

    if(config.time === undefined){
        pagePath = join(__dirname, 'resources/pages/start.html');
        startup.set(true);
    }

    win.removeMenu();
    win.loadURL(pagePath);

    if(startArgs.indexOf('--hidden') !== -1)
        win.hide();
}

function createTray(){
    const iconPath = app.isPackaged ? join(process.resourcesPath, "build/icon.ico") : "./build/icon.ico";
    tray = new Tray(iconPath);
    const cntxMenu = Menu.buildFromTemplate([
        {label: 'Open', click: ()=>{
            win.show();
            win.focus();
        }},
        {label: 'Quit', click: ()=>{
            app.quit();
        }}
    ]);

    tray.setContextMenu(cntxMenu);
}

ipcMain.on('show-main-window', event=>{
    win.webContents.send('reload-theme');
    win.show();
    event.returnValue = "Main window is visible";
});
ipcMain.on('close-main-window', event=>{
    win.close();
    event.returnValue = "Main window has been closed";
});
ipcMain.on('get-window-location', event=>
    event.returnValue = win.webContents.getURL()
)
ipcMain.on('load-main', event=>{
    const mainPath = join(__dirname, 'resources/pages/main.html');
    win.webContents.send('reload-theme');
    win.show();
    win.loadURL(mainPath);
    event.returnValue = "Main page is loaded";
});

app.whenReady().then(()=>{
    loadFile();
    createTray();
});