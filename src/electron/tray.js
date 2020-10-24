const { join } = require('path');
const { Tray, Menu } = require('electron');

function create(win, icon){
    const iconPath = join(__dirname, icon);
    const tray = new Tray(iconPath);
    
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
    return tray
}

module.exports = { create }