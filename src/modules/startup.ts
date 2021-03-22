const autoLaunch = window.require('auto-launch');

const launch = new autoLaunch({
    name: 'Erin',
    isHidden: true
})

const set = (isEnabled: boolean): void => {
    if(isEnabled) launch.enable();
    else launch.disable();
}

export default { set }