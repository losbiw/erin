# Erin

A simple app to change wallpaper automatically

## Installation

Download an installation file corresponding to your OS from [GitHub releases](https://github.com/losbiw/erin/releases/latest)

## Local deployment/build

**Setup**

Copy the repository with the following command:
```
git clone https://github.com/losbiw/erin
```
Include your own .env file (or use [the existing one](https://github.com/losbiw/erin/blob/master/electron/.env.example)) in the [electron directory](https://github.com/losbiw/erin/blob/master/electron) which has to contain the following variables:
* PEXELS_API_KEY
* WEATHER_API_KEY( OpenWeatherMap API is supported by default, in case of using another API you have to: 
  * Change hard-coded values in [weather.ts](https://github.com/losbiw/erin/blob/master/src/modules/weather.ts)
  * Change [req.main](https://github.com/losbiw/erin/blob/master/src/Components/User/User.ts#L151) and [req.time](https://github.com/losbiw/erin/blob/master/src/Components/User/User.ts#L155) to whatever your API returns instead
)
* GOOGLE_API_KEY
* GH_TOKEN(optional, but auto-updater won't work without it)

**Deploy locally**

Installing dependencies:
```
yarn install
```
Running react app:
```
yarn react-start
```
Running electron: 
```
yarn electron-start
```

**Build**

Building react app:
```
yarn react-build
```
Building electron app for:
* Windows: ```yarn build-win```
* Linux: ```yarn build-linux```
* MacOS: ```yarn build-mac```
* ALl three of them: ```yarn build-mwl```