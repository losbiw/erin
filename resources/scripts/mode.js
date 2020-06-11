const { basename } = require('path');
const config = require('./config');

const modeBut = document.getElementById('switch');

const darkMode = {
    back: '#000000',
    main: '#fbc210',
    text: '#cacaca',
    hover: 'invert(64%) sepia(99%) saturate(414%) hue-rotate(360deg) brightness(103%) contrast(97%)',
    basic: 'invert(100%) sepia(0%) saturate(7479%) hue-rotate(46deg) brightness(84%) contrast(85%)',
    arrow: 'invert(100%) sepia(4%) saturate(12%) hue-rotate(234deg) brightness(105%) contrast(100%);',
    button: '#e3e3e3'
}
const lightMode = {
    back: '#ffffff',
    main: '#4502de',
    text: '#7e7e7e',
    hover: 'invert(21%) sepia(64%) saturate(3966%) hue-rotate(253deg) brightness(75%) contrast(146%)',
    basic: 'invert(60%) sepia(0%) saturate(0%) hue-rotate(245deg) brightness(82%) contrast(85%);',
    arrow: 'invert(100%) sepia(4%) saturate(12%) hue-rotate(234deg) brightness(105%) contrast(100%);',
    button: '#e3e3e3'
}

function setSwitch(){
    setMode();
    modeBut.addEventListener('click', changeMode);
}

function changeMode(){
    const readCfg = config.get();
    let mode = readCfg.mode;

    if(mode === 'dark'){
        const src = getIconPath('sun');
        setColors(lightMode, src);
        mode = 'light';
    }
    else if(mode === 'light'){
        const src = getIconPath('moon');
        setColors(darkMode, src);
        mode = 'dark';
    } 
    else{
        console.log('Unknown command');
    }

    config.update({mode: mode});
}

function setMode(){
    const readCfg = config.get();
    const mode = readCfg.mode;

    if(mode === 'dark'){
        const src = getIconPath('moon');
        setColors(darkMode, src);
    }
    else if(mode === 'light'){
        const src = getIconPath('sun');
        setColors(lightMode, src);
    } 
}

