import { toLowerCase } from './convert'

const { execSync } = window.require('child_process')

function defineOS(){
    return window.process.platform
}

function defineDesktopEnvironment(){
    if(defineOS() === 'linux'){
        const environment = execSync('echo $XDG_CURRENT_DESKTOP', { encoding: 'utf8' });
        return convertEnvName(environment)
    }
}

function convertEnvName(name){
    const regex = /cinnamon|gnome|unity|xfce|kde/gi;

    const match = name.match(regex)[0];
    const parsed = toLowerCase(match);

    if(!parsed || parsed === 'unity') return 'gnome'
    return parsed
}

export default { defineOS, defineDesktopEnvironment }