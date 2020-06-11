const autoLaunch = require('auto-launch');

const start = new autoLaunch({
    name: "Erin",
    isHidden: true
});

function set(isEnabled){
    if(isEnabled === true)
        start.enable();
    else start.disable();
}

module.exports.set = set;