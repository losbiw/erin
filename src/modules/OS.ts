const { execSync } = window.require('child_process')

const define = (): NodeJS.Platform => {
    return window.process.platform
}

const defineDesktopEnvironment = (OS: NodeJS.Platform): string => {
    if(OS === 'linux'){
        const environment = execSync('echo $XDG_CURRENT_DESKTOP', { encoding: 'utf8' });
        return convertEnvName(environment)
    }

    return ''
}

const convertEnvName = (name: string): string => {
    const regex = /cinnamon|gnome|unity|xfce|kde/gi;
    const match = name.match(regex);

    if(match){
        const parsed = match[0].toLowerCase();

        if(!parsed || parsed === 'unity') return 'gnome'
        return parsed
    }
    else{
        return 'gnome'
    }
}

export default { define, defineDesktopEnvironment }