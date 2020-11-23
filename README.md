# Erin

A simple way to automatically change wallpaper

## Installation

**Compiled app**

Download an installation file corresponding to your OS from [GitHub releases](https://github.com/losbiw/erin/releases/latest)

**Build**

Copy repository with following command:
```
git clone https://github.com/losbiw/erin
```
Include your own .env file (or use [the existing one](https://github.com/losbiw/erin/blob/master/electron/.env-example)) into /electron/ directory which must include following variables:
- PEXELS_API_KEY
- WEATHER_API_KEY(OpenWeatherMap API is preferable, otherwise you should change hard-coded values in [weather.js](https://github.com/losbiw/erin/blob/master/src/modules/weather.js))
- GOOGLE_API_KEY
- GH_TOKEN(optional, but auto-updater won't work without it)

Run following command to install all dependencies and build the app:
```
npm i
npm run build
npm run electron-build
```
