const { app, BrowserWindow, Tray, Menu, ipcMain, screen, nativeImage } = require('electron');
const { join } = require('path');
const startup = require('./resources/scripts/startup');
const config = require('./resources/scripts/config').get();
const startArgs = process.argv || [];
const iconName = "build/icons/512x512.png";
const iconPath = app.isPackaged ? join(process.resourcesPath, iconName) : `./${iconName}`;

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
        frame: false,
        icon: nativeImage.createFromPath(iconPath)
    });

    if(config.time === undefined){
        pagePath = join(__dirname, 'resources/pages/start.html');
        startup.set(true);
    }

    win.webContents.openDevTools();

    win.removeMenu();
    win.loadFile(pagePath);

    if(startArgs.indexOf('--hidden') !== -1)
        win.hide();
}

function createTray(){
    tray = new Tray(iconPath);
    const cntxMenu = Menu.buildFromTemplate([
        {label: 'Open', click: ()=>{
            win.show();
            win.focus();
        }},
        {label: 'Quit', role: "quit"},
        {label: 'Next', click: ()=>{
            win.webContents.send('change-wallpaper', 'next');
        }},
        {label: 'Previous', click: ()=>{
            win.webContents.send('change-wallpaper', 'prev');
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
    win.loadFile(mainPath);
    event.returnValue = "Main page is loaded";
});

app.whenReady().then(()=>{
    loadFile();
    createTray();
});