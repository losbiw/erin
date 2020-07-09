const link = require('../scripts/link');
require('../scripts/mode')();
require('../scripts/control')();

const back = document.getElementById('back');
      settings = document.getElementById('settings-but');
      links = document.getElementsByClassName('link');

link.set(links, true, true);
link.set([settings], false, true);
back.addEventListener('click', link.back);