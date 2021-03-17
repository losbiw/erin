import { Tray, BrowserWindow, Menu } from 'electron';

function create(win: BrowserWindow, iconPath: string){
    const tray = new Tray(iconPath);
    
    const cntxMenu = Menu.buildFromTemplate([
        {label: 'Next', click: ()=>{
            win.webContents.send('switch-wallpaper', true);
        }},
        {label: 'Previous', click: ()=>{
            win.webContents.send('switch-wallpaper', false);
        }},
        {label: 'Open', click: ()=>{
            win.show();
            win.focus();
        }},
        {label: 'Quit', role: "quit"}
    ]);

    tray.setContextMenu(cntxMenu);
    return tray
}

module.exports = { create }