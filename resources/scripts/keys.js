const addBut = document.getElementById('add');
      input = document.getElementById('text');
      keywords = document.getElementById('keywords');
      tags = document.querySelector('.tags');
      deleteButtons = document.getElementsByClassName('delete');
let itemInst = document.querySelector('.item');

let tagsValues = [];

function get(){
    return tagsValues;
}

function set(){
    addBut.addEventListener('click', ()=>{
        hideElements(tags, input)
        input.focus();
    });

    input.addEventListener('keyup', e=>{
        e.preventDefault();

        if(e.key === "Enter"&& input.value != "")
            addValue(input.value);
        else if(e.key === "Enter") 
            hideElements(input, tags);
    });
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
    hideElements(input, tags);
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