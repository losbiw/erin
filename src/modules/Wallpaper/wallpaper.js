const fs = window.require('fs');
const { join } = window.require('path');
const { execFileSync, exec } = window.require('child_process')
const Stream = require('stream').Transform;

function download(url, path, handlers){
	const https = require('https');
	const { setState, largeFileHandler, setTimer } = handlers;

	setState({ 
		warning: ''
	});
	
	const callback = res => {   
		const size = res.headers["content-length"];

		if((size / 1024 / 1024) >= 50){
			setState({
				warning: 'The file is too big, we automatically switched it to the next'
			})
			largeFileHandler(true);
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

			res.on('end', async() => {
				fs.writeFile(path, data.read(), () => {
					set(path, handlers);   

					setTimer();
					setState({
						isLocked: false,
						progress: 0
					});
				}); 
			});    
		}
	}

	return https.get(url, callback);
}

function set(imgPath){
	if (typeof imgPath !== 'string') throw new TypeError('Expected a string');
	const os = window.process.platform;

	if(os === 'win32'){
		const execPath = join(__dirname, './windows/Wallpapers.exe');
		execFileSync(execPath, [imgPath]);
	}
	
	else if(os === 'linux'){
		const options = {
			align: "gsettings set org.gnome.desktop.background picture-options 'zoom'",
			set: `gsettings set org.cinnamon.desktop.background picture-uri  "file://${imgPath}"`
		};
		
		for(let command in options){
			exec(options[command]);
		}
		return;
	}
}

export default { download, set }