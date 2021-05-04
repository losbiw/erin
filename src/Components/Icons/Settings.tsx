import React from 'react';
import { Group } from '@interfaces/Icon';

import Mode from '@settings/mode.svg';
import Keywords from '@settings/keywords.svg';
import Privacy from '@settings/privacy.svg';
import Timer from '@settings/timer.svg';
import Startup from '@settings/startup.svg';
import Quality from '@settings/quality.svg';
import Save from '@settings/save.svg';
import Inline from './Inline';

const icons: Group = {
  Mode: () => <Inline raw={Mode} />,
  Keywords: () => <Inline raw={Keywords} />,
  Privacy: () => <Inline raw={Privacy} />,
  Timer: () => <Inline raw={Timer} />,
  Startup: () => <Inline raw={Startup} />,
  Quality: () => <Inline raw={Quality} />,
  Save: () => <Inline raw={Save} />,
};

export = icons
