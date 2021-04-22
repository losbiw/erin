import Icons from '../Icons/Info'
const { Github, Reddit } = Icons;

interface Link{
    href: string,
    Content?: React.FC<React.SVGProps<SVGSVGElement>>,
    title?: string
}

interface Group{
    [key: string]: Link
}

interface Links{   
    [key: string]: Group
}

const links: Links = {
    author: {
        github: {
            href: 'https://github.com/losbiw/erin',
            Content: Github
        },
        reddit: {
            href: 'https://www.reddit.com/user/losbiw',
            Content: Reddit
        }
    },
    credits: {
        pexels: {
            title: 'Pexels',
            href: 'https://www.pexels.com/',
        },
        openweathermap: {
            title: 'OpenWeatherMap',
            href: 'https://openweathermap.org/',
        },
        flaticon: {
            title: 'FlatIcon',
            href: 'https://www.flaticon.com/',
        }
    }
}

export { links, Link }