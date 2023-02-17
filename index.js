const ul = document.querySelector('.photos__list');
const profileName = document.querySelector('.info__name');
const otherInfo = document.querySelector('.info__text');
const menu = document.querySelector('.menu-container');
const changeInfoBtn = document.querySelector('.change-info-btn');
const inputs = Array.from(document.querySelectorAll('.menu__input'));
const submitBtn = document.querySelector('.confirm-button');
const menuTitle = document.querySelector('.menu__title');
const closeBtn = document.querySelector('.close-button');
const addBtn = document.querySelector('.add-photo-btn');
const avatar = document.querySelector('.profile__photo');
const changeProfilePhotoBtn = document.querySelector('.profile__photo-container');
const inputName = inputs[0];
const inputLink = inputs[1];

function newElement(tag, addedClass, text = ''){
    if(typeof tag == 'string' && typeof addedClass == 'string'){
        const newElem = document.createElement(tag);
        newElem.classList.add(addedClass);
        if(text != ''){
            newElem.textContent = text;
        }
        return newElem;
    }
} 

function createCard(cardName, imageLink){
    const li = newElement('li', 'photos__list-item');
    const imgDiv = newElement('div', 'item__image-container');
    const image = newElement('img', 'item__image');
    const trash = newElement('div', 'delete-item')
    const nameDiv = newElement('div','item__container');
    const button = newElement('button', 'like-btn');
    if(cardName.length > 13) cardName = cardName.substring(0, 10) + '...';
    const header = newElement('h2', 'item__header', cardName);
    li.append(trash);
    li.append(imgDiv);
    li.append(nameDiv);
    image.alt = cardName;
    image.src = imageLink;
    imgDiv.append(image);
    nameDiv.append(header);
    nameDiv.append(button);
    ul.append(li);
}

for(let card of savedCards){
    if(card.name.length > 0 ){
        createCard(card.name, card.link);
    }
}

let clearInputs = function(){
    for(let input of inputs){
        input.value = '';
        input.placeholder = '';
        input.style.display = '';
    }
}

let enableButton = function(){
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.remove('confirm-button_disabled')
}

let disableButton = function(){
    submitBtn.setAttribute('disabled', '');
    submitBtn.classList.add('confirm-button_disabled');
}

let addNewCard = function(){
    createCard(inputName.value, inputLink.value)
    this.removeEventListener('click', addNewCard);
    menu.style.visibility = 'hidden';
    disableButton();
    clearInputs();
}

let changeAvatar = function(){
    menu.style.visibility = 'hidden';
    inputName.style.display = '';
    avatar.src = inputLink.value; 
    clearInputs();
    disableButton();
    this.removeEventListener('click', changeAvatar);
}

let validateInputs = function(){
    if(menuTitle.textContent == 'Новая кошка'){
        if(inputName.value.length > 0 && inputLink.value.substring(0, 4) == 'http'){
            enableButton();
        }else{
            disableButton();
        }
    }else if(menuTitle.textContent == 'Редактировать профиль'){
        if(inputName.value.length > 0 && (inputName.value !== profileName.textContent || inputLink.value !== otherInfo.textContent)){
            enableButton();
        }else{
            disableButton();
        }
    }else if(menuTitle.textContent == 'Обновить аватар'){
        if(inputLink.value.substring(0, 4) == 'http'){
            enableButton();
        }else{
            disableButton();
        }
    }else{
        return;
    }
}

let changeInformation = function(){
    document.querySelector('title').innerHTML = inputName.value;
    profileName.textContent = inputName.value;
    otherInfo.textContent = inputLink.value;
    menu.style.visibility = 'hidden';
    submitBtn.removeEventListener('click', changeInformation);
    disableButton();
    clearInputs();
}

menu.addEventListener('input', validateInputs);

//переключение стилей у лайка по нажатию
document.addEventListener('click', function(e){
    let target = e.target;
    if(!target.classList.contains('like-btn')) return;
    target.classList.toggle('like-btn_pressed');
})

changeInfoBtn.addEventListener('click', function(){
    menuTitle.textContent = 'Редактировать профиль';
    submitBtn.textContent = 'Сохранить';
    inputName.placeholder = 'Имя';
    inputLink.placeholder = 'Дополнительная информация (необязательно)'
    inputName.value = profileName.textContent;
    inputLink.value = otherInfo.textContent;
    menu.style.visibility = 'visible';
    
    submitBtn.addEventListener('click', changeInformation);
})

addBtn.addEventListener('click', function(){
    menuTitle.textContent = 'Новая кошка';
    submitBtn.textContent = 'Создать';
    inputName.placeholder = 'Название';
    inputLink.placeholder = 'Ссылка на картинку';
    menu.style.visibility = 'visible';
    submitBtn.addEventListener('click', addNewCard);
})
//delete item 
document.addEventListener('click', function(e){
    if(!e.target.classList.contains('delete-item')) return;
    e.target.closest('li').remove();
})
//big-image
document.addEventListener('click', function(e){
    let target = e.target;
    if(!target.classList.contains('item__image')) return;
    let popup = newElement('div', 'menu-container');
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    popup.style.visibility = 'visible';
    let popupContainer = newElement('div', 'popup-container')
    let fullImage = newElement('img', 'full-image');
    fullImage.alt = target.alt;
    fullImage.src = target.src;
    let imageCaption = newElement('p', 'caption', fullImage.alt);
    let newCloseBtn = newElement('button', 'close-button');
    popupContainer.append(fullImage);
    popupContainer.append(imageCaption);
    popupContainer.append(newCloseBtn);
    popup.append(popupContainer);
    document.querySelector('body').append(popup);
    popup.addEventListener('click', function(e){
        let target = e.target;
        if(!target.classList.contains('close-button')) return;
        popup.remove();
    })
})
//change avatar
changeProfilePhotoBtn.addEventListener('click', function(){
    menuTitle.textContent = 'Обновить аватар';
    submitBtn.textContent = 'Сохранить';
    inputLink.placeholder = 'Ссылка на изображение';
    inputName.style.display = 'none';
    menu.style.visibility = 'visible';

    submitBtn.addEventListener('click', changeAvatar);
})

closeBtn.addEventListener('click', function(){
    menu.style.visibility = 'hidden';
    submitBtn.removeEventListener('click', changeAvatar);
    submitBtn.removeEventListener('click', changeInformation);
    submitBtn.removeEventListener('click', addNewCard);
    disableButton();
    clearInputs()
})