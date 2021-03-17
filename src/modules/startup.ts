const autoLaunch = window.require('auto-launch');

const launch = new autoLaunch({
    name: 'Erin',
    isHidden: true
})

function set(isEnabled: boolean){
    if(isEnabled) launch.enable();
    else launch.disable();
}

export default { set }