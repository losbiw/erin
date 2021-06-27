import { Distros } from '../interfaces/Linux.d';

const { exec: _exec } = window.require('child_process');
const { promisify } = window.require('util');

const exec = promisify(_exec);
const define = (): NodeJS.Platform => window.process.platform;

const convertEnvName = (name: string): keyof Distros => {
  const regex = /cinnamon|gnome|unity|xfce|KDE/gi;
  const match = name.match(regex);

  if (match) {
    const parsed = match[0].toLowerCase();

    if (!parsed || parsed === 'unity') return 'other';
    return parsed as keyof Distros;
  }

  return 'other';
};

const defineDesktopEnvironment = async (OS: NodeJS.Platform): Promise<string | keyof Distros> => {
  if (OS === 'linux') {
    const execRes = await exec('echo $XDG_CURRENT_DESKTOP', { encoding: 'utf8' });
    const env = execRes.stdout;

    return convertEnvName(env);
  }

  return '';
};

export default { define, defineDesktopEnvironment };
