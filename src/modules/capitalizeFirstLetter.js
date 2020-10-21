export default function capitalizeFirstLetter(string){
    if(string)
        return string.charAt(0).toUpperCase() + string.substr(1);
    else return null
}