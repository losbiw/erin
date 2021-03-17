const { execSync } = window.require('child_process')

function define(){
    return window.process.platform
}

function defineDesktopEnvironment(){
    if(define() === 'linux'){
        const environment = execSync('echo $XDG_CURRENT_DESKTOP', { encoding: 'utf8' });
        return convertEnvName(environment)
    }
}

function convertEnvName(name: string){
    const regex = /cinnamon|gnome|unity|xfce|kde/gi;

    const match = name.match(regex);

    if(match){
        const parsed = match[0].toLowerCase();

        if(!parsed || parsed === 'unity') return 'gnome'
        return parsed
    }
}

export default { define, defineDesktopEnvironment }