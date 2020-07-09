const addBut = document.getElementById('add');
      input = document.getElementById('text');
      keywords = document.getElementById('keywords');
      accept = document.getElementById('accept');
      tags = document.querySelector('.tags');
      deleteButtons = document.getElementsByClassName('delete');
      parent = document.querySelector('.container');
let itemInst = document.querySelector('.item');

let tagsValues = [];

function get(){
    return tagsValues;
}

function set(){
    addBut.addEventListener('click', ()=>{
        hideElements(tags, parent);
        input.focus();
    });
    
    accept.addEventListener('click', ()=>{
        const value = input.value;

        if(value != "")
            checkExistence(value);
        else hideElements(parent, tags);
    });
    
    input.addEventListener('keyup', e=>{
        const value = input.value;
        e.preventDefault();

        if(e.key === "Enter"&& value != ""){
            checkExistence(value);
        }
        else if(e.key === "Enter") 
            hideElements(parent, tags);
    });
}

function checkExistence(key){
    const check = tagsValues.includes(key);
    
    if(!check)
        addValue(key);
    else{
        input.value = '';
        hideElements(parent, tags);
    }
}

function addValue(value){
    const newItem = itemInst.cloneNode(true);
          p = newItem.querySelector('p');
    
    hideElements(itemInst, newItem);
    newItem.classList.remove('invisible');
    p.textContent = value;
    tagsValues.push(value);
    input.value = '';

    keywords.appendChild(newItem);
    replaceItems();
    hideElements(parent, tags);
}

function setDeletes(){
    for(let i = 1; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', ()=>{
            tagsValues.splice(i - 1, 1);
            const item = deleteButtons[i].parentNode;
            
            keywords.removeChild(item);

            if(deleteButtons.length == 1){
                itemInst.classList.remove('hidden');
                return;
            }
            replaceItems();
        });
    }
}

function replaceItems(){
    const clone = NodeList;
    for(let i = 0; i < deleteButtons.length; i++){
        let item = deleteButtons[i].parentNode;
        
        clone[i] = item.cloneNode(true);
        keywords.replaceChild(clone[i], item);
    }

    itemInst = document.querySelector('.item');
    setDeletes();
}

function hideElements(hide, unhide){
    hide.classList.add('hidden');
    unhide.classList.remove('hidden');
}

module.exports = {
    set: set,
    add: addValue,
    get: get
}