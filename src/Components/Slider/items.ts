import { Settings } from '@interfaces/Settings'

export interface Slide{
    name: Settings,
    title: string,
    description: string,
    dark: URL,
    light: URL
}

const items: Array<Slide> = [
    {
        name: Settings.Privacy,
        title: 'Privacy Policy',
        description: 'Please, read and agree to our privacy policy before using the app',
        dark: new URL('https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
        light: new URL('https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
    },
    {
        name: Settings.Mode,
        title: 'Wallpaper change mode',
        description: 'Choose the way you want your wallpaper to change',
        dark: new URL('https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
        light: new URL('https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
    },
    {
        name: Settings.Keywords,
        title: 'Keywords to search',
        description: 'It\'s only required if you choose "Keywords" as wallpaper mode',
        dark: new URL('https://images.pexels.com/photos/1021808/pexels-photo-1021808.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'),
        light: new URL('https://images.pexels.com/photos/2365457/pexels-photo-2365457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
    },
    {
        name: Settings.Timer,
        title: 'Timer',
        description: 'Set the interval you want your wallpaper to change within',
        dark: new URL('https://images.pexels.com/photos/1366922/pexels-photo-1366922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
        light: new URL('https://images.pexels.com/photos/1428787/pexels-photo-1428787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
    },
    {
        name: Settings.Startup,
        title: 'Auto startup',
        description: 'Turn it on if you want "Erin" to launch with your system',
        dark: new URL('https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
        light: new URL('https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
    },
    {
        name: Settings.Quality,
        title: 'Wallpaper resolution',
        description: 'Choose what quality you want your wallpaper to be downloaded with',
        dark: new URL('https://images.pexels.com/photos/691569/pexels-photo-691569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
        light: new URL('https://images.pexels.com/photos/3389536/pexels-photo-3389536.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')
    },
    {
        name: Settings.Save,
        title: 'Save changes and continue',
        description: 'Click the button below to save your preferences and go to home page',
        dark: new URL('https://images.pexels.com/photos/1482936/pexels-photo-1482936.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
        light: new URL('https://images.pexels.com/photos/2086622/pexels-photo-2086622.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'),
    }
]

export { items, Settings }