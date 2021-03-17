import OS from './OS'

const fs = window.require('fs');
const path = window.require('path');
const { ipcRenderer } = window.require('electron');
const { execFileSync, execSync } = window.require('child_process');
const Stream = require('stream').Transform;

interface Handlers{
	setState: Function,
	handleLargeFiles: Function,
	setTimer: Function,
	setWarning: Function
}

interface LinuxCommands{
	set: string,
	align?: string
}

interface LinuxDistros{
	other: LinuxCommands,
	kde: LinuxCommands,
	xfce: LinuxCommands
}

function download(url: string, initialPath: string, handlers: Handlers){
	const os = OS.define();
	const https = require('https');
	const { setState, handleLargeFiles, setTimer, setWarning } = handlers;

	if(os === 'win32' && url === 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png'){
		setWarning({
			warning: "The image might crash your desktop. It's been switched to the next one automatically"
		})
		handleLargeFiles(true, true);
		return;
	}
	
	const callback = (res: any) => {   
		const size = res.headers["content-length"];

		if((size / 1024 / 1024) >= 27){
			setWarning({
				warning: "The file is too big. It's been switched to the next one automatically"
			})
			handleLargeFiles(true, true);
		}
		else{
			const data = new Stream();
			const contentLength = Math.floor(size / 100);
			let downloaded = 0; 

			res.on('data', (chunk: any) => {
				data.push(chunk);
				downloaded += chunk.length;
				setState({ progress: downloaded / contentLength });                                   
			});        

			res.on('end', () => {
				const pic = data.read();
				const fallbackPath = getFallbackPath(initialPath);

				fs.writeFileSync(initialPath, pic); 
				
				if(os === 'darwin'){
					fs.writeFileSync(fallbackPath, pic);
				}
				
				set(initialPath, fallbackPath);
				setTimer();
				setState({
					isLocked: false,
					progress: 0
				});
			});    
		}
	}

	const req = https.get(url, callback);
	
	req.on('error', () => {
		setState({
			error: 502
		})
	})
}

function getFallbackPath(initialPath: string){
	const { dir, name, ext } = path.parse(initialPath);
	const random = Math.round(Math.random() * 1000);

	const result = path.join(dir, name + random + ext);
	return result;
}

function set(img: string, macPath: string){
	const imgPath = path.resolve(img);
	
	if (typeof imgPath !== 'string') throw new TypeError('Expected a string');
	const os = OS.define();

	if(os === 'win32'){
		const isPackaged = ipcRenderer.sendSync('is-app-packaged');

		const resourcePath = isPackaged ? window.process.resourcesPath : path.join(__dirname, '../../');
		const execPath = path.join(resourcePath, 'electron/Wallpaper/Wallpaper.exe');

		execFileSync(execPath, [imgPath, "True"]);
	}
	else if(os === 'linux'){
		const desktopEnv = OS.defineDesktopEnvironment() as string;

		const options: LinuxDistros = {
			other: {
				set: `gsettings set org.gnome.desktop.background picture-uri 'file://${imgPath}'`,
				align: `gsettings set org.gnome.desktop.background picture-options 'zoom'`,
			},
			xfce: {
				set: `
				  workspace_count=$(xfconf-query -v -c xfwm4 -p /general/workspace_count)
				  connected_monitor=$(xrandr -q | awk '/ connected/{print $1}')
				  xfce_desktop_prop_prefix=/backdrop/screen0/monitor$connected_monitor
				  for ((i=1; i <= $workspace_count; i++))
				  do
					 xfconf-query -c xfce4-desktop -p $xfce_desktop_prop_prefix/workspace$i/last-image -s ${imgPath}
					 xfconf-query -c xfce4-desktop -p $xfce_desktop_prop_prefix/workspace$i/image-style -s 5
				  done
				`
			},
			kde: {
				set: `dbus-send --session --dest=org.kde.plasmashell --type=method_call /PlasmaShell org.kde.PlasmaShell.evaluateScript 'string:
						var Desktops = desktops();                                                                                                                       
						for (i=0;i<Desktops.length;i++) {
								d = Desktops[i];
								d.wallpaperPlugin = "org.kde.image";
								d.currentConfigGroup = Array("Wallpaper",
															"org.kde.image",
															"General");
								d.writeConfig("Image", "file://${imgPath}");
						}'`
			}
		} 

		const commands = options[desktopEnv as keyof LinuxDistros] || options.other;
		
		for(let command in commands){
			execSync(commands[command as keyof LinuxCommands]);
		}
		return;
	}
	else if(os === 'darwin'){
		const script = `osascript -e 'tell application "System Events" to tell every desktop to set picture to "${macPath}"'`;
		execSync(script);
	}
}

export default { download, set }