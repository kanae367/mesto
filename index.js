function newElement(tag, addedClass, text = ''){
    if(typeof tag == 'string' && typeof addedClass == 'string'){
        let newElem = document.createElement(tag);
        newElem.classList.add(addedClass);
        if(text != ''){
            newElem.textContent = text;
        }
        return newElem;
    }
} 

function createCard(cardName, imageLink){
    let ul = document.querySelector('.photos__list');

    let li = newElement('li', 'photos__list-item');
    ul.append(li);

    let imgDiv = newElement('div', 'item__image-container');
    li.append(imgDiv);

    let trash = newElement('div', 'delete-item')
    li.append(trash);

    let nameDiv = newElement('div','item__container');
    li.append(nameDiv);

    let image = newElement('img', 'item__image');
    image.alt = cardName;
    image.src = imageLink;
    imgDiv.append(image);

    if(cardName.length > 13){
        cardName = cardName.substring(0, 10) + '...';
    }

    let header = newElement('h2', 'item__header', cardName);
    nameDiv.append(header);

    let button = newElement('button', 'like-btn');
    nameDiv.append(button);
}

for(let card of savedCards){
    if(card.name.length > 0 ){
        createCard(card.name, card.link);
    }
}

document.addEventListener('click', function(e){
    let target = e.target;
    if(!target.classList.contains('like-btn')) return;
    target.classList.toggle('like-btn_pressed');
})

let changeMenu = document.querySelector('.menu-container');
let changeInfoBtn = document.querySelector('.change-info-btn');
let inputs = Array.from(document.querySelectorAll('.menu__input'));
let submitBtn = document.querySelector('.confirm-button');
let menuTitle = document.querySelector('.menu__title');
let closeBtn = document.querySelector('.close-button');

let clearInputs = function(){
    for(let input of inputs){
        input.value = '';
    }
}

let removePlaceholders = function(){
    for(let input of inputs){
        input.placeholder = '';
    }
}

changeInfoBtn.addEventListener('click', function(){
    changeMenu.style.display = 'flex';
    menuTitle.textContent = 'Редактировать профиль';
    submitBtn.textContent = 'Сохранить';
    let name = document.querySelector('.info__name');
    let info = document.querySelector('.info__text');
    inputs[0].value = name.textContent; // Возможно можно реализовать лучше
    inputs[1].value = info.textContent;

    closeBtn.addEventListener('click', function(){
        changeMenu.style.display = 'none';
        submitBtn.removeEventListener('click', changeInformation);
        clearInputs();
    })

    let changeInformation = function(){
        if(inputs[0].value.length > 0 && (inputs[0].value != name.textContent || inputs[1].value != info.textContent)){
            name.textContent = inputs[0].value;
            document.querySelector('title').innerHTML = inputs[0].value;
            info.textContent = inputs[1].value; // можно доработать отображение кнопки с короткими именами
        }
    changeMenu.style.display = 'none';
    submitBtn.removeEventListener('click', changeInformation);
    clearInputs();
    }
    
    submitBtn.addEventListener('click', changeInformation);
})

let addBtn = document.querySelector('.add-photo-btn');
addBtn.addEventListener('click', function(){
    changeMenu.style.display = 'flex';
    menuTitle.textContent = 'Новая кошка';
    submitBtn.textContent = 'Создать';
    inputs[0].placeholder = 'Название';
    inputs[1].placeholder = 'Ссылка на картинку';

    closeBtn.addEventListener('click', function(){
        changeMenu.style.display = 'none';
        submitBtn.removeEventListener('click', addNewCard);
        removePlaceholders();
        clearInputs()
    })

    let addNewCard = function(){
        if(inputs[0].value.trim().length > 0 && (inputs[1].value.length > 0)){
            createCard(inputs[0].value, inputs[1].value)
        }
    submitBtn.removeEventListener('click', addNewCard);
    changeMenu.style.display = 'none';
    removePlaceholders();
    clearInputs()
    }

    submitBtn.addEventListener('click', addNewCard);
})

document.addEventListener('click', function(e){
    if(!e.target.classList.contains('delete-item')) return;
    e.target.closest('li').remove();
})
