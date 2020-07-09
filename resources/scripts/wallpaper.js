const { promisify } = require('util');
const { resolve, join } = require('path');
const childProcess = require('child_process');
const execFile = promisify(childProcess.execFile);

async function set(imgPath){
	const execPath = join(__dirname, '../app/Wallpapers.exe');

	if (typeof imgPath !== 'string')
		throw new TypeError('Expected a string');

	await execFile(execPath, [resolve(imgPath)]);
}

module.exports.set = set;
