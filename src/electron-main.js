const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const { app, BrowserWindow, Tray, Menu, ipcMain, screen, nativeImage } = require('electron');
const { join } = require('path');
    //   startup = require('./resources/scripts/startup');
    //   config = require('./resources/scripts/config').get();

const startArgs = process.argv || [];
      os = process.platform;
    //   iconName = os === 'win32' ? "build/icon.ico" : "build/icons/512x512.png";
    //   iconPath = app.isPackaged ? join(process.resourcesPath, iconName) : `./${iconName}`;

const debug = require('electron-debug');
debug();

let win; 
let tray;

require('dotenv').config({path: join(__dirname, './.env')});

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
    
    win = new BrowserWindow({
        width: width * 0.8,
        height: height * 0.8,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        transparent: true
        // icon: nativeImage.createFromPath(iconPath)
    });

    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    win.webContents.openDevTools();

    win.removeMenu();
    win.loadURL('http://localhost:3000/');

    if(startArgs.indexOf('--hidden') !== -1)
        win.hide();
}

function createTray(){
    tray = new Tray(iconPath);
    const cntxMenu = Menu.buildFromTemplate([
        {label: 'Next', click: ()=>{
            win.webContents.send('change-wallpaper', 'next');
        }},
        {label: 'Previous', click: ()=>{
            win.webContents.send('change-wallpaper', 'prev');
        }},
        {label: 'Open', click: ()=>{
            win.show();
            win.focus();
        }},
        {label: 'Quit', role: "quit"}
    ]);

    tray.setContextMenu(cntxMenu);
}

app.whenReady().then(()=>{
    loadFile();
    createTray();
});

ipcMain.on('get-app-path', (event, args) => {
    event.returnValue = app.getPath('userData')
})