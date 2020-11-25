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
* PEXELS_API_KEY
* WEATHER_API_KEY( OpenWeatherMap API is supported by default, in case of using another API you should: 
  * Change hard-coded values in [weather.js](https://github.com/losbiw/erin/blob/master/src/modules/weather.js)
  * Change [req.main](https://github.com/losbiw/erin/blob/master/src/Components/User/User.js#L113) and [req.time](https://github.com/losbiw/erin/blob/master/src/Components/User/User.js#L117) to whatever your API returns instead
)
* GOOGLE_API_KEY
* GH_TOKEN(optional, but auto-updater won't work without it)

Run following command to install all dependencies and build the app:
```
npm i
npm run build
npm run electron-build
```
