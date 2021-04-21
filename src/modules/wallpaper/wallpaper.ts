import OS from '../OS';
import isBlacklisted from './blacklist';
import * as scripts from './scripts';

const fs = window.require('fs');
const path = window.require('path');
const { ipcRenderer } = window.require('electron');
const { execFileSync, execSync } = window.require('child_process');
const Stream = require('stream').Transform;

interface Handlers{
	handleLargeFiles: (index: number | boolean, isUnlocked: boolean) => void,
	setTimer: () => void,
	setWarning: (warning: string) => void,
	setError: (error: number) => void,
	updateProgress: (progress: number) => void
}

const download = (url: string, initialPath: string, handlers: Handlers): void => {
	const os = OS.define();
	const https = require('https');
	const { handleLargeFiles, setTimer, setWarning, setError, updateProgress } = handlers;

	if(isBlacklisted(url, os)){
		setWarning("The image might crash your desktop. It's been switched to the next one automatically");
		handleLargeFiles(true, true);
		return;
	}
	
	const callback = (res: any) => {   //change
		const size = res.headers["content-length"];

		if(os === 'win32' && (size / 1024 / 1024) >= 27){
			setWarning("The file is too big. It's been switched to the next one automatically")
			handleLargeFiles(true, true);
		}
		else{
			const data = new Stream();
			const contentLength = Math.floor(size / 100);
			let downloaded = 0; 

			const progressInterval = setInterval(() => {
				updateProgress(downloaded / contentLength);          
			}, 100);

			res.on('data', (chunk: any) => { //change
				data.push(chunk);
				downloaded += chunk.length;
			});        

			res.on('end', () => {
				clearInterval(progressInterval);
				const pic = data.read();
				const fallbackPath = getFallbackPath(initialPath);

				fs.writeFileSync(initialPath, pic); 
				
				if(os === 'darwin'){
					fs.writeFileSync(fallbackPath, pic);
				}
				
				set(initialPath, fallbackPath);
				setTimer();

				updateProgress(0);
			});    
		}
	}

	const req = https.get(url, callback);
	
	req.on('error', () => {
		setError(502);
	})
}

const getFallbackPath = (initialPath: string): string => {
	const { dir, name, ext } = path.parse(initialPath);
	const random = Math.round(Math.random() * 1000);

	const result = path.join(dir, name + random + ext);
	return result;
}

const set = (img: string, macPath: string): void => {
	const imgPath = path.resolve(img);
	
	if (typeof imgPath !== 'string') throw new TypeError('Expected a string');
	const os = OS.define();

	if(os === 'win32'){
		const isPackaged = ipcRenderer.sendSync('is-app-packaged');

		const resourcePath = isPackaged ? window.process.resourcesPath : path.join(__dirname, '../../');
		const execPath = path.join(resourcePath, 'electron/Wallpaper/Wallpaper.exe');

		execFileSync(execPath, [imgPath, "True"]);

		return;
	}
	else if(os === 'linux'){
		const desktopEnv = OS.defineDesktopEnvironment(os);
		const options = scripts.linux(imgPath);
		const commands = options[desktopEnv] || options.other;
		
		for(let command in commands){
			execSync(commands[command]);
		}

		return;
	}
	else if(os === 'darwin'){
		const macos = scripts.macos(macPath);
		execSync(macos);

		return;
	}
}

export default { download, set }