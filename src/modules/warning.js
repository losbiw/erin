const warnings = {
    quality: {
        condition: (config, name) => (name === 'quality' && config[name] === 'original'),
        value: "Choosing the high quality might slow down the download speed"
    },
    keywords: {
        condition: (config, name) => (name === 'keywords'  && config[name].length === 0 && config.mode === 'keywords'),
        value: "You have to insert keywords or change mode",
        isRequired: true
    },
    timer: {
        condition: (config, name) => (name === 'timer' && config[name] > 1000 * 60 * 60 * 24 * 7),
        value: "Timer can't be set to a value more than a week",
        isRequired: true
    },
    privacy: {
        condition: (config, name) => (name === 'privacy' && !config[name]),
        value: "You have to agree to our privacy policy",
        isRequired: true
    },
}

function match(config, requiredOnly){
    for(let setting in config){
        const current = warnings[setting];
        const required = requiredOnly ? current?.isRequired : true;

        if(current && current.condition(config, setting) && required){
            return {
                value: current.value,
                name: setting
            }
        }
    }
}

export default { match }