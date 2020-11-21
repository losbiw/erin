# Erin

A simple way to automatically change wallpaper

## Installation

**Compiled app**

Download an installation file corresponding to your OS from [GitHub releases](https://github.com/losbiw/erin/releases/latest)

**Build**

Copy respository with following command:
```
git clone https://github.com/losbiw/erin
```
Include your own .env file into /electron/ directory which must include following variables:
- Pexels API key
- OpenWeatherMap API key
- Google API key
- GitHub token(optional, but auto-updater won't work without it)

Run following command to install all dependencies and build the app:
```
npm i
npm run build
npm run electron-build
```
