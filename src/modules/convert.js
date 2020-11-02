function capitalizeFirstLetter(string){
    if(string)
        return string.charAt(0).toUpperCase() + string.substr(1);
    else return null
}

function toLowerCase(string){
    if(typeof string === 'string')
        return string.toLowerCase();
    else throw Error('Expected a string')
}

export { capitalizeFirstLetter, toLowerCase }