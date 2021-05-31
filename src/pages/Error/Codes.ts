interface ErrorInterface {
  fix: string,
  description: string
}

interface Codes {
  [code: number]: ErrorInterface
}

const codes: Codes = {
  404: {
    fix: 'Change keywords in settings',
    description: 'We couldn’t find any wallpaper according to your request',
  },
  429: {
    fix: 'Try reinstalling the app',
    description: 'Unauthorized API connection',
  },
  503: {
    fix: 'Change mode in settings',
    description: 'Weather services are currently unavailable',
  },
  502: {
    fix: 'Check on your internet connection',
    description: "We couldn't connect to our services",
  },
};

export default codes;
