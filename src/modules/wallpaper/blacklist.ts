interface Blacklist{
    win32: string[],
    darwin: string[],
    linux: string[]
}

const blacklist: Blacklist = {
  win32: [
    'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png',
  ],
  darwin: [],
  linux: [],
};

const isBlacklisted = (url: string, os: NodeJS.Platform) => {
  const osBlackList = blacklist[os as keyof Blacklist];
  return osBlackList.includes(url);
};

export default isBlacklisted;
