function objects(obj1, obj2){
    const firstKeys = Object.keys(obj1);
    const secondKeys = Object.keys(obj2);

    if(firstKeys.length !== secondKeys.length){
        return false
    }
    else{
        for(let key in obj1){
            const current = obj1[key];

            if(Array.isArray(current) && !arrays(current, obj2[key])){
                return false
            }
            else if(typeof current === 'object' && !objects(current, obj2[key])){
                return false
            }
            else if(current !== obj2[key] && typeof current !== 'object' && !Array.isArray(current)){
                return false
            }
        }

        return true
    }
}

function arrays(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false
    }
    else{
        const longer = arr1.length > arr2.length ? arr1 : arr2
        const shorter = arr1.length < arr2.length ? arr1 : arr2

        for(let value of longer){
            const valueExists = shorter.some(el => el === value);
            if(!valueExists) return false
        }
    }
    return true
}

export default { objects, arrays }