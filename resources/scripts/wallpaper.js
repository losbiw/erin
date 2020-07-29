const { promisify } = require('util');
const { resolve, join } = require('path');
const childProcess = require('child_process');
const { stdout, stderr } = require('process');
const { exec } = childProcess;
const execFile = promisify(childProcess.execFile);

async function set(imgPath){
	const os = process.platform;
	const resolved = resolve(imgPath);

	if(os === 'win32'){
		const execPath = join(__dirname, '../app/Wallpapers.exe');

		if (typeof imgPath !== 'string')
			throw new TypeError('Expected a string');

		await execFile(execPath, [resolved]);
	}
	else if(os === 'linux'){
		const options = {
			align: "gsettings set org.gnome.desktop.background picture-options 'zoom'",
			set: `gsettings set org.cinnamon.desktop.background picture-uri  "file://${resolved}"`
		};
		
		for(command in options){
			exec(options[command]);
		}
	}
}

module.exports.set = set;
