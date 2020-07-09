const link = require('../scripts/link');

require('../scripts/mode')();
require('../scripts/control')();

const URLparams = new URLSearchParams(window.location.search);
const query = URLparams.get('query');
const links = document.getElementsByClassName('link');
const p = document.getElementById('error');

link.set(links, false, false);
p.textContent = query;
