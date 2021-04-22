import { ConfigUpdate } from '@interfaces/Config'

interface Warning{
    condition: (config: ConfigUpdate, name: keyof ConfigUpdate) => boolean,
    value: string,
    isRequired?: boolean
}

interface WarningOptions{
    quality: Warning,
    keywords: Warning,
    timer: Warning,
    privacy: Warning
}

const match = (config: ConfigUpdate, requiredOnly: boolean) => { //add return type
    for(const setting in config){
        const warnings = getWarnings();
        const current = warnings[setting as keyof WarningOptions];
        const required = requiredOnly ? current?.isRequired : true;

        if(current && current.condition(config, setting as keyof ConfigUpdate) && required){
            return {
                value: current.value,
                name: setting
            }
        }
    }

    return undefined
}

const getWarnings = (): WarningOptions => ({
    quality: {
        condition: (config, name) => (name === 'quality' && config.quality === 'original'),
        value: "Choosing the high quality might slow down the download speed"
    },
    keywords: {
        condition: (config, name) => (name === 'keywords'  && config.keywords?.length === 0 && config.mode === 'keywords'),
        value: "You have to enter at least one keyword or change the mode",
        isRequired: true
    },
    timer: {
        condition: (config, name) => (name === 'timer' && !!config.timer && config.timer > 1000 * 60 * 60 * 24 * 7),
        value: "Timer can't be set to a value more than a week",
        isRequired: true
    },
    privacy: {
        condition: (config, name) => (name === 'privacy' && !config.privacy),
        value: "You have to agree to our privacy policy",
        isRequired: true
    }
})

export default { match }