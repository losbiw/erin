const { remote } = require('electron');
      max = document.getElementById('max');
      min = document.getElementById('min');
      close = document.getElementById('close'); 
      win = remote.getCurrentWindow();

function setControls(){
    max.addEventListener('click', ()=>{
        if(win.isMaximized()){
            win.unmaximize();
        }
        else{
            win.maximize();
        }
    });
    min.addEventListener('click', ()=>win.minimize());
    close.addEventListener('click', ()=>{
        win.hide();
    });
}

module.exports = setControls;