import React from 'react';
import Inline from './Inline'
import { Group } from '@interfaces/Icon';

import Donation from '@info/donation.svg';
import Development from '@info/development.svg';
import Smile from '@info/smile.svg';
import Reddit from '@info/reddit.svg';
import Github from '@info/github.svg';

const icons: Group = { 
    Donation: () => <Inline raw={ Donation }/>, 
    Development: () => <Inline raw={ Development }/>, 
    Smile: () => <Inline raw={ Smile }/>,
    Reddit: () => <Inline raw={ Reddit }/>,
    Github: () => <Inline raw={ Github }/>
}

export = icons