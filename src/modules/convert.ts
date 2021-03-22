const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.substr(1);
}

export { capitalizeFirstLetter }