function setColors(colors, src){
    const { back, main, text, hover, basic, arrow, button } = colors;
           background = document.querySelector('body');
           icon = modeBut.querySelector('img');
           closeBut = document.querySelector('#close img');
           maxBut = document.querySelector('#max img');
           minBut = document.querySelector('#min img');

    const hoverIcon = (filter, aIcon) =>
        aIcon.setAttribute('style', `filter: ${filter}`);
    const hoverBut = (color, aBut) =>
        aBut.setAttribute('style', `transition: 400ms; background-color: ${color}`);
    const hoverInfo = (color, aText) =>
        aText.setAttribute('style', `-webkit-text-stroke: 0.045em ${color}`);

    icon.setAttribute('src', src);
    icon.setAttribute('style', `filter: ${basic}`);

    icon.addEventListener('mouseover', ()=>hoverIcon(hover, icon));
    icon.addEventListener('mouseout', ()=>hoverIcon(basic, icon));
    background.setAttribute('style', `background-color: ${back}`);

    if(closeBut != null){
        closeBut.setAttribute('style', `filter: ${basic}`);
        minBut.setAttribute('style', `filter: ${basic}`);
        maxBut.setAttribute('style', `filter: ${basic}`);
    }
    
    if(isLocation('main')){
        const info = document.getElementById('info');
              settings = document.getElementById('settings');
              previousArrow = document.querySelector('.arrow:nth-of-type(2)');
              nextArrow = document.querySelector('.arrow:nth-of-type(1)');
              SVGs = document.getElementsByClassName('svg');

        info.setAttribute('style', `-webkit-text-stroke: 0.045em ${text}`);
        settings.setAttribute('style', `filter: ${basic}`);
        previousArrow.setAttribute('style', `filter: ${basic}`);
        nextArrow.setAttribute('style', `filter: ${basic}`);

        for(const svg of SVGs){
            svg.addEventListener('mouseover', ()=>hoverIcon(hover, svg));
            svg.addEventListener('mouseout', ()=>hoverIcon(basic, svg));
        }

        info.addEventListener('mouseover', ()=>hoverInfo(main, info));
        info.addEventListener('mouseout', ()=>hoverInfo(text, info));
    }
    else if(isLocation('settings')){
        const cfg = config.get();

        const mainTitle = document.querySelector('h1');
              titles = document.getElementsByTagName('h3');
              saveBut = document.getElementById('save');
              add = document.getElementById('add');
              check = document.getElementById('startup');
              label = document.querySelector('label');

        const color = cfg.auto ? main : text;
        check.checked = cfg.auto;
        
        mainTitle.setAttribute('style', `color: ${text}`);
        label.setAttribute('style', `background: ${color}`);
        
        for(title of titles)
            title.setAttribute('style', `color: ${text}`);

        saveBut.addEventListener('mouseover', ()=>hoverBut(main, saveBut));
        saveBut.addEventListener('mouseout', ()=>hoverBut(button, saveBut));

        add.addEventListener('mouseover', ()=>hoverBut(main, add));
        add.addEventListener('mouseout', ()=>hoverBut(button, add));

        check.addEventListener('click', ()=>{
            if(check.checked)
                label.setAttribute('style', `background: ${main}`);
            else label.setAttribute('style', `background: ${text}`);
        });
    }
    else if(isLocation('info')){
        const mainTitle = document.querySelector('h1');
              thirdTitles = document.getElementsByTagName('h3');
              p = document.querySelector('p');
              SVGs = document.getElementsByClassName('svg');
              hoverButs = document.getElementsByClassName('hover');
            
        mainTitle.setAttribute('style', `color: ${text}`);
        p.setAttribute('style', `color: ${text}`);

        for(title of thirdTitles){
            title.setAttribute('style', `color: ${text}`);
        }
        for(const but of hoverButs){
            but.addEventListener('mouseover', ()=>hoverIcon(hover, but));
            but.addEventListener('mouseout', ()=>hoverIcon(basic, but));
        }

        colorSvg(basic);
    }
    else if(isLocation('error')){
        const mainTitle = document.querySelector('h1');
              secondTitle = document.querySelector('h2');
              p = document.querySelector('p');
              info = document.getElementById('info');
              settings = document.getElementById('settings');

        mainTitle.setAttribute('style', `color: ${text}`);
        secondTitle.setAttribute('style', `color: ${text}`);
        p.setAttribute('style', `color: ${text}`);
        info.setAttribute('style', `-webkit-text-stroke: 0.045em ${text}`);
        settings.setAttribute('style', `filter: ${basic}`);

        info.addEventListener('mouseover', ()=>hoverInfo(main, info));
        info.addEventListener('mouseout', ()=>hoverInfo(text, info));

        settings.addEventListener('mouseover', ()=>hoverIcon(hover, settings));
        settings.addEventListener('mouseout', ()=>hoverIcon(basic, settings));
    }
    else{
        const nextBut = document.getElementById('next');
              add = document.getElementById('add');
              logo = document.getElementById('logo');
              h1 = document.querySelector('h1');
              p = document.querySelector('p');
              arrowImg = nextBut.querySelector('img');

        h1.setAttribute('style', `color: ${main}`);
        arrowImg.setAttribute('style', `filter: ${arrow}`);

        if(isLocation('start')) p.setAttribute('style', `color: ${text}`);
        else p.setAttribute('style', `color: ${main}`);
        
        if(logo !== null){
            logo.setAttribute('style', `filter: ${hover}`);
            h1.setAttribute('style', `color: ${text}`);
            p.setAttribute('style', `color: ${text}`);
        }
        
        if(add !== null){
            add.addEventListener('mouseover', ()=>hoverBut(main, add));
            add.addEventListener('mouseout', ()=>hoverBut(button, add));
        }

        nextBut.addEventListener('mouseover', ()=>hoverBut(main, nextBut));
        nextBut.addEventListener('mouseout', ()=>hoverBut(button, nextBut));
        colorSvg(basic);
    }
}

function colorSvg(basic){
    const SVGs = document.getElementsByClassName('svg');
    
    if(SVGs.length !== 0){
        for(svg of SVGs){
            svg.setAttribute('style', `filter: ${basic}`);
        }
    }
}

function getIconPath(icon){
    return `../img/switch/${icon}.svg`;
}

function isLocation(name){
    const location = window.location.pathname;
    const filePath = basename(location);

    if(filePath === `${name}.html`) return true;
    return false;
}

module.exports = setSwitch;