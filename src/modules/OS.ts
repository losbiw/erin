import { LinuxDistros } from '../interfaces/Linux.d'
const { execSync } = window.require('child_process')

const define = (): NodeJS.Platform => {
    return window.process.platform
}

const defineDesktopEnvironment = (OS: NodeJS.Platform): string | keyof LinuxDistros => {
    if(OS === 'linux'){
        const environment: string = execSync('echo $XDG_CURRENT_DESKTOP', { encoding: 'utf8' });
        return convertEnvName(environment)
    }

    return ''
}

const convertEnvName = (name: string): keyof LinuxDistros => {
    const regex = /cinnamon|gnome|unity|xfce|kde/gi;
    const match = name.match(regex);

    if(match){
        const parsed = match[0].toLowerCase();

        if(!parsed || parsed === 'unity') return 'other';
        return parsed as keyof LinuxDistros;
    }
    else{
        return 'other';
    }
}

export default { define, defineDesktopEnvironment }