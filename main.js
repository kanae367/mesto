const body = document.querySelector('body');
const pageTitle = document.querySelector('title');
const ul = document.querySelector('.photos__list');
const profileName = document.querySelector('.info__name');
const otherInfo = document.querySelector('.info__text');
const changeInfoBtn = document.querySelector('.change-info-btn');
const changeAvatarBtn = document.querySelector('.profile__photo-container');
const addCardBtn = document.querySelector('.add-photo-btn');
const avatar = document.querySelector('.profile__photo');

const popups = document.querySelectorAll('.menu-container');
const inputs = document.querySelectorAll('.menu__input');

const changeInformationPopup = popups[0];
const profileNameInput = inputs[0];
const profileOtherInfoInput = inputs[1];

const createCardPopup = popups[1];
const cardNameInput = inputs[2];
const cardUrlInput = inputs[3];

const changeAvatarPopup = popups[2];
const avatarUrlInput = inputs[4];

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

    image.alt = cardName;
    image.src = imageLink;

    if(cardName.length > 13) cardName = cardName.substring(0, 10) + '...';

    const header = newElement('h2', 'item__header', cardName);

    li.append(trash);
    li.append(imgDiv);
    li.append(nameDiv);
    imgDiv.append(image);
    nameDiv.append(header);
    nameDiv.append(button);
    ul.prepend(li);
}

for(let card of savedCards){
    if(card.name.length > 0 ){
        createCard(card.name, card.link);
    }
}

ul.addEventListener('click', function(evt){
    const target = evt.target;
    if(!target.classList.contains('like-btn')) return;

    target.classList.toggle('like-btn_pressed');
})

document.addEventListener('click', function(evt){
    const target = evt.target;
    if(!target.classList.contains('item__image')) return;

    const popupImage = newElement('div', 'menu-container');
    const popupContainer = newElement('div', 'popup-container')
    const fullImage = newElement('img', 'full-image');
    const newCloseBtn = newElement('button', 'close-button');
    popupImage.classList.add('hidden');
    setTimeout(() => popupImage.classList.remove('hidden'), 10);
    popupImage.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    fullImage.alt = target.alt;
    fullImage.src = target.src;
    const imageCaption = newElement('p', 'caption', fullImage.alt);
    
    popupContainer.append(fullImage);
    popupContainer.append(imageCaption);
    popupContainer.append(newCloseBtn);
    popupImage.append(popupContainer);
    body.append(popupImage);

    popupImage.addEventListener('click', function(evt){
        const target = evt.target;
        if(target.classList.contains('close-button')) setTimeout(() => popupImage.remove(), 300);
        if(target != popupImage) return;
        setTimeout(() => popupImage.remove(), 300)
    });
});

const setInputValue = function(){
    profileNameInput.value = profileName.textContent;
    profileOtherInfoInput.value = otherInfo.textContent;
}

const updateInfo = function(){
    pageTitle.innerHTML = profileNameInput.value;
    profileName.textContent = profileNameInput.value;
    otherInfo.textContent = profileOtherInfoInput.value;
}

changeInfoBtn.addEventListener('click', function(){
    setInputValue();
    changeInformationPopup.classList.remove('hidden');
});

infoForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    updateInfo();
    changeInformationPopup.classList.add('hidden');
});

const addNewCard = function(){
    createCard(cardNameInput.value, cardUrlInput.value);
    cardNameInput.value = '';
    cardUrlInput.value = '';
}

addCardBtn.addEventListener('click', () => createCardPopup.classList.remove('hidden'));

cardForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    addNewCard();
    createCardPopup.classList.add('hidden');
});

const changeAvatar = function(){
    avatar.src = avatarUrlInput.value;
}

changeAvatarBtn.addEventListener('click', () => changeAvatarPopup.classList.remove('hidden'));

avatarForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    changeAvatar();
    changeAvatarPopup.classList.add('hidden');
});

document.addEventListener('click', function(evt){
    const target = evt.target;
    if(!target.classList.contains('delete-item')) return;

    const confirmPopup = document.querySelector('template').content.cloneNode(true);
    const confirmPopupBtn = confirmPopup.querySelector('.submit-button');
    const closeBtn = confirmPopup.querySelector('.close-button');
    confirmPopupBtn.style.marginTop = '0';
    body.append(confirmPopup);
    
    setTimeout(() => {
        closeBtn.closest('.menu-container').classList.remove('hidden');
    }, 50);

    confirmPopupBtn.addEventListener('click', function(){
        target.closest('li').remove();
        this.closest('.menu-container').remove();
    })

    closeBtn.addEventListener('click', function(){
        closeBtn.closest('.menu-container').remove();
    });
});

document.addEventListener('mousedown', function(evt){
    const target = evt.target;

    if(target.classList.contains('close-button') || target.classList.contains('menu-container'))
        target.closest('.menu-container').classList.add('hidden');
});

