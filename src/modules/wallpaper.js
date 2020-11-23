import OS from './OS'

const fs = window.require('fs');
const { ipcRenderer } = window.require('electron');
const { join } = window.require('path');
const { execFileSync, execSync } = window.require('child_process');
const Stream = require('stream').Transform;

function download(url, path, handlers){
	const https = require('https');
	const { setState, handleLargeFiles, setTimer } = handlers;
	
	const callback = res => {   
		const size = res.headers["content-length"];

		if((size / 1024 / 1024) >= 50){
			setState({
				warning: 'The file is too big, we automatically switched it to the next one'
			})
			handleLargeFiles(true, true);
		}
		else{
			const data = new Stream();
			const contentLength = Math.floor(size / 100);
			let downloaded = 0; 

			res.on('data', chunk => {
				data.push(chunk);
				downloaded += chunk.length;
				setState({ progress: downloaded / contentLength });                                   
			});        

			res.on('end', () => {
				fs.writeFileSync(path, data.read()); 
				
				set(path, handlers);
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

function set(imgPath){
	if (typeof imgPath !== 'string') throw new TypeError('Expected a string');
	const os = window.process.platform;

	if(os === 'win32'){
		const isPackaged = ipcRenderer.sendSync('is-app-packaged');

		const resourcePath = isPackaged ? window.process.resourcesPath : join(__dirname, '../../');
		const execPath = join(resourcePath, 'electron/Wallpaper/Wallpapers.exe');

		execFileSync(execPath, [imgPath]);
	}
	
	else if(os === 'linux'){
		const desktopEnv = OS.defineDesktopEnvironment();

		const options = {
			other: (name) => ({
				align: `gsettings set org.${name}.desktop.background picture-options "zoom"`,
				set: `gsettings set org.${name}.desktop.background picture-uri  "file://${imgPath}"`
			}),
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
		};

		const commands = options[desktopEnv] || options.other(desktopEnv);
		
		for(let command in commands){
			execSync(commands[command]);
		}
		return;
	}
}

export default { download, set }