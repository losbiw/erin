import config from '@modules/config';

const { join } = window.require('path');

const wallpaperPath = join(config.getAppPath(), 'wallpaper.jpg');

export default wallpaperPath;
