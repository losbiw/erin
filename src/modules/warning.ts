/* eslint-disable max-len */
import Settings from '@interfaces/Settings';
import { ConfigUpdate, Mode, Quality } from '@interfaces/Config';

interface Warning {
  condition: (config: ConfigUpdate, name: keyof ConfigUpdate) => boolean,
  value: string,
  isRequired?: boolean
}

interface WarningOptions {
  quality: Warning,
  keywords: Warning,
  timer: Warning,
  privacy: Warning
}

const getWarnings = (): WarningOptions => ({
  quality: {
    condition: (config, name) => (name === Settings.Quality && config.quality === Quality.High),
    value: 'Choosing the high quality might slow down the download speed',
  },
  keywords: {
    condition: (config, name) => (name === Settings.Keywords && config.keywords?.length === 0 && config.mode === Mode.Keywords),
    value: 'You have to enter at least one keyword or change the mode',
    isRequired: true,
  },
  timer: {
    condition: (config, name) => (name === Settings.Timer && !!config.timer && config.timer > 1000 * 60 * 60 * 24 * 7),
    value: "Timer can't be set to a value more than a week",
    isRequired: true,
  },
  privacy: {
    condition: (config, name) => (name === Settings.Privacy && !config.privacy),
    value: 'You have to agree to our privacy policy',
    isRequired: true,
  },
});

const match = (config: ConfigUpdate, requiredOnly: boolean) => {
  const warnings = getWarnings();
  let result: { value: string, name: keyof ConfigUpdate } | undefined;

  Object.keys(config).forEach((setting) => {
    const current = warnings[setting as keyof WarningOptions];
    const required = requiredOnly ? current?.isRequired : true;

    if (current && current.condition(config, setting as keyof ConfigUpdate) && required) {
      result = {
        value: current.value,
        name: setting as keyof ConfigUpdate,
      };
    }
  });

  return result;
};

export default { match };
